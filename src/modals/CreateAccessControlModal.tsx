import { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, Row } from 'react-bootstrap';
import * as apiService from "../helpers/apiService";
import { Doors, Employee } from '../helpers/Types';

// Interface para as propriedades do modal
interface CreateModalProps<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    fields: Field[];
    initialValues: Partial<T>;
}

// Interface para os campos do formulário
interface Field {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define o componente
export const CreateAccessControlModal = <T extends Record<string, any>>({ title, open, onClose, onSave, fields, initialValues }: CreateModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<T>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    // UseEffect para validar o formulário
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        const isValid = fields.every(field => {
            const fieldValue = formData[field.key];
            let valid = true;

            if (field.required && (fieldValue === undefined || fieldValue === '')) {
                valid = false;
            }
            if (field.type === 'number' && fieldValue != null && fieldValue < 0) {
                valid = false;
                newErrors[field.key] = `${field.label} não pode ser negativo.`;
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Função para buscar os funcionários
    const fetchEmployeeId = async () => {
        try {
            const data = await apiService.fetchAllEmployees();
            const mapping = data.map((emp: Employee) => ({
                key: emp.id,
                value: emp.nome
            }));
            setFormData(prevState => ({
                ...prevState,
                employeesId: mapping
            }));
        } catch (error) {
            console.error('Erro ao buscar os funcionários:', error);
        }
    }

    // Função para buscar as portas
    const fetchDoorId = async () => {
        try {
            const data = await apiService.fetchAllDoors();
            const mapping = data.map((door: Doors) => ({
                key: door.id,
                value: door.nome
            }));
            setFormData(prevState => ({
                ...prevState,
                doorsId: mapping
            }));
        } catch (error) {
            console.error('Erro ao buscar as portas:', error);
        }
    }

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para verificar se o formulário é válido antes de salvar
    const handleCheckForSave = () => {
        if (!isFormValid) {
            toast.warn('Preencha todos os campos obrigatórios antes de guardar.');
            return;
        }
        handleSave();
    }

    // Função para salvar os dados
    const handleSave = () => {
        onSave(formData as T);
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formEmployeesId">
                                <Form.Label>Nome do Arquivo</Form.Label>
                                <Form.Control
                                    className="custom-input-height custom-select-font-size"
                                    type="text"
                                    name="nomeArquivo"
                                    value={formData.nomeArquivo || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="outline-primary" onClick={handleCheckForSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};