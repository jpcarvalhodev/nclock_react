import { SyntheticEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { fetchWithAuth } from './FetchWithAuth';
import '../css/TreeView.css';
import { TextField, TextFieldProps } from '@mui/material';
import { toast } from 'react-toastify';
import { Department, Employee, Group } from '../helpers/Types';
import { TreeViewBaseItem } from '@mui/x-tree-view';

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

export function TreeViewData({ onSelectEmployees }: TreeViewDataProps) {
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const selectionChangedRef = { current: false };

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

        const unassignedDept = allEmployees.filter((emp: Employee) =>
          emp.departmentId === null
        );

        const unassignedGroup = allEmployees.filter((emp: Employee) =>
          emp.groupId === null
        );

        const departmentItems = departments.map((dept: Department) => ({
          id: `department-${dept.departmentID}`,
          label: dept.name || 'Sem Nome',
          children: dept.employees.map((emp: Employee) => ({
            id: `dept-${dept.departmentID}-emp-${emp.employeeID}`,
            label: emp.name || 'Sem Nome',
          })),
        }));

        const groupItems = groups.map((group: Group) => ({
          id: `group-${group.groupID}`,
          label: group.name || 'Sem Nome',
          children: group.employees.map((emp: Employee) => ({
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
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast.error('Falha ao buscar dados');
      }
    }
    fetchData();
  }, []);

  const handleToggle = (e: SyntheticEvent, nodeIds: string[]) => {
    setExpandedIds(nodeIds);
  };

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

  useEffect(() => {
    const [newFilteredItems, newExpandedIds] = filterItems(items, searchTerm.toLowerCase());
    if (searchTerm.trim() === '') {
      setExpandedIds([]);
    } else {
      setExpandedIds([...newExpandedIds]);
    }
    setFilteredItems(newFilteredItems);
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