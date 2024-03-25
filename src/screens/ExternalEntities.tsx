import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton, Accordion, AccordionSummary, AccordionDetails, Typography, Avatar, Grid } from "@mui/material";
import { PersonAdd, Refresh, ExpandMore as ExpandMoreIcon, Edit, Delete } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import ExternalEntityModal from "../Modals/ExternalEntitiesModal";
import profileAvatar from '../assets/img/profileAvatar.png';

export type ExternalEntity = {
    id: string,
    name: string,
    Comments: string,
    CommercialName: string,
    ResponsibleName: string,
    Photo: string,
    Address: string,
    ZIPCode: string,
    Locality: string,
    Village: string,
    District: string,
    Phone: number,
    Mobile: number,
    Email: string,
    WWW: string,
    Fax: number,
    NIF: number,
    DateInserted: string,
    DateUpdated: string,
};

export const ExternalEntities = () => {
    const [externalEntities, setExternalEntities] = useState<ExternalEntity[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedExternalEntity, setSelectedExternalEntity] = useState<ExternalEntity | null>(null);

    const fetchExternalEntities = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/ExternalEntities', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching external entities data');
                }
                return response.json();
            })
            .then(data => {
                setExternalEntities(data);
            })
            .catch(error => console.error('Error fetching the external entities', error));
    };

    const deleteExternalEntity = (id: string) => {
        fetch(`https://localhost:7129/api/ExternalEntities/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting external entity');
                }
                refreshExternalEntities();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchExternalEntities();
    }, []);

    const refreshExternalEntities = () => {
        fetchExternalEntities();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (externalEntity: ExternalEntity) => {
        setExternalEntities(externalEntities.filter(e => e.id !== externalEntity.id));
        setOpen(true);
    };

    return (
        <div>
            <NavBar />
            <div>
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshExternalEntities}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-external-entity" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <ExternalEntityModal open={open} onClose={handleClose} externalEntity={selectedExternalEntity} />
            </div>
            <div className="table-container-external-entities">
                <Grid container spacing={3}>
                    {externalEntities.map((externalEntity, index) => (
                        <Grid item xs={12} sm={6} key={externalEntity.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <div className='avatar-name'>
                                        <Avatar alt="External Entity Photo" src={externalEntity.Photo ? externalEntity.Photo : profileAvatar} />
                                        <Typography className='grid-name'>{externalEntity.name}</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        ID: {externalEntity.id}<br />
                                        Name: {externalEntity.name}<br />
                                        Comments: {externalEntity.Comments}<br />
                                        Commercial Name: {externalEntity.CommercialName}<br />
                                        Responsible Name: {externalEntity.ResponsibleName}<br />
                                        Photo: {externalEntity.Photo}<br />
                                        Address: {externalEntity.Address}<br />
                                        ZIP Code: {externalEntity.ZIPCode}<br />
                                        Locality: {externalEntity.Locality}<br />
                                        Village: {externalEntity.Village}<br />
                                        District: {externalEntity.District}<br />
                                        Phone: {externalEntity.Phone}<br />
                                        Mobile: {externalEntity.Mobile}<br />
                                        Email: {externalEntity.Email}<br />
                                        WWW: {externalEntity.WWW}<br />
                                        Fax: {externalEntity.Fax}<br />
                                        NIF: {externalEntity.NIF}<br />
                                        Date Inserted: {externalEntity.DateInserted}<br />
                                        Date Updated: {externalEntity.DateUpdated}<br />
                                    </Typography>
                                </AccordionDetails>
                                <IconButton color="primary" aria-label="update-external-entity" onClick={() => handleOpenUpdateModal(externalEntity)}>
                                    <Edit />
                                </IconButton>
                                <IconButton className='delete-button' color="primary" aria-label="delete-external-entity" onClick={() => deleteExternalEntity(externalEntity.id)}>
                                    <Delete />
                                </IconButton>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Footer />
        </div>
    );
}