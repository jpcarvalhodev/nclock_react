import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "../css/TreeView.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { usePersons } from "../context/PersonsContext";
import { Department, Employee, Group } from "../types/Types";

import { TreeViewBaseItem } from "@mui/x-tree-view/models/items";

import { CustomOutlineButton } from "./CustomOutlineButton";
import { SearchBoxContainer } from "./SearchBoxContainer";
import { CustomSpinner } from "./CustomSpinner";

// Define a interface para as propriedades do componente TreeViewData
interface TreeViewNaccessVisitorsDataProps {
  onSelectEmployees: (employeeIds: string[]) => void;
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
export function TreeViewNaccessVisitorsData({
  onSelectEmployees,
}: TreeViewNaccessVisitorsDataProps) {
  const { data, fetchAllData } = usePersons();
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<TreeViewBaseItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>(["nidgroup"]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const selectionChangedRef = { current: false };
  const [loading, setLoading] = useState(false);

  // Define e mapeia os dados para os itens da árvore
  const memoizedTreeItems = useMemo(() => {
    const { departments, groups } = data;
    const allVisitors = data.employees.filter(
      (emp) => emp.type === "Visitante"
    );

    const activeVisitors = allVisitors.filter((v) => v.status === true);
    const inactiveVisitors = allVisitors.filter((v) => v.status === false);

    const departmentMapActive = new Map();
    const deptIdToCodeMapActive = new Map();

    departments.forEach((dept: Department) => {
      deptIdToCodeMapActive.set(dept.departmentID, dept.code);
      departmentMapActive.set(dept.code, {
        ...dept,
        children: [],
        employees: [],
      });
    });

    activeVisitors.forEach((emp: Employee) => {
      if (emp.departmentId && deptIdToCodeMapActive.has(emp.departmentId)) {
        const deptCode = deptIdToCodeMapActive.get(emp.departmentId);
        if (departmentMapActive.has(deptCode)) {
          departmentMapActive.get(deptCode).employees.push({
            id: `emp-active-${emp.employeeID}`,
            label: `${emp.enrollNumber} - ${emp.shortName}`,
          });
        }
      }
    });

    departments.forEach((dept: Department) => {
      if (dept.paiId && departmentMapActive.has(dept.paiId)) {
        departmentMapActive
          .get(dept.paiId)
          .children.push(departmentMapActive.get(dept.code));
      }
    });

    const topDepartmentsActive = Array.from(
      departmentMapActive.values()
    ).filter((deptVal: any) => !deptVal.paiId);

    const buildDepartmentTreeActive = (dept: Department): TreeViewBaseItem => ({
      id: `department-active-${dept.departmentID}`,
      label: dept.name || "Sem Nome",
      children: [
        ...dept.children.map(buildDepartmentTreeActive),
        ...activeVisitors
          .filter((emp) => emp.departmentId === dept.departmentID)
          .sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber))
          .map((emp) => ({
            id: `dept-active-${dept.departmentID}-emp-${emp.employeeID}`,
            label: `${emp.enrollNumber} - ${emp.shortName}`,
          })),
      ],
    });

    const departmentItemsActive = topDepartmentsActive
      .sort((a, b) => Number(a.code) - Number(b.code))
      .map(buildDepartmentTreeActive);

    const unassignedDeptActive = activeVisitors.filter(
      (emp) => emp.departmentId === null
    );
    const unassignedDepartmentItemsActive = unassignedDeptActive.map((emp) => ({
      id: `empd-active-${emp.employeeID}`,
      label: `${emp.enrollNumber} - ${emp.shortName}`,
    }));

    const groupItemsActive = groups
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((group: Group) => ({
        id: `group-active-${group.groupID}`,
        label: group.name || "Sem Nome",
        children: activeVisitors
          .filter((emp) => emp.groupId === group.groupID)
          .sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber))
          .map((emp: Employee) => ({
            id: `group-active-${group.groupID}-emp-${emp.employeeID}`,
            label: `${emp.enrollNumber} - ${emp.shortName}`,
          })),
      }));

    const unassignedGroupActive = activeVisitors.filter(
      (emp) => emp.groupId === null
    );
    const unassignedGroupItemsActive = unassignedGroupActive.map((emp) => ({
      id: `empg-active-${emp.employeeID}`,
      label: `${emp.enrollNumber} - ${emp.shortName}`,
    }));

    const departmentMapInactive = new Map();
    const deptIdToCodeMapInactive = new Map();

    departments.forEach((dept: Department) => {
      deptIdToCodeMapInactive.set(dept.departmentID, dept.code);
      departmentMapInactive.set(dept.code, {
        ...dept,
        children: [],
        employees: [],
      });
    });

    inactiveVisitors.forEach((emp: Employee) => {
      if (emp.departmentId && deptIdToCodeMapInactive.has(emp.departmentId)) {
        const deptCode = deptIdToCodeMapInactive.get(emp.departmentId);
        if (departmentMapInactive.has(deptCode)) {
          departmentMapInactive.get(deptCode).employees.push({
            id: `emp-inactive-${emp.employeeID}`,
            label: `${emp.enrollNumber} - ${emp.shortName}`,
          });
        }
      }
    });

    departments.forEach((dept: Department) => {
      if (dept.paiId && departmentMapInactive.has(dept.paiId)) {
        departmentMapInactive
          .get(dept.paiId)
          .children.push(departmentMapInactive.get(dept.code));
      }
    });

    const topDepartmentsInactive = Array.from(
      departmentMapInactive.values()
    ).filter((deptVal: any) => !deptVal.paiId);

