import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import React from 'react';

type Zone = {
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

interface ZoneModalProps {
    open: boolean;
    onClose: () => void;
    zone: Zone | null;
}

interface NewZoneData {
    [key: string]: string | number;
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
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement | undefined },
    ref: ForwardedRef<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} children={props.children || <div />} />;
});

const fields = [
    { key: 'type', label: 'Type', type: 'string' },
    { key: 'name', label: 'Name', type: 'string', required: true },
    { key: 'description', label: 'Description', type: 'string' },
    { key: 'acronym', label: 'Acronym', type: 'string', required: true },
    { key: 'address', label: 'Address', type: 'string' },
    { key: 'zipCode', label: 'ZIP Code', type: 'string' },
    { key: 'locality', label: 'Locality', type: 'string' },
    { key: 'village', label: 'Village', type: 'string' },
    { key: 'district', label: 'District', type: 'string' },
    { key: 'phone', label: 'Phone', type: 'number' },
    { key: 'mobile', label: 'Mobile', type: 'number' },
    { key: 'email', label: 'Email', type: 'string' },
];

export default function ZoneModal({ open, onClose, zone }: ZoneModalProps) {
    const [newZoneData, setNewZoneData] = useState<NewZoneData>({
        type: '',
        name: '',
        description: '',
        acronym: '',
        address: '',
        zipCode: '',
        locality: '',
        village: '',
        district: '',
        phone: 0,
        mobile: 0,
        email: '',
    });

    const handleSubmit = () => {
        if (zone) {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/Zones/${zone.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newZoneData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating zone');
                    }

                    setNewZoneData({
                        type: '',
                        name: '',
                        description: '',
                        acronym: '',
                        address: '',
                        zipCode: '',
                        locality: '',
                        village: '',
                        district: '',
                        phone: 0,
                        mobile: 0,
                        email: '',

                    });

                })
                .catch(error => console.error('Error updating zone:', error));
        } else {
            const token = localStorage.getItem('token');

            fetch('https://localhost:7129/api/Zones', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newZoneData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding new zone');
                    }

                    setNewZoneData({
                        type: '',
                        name: '',
                        description: '',
                        acronym: '',
                        address: '',
                        zipCode: '',
                        locality: '',
                        village: '',
                        district: '',
                        phone: 0,
                        mobile: 0,
                        email: '',

                    });

                })
                .catch(error => console.error('Error adding new zone:', error));
        }
    };

    useEffect(() => {
        if (zone) {
            setNewZoneData(zone);
        }
    }, [zone]);

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
                        Add New External Entity
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
                            value={newZoneData[field.key]}
                            onChange={(e) =>
                                setNewZoneData((prevData) => ({
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
