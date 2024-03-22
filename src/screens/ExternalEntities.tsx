import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton, Accordion, AccordionSummary, AccordionDetails, Typography, Avatar } from "@mui/material";
import { PersonAdd, Refresh, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import ExternalEntityModal from "../Modals/ExternalEntitiesModal";
import profileAvatar from '../assets/img/profileAvatar.png';

type ExternalEntity = {
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
    DateInserted: Date,
    DateUpdated: Date,
};

export const ExternalEntities = () => {
    const [externalEntities, setExternalEntities] = useState<ExternalEntity[]>([]);
    const [open, setOpen] = useState(false);

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
                <ExternalEntityModal open={open} onClose={handleClose} />
            </div>
            <div className="table-container-external-entities">
                {externalEntities.map((externalEntity, index) => (
                    <Accordion key={externalEntity.id}>
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
                                Date Inserted: {new Date(externalEntity.DateInserted).toLocaleDateString()}<br />
                                Date Updated: {new Date(externalEntity.DateUpdated).toLocaleDateString()}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
            <Footer />
        </div>
    );
}