    const buildDepartmentTreeInactive = (
      dept: Department
    ): TreeViewBaseItem => ({
      id: `department-inactive-${dept.departmentID}`,
      label: dept.name || "Sem Nome",
      children: [
        ...dept.children.map(buildDepartmentTreeInactive),
        ...inactiveVisitors
          .filter((emp) => emp.departmentId === dept.departmentID)
          .sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber))
          .map((emp) => ({
            id: `dept-inactive-${dept.departmentID}-emp-${emp.employeeID}`,
            label: `${emp.enrollNumber} - ${emp.shortName}`,
          })),
      ],
    });

    const departmentItemsInactive = topDepartmentsInactive
      .sort((a, b) => Number(a.code) - Number(b.code))
      .map(buildDepartmentTreeInactive);

    const unassignedDeptInactive = inactiveVisitors.filter(
      (emp) => emp.departmentId === null
    );
    const unassignedDepartmentItemsInactive = unassignedDeptInactive.map(
      (emp) => ({
        id: `empd-inactive-${emp.employeeID}`,
        label: `${emp.enrollNumber} - ${emp.shortName}`,
      })
    );

    const groupItemsInactive = groups
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((group: Group) => ({
        id: `group-inactive-${group.groupID}`,
        label: group.name || "Sem Nome",
        children: inactiveVisitors
          .filter((emp) => emp.groupId === group.groupID)
          .sort((a, b) => Number(a.enrollNumber) - Number(b.enrollNumber))
          .map((emp: Employee) => ({
            id: `group-inactive-${group.groupID}-emp-${emp.employeeID}`,
            label: `${emp.enrollNumber} - ${emp.shortName}`,
          })),
      }));

    const unassignedGroupInactive = inactiveVisitors.filter(
      (emp) => emp.groupId === null
    );
    const unassignedGroupItemsInactive = unassignedGroupInactive.map((emp) => ({
      id: `empg-inactive-${emp.employeeID}`,
      label: `${emp.enrollNumber} - ${emp.shortName}`,
    }));

    const treeItems: TreeViewBaseItem[] = [
      {
        id: "nidgroup",
        label: "NIDGROUP",
        children: [
          {
            id: "visitantes-ativos",
            label: `ACTIVOS (${activeVisitors.length})`,
            children: [
              {
                id: "departments-active",
                label: "DEPARTAMENTOS",
                children: departmentItemsActive,
              },
              ...(unassignedDepartmentItemsActive.length > 0
                ? [
                    {
                      id: "unassignedDept-active",
                      label: "SEM DEPARTAMENTO",
                      children: unassignedDepartmentItemsActive,
                    },
                  ]
                : []),
              {
                id: "groups-active",
                label: "GRUPOS",
                children: groupItemsActive,
              },
              ...(unassignedGroupItemsActive.length > 0
                ? [
                    {
                      id: "unassignedGroup-active",
                      label: "SEM GRUPO",
                      children: unassignedGroupItemsActive,
                    },
                  ]
                : []),
            ],
          },
          {
            id: "visitantes-inativos",
            label: `INACTIVOS (${inactiveVisitors.length})`,
            children: [
              {
                id: "departments-inactive",
                label: "DEPARTAMENTOS",
                children: departmentItemsInactive,
              },
              ...(unassignedDepartmentItemsInactive.length > 0
                ? [
                    {
                      id: "unassignedDept-inactive",
                      label: "SEM DEPARTAMENTO",
                      children: unassignedDepartmentItemsInactive,
                    },
                  ]
                : []),
              {
                id: "groups-inactive",
                label: "GRUPOS",
                children: groupItemsInactive,
              },
              ...(unassignedGroupItemsInactive.length > 0
                ? [
                    {
                      id: "unassignedGroup-inactive",
                      label: "SEM GRUPO",
                      children: unassignedGroupItemsInactive,
                    },
                  ]
                : []),
            ],
          },
        ],
      },
    ];

    return treeItems;
  }, [data]);

  // Atualiza os itens da árvore ao mudar os dados
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
      const previouslySelectedIds = new Set(selectedEmployeeIds);

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

      setSelectedEmployeeIds(Array.from(newSelectedIds));

      const employeeIds = Array.from(newSelectedIds)
        .filter((id) => id.includes("emp") || id.includes("-emp-"))
        .map((id) => {
          if (id.includes("-emp-")) {
            return id.substring(id.lastIndexOf("-emp-") + 5);
          } else if (id.startsWith("unassigned-empdept-")) {
            return id.substring(19);
          } else if (id.startsWith("unassigned-empgrp-")) {
            return id.substring(18);
          } else if (id.startsWith("emp-")) {
            return id.substring(4);
          } else if (id.startsWith("empd-")) {
            return id.substring(5);
          } else if (id.startsWith("empg-")) {
            return id.substring(5);
          }
          return null;
        })
        .filter((id) => id !== null);

      onSelectEmployees(employeeIds as string[]);
    },
    [itemsMap, selectedEmployeeIds, onSelectEmployees]
  );

  // Atualiza a referência de mudança de seleção
  useEffect(() => {
    if (selectionChangedRef.current) {
      selectionChangedRef.current = false;
    }
  }, [selectedEmployeeIds]);

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
            onClick={() => fetchAllData()}
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
            multiSelect
            checkboxSelection
            items={filteredItems}
            getItemId={(item: TreeViewBaseItem) => item.id}
            onSelectedItemsChange={handleSelectedItemsChange}
            selectedItems={selectedEmployeeIds}
            expandedItems={expandedIds}
            onExpandedItemsChange={handleToggle}
          />
        )}
      </Box>
    </Box>
  );
}
