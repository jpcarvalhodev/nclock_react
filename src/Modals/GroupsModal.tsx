import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

type Group = {
    id: string;
    name: string;
    description: string;
    paiID: number;
};

interface GroupModalProps {
    open: boolean;
    onClose: () => void;
    group: Group | null;
}

interface NewGroupData {
    [key: string]: string | number;
    name: string;
    description: string;
    paiID: number;
}

const fields = [
    { key: 'name', label: 'Name', required: true },
    { key: 'description', label: 'Description' },
    { key: 'paiID', label: 'Parent ID' },
];

export default function GroupModal({ open, onClose, group }: GroupModalProps) {
    const [newGroupData, setNewGroupData] = useState<NewGroupData>({
        name: '',
        description: '',
        paiID: 0,
    });

    const handleSubmit = () => {
        if (group) {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/Groups/${group.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroupData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating group');
                    }

                    setNewGroupData({
                        name: '',
                        description: '',
                        paiID: 0,

                    });

                })
                .catch(error => console.error('Error updating group:', error));
        } else {
            const token = localStorage.getItem('token');

            fetch('https://localhost:7129/api/Groups', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroupData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding new group');
                    }

                    setNewGroupData({
                        name: '',
                        description: '',
                        paiID: 0,

                    });

                })
                .catch(error => console.error('Error adding new group:', error));
        }
    };

    useEffect(() => {
        if (group) {
            setNewGroupData(group);
        }
    }, [group]);

    const handleClose = () => {
        handleSubmit();
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Group</Modal.Title>
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
                                    value={newGroupData[field.key]}
                                    onChange={(e) =>
                                        setNewGroupData((prevData) => ({
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
