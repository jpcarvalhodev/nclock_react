import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/PagesStyles.css';
import { fetchWithAuth } from '../components/FetchWithAuth';

interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    showCodeInsteadOfName?: boolean;
}

interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
}

export const CreateModalGeneric = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});

    useEffect(() => {
        const fetchDropdownOptions = async (field: FieldConfig) => {
            if (field.optionsUrl) {
                const response = await fetchWithAuth(field.optionsUrl);
                if (response.ok) {
                    const data = await response.json();
                    setDropdownData(prev => ({ ...prev, [field.key]: data }));
                }
            }
        };

        fields.forEach(field => {
            if (field.type === 'dropdown') {
                fetchDropdownOptions(field);
            }
        });
    }, [fields]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <Modal show={open} onHide={onClose} dialogClassName="modal-scrollable">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <form>
                    {fields.map(field => (
                        <div className="form-group" key={field.key}>
                            <label htmlFor={field.key}>{field.label}:</label>
                            {field.type === 'dropdown' ? (
                                <select
                                    className="form-control"
                                    id={field.key}
                                    name={field.key}
                                    value={formData[field.key] || ''}
                                    onChange={handleChange}>
                                    {dropdownData[field.key]?.map((option, index) => (
                                        <option key={option.id || index} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    className="form-control"
                                    id={field.key}
                                    name={field.key}
                                    value={formData[field.key] || ''}
                                    onChange={handleChange}
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
                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};