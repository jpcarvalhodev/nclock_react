import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

type Profession = {
    id: string,
    code: number,
    description: string,
    acronym: string,
};

interface ProfessionModalProps {
    open: boolean;
    onClose: () => void;
    profession: Profession | null;
}

interface NewProfessionData {
    [key: string]: string | number;
    code: number,
    description: string,
    acronym: string,
}

const fields = [
    { key: 'code', label: 'Code', required: true },
    { key: 'description', label: 'Description', required: true },
    { key: 'acronym', label: 'Acronym' },
];

export default function ProfessionModal({ open, onClose, profession }: ProfessionModalProps) {
    const [newProfessionData, setNewProfessionData] = useState<NewProfessionData>({
        code: 0,
        description: '',
        acronym: '',
    });

    const handleSubmit = () => {
        if (profession) {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/Professions/${profession.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProfessionData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating profession');
                    }

                    setNewProfessionData({
                        code: 0,
                        description: '',
                        acronym: '',

                    });

                })
                .catch(error => console.error('Error updating profession:', error));
        } else {
            const token = localStorage.getItem('token');

            fetch('https://localhost:7129/api/Professions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProfessionData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding new profession');
                    }

                    setNewProfessionData({
                        code: 0,
                        description: '',
                        acronym: '',

                    });

                })
                .catch(error => console.error('Error adding new profession:', error));
        }
    };

    useEffect(() => {
        if (profession) {
            setNewProfessionData(profession);
        }
    }, [profession]);

    const handleClose = () => {
        handleSubmit();
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profession</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {fields.map(field => (
                        <Form.Group as={Row} key={field.key}>
                            <Form.Label column sm={2}>
                                {field.required ? `${field.label} *` : field.label}
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    value={newProfessionData[field.key]}
                                    onChange={(e) =>
                                        setNewProfessionData((prevData) => ({
                                            ...prevData,
                                            [field.key]: e.target.value,
                                        }))
                                    }
                                />
                            </Col>
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
