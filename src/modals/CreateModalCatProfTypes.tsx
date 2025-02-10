import { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';

import { usePersons } from '../context/PersonsContext';

// Define a interface para as propriedades do componente FieldConfig
interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define a interface para as propriedades do componente CreateModalCatProf
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: FieldConfig[];
    initialValues: Partial<T>;
    entityType: 'categorias' | 'profissões' | 'tipos';
}

// Define a interface para os itens de código
interface CodeItem {
    code?: number;
    order?: number;
}

// Define o componente
export const CreateModalCatProfTypes = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues, entityType }: Props<T>) => {
    const { categories, professions, dataEE } = usePersons();
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    // Usa useEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, boolean> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                valid = false;
            }
            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        validateForm();
    }, [formData, fields]);

    // Função para validar o formulário
    const validateForm = () => {
        if (!showValidationErrors) return true;
        let newErrors: Record<string, boolean> = {};
        let isValid = true;

        fields.forEach((field) => {
            const fieldValue = formData[field.key];
            if (field.required && !fieldValue) {
                isValid = false;
                newErrors[field.key] = true;
            } else {
                newErrors[field.key] = false;
            }
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
        return isValid;
    };

    // Função para buscar os dados de categoria, profissão ou tipo
    useEffect(() => {
        if (open) {
            let newFormData = { ...initialValues };

            let data: CodeItem[] | undefined;
            let requiresNextCode = false;
            let requiresNextOrder = false;

            switch (entityType) {
                case 'categorias':
                    data = categories;
                    requiresNextCode = true;
                    break;
                case 'profissões':
                    data = professions;
                    requiresNextCode = true;
                    break;
                case 'tipos':
                    newFormData = { ...newFormData, dateInserted: new Date().toISOString().slice(0, 16) };
                    data = dataEE?.externalEntityTypes;
                    requiresNextOrder = true;
                    break;
                default:
                    console.error(`Tipo de entidade '${entityType}' não existe.`);
                    break;
            }

            if (data && Array.isArray(data)) {
                if (requiresNextCode) {
                    const maxCode = data.reduce(
                        (max: number, item: CodeItem) => Math.max(max, item.code ?? 0),
                        0
                    ) + 1;
                    (newFormData as any).code = maxCode;
                }
                if (requiresNextOrder) {
                    const maxOrder = data.reduce(
                        (max: number, item: CodeItem) => Math.max(max, item.order ?? 0),
                        0
                    ) + 1;
                    (newFormData as any).order = maxOrder;
                }
            }

            setFormData(newFormData);
        } else {
            setFormData({});
        }
    }, [open, initialValues, categories, professions, dataEE, entityType]);

    // Função para lidar com o fecho
    const handleClose = () => {
        setFormData({});
        setShowValidationErrors(false);
        onClose();
    }

    // Função para lidar com a mudança de valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (showValidationErrors) {
            setShowValidationErrors(false);
        }
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Função para lidar com o clique em guardar
    const handleSaveClick = () => {
        if (!isFormValid) {
            setShowValidationErrors(true);
            toast.warn('Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar.');
            return;
        }
        onSave(formData as T);
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" dialogClassName="modal-scrollable" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
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
                                className={`custom-input-height form-control custom-select-font-size ${showValidationErrors ? 'error-border' : ''}`}
                                id={field.key}
                                name={field.key}
                                value={formData[field.key] || ''}
                                onChange={handleChange}
                                maxLength={field.key === 'acronym' ? 4 : 50}
                            />
                            {errors[field.key] && <div style={{ color: 'red', fontSize: 'small' }}>{errors[field.key]}</div>}
                        </div>
                    ))}
                </form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleClose}>Fechar</Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" onClick={handleSaveClick} disabled={!isFormValid}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};
