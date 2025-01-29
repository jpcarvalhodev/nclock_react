import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../css/PagesStyles.css';
import { Col, Row } from 'react-bootstrap';

import { Devices, DevicesDoors, Doors, PlanoAcessoDispositivos } from '../types/Types';
import DataTable from 'react-data-table-component';
import { customStyles } from '../components/CustomStylesDataTable';
import { TreeViewAC } from '../components/TreeViewAC';
import { useTerminals } from '../context/TerminalsContext';
import { id } from 'date-fns/locale';
import { toast } from 'react-toastify';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

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
            marginLeft: '28px'
        },
    },
});

// Define o componente
export const AddTerminalToACModal = <T extends Record<string, any>>({ title, open, onClose, onSave, devices, doors }: CreateModalProps<T>) => {
    const { fetchTimePlans } = useTerminals();
    const [formData, setFormData] = useState<PlanoAcessoDispositivos>({} as PlanoAcessoDispositivos);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // Atualiza os dados do dropdown ao abrir o modal
    useEffect(() => {
        if (open) {
            fetchDropdownOptions();
        }
    }, [open]);

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const timePlan = await fetchTimePlans();
            setDropdownData({
                timePlanId: timePlan,
            });
        } catch (error) {
            console.error("Erro ao buscar os dados", error);
        }
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'timePlanId':
                    return option.id === value;
                default:
                    return false;
            }
        });
        if (selectedOption) {
            setFormData(prevState => ({
                ...prevState,
                idPlanoHorario: value,
                nomePlanoHorario: selectedOption.nome || '',
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a seleção da árvore
    const handleSelectFromTreeView = (selectedIds: string[]) => {
        setSelectedDevicesIds(selectedIds);
    };

    // Prepara os dados para a tabela
    function prepareDataForTable() {
        return [{
            deviceId: '',
            deviceName: '',
            doors: [],
            isTreeViewRow: true
        }];
    }

    // Define as colunas da tabela
    const columns = [
        {

            name: 'Equipamentos',
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
                return row.deviceName || '';
            },
            ignoreRowClick: true,
            allowOverflow: true,
            wrap: false,
        }
    ];

    // Função para fechar o modal
    const handleClose = () => {
        setClearSelectionToggle((prev) => !prev);
        setFormData({} as PlanoAcessoDispositivos);
        onClose();
    }

    // Função para salvar os dados
    const handleSave = () => {
        if (!formData.idPlanoHorario) {
            setShowValidationErrors(true);
            toast.warn('Selecione um plano de horário primeiro.');
            return;
        }
        const idTerminals = selectedDevicesIds
            .filter(id => id.includes("deviceid-"))
            .map(id => id.split("deviceid-")[1]);

        const idDoors = selectedDevicesIds
            .filter(id => id.includes("door-"))
            .map(id => id.split("door-")[1]);

        const dataToSave = [];
        for (const terminalID of idTerminals) {
            for (const doorID of idDoors) {
                dataToSave.push({
                    idTerminal: terminalID,
                    idPorta: doorID,
                    idPlanoHorario: formData.idPlanoHorario,
                    nomePlanoHorario: formData.nomePlanoHorario,
                });
            }
        }
        onSave(dataToSave as unknown as T);
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" size="lg" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Form style={{ marginTop: 10, marginBottom: 10 }}>
                    <Col md={4}>
                        <Form.Group controlId="formIdPlanoHorario">
                            <Form.Label>Plano de Horário</Form.Label>
                            <Form.Control
                                as="select"
                                className={`custom-input-height custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                value={formData.idPlanoHorario || ''}
                                onChange={(e) => handleDropdownChange('timePlanId', e)}
                            >
                                <option value="">Selecione...</option>
                                {dropdownData['timePlanId']?.map((option: any) => {
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
                        />
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleClose}>
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleSave}>
                    Adicionar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};