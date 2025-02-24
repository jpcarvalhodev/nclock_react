import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import "../css/TreeView.css";
import { TreeViewBaseItem } from "@mui/x-tree-view";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { useEntity } from "../context/EntityContext";

import { CustomOutlineButton } from "./CustomOutlineButton";
import { SearchBoxContainer } from "./SearchBoxContainer";
import { CustomSpinner } from "./CustomSpinner";

// Define a interface para as propriedades do componente TreeViewData
interface TreeViewDataLoginProps {
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
export function TreeViewDataLogin({ onSelectDevices }: TreeViewDataLoginProps) {
  const { loginLogs, fetchAllLoginLogs } = useEntity();
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>(["nidgroup"]);
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const selectionChangedRef = { current: false };
  const [loading, setLoading] = useState(false);

  // Busca os dados dos dispositivos e mapeia para os itens da árvore
  const memoizedTreeItems = useMemo(() => {
    const usersMap = new Map();

    loginLogs.forEach((log) => {
      const userName = log.userName || "Sem Nome";
      if (!usersMap.has(userName)) {
        usersMap.set(userName, {
          id: `user-${userName}` || "Sem ID",
          label: userName || "Sem Nome",
          children: [],
        });
      }
      usersMap.get(userName).children.push({
        id: log.taskId || "Sem ID",
        createdDate: log.createdDate,
        label: new Date(log.createdDate).toLocaleString() || "Sem Data",
        children: [],
      });
    });

    const sortedUsers = Array.from(usersMap.values())
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((user) => ({
        ...user,
        children: user.children.sort(
          (
            a: { createdDate: string | number | Date },
            b: { createdDate: string | number | Date }
          ) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        ),
      }));

    const treeItems = [
      {
        id: "nidgroup",
        label: "NIDGROUP",
        children: [
          {
            id: "utilizadores",
            label: "UTILIZADORES",
            children: sortedUsers,
          },
        ],
      },
    ];
    return treeItems;
  }, [loginLogs]);

  // Atualiza os itens da árvore
  useEffect(() => {
    setItems(memoizedTreeItems);
    setFilteredItems(memoizedTreeItems);
    const allExpandableIds = collectAllExpandableItemIds(memoizedTreeItems);
    setExpandedIds(["nidgroup", "utilizadores"]);
  }, [memoizedTreeItems]);

  // Atualiza o estado de carregamento ao expandir os itens
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (itemsMap.size > 0) {
      clearTimeout(timeout);
      setLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [memoizedTreeItems]);

  // Função para lidar com a expansão dos itens
  const handleToggle = (event: SyntheticEvent, nodeIds: string[]) => {
    setExpandedIds(nodeIds);
  };

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
  const handleSelectedItemsChange = (e: SyntheticEvent, itemIds: string[]) => {
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
  };

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
      setExpandedIds(["nidgroup", "utilizadores"]);
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
            onClick={() => fetchAllLoginLogs()}
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
