import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetchWithAuth } from '../components/FetchWithAuth';

export interface Entity {
    id: string;
    [key: string]: any;
}

interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    showCodeInsteadOfName?: boolean;
}

interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
}

export const UpdateModalGeneric = <T extends Entity>({ open, onClose, onUpdate, entity, fields, title }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});

    useEffect(() => {
        setFormData(entity);
        fields.forEach(field => {
            if (field.type === 'dropdown' && field.optionsUrl) {
                fetchDropdownOptions(field);
            }
        });
    }, [entity, fields]);

    const fetchDropdownOptions = async (field: Field) => {
        if (field.optionsUrl) {
            const response = await fetchWithAuth(field.optionsUrl);
            if (response.ok) {
                const data = await response.json();
                setDropdownData(prev => ({ ...prev, [field.key]: data }));
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
        const value = e.target.value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: value
        }));
    };

    const handleSubmit = async () => {
        await onUpdate(formData);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <form>
                    {fields.map(field => (
                        <div key={field.key} className="mb-3">
                            <label className="form-label">{field.label}</label>
                            {field.type === 'dropdown' ? (
                                <select
                                    className="form-control"
                                    value={formData[field.key] ?? ''}
                                    onChange={(e) => handleInputChange(e, field.key)}>
                                    {dropdownData[field.key]?.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {field.showCodeInsteadOfName ? option.code : option.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    className="form-control"
                                    value={formData[field.key] ?? ''}
                                    onChange={(e) => handleInputChange(e, field.key)}
                                    required={field.required}
                                />
                            )}
                        </div>
                    ))}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};