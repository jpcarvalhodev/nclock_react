import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import React from 'react';

type Group = {
    id: string;
    name: string;
    description: string;
    paiID: number;
};

interface GroupModalProps {
    open: boolean;
    onClose: () => void;
    group: Group | null;
}

interface NewGroupData {
    [key: string]: string | number;
    name: string;
    description: string;
    paiID: number;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement | undefined },
    ref: ForwardedRef<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} children={props.children || <div />} />;
});

const fields = [
    { key: 'name', label: 'Name', required: true },
    { key: 'description', label: 'Description' },
    { key: 'paiID', label: 'Parent ID' },
];

export default function GroupModal({ open, onClose, group }: GroupModalProps) {
    const [newGroupData, setNewGroupData] = useState<NewGroupData>({
        name: '',
        description: '',
        paiID: 0,
    });

    const handleSubmit = () => {
        if (group) {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/Groups/${group.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroupData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating group');
                    }

                    setNewGroupData({
                        name: '',
                        description: '',
                        paiID: 0,

                    });

                })
                .catch(error => console.error('Error updating group:', error));
        } else {
            const token = localStorage.getItem('token');

            fetch('https://localhost:7129/api/Groups', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroupData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding new group');
                    }

                    setNewGroupData({
                        name: '',
                        description: '',
                        paiID: 0,

                    });

                })
                .catch(error => console.error('Error adding new group:', error));
        }
    };

    useEffect(() => {
        if (group) {
            setNewGroupData(group);
        }
    }, [group]);

    const handleClose = () => {
        handleSubmit();
        onClose();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Add New Group
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        Add and Close
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {fields.map(field => (
                    <Grid item xs={4} key={field.key}>
                        <TextField
                            fullWidth
                            label={field.required ? `${field.label} *` : field.label}
                            variant="outlined"
                            value={newGroupData[field.key]}
                            onChange={(e) =>
                                setNewGroupData((prevData) => ({
                                    ...prevData,
                                    [field.key]: e.target.value,
                                }))
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        </Dialog>
    );
}
