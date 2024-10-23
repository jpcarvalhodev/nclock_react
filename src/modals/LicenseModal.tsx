import { useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { licenseFields } from '../helpers/Fields';
import { useLicense } from '../context/LicenseContext';
import { License } from '../helpers/Types';
import { toast } from 'react-toastify';

// Define a interface Entity
export interface Entity {
    [key: string]: any;
    id: string;
}

// Define a as propriedades do modal
interface UpdateModalProps<T> {
    open: boolean;
    onClose: () => void;
}

export const LicenseModal = <T extends Entity>({ open, onClose }: UpdateModalProps<T>) => {
    const { isLicensed, fetchAllLicenses, handleUpdateLicense } = useLicense();
    const [formData, setFormData] = useState<Partial<License>>([]);
    const [isCheckVisible, setIsCheckVisible] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [key, setKey] = useState<string>('');
    const [licenseOptions, setLicenseOptions] = useState<boolean[]>(new Array(licenseFields.length).fill(false));

    // Atualiza o estado de visibilidade do primeiro modal baseado na prop open
    useEffect(() => {
        setIsCheckVisible(open);
    }, [open]);

    // Função para atualizar o estado da licença
    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => setKey(e.target.value);

    // Função para verificar a chave de licença
    const verifyKey = async () => {
        try {
            const isValid = await fetchAllLicenses(key);
            if (isValid && isLicensed) {
                const data: Partial<License> = await fetchAllLicenses(key);
                setFormData(data);
                const updatedOptions = licenseFields.map(field => data[field.key]);
                setLicenseOptions(updatedOptions);
                setIsCheckVisible(false);
                showModal();
            } else {
                toast.warn('Chave inválida, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao verificar chave:', error);
            toast.warn('Não foi possível verificar a chave, tente novamente.');
        }
    };

    // Função para atualizar os softwares da licença
    const handleUpdate = async (key: string, licenses: License) => {
        try {
            await handleUpdateLicense(key, licenses);
        } catch (error) {
            console.error('Não foi possível atualizar as licenças:', error);
        }
    }

    // Função para mostrar o modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Função para fechar o modal
    const handleClose = () => {
        setIsCheckVisible(false);
        setIsModalVisible(false);
    };

    // Função para atualizar os checkboxes
    const handleCheckChange = (index: number) => {
        const fieldKey = licenseFields[index].key;
        const updatedOptions = [...licenseOptions];
        updatedOptions[index] = !updatedOptions[index];

        setLicenseOptions(updatedOptions);

        setFormData(prev => ({
            ...prev,
            [fieldKey]: updatedOptions[index]
        }));
    };

    // Função para salvar os dados
    const handleSave = () => {
        const formattedData = Object.keys(formData).reduce((acc: { [key: string]: number }, key) => {
            acc[key] = formData[key] ? 1 : 0;
            return acc;
        }, {});
        handleUpdate(key, formattedData as License);
        onClose();
    };

    return (
        <div>
            <Modal show={isCheckVisible} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inserir Chave</Modal.Title>
                </Modal.Header>
                <InputGroup className='license-check-modal'>
                    <FormControl
                        placeholder="Insira a chave de licenciamento"
                        value={key}
                        onChange={handleKeyChange}
                        type='password'
                    />
                    <Button variant="outline-primary" onClick={verifyKey}>Verificar Chave</Button>
                </InputGroup>
            </Modal>
            <Modal show={isModalVisible} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Licenciamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='license-list-modal'>
                        {licenseFields.map((field, index) => (
                            <Form.Group key={field.key}>
                                <Form.Check
                                    type="checkbox"
                                    label={field.label}
                                    checked={licenseOptions[index]}
                                    onChange={() => handleCheckChange(index)}
                                />
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onClose}>
                        Fechar
                    </Button>
                    <Button variant="outline-primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};