import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import React from 'react';

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
    DateInserted: string,
    DateUpdated: string,
};

interface ExternalEntityModalProps {
    open: boolean;
    onClose: () => void;
    externalEntity: ExternalEntity | null;
}

interface NewExternalEntityData {
    [key: string]: string | number;
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
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement | undefined },
    ref: ForwardedRef<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} children={props.children || <div />} />;
});

const fields = [
    { key: 'name', type: 'string', required: true, label: 'Name' },
    { key: 'Comments', type: 'string', label: 'Comments' },
    { key: 'CommercialName', type: 'string', label: 'Commercial Name' },
    { key: 'ResponsibleName', type: 'string', label: 'Responsible Name' },
    { key: 'Photo', type: 'string', label: 'Photo' },
    { key: 'Address', type: 'string', label: 'Address' },
    { key: 'ZIPCode', type: 'string', label: 'ZIP Code' },
    { key: 'Locality', type: 'string', label: 'Locality' },
    { key: 'Village', type: 'string', label: 'Village' },
    { key: 'District', type: 'string', label: 'District' },
    { key: 'Phone', type: 'number', label: 'Phone' },
    { key: 'Mobile', type: 'number', label: 'Mobile' },
    { key: 'Email', type: 'string', label: 'Email' },
    { key: 'WWW', type: 'string', label: 'WWW' },
    { key: 'Fax', type: 'number', label: 'Fax' },
    { key: 'NIF', type: 'number', required: true, label: 'NIF' },
    { key: 'DateInserted', type: 'string', label: 'Date Inserted' },
    { key: 'DateUpdated', type: 'string', label: 'Date Updated' },
];

export default function ExternalEntityModal({ open, onClose, externalEntity }: ExternalEntityModalProps) {
    const [newExternalEntityData, setNewExternalEntityData] = useState<NewExternalEntityData>({
        name: '',
        Comments: '',
        CommercialName: '',
        ResponsibleName: '',
        Photo: '',
        Address: '',
        ZIPCode: '',
        Locality: '',
        Village: '',
        District: '',
        Phone: 0,
        Mobile: 0,
        Email: '',
        WWW: '',
        Fax: 0,
        NIF: 0,
        DateInserted: '',
        DateUpdated: '',
    });

    const handleSubmit = () => {
        if (externalEntity) {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/ExternalEntities/${externalEntity.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExternalEntityData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating external entity');
                    }

                    setNewExternalEntityData({
                        name: '',
                        Comments: '',
                        CommercialName: '',
                        ResponsibleName: '',
                        Photo: '',
                        Address: '',
                        ZIPCode: '',
                        Locality: '',
                        Village: '',
                        District: '',
                        Phone: 0,
                        Mobile: 0,
                        Email: '',
                        WWW: '',
                        Fax: 0,
                        NIF: 0,
                        DateInserted: '',
                        DateUpdated: '',

                    });

                })
                .catch(error => console.error('Error updating external entity:', error));
        } else {
            const token = localStorage.getItem('token');

            fetch(`https://localhost:7129/api/ExternalEntities`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExternalEntityData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding new external entity');
                    }

                    setNewExternalEntityData({
                        name: '',
                        Comments: '',
                        CommercialName: '',
                        ResponsibleName: '',
                        Photo: '',
                        Address: '',
                        ZIPCode: '',
                        Locality: '',
                        Village: '',
                        District: '',
                        Phone: 0,
                        Mobile: 0,
                        Email: '',
                        WWW: '',
                        Fax: 0,
                        NIF: 0,
                        DateInserted: '',
                        DateUpdated: '',

                    });

                })
                .catch(error => console.error('Error adding new external entity:', error));
        }
    };

    useEffect(() => {
        if (externalEntity) {
            setNewExternalEntityData(externalEntity);
        }
    }, [externalEntity]);

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
                            value={newExternalEntityData[field.key]}
                            onChange={(e) =>
                                setNewExternalEntityData((prevData) => ({
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
