import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, TextField, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

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

type NewExternalEntityData = Partial<ExternalEntity>;

interface ExternalEntityModalProps {
    open: boolean;
    onClose: () => void;
    externalEntity: ExternalEntity | null;
}

export default function ExternalEntityModal({ open, onClose, externalEntity }: ExternalEntityModalProps) {
    const initialExternalEntityData: NewExternalEntityData = {
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
        DateInserted: new Date(),
        DateUpdated: new Date(),
    };
    const [newExternalEntityData, setNewExternalEntityData] = useState<NewExternalEntityData>(initialExternalEntityData);

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
                        DateInserted: new Date(),
                        DateUpdated: new Date(),

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
                        DateInserted: new Date(),
                        DateUpdated: new Date(),
                    });

                })
                .catch(error => console.error('Error adding new external entity:', error));
        }
    };

    useEffect(() => {
        if (externalEntity) {
            setNewExternalEntityData(externalEntity);
        } else {
            setNewExternalEntityData(initialExternalEntityData);
        }
    }, [externalEntity, initialExternalEntityData]);

    const handleClose = () => {
        handleSubmit();
        onClose();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Slide}
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
                {Object.entries(newExternalEntityData).map(([key, value]) => (
                    <Grid item xs={4} key={key}>
                        <TextField
                            fullWidth
                            label={key}
                            variant="outlined"
                            value={value || ''}
                            onChange={(e) =>
                                setNewExternalEntityData((prevData) => ({
                                    ...prevData,
                                    [key]: e.target.value,
                                }))
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        </Dialog>
    );
}
