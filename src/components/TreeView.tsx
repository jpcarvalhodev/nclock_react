import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { fetchWithAuth } from './FetchWithAuth';
import '../css/TreeView.css';
import { TextField, TextFieldProps } from '@mui/material';
import { toast } from 'react-toastify';
import { Department, Employee, Group } from '../helpers/Types';

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

interface TreeViewDataProps {
  onSelectEmployees: (employeeIds: string[]) => void;
}

function filterItems(items: TreeViewBaseItem[], term: string): [TreeViewBaseItem[], Set<string>] {
  let expandedIds = new Set<string>();

  function filterRecursively(item: TreeViewBaseItem): TreeViewBaseItem | null {
    const matchesSearch = item.label.toLowerCase().includes(term.toLowerCase());
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

export function TreeViewData({ onSelectEmployees }: TreeViewDataProps) {
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const deptResponse = await fetchWithAuth('https://localhost:7129/api/Departaments/Employees');
        const groupResponse = await fetchWithAuth('https://localhost:7129/api/Groups/Employees');

        if (!deptResponse.ok) {
          toast.error('Falha ao buscar dados dos departamentos');
          return;
        }
        if (!groupResponse.ok) {
          toast.error('Falha ao buscar dados dos grupos');
          return;
        }

        const [departments, groups] = await Promise.all([
          deptResponse.json(),
          groupResponse.json(),
        ]);

        const departmentItems = departments.map((dept: Department) => ({
          id: dept.departmentID,
          label: dept.description,
          children: dept.employees.map((emp: Employee) => ({
            id: `dept-${dept.departmentID}-emp-${emp.employeeID}`,
            label: emp.name,
          })),
        }));

        const groupItems = groups.map((group: Group) => ({
          id: group.groupID,
          label: group.description,
          children: group.employees.map((emp: Employee) => ({
            id: `group-${group.groupID}-emp-${emp.employeeID}`,
            label: emp.name,
          })),
        }));

        setItems([
          {
            id: 'nclock',
            label: 'Nclock',
            children: [
              { id: 'departments', label: 'Departamentos', children: departmentItems },
              { id: 'groups', label: 'Grupos', children: groupItems },
            ],
          },
        ]);

        setExpandedIds([]);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    fetchData();
  }, []);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpandedIds(nodeIds);
  };

  const handleSelectedItemsChange = (event: React.SyntheticEvent, itemIds: string[]) => {
    const employeeIds = itemIds
      .filter(id => id.includes('-emp-'))
      .map(id => id.substring(id.lastIndexOf('-emp-') + 5));
    onSelectEmployees(employeeIds.length > 0 ? employeeIds : []);
  };

  useEffect(() => {
    const [newFilteredItems, newExpandedIds] = filterItems(items, searchTerm.toLowerCase());
    if (searchTerm.trim() === '') {
      setExpandedIds([]);
    } else {
      setExpandedIds([...newExpandedIds]);
    }
    setFilteredItems(newFilteredItems);
  }, [items, searchTerm]);

  return (
    <Box className="TreeViewContainer">
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <RichTreeView
          multiSelect={true}
          items={items}
          getItemId={(item) => item.id}
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