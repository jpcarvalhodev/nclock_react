import { SyntheticEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import '../css/TreeView.css';
import { TextField, TextFieldProps } from '@mui/material';
import { AccessControl } from '../helpers/Types';
import { TreeViewBaseItem } from '@mui/x-tree-view';
import * as apiService from "../helpers/apiService";
import { CustomOutlineButton } from './CustomOutlineButton';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
interface TreeViewDataACProps {
    onSelectDevices: (selectedDevices: string[]) => void;
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
export function TreeViewDataAC({ onSelectDevices }: TreeViewDataACProps) {
    const [items, setItems] = useState<TreeViewBaseItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
    const [expandedIds, setExpandedIds] = useState<string[]>(['nidgroup']);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [accessControl, setAccessControl] = useState<AccessControl[]>([]);
    const selectionChangedRef = { current: false };

    // Função para buscar os dados dos dispositivos
    const fetchAllData = async () => {
        try {
            const accessData = await apiService.fetchAllAccessControl();
            setAccessControl(accessData);
        } catch (error) {
            console.error('Erro ao buscar os dados dos dispositivos:', error);
        }
    };

    // Busca os dados ao carregar o componente
    useEffect(() => {
        fetchAllData();
    }, []);

    // Busca os dados dos dispositivos e mapeia para os itens da árvore
    useEffect(() => {
        const buildDeviceTree = accessControl.flatMap(ac =>
            ac.acc.map((accItem: AccessControl) => ({
                id: accItem.acId,
                label: accItem.doorName,
                children: []
            }))
        );

        const treeItems = [
            {
                id: 'nidgroup',
                label: 'NIDGROUP',
                children: [
                    {
                        id: 'accessControlDoorName',
                        label: 'PORTAS',
                        children: buildDeviceTree
                    },
                ],
            },
        ];
        setItems(treeItems);
        setFilteredItems(treeItems);
        const allExpandableIds = collectAllExpandableItemIds(treeItems);
        setExpandedIds(allExpandableIds);
    }, [accessControl]);

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
    }, [selectedDevicesIds]);

    return (
        <Box className="TreeViewContainer">
            <p className='treeview-title-text'>Filtros</p>
            <div style={{ display: 'flex' }}>
                <CustomSearchBox
                    label="Pesquisa"
                    variant="outlined"
                    size='small'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
                >
                    <CustomOutlineButton className='treeview-button' icon="bi-arrow-clockwise" onClick={() => fetchAllData()} iconSize='1.1em'></CustomOutlineButton>
                </OverlayTrigger>
            </div>
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