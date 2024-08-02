import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import '../css/TreeView.css';
import { TextField, TextFieldProps } from '@mui/material';
import { Department, Employee, Group } from '../helpers/Types';
import { TreeViewBaseItem } from '@mui/x-tree-view/models/items';
import { PersonsContext, PersonsContextType, PersonsProvider } from '../context/PersonsContext';
import personIcon from '../assets/img/navbar/pessoas/person.png';
import departmentsIcon from '../assets/img/navbar/pessoas/departments.png';
import groupsIcon from '../assets/img/navbar/pessoas/groups.png';

// Define a interface para as propriedades do componente CustomSearchBox
function CustomSearchBox(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      className="SearchBox"
      InputLabelProps={{
        className: "SearchBox-label"
      }}
      InputProps={{
        className: "SearchBox-input",
        ...props.InputProps,
      }}
    />
  );
}

// Define a interface para as propriedades do componente TreeViewData
interface TreeViewDataProps {
  onSelectEmployees: (employeeIds: string[]) => void;
  entity: "all" | "employees" | "external employees" | "users" | "visitors" | "contacts" | "temporaries";
}

// Função para filtrar os itens
function filterItems(items: TreeViewBaseItem[], term: string): [TreeViewBaseItem[], Set<string>] {
  let expandedIds = new Set<string>();

  function filterRecursively(item: TreeViewBaseItem): TreeViewBaseItem | null {
    const matchesSearch = item.label?.toLowerCase().includes(term.toLowerCase());
    const children = item.children || [];
    const filteredChildren = children.map(filterRecursively).filter((child): child is TreeViewBaseItem => child !== null);

    if (matchesSearch || filteredChildren.length > 0) {
      expandedIds.add(item.id);
      return { ...item, children: filteredChildren };
    }

    return null;
  }

  const filteredItems = items.map(filterRecursively).filter((item): item is TreeViewBaseItem => item !== null);
  return [filteredItems, expandedIds];
}

// Função para coletar todos os IDs expansíveis
function collectAllExpandableItemIds(items: TreeViewBaseItem[]): string[] {
  let expandableIds: string[] = [];
  function gatherIds(item: TreeViewBaseItem) {
    if (item.children && item.children.length > 0) {
      expandableIds.push(item.id);
      item.children.forEach(gatherIds);
    }
  }
  items.forEach(gatherIds);
  return expandableIds;
}

