import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { PersonAdd, Refresh, ExpandMore as ExpandMoreIcon, Edit, Delete } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import ZonesModal from "../Modals/ZonesModal";

export type Zone = {
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

export const Zones = () => {
    const [zones, setZones] = useState<Zone[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    const fetchZones = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Zones', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching zones data');
                }
                return response.json();
            })
            .then(data => {
                setZones(data);
            })
            .catch(error => console.error('Error fetching the zones', error));
    };

    const deleteZone = (id: string) => {
        fetch(`https://localhost:7129/api/Zones/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting zone');
                }
                refreshZones();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchZones();
    }, []);

    const refreshZones = () => {
        fetchZones();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (zone: Zone) => {
        setSelectedZone(zone);
        setOpen(true);
    };

    return (
        <div>
            <NavBar />
            <div>
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshZones}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-zone" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <ZonesModal open={open} onClose={handleClose} zone={selectedZone} />
            </div>
            <div>
                <Grid className='grid-table' container spacing={3}>
                    {zones.map((zone, index) => (
                        <Grid item xs={12} key={zone.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography className='grid-name'>{zone.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Type: {zone.type}</Typography>
                                            <Typography>Description: {zone.description}</Typography>
                                            <Typography>Acronym: {zone.acronym}</Typography>
                                            <Typography>Address: {zone.address}</Typography>
                                            <Typography>ZIP Code: {zone.zipCode}</Typography>
                                            <Typography>Locality: {zone.locality}</Typography>
                                            <Typography>Village: {zone.village}</Typography>
                                            <Typography>District: {zone.district}</Typography>
                                            <Typography>Phone: {zone.phone}</Typography>
                                            <Typography>Mobile: {zone.mobile}</Typography>
                                            <Typography>Email: {zone.email}</Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                                <IconButton color="primary" aria-label="update-group" onClick={() => handleOpenUpdateModal(zone)}>
                                    <Edit />
                                </IconButton>
                                <IconButton className='delete-button' color="primary" aria-label="delete-group" onClick={() => deleteZone(zone.id)}>
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