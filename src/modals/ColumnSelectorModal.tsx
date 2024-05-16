import React, { useEffect, useState } from 'react';
import { Modal, Button, FormCheck } from 'react-bootstrap';

interface ColumnSelectorModalProps {
    columns: { label: string; key: string; isBoolean?: boolean }[];
    selectedColumns: string[];
    onClose: () => void;
    onColumnToggle: (columnName: string) => void;
    onResetColumns: () => void;
    onSelectAllColumns: (allColumnNames: string[]) => void;
}

export const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = ({
    columns,
    selectedColumns,
    onClose,
    onColumnToggle,
    onResetColumns,
    onSelectAllColumns,
}) => {
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        setSelectAll(columns.length === selectedColumns.length);
    }, [columns, selectedColumns]);

    const handleSelectAllToggle = () => {
        if (selectAll) {
            onResetColumns();
        } else {
            const allColumnKeys = columns.map(({ key }) => key);
            onSelectAllColumns(allColumnKeys);
        }
        setSelectAll(!selectAll);
    };

    const filteredColumns = columns.filter((column) => column.key !== 'photo');

    return (
        <Modal show={true} onHide={onClose} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Selecionar Colunas</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div style={{ textAlign: 'center', marginBottom: 15 }}>
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
            <Modal.Footer>
                <Button variant="secondary" onClick={onResetColumns}>Resetar</Button>
                <Button onClick={onClose}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
};