// Define o componente
export function TreeViewData({ onSelectEmployees, entity }: TreeViewDataProps) {
  const { data,
    fetchAllData,
  } = useContext(PersonsContext) as PersonsContextType;
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const selectionChangedRef = { current: false };

  // Busca os dados ao carregar o componente de acordo com a entidade
  useEffect(() => {
    const fetchData = async () => {
      await fetchAllData(entity);
    };
    fetchData();
  }, [entity, fetchAllData]);

  // Define e mapeia os dados para os itens da árvore
  useEffect(() => {
    const departments = data.departments;
    const groups = data.groups;
    const allEmployees = data.employees;

    const departmentMap = new Map();
    const deptIdToCodeMap = new Map();

    departments.forEach(dept => {
      deptIdToCodeMap.set(dept.departmentID, dept.code);
      departmentMap.set(dept.code, {
        ...dept,
        children: [],
        employees: []
      });
    });

    allEmployees.forEach(emp => {
      if (emp.departmentId && deptIdToCodeMap.has(emp.departmentId)) {
        const deptCode = deptIdToCodeMap.get(emp.departmentId);
        if (departmentMap.has(deptCode)) {
          departmentMap.get(deptCode).employees.push({
            id: `emp-${emp.employeeID}`,
            label: emp.name,
          });
        }
      }
    });

    departments.forEach(dept => {
      if (dept.paiId && departmentMap.has(dept.paiId)) {
        departmentMap.get(dept.paiId).children.push(departmentMap.get(dept.code));
      }
    });

    const unassignedDept = allEmployees.filter((emp: Employee) =>
      emp.departmentId === null
    );

    const unassignedGroup = allEmployees.filter((emp: Employee) =>
      emp.groupId === null
    );

    const topDepartments = Array.from(departmentMap.values()).filter(dept => !dept.paiId);

    const buildDepartmentTree = (dept: Department) => ({
      id: `department-${dept.departmentID}`,
      icon: <img src={departmentsIcon} alt="Department Icon" style={{ width: 24, height: 24 }} />,
      label: dept.name || 'Sem Nome',
      children: [
        ...dept.children.map(buildDepartmentTree),
        ...allEmployees.filter((emp: Employee) => emp.departmentId === dept.departmentID).map((emp: Employee) => ({
          id: `dept-${dept.departmentID}-emp-${emp.employeeID}`,
          icon: <img src={personIcon} alt="Person Icon" style={{ width: 24, height: 24 }} />,
          label: emp.name,
        })),
      ],
    });

    const departmentItems = topDepartments.map(buildDepartmentTree);

    const groupItems = groups.map((group: Group) => ({
      id: `group-${group.groupID}`,
      icon: <img src={groupsIcon} alt="Group Icon" style={{ width: 24, height: 24 }} />,
      label: group.name || 'Sem Nome',
      children: allEmployees.filter(emp => emp.groupId === group.groupID).map((emp: Employee) => ({
        id: `group-${group.groupID}-emp-${emp.employeeID}`,
        icon: <img src={personIcon} alt="Person Icon" style={{ width: 24, height: 24 }} />,
        label: emp.name || 'Sem Nome',
      })),
    }));

    const unassignedDepartmentItems = unassignedDept.map((emp: Employee) => ({
      id: `empd-${emp.employeeID}`,
      icon: <img src={personIcon} alt="Person Icon" style={{ width: 24, height: 24 }} />,
      label: emp.name || 'Sem Nome',
    }));

    const unassignedGroupItems = unassignedGroup.map((emp: Employee) => ({
      id: `empg-${emp.employeeID}`,
      icon: <img src={personIcon} alt="Person Icon" style={{ width: 24, height: 24 }} />,
      label: emp.name || 'Sem Nome',
    }));

    const treeItems = [
      {
        id: 'nclock',
        label: 'NCLOCK',
        children: [
          { id: 'departments', label: 'DEPARTAMENTOS', children: departmentItems },
          ...(unassignedDepartmentItems.length > 0 ? [{
            id: 'unassignedDept',
            icon: <img src={departmentsIcon} alt="Department Icon" style={{ width: 24, height: 24 }} />,
            label: 'SEM DEPARTAMENTO',
            children: unassignedDepartmentItems,
          }] : []),
          { id: 'groups', label: 'GRUPOS', children: groupItems },
          ...(unassignedGroupItems.length > 0 ? [{
            id: 'unassignedGroup',
            icon: <img src={groupsIcon} alt="Group Icon" style={{ width: 24, height: 24 }} />,
            label: 'SEM GRUPO',
            children: unassignedGroupItems,
          }] : []),
        ],
      },
    ];

    setItems(treeItems);
    setFilteredItems(treeItems);
    const allExpandableIds = collectAllExpandableItemIds(treeItems);
    setExpandedIds(allExpandableIds);
  }, [data]);

  // Filtra os itens ao mudar o termo de pesquisa
  useEffect(() => {
    const [newFilteredItems, newExpandedIds] = filterItems(items, searchTerm.toLowerCase());
    setFilteredItems(newFilteredItems);
    if (searchTerm.trim()) {
      setExpandedIds([...newExpandedIds]);
    } else {
      setExpandedIds(collectAllExpandableItemIds(items));
    }
  }, [items, searchTerm]);

  // Função para lidar com a expansão dos itens
  const handleToggle = (e: SyntheticEvent, nodeIds: string[]) => {
    if (nodeIds.length < expandedIds.length) {
      setExpandedIds(collectAllExpandableItemIds(items));
    } else {
      setExpandedIds(nodeIds);
    }
  };

  // Função para lidar com a mudança de seleção dos itens
  const handleSelectedItemsChange = (e: SyntheticEvent, itemIds: string[]) => {
    const itemsMap = new Map<string, TreeViewBaseItem>();

    function mapItemsRecursively(item: TreeViewBaseItem) {
      itemsMap.set(item.id, item);
      item.children?.forEach(child => mapItemsRecursively(child));
    }
    items.forEach(item => mapItemsRecursively(item));

    const newSelectedIds = new Set(itemIds);
    const previouslySelectedIds = new Set(selectedEmployeeIds);

    function updateChildSelection(itemId: string, isSelected: boolean) {
      const item = itemsMap.get(itemId);
      if (item) {
        item.children?.forEach(child => {
          if (isSelected) {
            newSelectedIds.add(child.id);
          } else {
            newSelectedIds.delete(child.id);
          }
          updateChildSelection(child.id, isSelected);
        });
      }
    }

    const addedIds = Array.from(newSelectedIds).filter(id => !previouslySelectedIds.has(id));
    const removedIds = Array.from(previouslySelectedIds).filter(id => !newSelectedIds.has(id));

    addedIds.forEach(id => updateChildSelection(id, true));
    removedIds.forEach(id => updateChildSelection(id, false));

    setSelectedEmployeeIds(Array.from(newSelectedIds));

    const employeeIds = Array.from(newSelectedIds).filter(id =>
      id.includes('emp') || id.includes('-emp-') || id.startsWith('empd-') || id.startsWith('empg-')
    ).map(id => {
      if (id.includes('-emp-')) {
        return id.substring(id.lastIndexOf('-emp-') + 5);
      } else if (id.startsWith('empd-') || id.startsWith('empg-')) {
        return id.substring(5);
      } else if (id.startsWith('emp-')) {
        return id.substring(4);
      }
      return null;
    }).filter(id => id !== null);

    onSelectEmployees(employeeIds as string[]);
  };

  // Atualiza a referência de mudança de seleção
  useEffect(() => {
    if (selectionChangedRef.current) {
      selectionChangedRef.current = false;
    }
  }, [selectedEmployeeIds]);

  return (
    <PersonsProvider>
      <Box className="TreeViewContainer">
        <Box className="treeViewFlexItem">
          <RichTreeView
            multiSelect
            checkboxSelection
            items={filteredItems}
            getItemId={(item: TreeViewBaseItem) => item.id}
            onSelectedItemsChange={handleSelectedItemsChange}
            selectedItems={selectedEmployeeIds}
            expandedItems={expandedIds}
            onExpandedItemsChange={handleToggle}
          />
        </Box>
        <CustomSearchBox
          label="Pesquisa"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
    </PersonsProvider>
  );
}