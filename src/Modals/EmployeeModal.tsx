import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

type EmployeeModalProps = {
  open: boolean;
  onClose: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EmployeeModal: React.FC<EmployeeModalProps> = ({ open, onClose }) => {
  const [newEmployeeData, setNewEmployeeData] = useState({
    number: '',
    name: '',
    shortName: '',
    nameAcronym: '',
    comments: '',
    photo: '',
    address: '',
    zipcode: '',
    locality: '',
    village: '',
    district: '',
    phone: '',
    mobile: '',
    email: '',
    birthday: '',
    nacionality: '',
    gender: '',
    biNumber: '',
    biIssuance: '',
    biValidity: '',
    nif: '',
    admissionDate: '',
    exitDate: '',
    rgpdAut: '',
    departmentId: 0,
    professionId: 0,
    categoryId: 0,
    groupId: 0,
    zoneId: 0,
    externalEntityId: 0,
  });

  const addEmployee = () => {
    const token = localStorage.getItem('token');

    fetch('https://localhost:7129/api/Employees', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployeeData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar novo funcionário');
        }
        
      })
      .catch(error => console.error('Erro ao adicionar funcionário:', error));
  };

  const handleClose = () => {
    addEmployee();
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
            Adicionar Funcionário
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Salvar
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <TextField label="Number" variant="outlined" required />
        <TextField label="Name" variant="outlined" required />
        <TextField label="Short Name" variant="outlined" required />
        <TextField label="Name Acronym" variant="outlined" required />
        <TextField label="Comments" variant="outlined" />
        <TextField label="Photo" variant="outlined" />
        <TextField label="Address" variant="outlined" />
        <TextField label="Zipcode" variant="outlined" />
        <TextField label="Locality" variant="outlined" />
        <TextField label="Village" variant="outlined" />
        <TextField label="District" variant="outlined" />
        <TextField label="Phone" variant="outlined" />
        <TextField label="Mobile" variant="outlined" />
        <TextField label="Email" variant="outlined" />
        <TextField label="Birthday" variant="outlined" />
        <TextField label="Nacionality" variant="outlined" />
        <TextField label="Gender" variant="outlined" />
        <TextField label="BI Number" variant="outlined" />
        <TextField label="BI Issuance" variant="outlined" />
        <TextField label="BI Validity" variant="outlined" />
        <TextField label="NIF" variant="outlined" />
        <TextField label="Admission Date" variant="outlined" />
        <TextField label="Exit Date" variant="outlined" />
        <TextField label="RGPD Aut" variant="outlined" />
        <TextField label="Department ID" variant="outlined" />
        <TextField label="Profession ID" variant="outlined" />
        <TextField label="Category ID" variant="outlined" />
        <TextField label="Group ID" variant="outlined" />
        <TextField label="Zone ID" variant="outlined" />
        <TextField label="External Entity ID" variant="outlined" />
      </List>
    </Dialog>
  );
};