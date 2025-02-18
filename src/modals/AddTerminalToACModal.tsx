import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, Row } from "react-bootstrap";

import DataTable from "react-data-table-component";
import { customStyles } from "../components/CustomStylesDataTable";
import { TreeViewAC } from "../components/TreeViewAC";
import { useTerminals } from "../context/TerminalsContext";
import {
  Devices,
  DevicesDoors,
  Doors,
  PlanoAcessoDispositivos,
} from "../types/Types";

// Define a interface para os itens de campo
type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

// Interface para as propriedades do modal
interface CreateModalProps<T> {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  devices: Devices[];
  doors: Doors[];
}

// Aplica margem ao estilo personalizado
const getCustomStyles = () => ({
  ...customStyles,
  headCells: {
    style: {
      ...customStyles.headCells?.style,
      marginLeft: "28px",
    },
  },
});

// Define o componente
export const AddTerminalToACModal = <T extends Record<string, any>>({
  title,
  open,
  onClose,
  onSave,
  devices,
  doors,
}: CreateModalProps<T>) => {
  const { timePlans } = useTerminals();
  const [formData, setFormData] = useState<PlanoAcessoDispositivos>(
    {} as PlanoAcessoDispositivos
  );
  const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
  const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
  const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});

  // Atualiza os dados do dropdown ao abrir o modal
  useEffect(() => {
    if (open) {
      fetchDropdownOptions();
    }
  }, [open]);

  // Função para buscar as opções do dropdown
  const fetchDropdownOptions = async () => {
    try {
      setDropdownData({
        timePlanId: timePlans,
      });
      if (timePlans.length > 0) {
        setFormData((prevState) => ({
          ...prevState,
          idPlanoHorario: timePlans[0].id,
          nomePlanoHorario: timePlans[0].nome || "",
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar os dados", error);
    }
  };

  // Função para lidar com a mudança do dropdown
  const handleDropdownChange = (
    key: string,
    e: React.ChangeEvent<FormControlElement>
  ) => {
    const { value } = e.target;
    const selectedOption = dropdownData[key]?.find((option: any) => {
      switch (key) {
        case "timePlanId":
          return option.id === value;
        default:
          return false;
      }
    });
    if (selectedOption) {
      setFormData((prevState) => ({
        ...prevState,
        idPlanoHorario: value,
        nomePlanoHorario: selectedOption.nome || "",
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  // Define as opções de paginação de EN para PT
  const paginationOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
  };

  // Define a seleção da árvore
  const handleSelectFromTreeView = (selectedIds: string[]) => {
    setSelectedDevicesIds(selectedIds);
  };

  // Prepara os dados para a tabela
  function prepareDataForTable() {
    return [
      {
        deviceId: "",
        deviceName: "",
        doors: [],
        isTreeViewRow: true,
      },
    ];
  }

  // Define as colunas da tabela
  const columns = [
    {
      name: "Equipamentos",
      cell: (row: DevicesDoors & { isTreeViewRow?: boolean }) => {
        if (row.isTreeViewRow) {
          return (
            <TreeViewAC
              onSelectDevices={handleSelectFromTreeView}
              devices={devices}
              doors={doors}
            />
          );
        }
        return row.deviceName || "";
      },
      ignoreRowClick: true,
      wrap: false,
    },
  ];

  // Função para fechar o modal
  const handleClose = () => {
    setClearSelectionToggle((prev) => !prev);
    setFormData({} as PlanoAcessoDispositivos);
    onClose();
  };

  // Função para salvar os dados
  const handleSave = () => {
    const deviceIndexMap = new Map<number, string>();

    const deviceDoorsMap = new Map<number, Set<string>>();

    for (const selectedId of selectedDevicesIds) {
      if (selectedId.startsWith("device-")) {
        const match = selectedId.match(/^device-(\d+)-deviceid-(.+)$/);
        if (match) {
          const index = Number(match[1]);
          const deviceGUID = match[2];
          deviceIndexMap.set(index, deviceGUID);

          if (!deviceDoorsMap.has(index)) {
            deviceDoorsMap.set(index, new Set());
          }
        }
      } else if (selectedId.startsWith("devices-")) {
        const match = selectedId.match(/^devices-(\d+)-door-(.+)$/);
        if (match) {
          const index = Number(match[1]);
          const doorGUID = match[2];
          if (!deviceDoorsMap.has(index)) {
            deviceDoorsMap.set(index, new Set());
          }
          deviceDoorsMap.get(index)!.add(doorGUID);
        }
      }
    }

    const dataToSave: Array<{
      idTerminal: string;
      idPorta: string;
      idPlanoHorario: string;
      nomePlanoHorario: string;
    }> = [];

    for (const [devIndex, deviceGUID] of deviceIndexMap.entries()) {
      const doorSet = deviceDoorsMap.get(devIndex) ?? new Set<string>();

      for (const doorId of doorSet) {
        dataToSave.push({
          idTerminal: deviceGUID,
          idPorta: doorId,
          idPlanoHorario: formData.idPlanoHorario,
          nomePlanoHorario: formData.nomePlanoHorario,
        });
      }
    }

    onSave(dataToSave as unknown as T);
    handleClose();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      size="lg"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Form style={{ marginTop: 10, marginBottom: 10 }}>
          <Col md={4}>
            <Form.Group controlId="formIdPlanoHorario">
              <Form.Label>Plano de Horário</Form.Label>
              <Form.Control
                as="select"
                className="custom-input-height custom-select-font-size"
                value={formData.idPlanoHorario || ""}
                onChange={(e) => handleDropdownChange("timePlanId", e)}
              >
                {dropdownData["timePlanId"]?.map((option: any) => {
                  let optionId = option.id;
                  let optionName = option.nome;
                  return (
                    <option key={optionId} value={optionId}>
                      {optionName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Row style={{ marginTop: 10 }}>
            <DataTable
              columns={columns}
              data={prepareDataForTable()}
              clearSelectedRows={clearSelectionToggle}
              pagination
              paginationComponentOptions={paginationOptions}
              noDataComponent="Não existem dados disponíveis para exibir."
              customStyles={getCustomStyles()}
              striped
              responsive
              persistTableHead={true}
            />
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleClose}
        >
          Fechar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleSave}
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
