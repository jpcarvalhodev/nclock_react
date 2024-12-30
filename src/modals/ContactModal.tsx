import Modal from "react-bootstrap/Modal";

import banner_contact from '../assets/img/carousel/banner_contact.png';

// Define a propriedade da interface
interface ContactProps {
    open: boolean;
    onClose: () => void;
}

// Define o componente
export const ContactModal = ({ open, onClose }: ContactProps) => {

    return (
        <Modal show={open} onHide={onClose} backdrop="static" size="xl" style={{ marginTop: 100 }}>
            <Modal.Header closeButton style={{ backgroundColor: '#f2f2f2' }}>
                <Modal.Title>Dados para Contacto</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scrollable">
                <div className="container-fluid" style={{ display: "flex", justifyContent: "center" }}>
                    <img src={banner_contact} alt="banner de contacto" className="img-contact-modal" />
                </div>
            </Modal.Body>
        </Modal>
    );
};