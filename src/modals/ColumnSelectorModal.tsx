import React, { useEffect, useState } from 'react';
import { Button, FormCheck, Modal } from 'react-bootstrap';

// Define a interface para as propriedades do componente ColumnSelectorModal
interface ColumnSelectorModalProps {
    columns: { label: string; key: string; isBoolean?: boolean }[];
    selectedColumns: string[];
    onClose: () => void;
    onColumnToggle: (columnName: string) => void;
    onResetColumns: () => void;
    onSelectAllColumns: (allColumnNames: string[]) => void;
}

// Define o componente
export const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = ({
    columns,
    selectedColumns,
    onClose,
    onColumnToggle,
    onResetColumns,
    onSelectAllColumns,
}) => {
    const [selectAll, setSelectAll] = useState(false);

    // Atualiza o estado de seleção de todas as colunas
    useEffect(() => {
        setSelectAll(columns.length === selectedColumns.length);
    }, [columns, selectedColumns]);

    // Função para alternar a seleção de todas as colunas
    const handleSelectAllToggle = () => {
        if (selectAll) {
            onResetColumns();
        } else {
            const allColumnKeys = columns.map(({ key }) => key);
            onSelectAllColumns(allColumnKeys);
        }
        setSelectAll(!selectAll);
    };

    // Filtra as colunas para remover a coluna de fotos
    const filteredColumns = columns.filter((column) => column.key !== 'photo');

    return (
        <Modal show={true} onHide={onClose} backdrop="static" centered size='xl'>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>Selecionar Colunas</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 15 }}>
                    <FormCheck
                        label="Selecionar Todas"
                        checked={selectAll}
                        onChange={handleSelectAllToggle}
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {filteredColumns.map(({ label, key }) => (
                        <FormCheck
                            key={key}
                            type="checkbox"
                            label={label}
                            checked={selectedColumns.includes(key)}
                            onChange={() => onColumnToggle(key)}
                        />
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={onResetColumns}>Reset</Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={onClose}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
};