import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../css/PagesStyles.css';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import * as apiService from "../helpers/apiService";
import { Department, Group } from '../helpers/Types';

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface Entity
export interface Entity {
    id: string;
    [key: string]: any;
}

// Define o tipo EntityType
type EntityType = 'department' | 'group';

// Interface para as propriedades do modal
interface DoorModalProps<T extends Entity> {
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    entity: T;
    entityType: EntityType;
    fields: Field[];
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
export const SelectDeptGrpModal = <T extends Entity>({ title, open, onClose, onSave, entity, fields }: DoorModalProps<T>) => {
    const [formData, setFormData] = useState<Partial<Department | Group>>({ ...entity });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});

    // UseEffect para inicializar o formulário
    useEffect(() => {
        if (entity) {
            fetchDropdownOptions();
            setFormData({ ...entity });
        }
    }, [entity]);

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
            }

            return valid;
        });

        setErrors(newErrors);
        setIsFormValid(isValid);
    }, [formData, fields]);

    // Função para buscar os dados dos dropdowns
    const fetchDropdownOptions = async () => {
        try {
            const dept = await apiService.fetchAllDepartments();
            setDropdownData({
                selectDept: dept
            });
        } catch (error) {
            console.error('Erro ao buscar os dados de departamentos', error);
        }
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'selectDept':
                    return option.selectDept === value;
                default:
                    return false;
            }
        });

        if (selectedOption) {
            const idKey = key;
            setFormData(prevState => ({
                ...prevState,
                [idKey]: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e: React.ChangeEvent<any>) => {
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
    };

    return (
        <Modal show={open} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formSelectDept">
                                <Form.Label>Porta<span style={{ color: 'red' }}> *</span></Form.Label>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="tooltip-shortName">Campo obrigatório</Tooltip>}
                                >
                                    <Form.Control
                                        as="select"
                                        className="custom-input-height custom-select-font-size"
                                        value={formData.nrDoor || ''}
                                        onChange={(e) => handleDropdownChange('nrDoor', e)}
                                    >
                                        <option value="">Selecione...</option>
                                        {dropdownData.nrDoor?.sort((a, b) => a.doorNo - b.doorNo).map((option: any) => {
                                            let optionId, optionName;
                                            switch ('nrDoor') {
                                                case 'nrDoor':
                                                    optionId = option.doorNo;
                                                    optionName = option.name;
                                                    break;
                                                default:
                                                    optionId = option.doorNo;
                                                    optionName = option.name;
                                                    break;
                                            }
                                            return (
                                                <option key={optionId} value={optionId}>
                                                    {optionName}
                                                </option>
                                            );
                                        })}
                                    </Form.Control>
                                </OverlayTrigger>
                                {errors['nrDoor'] && <div style={{ color: 'red', fontSize: 'small' }}>{errors['nrDoor']}</div>}
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