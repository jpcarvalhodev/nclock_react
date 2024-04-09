import { useEffect, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { TransitionProps } from '@mui/material/transitions';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useSpring, animated } from '@react-spring/web';
import { fetchWithAuth } from './FetchWithAuth';
import { Category, Department, Employee, Group, Profession, Zone } from '../helpers/Types';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import '../css/TreeView.css'

interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
}

function validateAndFixData<T extends Employee | Department | Group | Category | Profession | Zone>(
  data: T[],
  type: 'employee' | 'department' | 'group' | 'category' | 'profession' | 'zone',
  transformFn: (item: T) => { id: string; label: string; }
): TreeViewBaseItem[] {
  return data.map((item, index) => {
    let id = item.id || `${type}-missing-id-${index}`;
    if (!item.id) {
      console.warn(`Item do tipo '${type}' está faltando 'id':`, item, "Gerando id:", id);
    }
    const transformedItem = transformFn(item);
    return {
      id,
      label: transformedItem.label,
      children: []
    };
  });
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });
  return <animated.div style={style}><Collapse {...props} /></animated.div>;
}

const initialItems: TreeItem[] = [
  {
    id: 'main',
    label: 'Nclock',
    children: [
      {
        id: 'employees',
        label: 'Employees',
        children: [],
      },
      {
        id: 'departments',
        label: 'Departments',
        children: [],
      },
      {
        id: 'groups',
        label: 'Groups',
        children: [],
      },
      {
        id: 'categories',
        label: 'Categories',
        children: [],
      },
      {
        id: 'professions',
        label: 'Professions',
        children: [],
      },
      {
        id: 'zones',
        label: 'Zones',
        children: [],
      },
    ],
  },
];

export default function TreeViewData() {
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [expanded, setExpanded] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const employeesResponse = await fetchWithAuth('https://localhost:7129/api/Employees');
      const departmentsResponse = await fetchWithAuth('https://localhost:7129/api/Departaments');
      const groupsResponse = await fetchWithAuth('https://localhost:7129/api/Groups');
      const categoriesResponse = await fetchWithAuth('https://localhost:7129/api/Categories');
      const professionsResponse = await fetchWithAuth('https://localhost:7129/api/Professions');
      const zonesResponse = await fetchWithAuth('https://localhost:7129/api/Zones');

      if (!employeesResponse.ok || !departmentsResponse.ok || !groupsResponse.ok || !categoriesResponse.ok || !professionsResponse.ok || !zonesResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const employeesData: Employee[] = await employeesResponse.json();
      const departmentsData: Department[] = await departmentsResponse.json();
      const groupsData: Group[] = await groupsResponse.json();
      const categoriesData: Category[] = await categoriesResponse.json();
      const professionsData: Profession[] = await professionsResponse.json();
      const zonesData: Zone[] = await zonesResponse.json();

      const transformEmployee = (employee: Employee): TreeViewBaseItem => {
        const label = employee.name || `Code: ${employee.code}`;
        return {
          id: employee.id,
          label: label,
        };
      };

      const transformDepartment = (department: Department): TreeViewBaseItem => {
        const label = department.name || `Code: ${department.code}`;
        return {
          id: department.id,
          label: label,
        };
      };

      const transformGroup = (group: Group): TreeViewBaseItem => {
        const label = group.name || `Code: ${group.code}`;
        return {
          id: group.id,
          label: label,
        };
      };

      const transformCategory = (category: Category): TreeViewBaseItem => {
        const label = category.description || `Code: ${category.code}`;
        return {
          id: category.id,
          label: label,
        };
      }

      const transformProfession = (profession: Profession): TreeViewBaseItem => {
        const label = profession.description || `Code: ${profession.code}`;
        return {
          id: profession.id,
          label: label,
        };
      };

      const transformZone = (zone: Zone): TreeViewBaseItem => {
        const label = zone.name || `Code: ${zone.code}`;
        return {
          id: zone.id,
          label: label,
        };
      };

      const validatedEmployees = validateAndFixData(employeesData, 'employee', transformEmployee);
      const validatedDepartments = validateAndFixData(departmentsData, 'department', transformDepartment);
      const validatedGroups = validateAndFixData(groupsData, 'group', transformGroup);
      const validatedCategories = validateAndFixData(categoriesData, 'category', transformCategory);
      const validatedProfessions = validateAndFixData(professionsData, 'profession', transformProfession);
      const validatedZones = validateAndFixData(zonesData, 'zone', transformZone);

      setItems([
        {
          id: 'main',
          label: 'Nclock',
          children: [
            {
              id: 'employees',
              label: 'Employees',
              children: validatedEmployees,
            },
            {
              id: 'departments',
              label: 'Departments',
              children: validatedDepartments,
            },
            {
              id: 'groups',
              label: 'Groups',
              children: validatedGroups,
            },
            {
              id: 'categories',
              label: 'Categories',
              children: validatedCategories,
            },
            {
              id: 'professions',
              label: 'Professions',
              children: validatedProfessions,
            },
            {
              id: 'zones',
              label: 'Zones',
              children: validatedZones,
            },
          ],
        },
      ]);

    } catch (error) {
      console.error('Failed to fetch tree data', error);
    }
  };

  useEffect(() => {
    fetchData();
  },);

  const filterItems = (items: TreeItem[], term: string, expandedIds: string[] = []): [TreeItem[], string[]] => {
    if (!term) {
      return [items, expandedIds];
    }
  
    let foundMatch = false;
  
    const newItems = items.map(item => {
      let matchInChildren = false;
      let newChildren = [];
  
      if (item.label.toLowerCase().includes(term.toLowerCase())) {
        foundMatch = true;
        matchInChildren = true;
        expandedIds.push(item.id);
      }
  
      if (item.children) {
        const [filteredChildren, childExpandedIds] = filterItems(item.children, term, expandedIds);
        matchInChildren = matchInChildren || filteredChildren.length > 0;
        newChildren = filteredChildren;
      }
  
      if (matchInChildren) {
        expandedIds.push(item.id);
        return { ...item, children: newChildren };
      }
  
      return null;
    }).filter(item => item !== null);
  
    return [newItems, foundMatch ? expandedIds : []];
  };  
  
  useEffect(() => {
    const [newFilteredItems, newExpandedIds] = filterItems(initialItems, searchTerm);
    setFilteredItems(newFilteredItems);
  
    if (newExpandedIds.length > 0) {
      setExpanded(newExpandedIds);
    } else {
      setExpanded(searchTerm ? ['main'] : []);
    }
  }, [searchTerm]);
   

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (!term) {

      setFilteredItems(initialItems);
      setExpanded([]);
    } else {

      const newFilteredItems = filterItems(initialItems, term);
      setFilteredItems(newFilteredItems);

      const newExpanded = newFilteredItems.map(item => item.id);
      setExpanded(newExpanded);
    }
  };

  return (
    <div className="treeview-container">
      <div className="treeview" id="resizable-treeview">
        <RichTreeView
          aria-label="customized"
          defaultExpandedItems={['main']}
          sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 300 }}
          slotProps={{ item: { slots: { groupTransition: TransitionComponent } } }}
          items={items}
          expanded={expanded}
        />
      </div>
      <input
        type="text"
        className="search-box"
        placeholder="Pesquisa"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}