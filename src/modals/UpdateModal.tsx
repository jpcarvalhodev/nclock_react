import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Field {
  key: string;
  label: string;
  type: string;
  required?: boolean;
}

interface Entity {
  id: string;
  [key: string]: any;
}

interface UpdateModalProps<T extends Entity> {
  open: boolean;
  onClose: () => void;
  onUpdate: (entity: T) => Promise<void>; 
  entity: T;
  fields: Field[];
  title: string;
}

export const UpdateModal = <T extends Entity>({ open, onClose, onUpdate, entity, fields, title }: UpdateModalProps<T>) => {
  const [formData, setFormData] = useState<T>({ ...entity });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <form>
          {fields.map(field => (
            <div key={field.key} className="mb-3">
              <label className="form-label">{field.label}</label>
              <input
                type={field.type}
                className="form-control"
                value={formData[field.key]}
                onChange={(e) => handleInputChange(e, field.key)}
                required={field.required}
              />
            </div>
          ))}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};