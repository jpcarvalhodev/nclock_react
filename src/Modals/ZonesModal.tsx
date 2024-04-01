import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

type Zone = {
    id: string,
    type: string,
    name: string,
    description: string,
    acronym: string,
    address: string,
    zipCode: string,
    locality: string,
    village: string,
    district: string,
    phone: number,
    mobile: number,
    email: string,
};

interface ZoneModalProps {
    open: boolean;
    onClose: () => void;
    zone: Zone | null;
}

interface NewZoneData {
    [key: string]: string | number;
    type: string,
    name: string,
    description: string,
    acronym: string,
    address: string,
    zipCode: string,
    locality: string,
    village: string,
    district: string,
    phone: number,
    mobile: number,
    email: string,
}

const fields = [
    { key: 'type', label: 'Type', type: 'string' },
    { key: 'name', label: 'Name', type: 'string', required: true },
    { key: 'description', label: 'Description', type: 'string' },
    { key: 'acronym', label: 'Acronym', type: 'string', required: true },
    { key: 'address', label: 'Address', type: 'string' },
    { key: 'zipCode', label: 'ZIP Code', type: 'string' },
    { key: 'locality', label: 'Locality', type: 'string' },
    { key: 'village', label: 'Village', type: 'string' },
    { key: 'district', label: 'District', type: 'string' },
    { key: 'phone', label: 'Phone', type: 'number' },
    { key: 'mobile', label: 'Mobile', type: 'number' },
    { key: 'email', label: 'Email', type: 'string' },
];

export default function ZoneModal({ open, onClose, zone }: ZoneModalProps) {
    const [newZoneData, setNewZoneData] = useState<NewZoneData>({
        type: '',
        name: '',
        description: '',
        acronym: '',
        address: '',
        zipCode: '',
        locality: '',
        village: '',
        district: '',
        phone: 0,
        mobile: 0,
        email: '',
    });

    const handleSubmit = () => {
        if (zone) {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/Zones/${zone.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newZoneData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating zone');
                    }

                    setNewZoneData({
                        type: '',
                        name: '',
                        description: '',
                        acronym: '',
                        address: '',
                        zipCode: '',
                        locality: '',
                        village: '',
                        district: '',
                        phone: 0,
                        mobile: 0,
                        email: '',

                    });

                })
                .catch(error => console.error('Error updating zone:', error));
        } else {
            const token = localStorage.getItem('token');

            fetch('https://localhost:7129/api/Zones', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newZoneData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding new zone');
                    }

                    setNewZoneData({
                        type: '',
                        name: '',
                        description: '',
                        acronym: '',
                        address: '',
                        zipCode: '',
                        locality: '',
                        village: '',
                        district: '',
                        phone: 0,
                        mobile: 0,
                        email: '',

                    });

                })
                .catch(error => console.error('Error adding new zone:', error));
        }
    };

    useEffect(() => {
        if (zone) {
            setNewZoneData(zone);
        }
    }, [zone]);

    const handleClose = () => {
        handleSubmit();
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Zone</Modal.Title>
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
                                    type={field.type}
                                    value={newZoneData[field.key]}
                                    onChange={(e) =>
                                        setNewZoneData((prevData) => ({
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
