import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import "../css/TreeView.css";
import { TreeViewBaseItem } from "@mui/x-tree-view";

import { Devices, DevicesDoors, Doors } from "../types/Types";
import { CustomSpinner } from "./CustomSpinner";

// Define a interface para as propriedades do componente TreeViewData
interface TreeViewACProps {
  onSelectDevices: (selectedDevices: string[]) => void;
  devices: DevicesDoors;
  doors: Doors[];
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
export function TreeViewAC({
  onSelectDevices,
  devices,
  doors,
}: TreeViewACProps) {
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>(["nidgroup"]);
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const selectionChangedRef = { current: false };

  // Atualiza a árvore de itens ao receber os dados dos dispositivos
  const memoizedTreeItems = useMemo(() => {
    const buildDeviceTree = devices
      .sort((a: Devices, b: Devices) => a.deviceNumber - b.deviceNumber)
      .map((device: Devices, deviceIndex: number) => {
        const deviceDoors = doors
          .filter((d) => d.devId === device.zktecoDeviceID)
          .sort((a, b) => a.doorNo - b.doorNo)
          .map((d, doorIndex) => ({
            id: `devices-${deviceIndex}-door-${d.id}`,
            label: d.name || "Sem Nome",
          }));

        if (deviceDoors.length === 0) return null;

        return {
          id: `device-${deviceIndex}-deviceid-${device.zktecoDeviceID}`,
          label: device.deviceName || "Sem Nome",
          children: deviceDoors,
        };
      })
      .filter(Boolean);

    const treeItems = [
      {
        id: "equipamento",
        label: "EQUIPAMENTO",
        children: buildDeviceTree,
      },
    ];
    return treeItems;
  }, [devices, doors]);

  // Atualiza os itens da árvore
  useEffect(() => {
    setItems(memoizedTreeItems);
    setFilteredItems(memoizedTreeItems);
    const allExpandableIds = collectAllExpandableItemIds(memoizedTreeItems);
    setExpandedIds(allExpandableIds);
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

    function updateParentSelection(itemId: string) {
      const item = itemsMap.get(itemId);
      if (item?.id.startsWith("device-")) {
        newSelectedIds.add(item.id);
      } else if (item) {
        const parent = Array.from(itemsMap.values()).find((parent) =>
          parent.children?.some((child) => child.id === item.id)
        );
        if (parent) {
          newSelectedIds.add(parent.id);
        }
      }
    }

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

    addedIds.forEach((id) => {
      updateChildSelection(id, true);
      updateParentSelection(id);
    });
    removedIds.forEach((id) => updateChildSelection(id, false));

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
