import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PagesStyles.css";
import { Col, Form, InputGroup, Nav, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import hidepass from "../assets/img/login/hidepass.png";
import showpass from "../assets/img/login/showpass.png";
import modalAvatar from "../assets/img/navbar/navbar/modalAvatar.png";
import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { PersonsContext, PersonsContextType } from "../context/PersonsContext";
import * as apiService from "../helpers/apiService";
import { departmentFields, groupFields } from "../helpers/Fields";
import { Department, Employee, EmployeeCard, Group } from "../helpers/Types";

import { CreateModalDeptGrp } from "./CreateModalDeptGrp";

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Define a interface para as propriedades do componente FieldConfig
interface FieldConfig {
    label: string;
    key: string;
    type: string;
    required?: boolean;
    optionsUrl?: string;
    validate?: (value: any) => boolean;
    errorMessage?: string;
}

// Define as propriedades do componente
interface Props<T> {
    title: string;
    open: boolean;
    onClose: () => void;
}

// Define o componente
export const AccessControlModal = <T extends Record<string, any>>({ title, open, onClose }: Props<T>) => {
    const [formData, setFormData] = useState<Partial<T>>({});

    return (
        <Modal show={open} onHide={onClose} backdrop="static" dialogClassName="custom-modal" size="xl" style={{ marginTop: 110 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <Tab.Container defaultActiveKey="geral">
                    <Nav variant="tabs" className="nav-modal">
                        <Nav.Item>
                            <Nav.Link eventKey="geral">Geral</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="geral">
                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                <Tab.Container defaultActiveKey="equipamentos">
                                    <Nav variant="tabs" className="nav-modal">
                                        <Nav.Item>
                                            <Nav.Link eventKey="equipamentos">Equipamentos</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="pessoas">Pessoas</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="equipamentos">
                                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                                <Row>

                                                </Row>
                                            </Form>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="pessoas">
                                            <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                                <Row>

                                                </Row>
                                            </Form>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f2f2f2' }}>
                <Button variant="outline-secondary" type="button" onClick={onClose} >
                    Fechar
                </Button>
                <Button
                    variant="outline-primary"
                    type="button"

                >
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
