import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { ForwardedRef, forwardRef, useState } from 'react';
import React from 'react';

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
}

interface NewCategoryData {
    [key: string]: string | number;
    code: number,
    description: string,
    acronym: string,
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement | undefined },
    ref: ForwardedRef<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} children={props.children || <div />} />;
});

const fields = [
    { key: 'code', label: 'Code', required: true },
    { key: 'description', label: 'Description', required: true },
    { key: 'acronym', label: 'Acronym' },
];

export default function CategoryModal({ open, onClose }: CategoryModalProps) {
    const [newCategoryData, setNewCategoryData] = useState<NewCategoryData>({
        code: 0,
        description: '',
        acronym: '',
    });

    const addCategory = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Categories', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategoryData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error adding category');
                }

                setNewCategoryData({
                    code: 0,
                    description: '',
                    acronym: '',
                });

            })
            .catch(error => console.error('Error adding category:', error));
    };

    const handleClose = () => {
        addCategory();
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
                        Add New Category
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
                            value={newCategoryData[field.key]}
                            onChange={(e) =>
                                setNewCategoryData((prevData) => ({
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
