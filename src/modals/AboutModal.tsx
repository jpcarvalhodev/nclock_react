import { Form, Nav, Tab } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import nidgrouplogo from '../assets/img/ajuda/nidgrouplogo.png';

// Define a propriedade da interface
interface AboutModalProps {
    open: boolean;
    onClose: () => void;
}

// Define o componente
export const AboutModal = ({ open, onClose }: AboutModalProps) => {

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="xl" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>Acerca de</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid">
                    <Tab.Container defaultActiveKey="about">
                        <Nav variant="tabs" className="nav-modal">
                            <Nav.Item>
                                <Nav.Link eventKey="about">Web NIDGROUP</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="license">Licença</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="about">
                                <Form style={{ marginTop: 10, marginBottom: 10, display: 'flex', flexDirection: 'column' }}>
                                    <img src={nidgrouplogo} alt="logo nidgroup" style={{ width: '250px', marginTop: 10, marginBottom: 20 }} />
                                    <p>NIDGROUP- Business Solutions</p>
                                    <p>Sede Norte: Avenida D. Manuel II n.º 2070, 3º Fração 36, 4470-334 Maia</p>
                                    <p>Sede Sul: Rua Dr. Teófilo Braga n.º 21, 2670-480, Loures</p>
                                    <p>Tel: +351 210 992 230</p>
                                    <p>E-Mail: info@nidgroup.pt</p>
                                    <p>https://nidgroup.pt/</p>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="license">
                                <Form style={{ marginTop: 10, marginBottom: 10 }}>
                                    <p style={{ marginTop: 20 }}><strong>Proteção Legal:</strong></p>
                                    <p>•	O software é protegido por leis de direitos de autor e tratados internacionais.</p>
                                    <p>•	Qualquer reprodução ou distribuição não autorizada pode levar a sanções civis e criminais.</p>
                                    <p style={{ marginTop: 10 }}><strong>Isenção de Garantias:</strong></p>
                                    <p>•	O produto é fornecido "como está" ("as is"), sem garantias explícitas ou implícitas.</p>
                                    <p>•	O usuário assume total responsabilidade pelos resultados e desempenho do software.</p>
                                    <p style={{ marginTop: 10 }}><strong>Limitação de Responsabilidade:</strong></p>
                                    <p>•	O desenvolvimento do software, NIDGROUP / SISNID, não pode ser responsabilizada por danos acidentais, especiais, consequenciais ou indiretos (ex.: perda de lucros ou dados), mesmo que tenha sido alertada sobre a possibilidade desses danos.</p>
                                    <p>•	Também não se responsabiliza por demandas feitas por terceiros relacionadas ao uso do software.</p>
                                    <p style={{ marginTop: 10 }}><strong>Proibição de Engenharia Reversa:</strong></p>
                                    <p>•	O usuário não pode traduzir, realizar engenharia reversa, descompilar ou desmontar o software.</p>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Modal.Body>
        </Modal>
    );
};