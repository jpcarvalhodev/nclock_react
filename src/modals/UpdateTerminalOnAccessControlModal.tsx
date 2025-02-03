import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, Form, Row } from "react-bootstrap";
import { useTerminals } from "../context/TerminalsContext";

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
    onUpdate: (data: T) => void;
    entity: T;
}

// Define o componente
export const UpdateTerminalOnAccessControlModal = <T extends Record<string, any>>({ title, open, onClose, onUpdate, entity }: Props<T>) => {
    const { fetchTimePlans } = useTerminals();
    const [formData, setFormData] = useState<T>({ ...entity });
    const [dropdownData, setDropdownData] = useState<Record<string, any[]>>({});

    // UseEffect para atualizar o estado do formulário
    useEffect(() => {
        if (open) {
            fetchDropdownOptions();
            setFormData({
                ...entity,
                accessPlan: entity.nome || '',
                terminal: entity.nomeTerminal || '',
                porta: entity.nomePorta || '',
            });
        } else {
            setFormData({} as T);
        }
    }, [open, entity]);

    // Função para buscar as opções do dropdown
    const fetchDropdownOptions = async () => {
        try {
            const timePlan = await fetchTimePlans();
            const sortedTimePlan = timePlan.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
            setDropdownData({
                timePlanId: sortedTimePlan,
            });
        } catch (error) {
            console.error("Erro ao buscar os dados", error);
        }
    };

    // Função para lidar com a mudança do dropdown
    const handleDropdownChange = (key: string, e: React.ChangeEvent<FormControlElement>) => {
        const { value } = e.target;
        const selectedOption = dropdownData[key]?.find((option: any) => {
            switch (key) {
                case 'timePlanId':
                    return option.id === value;
                default:
                    return false;
            }
        });
        if (selectedOption) {
            setFormData(prevState => ({
                ...prevState,
                idPlanoHorario: value,
                nomePlanoHorario: selectedOption.nome || '',
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [key]: value
            }));
        }
    };

    // Função para atualizar os campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    // Função para fechar o modal
    const handleClose = () => {
        setFormData({} as T);
        onClose();
    }

    // Função para salvar os dados
    const handleSave = () => {
        const payload = {
            nome: formData.accessPlan || '',
            planosAcessoDispositivos: [
                {
                    dispositivos: [
                        {
                            idTerminal: entity.idTerminal,
                            idPlanoHorario: formData.idPlanoHorario,
                            nomePlanoHorario: formData.nomePlanoHorario,
                            portas: Array.isArray(entity.idPorta)
                                ? entity.idPorta.map(id => ({ idPorta: id }))
                                : [{ idPorta: entity.idPorta }],
                        }
                    ]
                }
            ],
        };
        onUpdate(payload as unknown as T);
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} backdrop="static" dialogClassName="custom-modal" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Row style={{ marginBottom: 10, borderBottom: '1px solid #ccc' }}>
                    <Col md={6} style={{ marginBottom: 20 }}>
                        <Form.Group controlId="formIdPlanoHorario">
                            <Form.Label>Plano de Horário</Form.Label>
                            <Form.Control
                                as="select"
                                className="custom-input-height custom-select-font-size"
                                value={formData.idPlanoHorario || ''}
                                onChange={(e) => handleDropdownChange('timePlanId', e)}
                            >
                                <option value="">Selecione...</option>
                                {dropdownData['timePlanId']?.map((option: any) => {
                                    let optionId = option.id;
                                    let optionName = option.nome;
                                    return (
                                        <option key={optionId} value={optionId}>
                                            {optionName}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group controlId="formAccessPlan">
                            <Form.Label>Plano de Acesso</Form.Label>
                            <Form.Control
                                className="custom-input-height custom-select-font-size"
                                type="string"
                                name="accessPlan"
                                value={formData.accessPlan || ''}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formTerminal">
                            <Form.Label>Terminal</Form.Label>
                            <Form.Control
                                className="custom-input-height custom-select-font-size"
                                type="string"
                                name="terminal"
                                value={formData.terminal || ''}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formPorta">
                            <Form.Label>Porta</Form.Label>
                            <Form.Control
                                className="custom-input-height custom-select-font-size"
                                type="text"
                                name="porta"
                                value={formData.porta || ''}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={onClose} >
                    Fechar
                </Button>
                <Button className='narrow-mobile-modal-button' variant="outline-dark" type="button" onClick={handleSave} >
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
