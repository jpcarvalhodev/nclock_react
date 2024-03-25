import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/PagesStyles.css';
import profileAvatar from '../assets/img/profileAvatar.png';
import EmployeeModal from "../Modals/EmployeeModal";
import IconButton from '@mui/material/IconButton';
import { PersonAdd, Refresh, Delete, Edit } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type Employee = {
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
    birthday: string;
    nacionality: string;
    gender: string;
    biNumber: string;
    biIssuance: string;
    biValidity: string;
    nif: number;
    admissionDate: string;
    exitDate: string;
    rgpdAut: string;
    departmentId: string;
    departmentName: string;
    professionId: string;
    professionName: string;
    categoryId: string;
    categoryName: string;
    groupId: string;
    groupName: string;
    zoneId: string;
    zoneName: string;
    externalEntityId: string;
    externalEntityName: string;
};

export const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

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
                    throw new Error('Error fetching employees');
                }
                return response.json();
            })
            .then(data => {
                setEmployees(data);
            })
            .catch(error => console.error('Error fetching the employees', error));
    };

    const deleteEmployee = (id: string) => {
        fetch(`https://localhost:7129/api/Employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting employee');
                }
                refreshEmployees();
                console.log(id);
            })
            .catch(error => console.error(error));
            console.log(id);
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

    const handleOpenUpdateModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setOpen(true);
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
                <EmployeeModal open={open} onClose={handleClose} employee={selectedEmployee} />
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
                                            <Typography>Birthday: {employee.birthday}</Typography>
                                            <Typography>Nacionality: {employee.nacionality}</Typography>
                                            <Typography>Gender: {employee.gender ? 'Male' : 'Female'}</Typography>
                                            <Typography>BI Number: {employee.biNumber}</Typography>
                                            <Typography>BI Issuance: {employee.biIssuance}</Typography>
                                            <Typography>BI Validity: {employee.biValidity}</Typography>
                                            <Typography>NIF: {employee.nif}</Typography>
                                            <Typography>Admission Date: {employee.admissionDate}</Typography>
                                            <Typography>Exit Date: {employee.exitDate}</Typography>
                                            <Typography>RGPD Aut: {employee.rgpdAut ? 'Yes' : 'No'}</Typography>
                                            <Typography>Department ID: {employee.departmentId}</Typography>
                                            <Typography>Department Name: {employee.departmentName}</Typography>
                                            <Typography>Profession ID: {employee.professionId}</Typography>
                                            <Typography>Profession Name: {employee.professionName}</Typography>
                                            <Typography>Category ID: {employee.categoryId}</Typography>
                                            <Typography>Category Name: {employee.categoryName}</Typography>
                                            <Typography>Group ID: {employee.groupId}</Typography>
                                            <Typography>Group Name: {employee.groupName}</Typography>
                                            <Typography>Zone ID: {employee.zoneId}</Typography>
                                            <Typography>Zone Name: {employee.zoneName}</Typography>
                                            <Typography>External Entity ID: {employee.externalEntityId}</Typography>
                                            <Typography>External Entity Name: {employee.externalEntityName}</Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                                <IconButton color="primary" aria-label="update-employee" onClick={() => handleOpenUpdateModal(employee)}>
                                    <Edit />
                                </IconButton>
                                <IconButton className='delete-button' color="primary" aria-label="delete-employee" onClick={() => deleteEmployee(employee.id)}>
                                    <Delete />
                                </IconButton>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Footer />
        </div >
    );
}
