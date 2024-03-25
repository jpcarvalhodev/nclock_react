import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Avatar } from "@mui/material";
import { PersonAdd, Refresh, ExpandMore as ExpandMoreIcon, Edit, Delete } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import ProfessionsModal from "../Modals/ProfessionsModal";

export type Profession = {
    id: string,
    code: number,
    description: string,
    acronym: string,
};

export const Professions = () => {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);

    const fetchProfessions = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Professions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching professions data');
                }
                return response.json();
            })
            .then(data => {
                setProfessions(data);
            })
            .catch(error => console.error('Error fetching the professions', error));
    };

    const deleteProfession = (id: string) => {
        fetch(`https://localhost:7129/api/Professions/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting profession');
                }
                refreshProfessions();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchProfessions();
    }, []);

    const refreshProfessions = () => {
        fetchProfessions();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (profession: Profession) => {
        setSelectedProfession(profession);
        setOpen(true);
    };

    return (
        <div>
            <NavBar />
            <div>
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshProfessions}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-profession" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <ProfessionsModal open={open} onClose={handleClose} profession={selectedProfession} />
            </div>
            <div>
                <Grid className='grid-table' container spacing={3}>
                    {professions.map((profession, index) => (
                        <Grid item xs={12} key={profession.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                <div className='avatar-name'>
                                    <Typography className='grid-name'>{profession.acronym}</Typography>
                                </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Code: {profession.code}</Typography>
                                            <Typography>Description: {profession.description}</Typography>
                                            <Typography>Acronym: {profession.acronym}</Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                                <IconButton color="primary" aria-label="update-group" onClick={() => handleOpenUpdateModal(profession)}>
                                    <Edit />
                                </IconButton>
                                <IconButton className='delete-button' color="primary" aria-label="delete-group" onClick={() => deleteProfession(profession.id)}>
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