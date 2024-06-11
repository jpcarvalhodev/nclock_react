import { SyntheticEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import '../css/TreeView.css';
import { TextField, TextFieldProps } from '@mui/material';
import { Department, Employee, Group } from '../helpers/Types';
import { TreeViewBaseItem } from '@mui/x-tree-view';
import { toast } from 'react-toastify';
import { fetchWithAuth } from './FetchWithAuth';

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
interface TreeViewDataNclockProps {
  onSelectEmployees: (selectedEmployees: string[]) => void;
  data: { departments: Department[], groups: Group[], employees: Employee[] };
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
export function TreeViewDataNclock({ onSelectEmployees }: TreeViewDataNclockProps) {
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const selectionChangedRef = { current: false };

  // Busca os dados dos departamentos, grupos e funcionários e mapeia para os itens da árvore
  useEffect(() => {
    async function fetchData() {
      try {
        const deptResponse = await fetchWithAuth('Departaments/Employees');
        const groupResponse = await fetchWithAuth('Groups/Employees');
        const employeesResponse = await fetchWithAuth('Employees/GetAllEmployees');

        if (!deptResponse.ok || !groupResponse.ok || !employeesResponse.ok) {
          toast.error('Falha ao buscar dados');
          return;
        }

        const [departments, groups, allEmployees] = await Promise.all([
          deptResponse.json(),
          groupResponse.json(),
          employeesResponse.json(),
        ]);

        const departmentMap = new Map();
        const deptIdToCodeMap = new Map();

        departments.forEach((dept: Department) => {
          deptIdToCodeMap.set(dept.departmentID, dept.code);
          departmentMap.set(dept.code, {
            ...dept,
            children: [],
            employees: []
          });
        });

        allEmployees.forEach((emp: Employee) => {
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

        departments.forEach((dept: Department) => {
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
          label: dept.name || 'Sem Nome',
          children: [
            ...dept.children.map(buildDepartmentTree),
            ...allEmployees.filter((emp: Employee) => emp.departmentId === dept.departmentID).map((emp: Employee) => ({
              id: `dept-${dept.departmentID}-emp-${emp.employeeID}`,
              label: emp.name,
            })),
          ],
        });

        const departmentItems = topDepartments.map(buildDepartmentTree);

        const groupItems = groups.map((group: Group) => ({
          id: `group-${group.groupID}`,
          label: group.name || 'Sem Nome',
          children: allEmployees.filter((emp: Employee) => emp.groupId === group.groupID).map((emp: Employee) => ({
            id: `group-${group.groupID}-emp-${emp.employeeID}`,
            label: emp.name || 'Sem Nome',
          })),
        }));

        const unassignedDepartmentItems = unassignedDept.map((emp: Employee) => ({
          id: `unassigned-empdept-${emp.employeeID}`,
          label: emp.name || 'Sem Nome',
        }));

        const unassignedGroupItems = unassignedGroup.map((emp: Employee) => ({
          id: `unassigned-empgrp-${emp.employeeID}`,
          label: emp.name || 'Sem Nome',
        }));

        const treeItems = [
          {
            id: 'nclock',
            label: 'Nclock',
            children: [
              { id: 'departments', label: 'Departamentos', children: departmentItems },
              ...(unassignedDepartmentItems.length > 0 ? [{
                id: 'unassigned',
                label: 'Sem Departamento',
                children: unassignedDepartmentItems,
              }] : []),
              { id: 'groups', label: 'Grupos', children: groupItems },
              ...(unassignedGroupItems.length > 0 ? [{
                id: 'unassignedGroup',
                label: 'Sem Grupo',
                children: unassignedGroupItems,
              }] : []),
            ],
          },
        ];
        setItems(treeItems);
        setFilteredItems(treeItems);
        const allExpandableIds = collectAllExpandableItemIds(treeItems);
        setExpandedIds(allExpandableIds);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast.error('Falha ao buscar dados');
      }
    }
    fetchData();
  }, []);

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
    const employeeIds = itemIds
      .filter(id => id.includes('-emp-'))
      .map(id => id.substring(id.lastIndexOf('-emp-') + 5));

    const newSelectedEmployeeIds = selectedEmployeeIds.filter(id => !employeeIds.includes(id));

    employeeIds.forEach(id => {
      if (!selectedEmployeeIds.includes(id)) {
        newSelectedEmployeeIds.push(id);
      }
    });
    setSelectedEmployeeIds(newSelectedEmployeeIds);
    onSelectEmployees(newSelectedEmployeeIds);
  };

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

  useEffect(() => {
    if (selectionChangedRef.current) {
      selectionChangedRef.current = false;
    }
  }, [selectedEmployeeIds]);

  return (
    <Box className="TreeViewContainer">
      <Box className="treeViewFlexItem">
        <RichTreeView
          multiSelect={true}
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
  );
}