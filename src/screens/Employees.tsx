import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/PagesStyles.css';
import profileAvatar from '../assets/img/profileAvatar.png';
import EmployeeModal from "../Modals/EmployeeModal";
import IconButton from '@mui/material/IconButton';
import { PersonAdd, Refresh } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Employee = {
    id: string;
    number: number;
    name: string;
    shortName: string;
    nameAcronym: string;
    comments: string;
    photo: string;
    address: string;
    zipcode: string;
    locality: string;
    village: string;
    district: string;
    phone: number;
    mobile: number;
    email: string;
    birthday: Date;
    nacionality: string;
    gender: boolean;
    biNumber: string;
    biIssuance: string;
    biValidity: string;
    nif: number;
    admissionDate: Date;
    exitDate: Date;
    rgpdAut: boolean;
    departmentId: number;
    professionId: number;
    categoryId: number;
    groupId: number;
    zoneId: number;
    externalEntityId: number;
};

export const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [open, setOpen] = useState(false);

    const fetchEmployees = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Employees', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados dos funcionários');
                }
                return response.json();
            })
            .then(data => {
                setEmployees(data);
            })
            .catch(error => console.error('Erro ao buscar os funcionários:', error));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const refreshEmployees = () => {
        fetchEmployees();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <NavBar />
            <div>
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshEmployees}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-employee" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <EmployeeModal open={open} onClose={handleClose} />
            </div>
            <div>
                <Grid className='grid-table' container spacing={3}>
                    {employees.map((employee, index) => (
                        <Grid item xs={12} key={employee.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                <div className='avatar-name'>
                                    <Avatar alt="Employee Photo" src={employee.photo ? employee.photo : profileAvatar} />
                                    <Typography className='grid-name'>{employee.name}</Typography>
                                </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Number: {employee.number}</Typography>
                                            <Typography>Short Name: {employee.shortName}</Typography>
                                            <Typography>Name Acronym: {employee.nameAcronym}</Typography>
                                            <Typography>Comments: {employee.comments}</Typography>
                                            <Typography>Address: {employee.address}</Typography>
                                            <Typography>ZIP Code: {employee.zipcode}</Typography>
                                            <Typography>Locality: {employee.locality}</Typography>
                                            <Typography>Village: {employee.village}</Typography>
                                            <Typography>District: {employee.district}</Typography>
                                            <Typography>Phone: {employee.phone}</Typography>
                                            <Typography>Mobile: {employee.mobile}</Typography>
                                            <Typography>Email: {employee.email}</Typography>
                                            <Typography>Birthday: {new Date(employee.birthday).toLocaleDateString()}</Typography>
                                            <Typography>Nacionality: {employee.nacionality}</Typography>
                                            <Typography>Gender: {employee.gender ? 'Male' : 'Female'}</Typography>
                                            <Typography>BI Number: {employee.biNumber}</Typography>
                                            <Typography>BI Issuance: {employee.biIssuance}</Typography>
                                            <Typography>BI Validity: {employee.biValidity}</Typography>
                                            <Typography>NIF: {employee.nif}</Typography>
                                            <Typography>Admission Date: {new Date(employee.admissionDate).toLocaleDateString()}</Typography>
                                            <Typography>Exit Date: {new Date(employee.exitDate).toLocaleDateString()}</Typography>
                                            <Typography>RGPD Aut: {employee.rgpdAut ? 'Yes' : 'No'}</Typography>
                                            <Typography>Department ID: {employee.departmentId}</Typography>
                                            <Typography>Profession ID: {employee.professionId}</Typography>
                                            <Typography>Category ID: {employee.categoryId}</Typography>
                                            <Typography>Group ID: {employee.groupId}</Typography>
                                            <Typography>Zone ID: {employee.zoneId}</Typography>
                                            <Typography>External Entity ID: {employee.externalEntityId}</Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Footer />
        </div >
    );
}
