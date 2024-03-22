import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Avatar } from "@mui/material";
import { PersonAdd, Refresh, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import CategoriesModal from "../Modals/CategoriesModal";

type Category = {
    id: string,
    code: number,
    description: string,
    acronym: string,
};

export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);

    const fetchCategories = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching categories data');
                }
                return response.json();
            })
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.error('Error fetching the categories', error));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const refreshCategories = () => {
        fetchCategories();
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
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshCategories}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-category" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <CategoriesModal open={open} onClose={handleClose} />
            </div>
            <div>
                <Grid className='grid-table' container spacing={3}>
                    {categories.map((category, index) => (
                        <Grid item xs={12} key={category.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                <div className='avatar-name'>
                                    <Typography className='grid-name'>{category.description}</Typography>
                                </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Code: {category.code}</Typography>
                                            <Typography>Description: {category.description}</Typography>
                                            <Typography>Acronym: {category.acronym}</Typography>
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