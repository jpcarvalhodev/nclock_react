import { SyntheticEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import '../css/TreeView.css';
import { TreeViewBaseItem } from '@mui/x-tree-view';

import { useTerminals } from '../context/TerminalsContext';
import { DevicesDoors, Doors } from '../types/Types';

// Define a interface para as propriedades do componente TreeViewData
interface TreeViewACProps {
    onSelectDevices: (selectedDevices: string[]) => void;
    devices: DevicesDoors;
    doors: Doors[];
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
export function TreeViewAC({ onSelectDevices }: TreeViewACProps) {
    const { devices, door } = useTerminals();
    const [items, setItems] = useState<TreeViewBaseItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
    const [expandedIds, setExpandedIds] = useState<string[]>(['nidgroup']);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const selectionChangedRef = { current: false };

    // Atualiza a árvore de itens ao receber os dados dos dispositivos
    useEffect(() => {
        const buildDeviceTree = devices
            .sort((a, b) => a.deviceNumber - b.deviceNumber)
            .map((device, deviceIndex) => {
                const deviceDoors = door
                    .filter((d) => d.devId === device.zktecoDeviceID)
                    .sort((a, b) => a.doorNo - b.doorNo)
                    .map((d, doorIndex) => ({
                        id: `device-${deviceIndex}-door-${doorIndex}-${d.id}`,
                        label: d.name || 'Sem Nome',
                    }));

                return {
                    id: `device-${deviceIndex}-${device.zktecoDeviceID}`,
                    label: device.deviceName || 'Sem Nome',
                    children: deviceDoors
                };
            });

        const treeItems = [
            {
                id: 'equipamento',
                label: 'EQUIPAMENTO',
                children: buildDeviceTree
            }
        ];

        setItems(treeItems);
        setFilteredItems(treeItems);
        const allExpandableIds = collectAllExpandableItemIds(treeItems);
        setExpandedIds(allExpandableIds);
    }, [devices]);

    // Função para lidar com a expansão dos itens
    const handleToggle = (event: SyntheticEvent, nodeIds: string[]) => {
        setExpandedIds(nodeIds);
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
        const previouslySelectedIds = new Set(selectedDevicesIds);

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

        setSelectedDevicesIds(Array.from(newSelectedIds));

        onSelectDevices(Array.from(newSelectedIds));
    };

    useEffect(() => {
        if (selectionChangedRef.current) {
            selectionChangedRef.current = false;
        }
    }, [selectedDevicesIds]);

    return (
        <Box className="TreeViewContainer">
            <Box className="treeViewFlexItem">
                <RichTreeView
                    multiSelect={true}
                    checkboxSelection={true}
                    items={filteredItems}
                    getItemId={(item: TreeViewBaseItem) => item.id}
                    onSelectedItemsChange={handleSelectedItemsChange}
                    selectedItems={selectedDevicesIds}
                    expandedItems={expandedIds}
                    onExpandedItemsChange={handleToggle}
                />
            </Box>
        </Box>
    );
}