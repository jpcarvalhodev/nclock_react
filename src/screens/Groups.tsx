import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { IconButton, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Avatar } from "@mui/material";
import { PersonAdd, Refresh, ExpandMore as ExpandMoreIcon, Edit, Delete } from "@mui/icons-material";
import { Footer } from "../components/Footer";
import '../css/PagesStyles.css';
import GroupsModal from "../Modals/GroupsModal";

export type Group = {
    id: string;
    name: string;
    description: string;
    paiID: number;
};

export const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const fetchGroups = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Groups', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching groups data');
                }
                return response.json();
            })
            .then(data => {
                setGroups(data);
            })
            .catch(error => console.error('Error fetching the groups', error));
    };

    const deleteGroup = (id: string) => {
        fetch(`https://localhost:7129/api/Groups/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting group');
                }
                refreshGroups();
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const refreshGroups = () => {
        fetchGroups();
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenUpdateModal = (group: Group) => {
        setSelectedGroup(group);
        setOpen(true);
    };

    return (
        <div>
            <NavBar />
            <div>
                <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshGroups}>
                    <Refresh />
                </IconButton>
                <IconButton className='add-button' color="primary" aria-label="add-groups" onClick={handleOpen}>
                    <PersonAdd />
                </IconButton>
                <GroupsModal open={open} onClose={handleClose} group={selectedGroup} />
            </div>
            <div>
                <Grid className='grid-table' container spacing={3}>
                    {groups.map((group, index) => (
                        <Grid item xs={12} key={group.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                <div className='avatar-name'>
                                    <Typography className='grid-name'>{group.name}</Typography>
                                </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography>Name: {group.name}</Typography>
                                            <Typography>Description: {group.description}</Typography>
                                            <Typography>Parent ID: {group.paiID}</Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                                <IconButton color="primary" aria-label="update-group" onClick={() => handleOpenUpdateModal(group)}>
                                    <Edit />
                                </IconButton>
                                <IconButton className='delete-button' color="primary" aria-label="delete-group" onClick={() => deleteGroup(group.id)}>
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