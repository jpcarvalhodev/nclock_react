import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

type Category = {
    id: string,
    code: number,
    description: string,
    acronym: string,
};

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    category: Category | null;
}

interface NewCategoryData {
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

export default function CategoryModal({ open, onClose, category }: CategoryModalProps) {
    const [newCategoryData, setNewCategoryData] = useState<NewCategoryData>({
        code: 0,
        description: '',
        acronym: '',
    });

    const handleSubmit = () => {
        if (category) {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/Categories/${category.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategoryData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating category');
                    }

                    setNewCategoryData({
                        code: 0,
                        description: '',
                        acronym: '',

                    });

                })
                .catch(error => console.error('Error updating category:', error));
        } else {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/Categories`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategoryData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding new category');
                    }

                    setNewCategoryData({
                        code: 0,
                        description: '',
                        acronym: '',

                    });

                })
                .catch(error => console.error('Error adding new category:', error));
        }
    };

    useEffect(() => {
        if (category) {
            setNewCategoryData(category);
        }
    }, [category]);

    const handleClose = () => {
        handleSubmit();
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} fullscreen>
            <Modal.Header closeButton>
                <Modal.Title>Add New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        {fields.map(field => (
                            <Col xs={4} key={field.key}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{field.required ? `${field.label} *` : field.label}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newCategoryData[field.key]}
                                        onChange={(e) =>
                                            setNewCategoryData((prevData) => ({
                                                ...prevData,
                                                [field.key]: e.target.value,
                                            }))
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Add and Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
