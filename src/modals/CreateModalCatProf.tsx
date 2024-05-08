import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../css/PagesStyles.css';
import { toast } from 'react-toastify';
import { fetchWithAuth } from '../components/FetchWithAuth';

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
    entityType: 'categorias' | 'profissões';
}

interface CodeItem {
    code: number;
}

export const CreateModalCatProf = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues, entityType }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            if (typeof fieldValue === 'string') {
                return !field.required || fieldValue.trim() !== '';
            } else {
                return !field.required || fieldValue != null;
            }
        });
        setIsFormValid(isValid);
    }, [formData, fields]);

    useEffect(() => {
        if (open) {
            fetchCategoryOrProfessionData();
        }
    }, [open]);

    const fetchCategoryOrProfessionData = async () => {
        const url = entityType === 'categorias' ? 'Categories' : 'Professions';
        try {
            const response = await fetchWithAuth(url);
            if (response.ok) {
                const data: CodeItem[] = await response.json();
                const maxCode = data.reduce((max: number, item: CodeItem) => Math.max(max, item.code), 0) + 1;
                setFormData(prevState => ({
                    ...prevState,
                    code: maxCode
                }));
            } else {
                toast.error(`Erro ao buscar dados de ${entityType}`);
            }
        } catch (error) {
            console.error(`Erro ao buscar dados de ${entityType}:`, error);
            toast.error(`Erro ao conectar ao servidor para ${entityType}`);
        }
    };    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        onSave(formData as T);
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
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Fechar</Button>
                <Button variant="primary" onClick={handleSaveClick}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};