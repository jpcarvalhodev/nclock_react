import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Define a interface Field
interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define a propriedade do componente
interface UpdateModalProps<T extends Entity> {
    open: boolean;
    onClose: () => void;
    onUpdate: (entity: T) => Promise<void>;
    entity: T;
    fields: Field[];
    title: string;
}

// Exporta o componente
export const UpdateModalCatProfTypes = <T extends Entity>({ open, onClose, onUpdate, entity, fields, title }: UpdateModalProps<T>) => {
    const [formData, setFormData] = useState<T>({ ...entity });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Atualiza o estado do formulário com as validações
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Função para lidar com a mudança de entrada
    const handleInputChange = (key: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: parsedValue
        }));
    };

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSubmit();
    };

    // Função para submeter o formulário
    const handleSubmit = async () => {
        await onUpdate(formData);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} dialogClassName="modal-scrollable">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <form className="form-grid">
                    {fields.map(field => (
                        <div className="form-group" key={field.key}>
                            <label htmlFor={field.key}>
                                {field.label}
                                {field.required && (
                                    <OverlayTrigger placement="right" overlay={<Tooltip id={`tooltip-${field.key}`}>Campo obrigatório</Tooltip>}>
                                        <span style={{ color: 'red' }}> *</span>
                                    </OverlayTrigger>
                                )}
                            </label>
                            <input
                                type={field.type}
                                className="custom-input-height form-control custom-select-font-size"
                                id={field.key}
                                name={field.key}
                                value={formData[field.key] || ''}
                                onChange={e => handleInputChange(field.key, e)}
                            />
                            {errors[field.key] && <div style={{ color: 'red', fontSize: 'small' }}>{errors[field.key]}</div>}
                        </div>
                    ))}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Fechar</Button>
                <Button variant="outline-primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};