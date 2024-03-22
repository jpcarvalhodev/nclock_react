import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Avatar } from "@mui/material";
import { PersonAdd, Refresh, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import DepartmentsModal from "../Modals/DepartmentsModal";

type Department = {
    id: string,
    code: number,
    name: string,
    description: string,
    paiId: number,
};

export const Departments = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [open, setOpen] = useState(false);

    const fetchDepartments = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Departaments', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching departments data');
                }
                return response.json();
            })
            .then(data => {
                setDepartments(data);
            })
            .catch(error => console.error('Error fetching the departments', error));
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const refreshDepartments = () => {
        fetchDepartments();
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
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshDepartments}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-department" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <DepartmentsModal open={open} onClose={handleClose} />
            </div>
            <div>
                <Grid className='grid-table' container spacing={3}>
                    {departments.map((department, index) => (
                        <Grid item xs={12} key={department.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                <div className='avatar-name'>
                                    <Typography className='grid-name'>{department.name}</Typography>
                                </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Code: {department.code}</Typography>
                                            <Typography>Name: {department.name}</Typography>
                                            <Typography>Description: {department.description}</Typography>
                                            <Typography>Parent ID: {department.paiId}</Typography>
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