import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import "../css/TreeView.css";
import { TreeViewBaseItem } from "@mui/x-tree-view";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { usePersons } from "../context/PersonsContext";

import { CustomOutlineButton } from "./CustomOutlineButton";
import { SearchBoxContainer } from "./SearchBoxContainer";
import { CustomSpinner } from "./CustomSpinner";

// Define a interface para as propriedades do componente TreeViewData
interface TreeViewDataUsersProps {
  onSelectDevices: (selectedDevices: string[]) => void;
}

// Função para filtrar os itens
function filterItems(
  items: TreeViewBaseItem[],
  term: string
): [TreeViewBaseItem[], Set<string>] {
  let expandedIds = new Set<string>();

  function filterRecursively(item: TreeViewBaseItem): TreeViewBaseItem | null {
    const matchesSearch = item.label
      ?.toLowerCase()
      .includes(term.toLowerCase());
    const children = item.children || [];
    const filteredChildren = children
      .map(filterRecursively)
      .filter((child): child is TreeViewBaseItem => child !== null);

    if (matchesSearch || filteredChildren.length > 0) {
      expandedIds.add(item.id);
      return { ...item, children: filteredChildren };
    }

    return null;
  }

  const filteredItems = items
    .map(filterRecursively)
    .filter((item): item is TreeViewBaseItem => item !== null);
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
export function TreeViewDataUsers({ onSelectDevices }: TreeViewDataUsersProps) {
  const { registeredUsers, fetchAllRegisteredUsers } = usePersons();
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>(["nidgroup"]);
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const selectionChangedRef = { current: false };
  const [loading, setLoading] = useState(false);

  // Busca os dados dos dispositivos e mapeia para os itens da árvore
  const memoizedTreeItems = useMemo(() => {
    const buildDeviceTree = registeredUsers
      .sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";
        return nameA.localeCompare(nameB);
      })
      .map((user) => ({
        id: user.id || "Sem ID",
        label: user.name || "Sem Nome",
        children: [],
      }));

    const treeItems = [
      {
        id: "nidgroup",
        label: "NIDGROUP",
        children: [
          {
            id: "utilizadores",
            label: "UTILIZADORES",
            children: buildDeviceTree,
          },
        ],
      },
    ];
    return treeItems;
  }, [registeredUsers]);

  // Atualiza os itens da árvore
  useEffect(() => {
    setItems(memoizedTreeItems);
    setFilteredItems(memoizedTreeItems);
    const allExpandableIds = collectAllExpandableItemIds(memoizedTreeItems);
    setExpandedIds(allExpandableIds);
  }, [memoizedTreeItems]);

  // Atualiza o estado de carregamento ao expandir os itens
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    if (itemsMap.size > 0) {
      clearTimeout(timeout);
      setLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [memoizedTreeItems]);

  // Função para lidar com a expansão dos itens
  const handleToggle = useCallback(
    (event: SyntheticEvent, nodeIds: string[]) => {
      setExpandedIds(nodeIds);
    },
    []
  );

  // Mapeia os itens para um Map
  const itemsMap = useMemo(() => {
    const map = new Map<string, TreeViewBaseItem>();
    function mapItemsRecursively(item: TreeViewBaseItem) {
      map.set(item.id, item);
      item.children?.forEach(mapItemsRecursively);
    }
    items.forEach(mapItemsRecursively);
    return map;
  }, [items]);

  // Função para lidar com a mudança de seleção dos itens
  const handleSelectedItemsChange = useCallback(
    (e: SyntheticEvent, itemIds: string[]) => {
      const newSelectedIds = new Set(itemIds);
      const previouslySelectedIds = new Set(selectedDevicesIds);

      function updateChildSelection(itemId: string, isSelected: boolean) {
        const item = itemsMap.get(itemId);
        if (item) {
          item.children?.forEach((child) => {
            if (isSelected) {
              newSelectedIds.add(child.id);
            } else {
              newSelectedIds.delete(child.id);
            }
            updateChildSelection(child.id, isSelected);
          });
        }
      }

      const addedIds = Array.from(newSelectedIds).filter(
        (id) => !previouslySelectedIds.has(id)
      );
      const removedIds = Array.from(previouslySelectedIds).filter(
        (id) => !newSelectedIds.has(id)
      );

      addedIds.forEach((id) => updateChildSelection(id, true));
      removedIds.forEach((id) => updateChildSelection(id, false));

      setSelectedDevicesIds(Array.from(newSelectedIds));

      onSelectDevices(Array.from(newSelectedIds));
    },
    [itemsMap, selectedDevicesIds, onSelectDevices]
  );

  // Filtra os itens ao mudar o termo de pesquisa
  useEffect(() => {
    const [newFilteredItems, newExpandedIds] = filterItems(
      items,
      searchTerm.toLowerCase()
    );
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
      <p className="treeview-title-text">Filtros</p>
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: 5 }}>
          <SearchBoxContainer onSearch={(value) => setSearchTerm(value)} />
        </div>
        <OverlayTrigger
          placement="top"
          delay={0}
          container={document.body}
          popperConfig={{
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ],
          }}
          overlay={<Tooltip className="custom-tooltip">Atualizar</Tooltip>}
        >
          <CustomOutlineButton
            className="treeview-button"
            icon="bi-arrow-clockwise"
            onClick={() => fetchAllRegisteredUsers()}
            iconSize="1.1em"
          ></CustomOutlineButton>
        </OverlayTrigger>
      </div>
      <Box className="treeViewFlexItem">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CustomSpinner />
          </div>
        ) : (
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
        )}
      </Box>
    </Box>
  );
}
