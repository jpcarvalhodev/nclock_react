import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

type Department = {
    id: string,
    code: number,
    name: string,
    description: string,
    paiId: number,
};

interface DepartmentModalProps {
    open: boolean;
    onClose: () => void;
    department: Department | null;
}

interface NewDepartmentData {
    [key: string]: string | number;
    code: number,
    name: string,
    description: string,
    paiId: number,
}

const fields = [
    { key: 'code', label: 'Code', type: 'number', required: true },
    { key: 'name', label: 'Name', type: 'string', required: true },
    { key: 'description', label: 'Description', type: 'string' },
    { key: 'paiId', label: 'Parent Department ID', type: 'number' },
];

export default function EmployeeModal({ open, onClose, department }: DepartmentModalProps) {
    const [newDepartmentData, setNewDepartmentData] = useState<NewDepartmentData>({
        code: 0,
        name: '',
        description: '',
        paiId: 0,
    });

    const handleSubmit = () => {
        if (department) {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/Departaments/${department.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDepartmentData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating department');
                    }

                    setNewDepartmentData({
                        code: 0,
                        name: '',
                        description: '',
                        paiId: 0,

                    });

                })
                .catch(error => console.error('Error updating department:', error));
        } else {
            const token = localStorage.getItem('token');

            fetch('https://localhost:7129/api/Departaments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDepartmentData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding new department');
                    }

                    setNewDepartmentData({
                        code: 0,
                        name: '',
                        description: '',
                        paiId: 0,

                    });

                })
                .catch(error => console.error('Error adding new department:', error));
        }
    };

    useEffect(() => {
        if (department) {
            setNewDepartmentData(department);
        }
    }, [department]);

    const handleClose = () => {
        handleSubmit();
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {fields.map(field => (
                        <Form.Group key={field.key}>
                            <Form.Label>{field.label}</Form.Label>
                            <Form.Control
                                type={field.type}
                                value={newDepartmentData[field.key]}
                                onChange={(e) =>
                                    setNewDepartmentData((prevData) => ({
                                        ...prevData,
                                        [field.key]: e.target.value,
                                    }))
                                }
                            />
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
