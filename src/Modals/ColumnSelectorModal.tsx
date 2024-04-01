import React from 'react';
import { Modal, Button, FormCheck } from 'react-bootstrap';

interface ColumnSelectorModalProps {
    columns: string[];
    selectedColumns: string[];
    onClose: () => void;
    onColumnToggle: (columnName: string) => void;
    onResetColumns: () => void;
}

export const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = ({
    columns,
    selectedColumns,
    onClose,
    onColumnToggle,
    onResetColumns,
}) => {
    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Select Columns</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {columns.map(columnName => (
                    <FormCheck 
                        key={columnName}
                        type="checkbox"
                        label={columnName}
                        checked={selectedColumns.includes(columnName)}
                        onChange={() => onColumnToggle(columnName)}
                    />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onResetColumns}>Reset</Button>
                <Button variant="primary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};