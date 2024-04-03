import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
}

interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

export const CreateModal = <T extends Record<string, string | number>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(formData as T);
    };

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    {fields.map(field => (
                        <div className="form-group" key={field.key}>
                            <label htmlFor={field.key}>{field.label}:</label>
                            <input
                                type={field.type}
                                className="form-control"
                                id={field.key}
                                name={field.key}
                                value={formData[field.key] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
