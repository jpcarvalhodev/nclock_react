import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../css/PagesStyles.css';
import { Row } from 'react-bootstrap';

import { Devices, DevicesDoors, Doors } from '../types/Types';
import DataTable from 'react-data-table-component';
import { customStyles } from '../components/CustomStylesDataTable';
import { TreeViewAC } from '../components/TreeViewAC';

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
    const [formData, setFormData] = useState<T>({} as T);
    const [selectedDevicesIds, setSelectedDevicesIds] = useState<string[]>([]);

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
    const prepareDataForTable = () => {
        return devices.map(device => ({
            deviceId: device.zktecoDeviceID,
            deviceName: device.deviceName,
            doors: doors.filter(door => door.devId === device.zktecoDeviceID)
        }));
    };

    // Define as colunas da tabela
    const columns = [
        {
            name: 'Equipamentos',
            selector: (row: DevicesDoors) => row.deviceName || '',
            cell: (row: DevicesDoors) => (
                <TreeViewAC onSelectDevices={handleSelectFromTreeView} devices={devices} doors={doors} />
            ),
            grow: 8,
            ignoreRowClick: true,
            allowOverflow: true,
            wrap: false,
        }
    ];

    // Função para fechar o modal
    const handleClose = () => {
        onClose();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="lg" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Form style={{ marginTop: 10, marginBottom: 10 }}>
                    <Row>
                        <DataTable
                            columns={columns}
                            data={prepareDataForTable()}
                            pagination
                            paginationComponentOptions={paginationOptions}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15]}
                            noDataComponent="Não existem dados disponíveis para exibir."
                            customStyles={getCustomStyles()}
                            striped
                        />
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleSave}>
                    Adicionar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};