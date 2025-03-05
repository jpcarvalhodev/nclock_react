import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { CustomOutlineButton } from "../components/CustomOutlineButton";
import { usePersons } from "../context/PersonsContext";

// Define a interface Entity
export interface Entity {
  id: string;
  [key: string]: any;
}

// Define a interface Field
interface Field {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  optionsUrl?: string;
  validate?: (value: any) => boolean;
  errorMessage?: string;
}

// Define a propriedade do componente
interface UpdateModalProps<T extends Entity> {
  open: boolean;
  onClose: () => void;
  onDuplicate: (entity: Partial<T>) => void;
  onUpdate: (entity: T) => Promise<void>;
  entity: T;
  fields: Field[];
  title: string;
  entityType: "categorias" | "profissões" | "tipos";
  onNext: () => void;
  onPrev: () => void;
  canMoveNext: boolean;
  canMovePrev: boolean;
}

// Define a interface para os itens de código
interface CodeItem {
  code?: number;
  order?: number;
}

// Exporta o componente
export const UpdateModalCatProfTypes = <T extends Entity>({
  open,
  onClose,
  onUpdate,
  onDuplicate,
  entity,
  fields,
  title,
  entityType,
  canMoveNext,
  canMovePrev,
  onNext,
  onPrev,
}: UpdateModalProps<T>) => {
  const { categories, professions, dataEE } = usePersons();
  const [formData, setFormData] = useState<T>({ ...entity });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Atualiza o estado do formulário com as validações
  useEffect(() => {
    const newErrors: Record<string, boolean> = {};

    const isValid = fields.every((field) => {
      const fieldValue = formData[field.key];
      let valid = true;

      if (field.required && (fieldValue === undefined || fieldValue === "")) {
        valid = false;
      }
      if (field.type === "number" && fieldValue != null && fieldValue < 0) {
        valid = false;
      }

      return valid;
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
    validateForm();
  }, [formData, fields]);

  // Função para validar o formulário
  const validateForm = () => {
    if (!showValidationErrors) return true;
    let newErrors: Record<string, boolean> = {};
    let isValid = true;

    fields.forEach((field) => {
      const fieldValue = formData[field.key];
      if (field.required && !fieldValue) {
        isValid = false;
        newErrors[field.key] = true;
      } else {
        newErrors[field.key] = false;
      }
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  // Usa useEffect para buscar os dados de categoria/profissão
  useEffect(() => {
    if (open && entity) {
      fetchEntityData();
      setFormData({ ...entity });
    }
  }, [open, entity]);

  // Função para buscar os dados de categoria, profissão ou tipo
  const fetchEntityData = () => {
    let data: CodeItem[] | undefined;
    let requiresNextCode = false;
    let requiresNextOrder = false;

    switch (entityType) {
      case "categorias":
        data = categories;
        requiresNextCode = true;
        break;
      case "profissões":
        data = professions;
        requiresNextCode = true;
        break;
      case "tipos":
        data = dataEE?.externalEntityTypes;
        requiresNextOrder = true;
        break;
      default:
        console.error(`Tipo de entidade '${entityType}' não existe.`);
        return;
    }

    if (data && Array.isArray(data)) {
      if (requiresNextCode) {
        const maxCode =
          data.reduce(
            (max: number, item: CodeItem) => Math.max(max, item.code ?? 0),
            0
          ) + 1;
        setFormData((prevState) => ({
          ...prevState,
          code: maxCode,
        }));
      }
      if (requiresNextOrder) {
        const maxOrder =
          data.reduce(
            (max: number, item: CodeItem) => Math.max(max, item.order ?? 0),
            0
          ) + 1;
        setFormData((prevState) => ({
          ...prevState,
          order: maxOrder,
        }));
      }
    }
  };

  // Função para lidar com a mudança de entrada
  const handleInputChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: parsedValue,
    }));
  };

  // Função para manipular o clique no botão Duplicar
  const handleDuplicateClick = () => {
    if (!onDuplicate) return;
    const {
      categotyID,
      professionID,
      externalEntityTypeID,
      code,
      ...dataWithoutId
    } = formData;
    onDuplicate(dataWithoutId as Partial<T>);
  };

  // Função para lidar com o clique em guardar
  const handleSaveClick = () => {
    if (!isFormValid) {
      setShowValidationErrors(true);
      toast.warn(
        "Preencha todos os campos obrigatórios e verifique os dados preenchidos antes de guardar."
      );
      return;
    }
    handleSubmit();
  };

  // Função para submeter o formulário
  const handleSubmit = async () => {
    await onUpdate(formData);
  };

  return (
    <Modal
      show={open}
      onHide={onClose}
      backdrop="static"
      dialogClassName="modal-scrollable"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#f2f2f2" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <form className="form-grid">
          {fields.map((field) => (
            <div className="form-group" key={field.key}>
              <label htmlFor={field.key}>
                {field.label}
                {field.required && (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${field.key}`}>
                        Campo obrigatório
                      </Tooltip>
                    }
                  >
                    <span style={{ color: "red" }}> *</span>
                  </OverlayTrigger>
                )}
              </label>
              <input
                type={field.type}
                className={`custom-input-height form-control custom-select-font-size ${
                  showValidationErrors ? "error-border" : ""
                }`}
                id={field.key}
                name={field.key}
                value={formData[field.key] || ""}
                onChange={(e) => handleInputChange(field.key, e)}
                maxLength={field.type === "acronym" ? 4 : 50}
              />
              {errors[field.key] && (
                <div style={{ color: "red", fontSize: "small" }}>
                  {errors[field.key]}
                </div>
              )}
            </div>
          ))}
        </form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f2f2f2" }}>
        <OverlayTrigger
          placement="top"
          delay={0}
          container={document.body}
          popperConfig={{
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ],
          }}
          overlay={<Tooltip className="custom-tooltip">Anterior</Tooltip>}
        >
          <CustomOutlineButton
            icon="bi-arrow-left"
            onClick={onPrev}
            disabled={!canMovePrev}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          delay={0}
          container={document.body}
          popperConfig={{
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ],
          }}
          overlay={<Tooltip className="custom-tooltip">Seguinte</Tooltip>}
        >
          <CustomOutlineButton
            className="arrows-modal"
            icon="bi-arrow-right"
            onClick={onNext}
            disabled={!canMoveNext}
          />
        </OverlayTrigger>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleDuplicateClick}
        >
          Duplicar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={onClose}
        >
          Fechar
        </Button>
        <Button
          className="narrow-mobile-modal-button"
          variant="outline-dark"
          onClick={handleSaveClick}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
