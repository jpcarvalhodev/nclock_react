import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/PagesStyles.css';

import DataTable, { TableColumn } from 'react-data-table-component';
import { customStyles } from '../components/CustomStylesDataTable';
import { useTerminals } from '../context/TerminalsContext';
import { timePeriodFields } from '../fields/Fields';
import { TimePeriod } from '../types/Types';
import { Col } from 'react-bootstrap';

// Interface para as propriedades do modal
interface CreateModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
}

// Define o componente
export const AddPeriodToTimePlansModal = <T extends Record<string, any>>({ title, open, onClose, onSave }: CreateModalProps<T>) => {
    const { period } = useTerminals();
    const [selectedRows, setSelectedRows] = useState<TimePeriod[]>([]);
    const [clearSelectionToggle, setClearSelectionToggle] = useState(false);

    // Define a função de seleção de linhas
    const handleRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: TimePeriod[];
    }) => {
        setSelectedRows(state.selectedRows);
    };

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define as colunas excluídas
    const excludedColumns = timePeriodFields
        .filter(field =>
            (field.key.includes('Start') || field.key.includes('End'))
        )
        .map(field => field.key);

    // Define as colunas dos dias da semana para o nesting
    const dayColumns = [
        { day: 'monday', label: 'Segunda' },
        { day: 'tuesday', label: 'Terça' },
        { day: 'wednesday', label: 'Quarta' },
        { day: 'thursday', label: 'Quinta' },
        { day: 'friday', label: 'Sexta' },
        { day: 'saturday', label: 'Sábado' },
        { day: 'sunday', label: 'Domingo' },
    ];

    // Define as colunas da tabela
    const columns: TableColumn<TimePeriod>[] = [
        ...timePeriodFields
            .filter(field => !dayColumns.find(dc => field.key.includes(dc.day)) && !excludedColumns.includes(field.key) && field.key !== 'initFlag' && field.key !== 'appId' && field.key !== 'createrName' && field.key !== 'remark')
            .map(field => ({
                name: (
                    <>
                        {field.label}
                    </>
                ),
                selector: (row: TimePeriod) => formatField(row, field.key),
                sortable: true,
            })),
        ...dayColumns.map(({ day, label }) => ({
            name: label,
            selector: (row: TimePeriod) => `${row[`${day}Start1`] || ''} - ${row[`${day}End1`] || ''}`,
            sortable: true,
            cell: (row: TimePeriod) => `${row[`${day}Start1`] || ''} - ${row[`${day}End1`] || ''}`,
            columns: [
                {
                    name: 'Início',
                    selector: (row: TimePeriod) => row[`${day}Start1`] || '',
                    sortable: true,
                    cell: (row: TimePeriod) => row[`${day}Start1`] || '',
                },
                {
                    name: 'Fim',
                    selector: (row: TimePeriod) => row[`${day}End1`] || '',
                    sortable: true,
                    cell: (row: TimePeriod) => row[`${day}End1`] || '',
                },
            ]
        }))
    ];
    function formatField(row: TimePeriod, key: string): any {
        switch (key) {
            case 'initFlag':
                return row[key] ? 'Activo' : 'Inactivo';
            default:
                return row[key];
        }
    }

    // Função para fechar o modal
    const handleClose = () => {
        setClearSelectionToggle((prev) => !prev);
        onClose();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onSave(selectedRows as unknown as T);
        handleClose();
    }

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" dialogClassName="custom-modal" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Col md={12}>
                    <DataTable
                        columns={columns}
                        data={period}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[5, 10]}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={clearSelectionToggle}
                        noDataComponent="Não existem dados disponíveis para exibir."
                        customStyles={customStyles}
                        striped
                    />
                </Col>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={handleClose} >
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={handleSave} >
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};