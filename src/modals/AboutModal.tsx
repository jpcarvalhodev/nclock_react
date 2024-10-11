import Modal from "react-bootstrap/Modal";
import { Form, Nav, Tab } from "react-bootstrap";
import nidgrouplogo from '../assets/img/ajuda/nidgrouplogo.png';

// Define a propriedade da interface
interface AboutModalProps {
    open: boolean;
    onClose: () => void;
}

// Define o componente
export const AboutModal = ({ open, onClose }: AboutModalProps) => {

    return (
        <Modal show={open} onHide={onClose} size="xl">
            <Modal.Header closeButton>
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
                                    <img src={nidgrouplogo} alt="logo nidgroup" style={{ width: '250px', marginTop: 10, marginBottom: 10 }} />
                                    <p>NIDGROUP- Business Solutions</p>
                                    <p>Sede Norte: Avenida D. Manuel II n.º 2070, 3º Fração 36, 4470-334 Maia</p>
                                    <p>Sede Sul: Rua Dr. Teófilo Braga n.º 21, 2670-480, Loures</p>
                                    <p>Tel: +351 210 992 230</p>
                                    <p>E-Mail: info@sisnid.com</p>
                                    <p>https://nidgroup.pt/</p>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="license">
                                <Form style={{ marginTop: 10, marginBottom: 10, display: 'flex' }}>
                                    <p style={{ marginTop: 10 }}>ESTE PROGRAMA DE COMPUTADOR ESTÁ PROTEGIDO POR LEIS DE DIREITOS DE AUTOR E TRATADOS INTERNACIONAIS. QUALQUER REPRODUÇÃO OU DISTRIBUIÇÃO NÃO AUTORIZADA DESTE PROGRAMA PODERÁ RESULTAR EM PENAS CIVIS E CRIMINAIS SEVERAS.
                                        ESTE PRODUTO É FORNECIDO "TAL COMO ESTÁ", SEM QUAISQUER OUTRAS GARANTIAS, EXPRESSAS OU IMPLÍCITAS. O UTILIZADOR É EXCLUSIVAMENTE RESPONSÁVEL PELOS RESULTADOS E DESEMPENHO DO PRODUTO. EM HIPÓTESE ALGUMA, A IDONICSYS PODE SER RESPONSABILIZADA PERANTE O UTILIZADOR OU QUALQUER OUTRA PESSOA INDIVIDUAL OU COLECTIVA POR QUALQUER DANO ACIDENTAL, ESPECIAL, CONSEQUENCIAL OU QUALQUER OUTRO DANO INDIRECTO, INCLUINDO, MAS NÃO SE LIMITANDO A, LUCROS CESSANTES, PERDA OU DESTRUIÇÃO DE DADOS OU OUTROS PREJUÍZOS ECONÓMICOS OU COMERCIAIS, AINDA QUE A IDONICSYS TENHA SIDO NOTIFICADA DA POSSIBILIDADE DE OCORRÊNCIA DE TAIS DANOS, OU QUE A OCORRÊNCIA DOS MESMOS SEJA PREVISÍVEL. SOB NENHUMA CIRCUNSTÂNCIA A IDONICSYS SERÁ RESPONSÁVEL POR DEMANDAS PROMOVIDAS POR TERCEIROS.
                                        O UTILIZADOR DO PRODUTO NÃO ESTÁ AUTORIZADO A TRADUZIR, PROCEDER À ENGENHARIA INVERSA, DESCOMPILAR OU DESMONTAR O PRODUTO.</p>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Modal.Body>
        </Modal>
    );
};