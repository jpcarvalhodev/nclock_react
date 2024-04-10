import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { fetchWithAuth } from './FetchWithAuth';
import '../css/TreeView.css';
import { TextField, TextFieldProps } from '@mui/material';

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

interface Department {
  id: string;
  name: string;
  employees: Employee[];
}

interface Group {
  id: string;
  name: string;
  employees: Employee[];
}

interface Employee {
  id: string;
  name: string;
}

function filterItems(items: TreeViewBaseItem[], term: string, expandedIds: string[] = []): [TreeViewBaseItem[], string[]] {
  if (!term) return [items, []];
  return items.reduce(([filtered, ids]: [TreeViewBaseItem[], string[]], item) => {
    let matches = item.label.toLowerCase().includes(term.toLowerCase());
    let childrenFiltered: TreeViewBaseItem[] = [];
    let childrenIds: string[] = [];
    if (item.children) {
      [childrenFiltered, childrenIds] = filterItems(item.children, term, ids);
      matches = matches || childrenFiltered.length > 0;
    }
    if (matches) {
      filtered.push({ ...item, children: childrenFiltered });
      ids.push(item.id, ...childrenIds);
    }
    return [filtered, ids];
  }, [[], expandedIds]);
}

export function TreeViewData() {
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const deptResponse = await fetchWithAuth('https://localhost:7129/api/Departaments/Employees');
        const groupResponse = await fetchWithAuth('https://localhost:7129/api/Groups/Employees');

        if (!deptResponse.ok || !groupResponse.ok) throw new Error('Failed to fetch data');

        const [departments, groups] = await Promise.all([
          deptResponse.json(),
          groupResponse.json(),
        ]);

        let tempIdCounter = 1;

        const departmentItems = departments.map((dept: Department) => ({
          id: dept.id || `temp-dept-${tempIdCounter++}`,
          label: dept.name,
          children: (dept.employees ?? []).map((emp: Employee) => ({
            id: emp.id || `temp-emp-dept-${tempIdCounter++}`,
            label: emp.name,
          })),
        }));
        
        const groupItems = groups.map((group: Group) => ({
          id: group.id || `temp-group-${tempIdCounter++}`,
          label: group.name,
          children: (group.employees ?? []).map((emp: Employee) => ({
            id: emp.id || `temp-emp-group-${tempIdCounter++}`,
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

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpandedIds(nodeIds);
  };

  useEffect(() => {
    const [newFilteredItems, newExpandedIds] = filterItems(items, searchTerm);
    setFilteredItems(newFilteredItems);
    setExpandedIds(prevIds => Array.from(new Set([...prevIds, ...newExpandedIds])));
  }, [items, searchTerm]);

  return (
    <Box className="TreeViewContainer" sx={{ height: 400, flexGrow: 1, maxWidth: 400 }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <RichTreeView
          items={items}
          expandedItems={expandedIds}
          onExpandedItemsChange={handleToggle}
        />
      </Box>
      <CustomSearchBox
        label="Pesquisa"
        variant="outlined"
        size="small"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
    </Box>
  );
}