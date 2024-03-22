import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { ForwardedRef, forwardRef, useState } from 'react';
import React from 'react';

interface DepartmentModalProps {
    open: boolean;
    onClose: () => void;
}

interface NewDepartmentData {
    [key: string]: string | number;
    code: number,
    name: string,
    description: string,
    paiId: number,
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement | undefined },
    ref: ForwardedRef<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} children={props.children || <div />} />;
});

const fields = [
    { key: 'code', label: 'Code', type: 'number', required: true },
    { key: 'name', label: 'Name', type: 'string', required: true },
    { key: 'description', label: 'Description', type: 'string' },
    { key: 'paiId', label: 'Parent Department ID', type: 'number' },
];

export default function EmployeeModal({ open, onClose }: DepartmentModalProps) {
    const [newDepartmentData, setNewDepartmentData] = useState<NewDepartmentData>({
        code: 0,
        name: '',
        description: '',
        paiId: 0,
    });

    const addDepartment = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Departaments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDepartmentData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error adding department');
                }

                setNewDepartmentData({
                    code: 0,
                    name: '',
                    description: '',
                    paiId: 0,
                });

            })
            .catch(error => console.error('Error adding department:', error));
    };

    const handleClose = () => {
        addDepartment();
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
                        Add New Department
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        Add and Close
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {fields.map(field => (
                    <Grid item xs={3} key={field.key}>
                        <TextField
                            fullWidth
                            label={field.required ? `${field.label} *` : field.label}
                            variant="outlined"
                            value={newDepartmentData[field.key]}
                            onChange={(e) =>
                                setNewDepartmentData((prevData) => ({
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
