import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Avatar } from "@mui/material";
import { PersonAdd, Refresh, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import ProfessionsModal from "../Modals/ProfessionsModal";

type Profession = {
    id: string,
    code: number,
    description: string,
    acronym: string,
};

export const Professions = () => {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [open, setOpen] = useState(false);

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
                <ProfessionsModal open={open} onClose={handleClose} />
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
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Footer />
        </div >
    );
}