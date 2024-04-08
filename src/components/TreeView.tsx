import { useEffect, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { TransitionProps } from '@mui/material/transitions';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useSpring, animated } from '@react-spring/web';
import { fetchWithAuth } from './FetchWithAuth';
import { Department, Group } from '../helpers/Types';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';

function validateAndFixData(data: (Department | Group)[], type: 'department' | 'group'): TreeViewBaseItem[] {
  return data.map((item, index): TreeViewBaseItem => {
    if (!item.id) {
      console.warn(`Item do tipo '${type}' está faltando 'id':`, item);
      return { ...item, id: `${type}-missing-id-${index}`, label: item.name, children: [] };
    }
    return { id: item.id, label: item.name, children: [] };
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

export default function TreeViewData() {
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsResponse = await fetchWithAuth('https://localhost:7129/api/Departaments');
        const groupsResponse = await fetchWithAuth('https://localhost:7129/api/Groups');

        if (!departmentsResponse.ok || !groupsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const departmentsData: Department[] = await departmentsResponse.json();
        const groupsData: Group[] = await groupsResponse.json();

        const validatedDepartments = validateAndFixData(departmentsData, 'department');
        const validatedGroups = validateAndFixData(groupsData, 'group');

        setItems([
          {
            id: 'main',
            label: 'Nclock',
            children: [...validatedDepartments, ...validatedGroups],
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch tree data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <RichTreeView
      aria-label="customized"
      defaultExpandedItems={['main']}
      sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 300 }}
      slotProps={{ item: { slots: { groupTransition: TransitionComponent } } }}
      items={items}
    />
  );
}