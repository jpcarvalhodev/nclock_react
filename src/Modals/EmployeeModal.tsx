import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import React from 'react';

type Employee = {
  [key: string]: any;
  number: number;
  name: string;
  shortName: string;
  nameAcronym: string;
  comments: string;
  photo: string;
  address: string;
  zipcode: string;
  locality: string;
  village: string;
  district: string;
  phone: number;
  mobile: number;
  email: string;
  birthday: Date;
  nacionality: string;
  gender: string;
  biNumber: string;
  biIssuance: Date;
  biValidity: Date;
  nif: number;
  admissionDate: Date;
  exitDate: Date;
  rgpdAut: string;
  departmentId: string;
  departmentName: string;
  professionId: string;
  professionName: string;
  categoryId: string;
  categoryName: string;
  groupId: string;
  groupName: string;
  zoneId: string;
  zoneName: string;
  externalEntityId: string;
  externalEntityName: string;
};

interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const createEmptyEmployeeData = (): Employee => {
  const emptyEmployee: Employee = {
    number: 0,
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
    phone: 0,
    mobile: 0,
    email: '',
    birthday: new Date(),
    nacionality: '',
    gender: '',
    biNumber: '',
    biIssuance: new Date(),
    biValidity: new Date(),
    nif: 0,
    admissionDate: new Date(),
    exitDate: new Date(),
    rgpdAut: '',
    departmentId: '',
    departmentName: '',
    professionId: '',
    professionName: '',
    categoryId: '',
    categoryName: '',
    groupId: '',
    groupName: '',
    zoneId: '',
    zoneName: '',
    externalEntityId: '',
    externalEntityName: '',
  };
  return emptyEmployee;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement | undefined },
  ref: ForwardedRef<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} children={props.children || <div />} />;
});

const fields = [
  { label: 'Number', key: 'number', type: 'number', required: true },
  { label: 'Name', key: 'name', type: 'string', required: true },
  { label: 'Short Name', key: 'shortName', type: 'string', required: true },
  { label: 'Name Acronym', key: 'nameAcronym', type: 'string', required: true },
  { label: 'Comments', key: 'comments', type: 'string' },
  { label: 'Photo', key: 'photo', type: 'string' },
  { label: 'Address', key: 'address', type: 'string' },
  { label: 'Zipcode', key: 'zipcode', type: 'string' },
  { label: 'Locality', key: 'locality', type: 'string' },
  { label: 'Village', key: 'village', type: 'string' },
  { label: 'District', key: 'district', type: 'string' },
  { label: 'Phone', key: 'phone', type: 'number' },
  { label: 'Mobile', key: 'mobile', type: 'number' },
  { label: 'Email', key: 'email', type: 'string' },
  { label: 'Birthday', key: 'birthday', type: 'string' },
  { label: 'Nacionality', key: 'nacionality', type: 'string' },
  { label: 'Gender', key: 'gender', type: 'string' },
  { label: 'BI Number', key: 'biNumber', type: 'string' },
  { label: 'BI Issuance', key: 'biIssuance', type: 'string' },
  { label: 'BI Validity', key: 'biValidity', type: 'string' },
  { label: 'NIF', key: 'nif', type: 'number' },
  { label: 'Admission Date', key: 'admissionDate', type: 'string' },
  { label: 'Exit Date', key: 'exitDate', type: 'string' },
  { label: 'RGPD Aut', key: 'rgpdAut', type: 'string' },
  { label: 'Department ID', key: 'departmentId', type: 'string' },
  { label: 'Department Name', key: 'departmentName', type: 'string' },
  { label: 'Profession ID', key: 'professionId', type: 'string' },
  { label: 'Profession Name', key: 'professionName', type: 'string' },
  { label: 'Category ID', key: 'categoryId', type: 'string' },
  { label: 'Category Name', key: 'categoryName', type: 'string' },
  { label: 'Group ID', key: 'groupId', type: 'string' },
  { label: 'Group Name', key: 'groupName', type: 'string' },
  { label: 'Zone ID', key: 'zoneId', type: 'string' },
  { label: 'Zone Name', key: 'zoneName', type: 'string' },
  { label: 'External Entity ID', key: 'externalEntityId', type: 'string' },
  { label: 'External Entity Name', key: 'externalEntityName', type: 'string' },
];

export default function EmployeeModal({ open, onClose, employee }: EmployeeModalProps) {
  const [newEmployeeData, setNewEmployeeData] = useState<Employee>(createEmptyEmployeeData());

  const setEmployeeData = () => {
    setNewEmployeeData({
      number: 0,
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
      phone: 0,
      mobile: 0,
      email: '',
      birthday: new Date(),
      nacionality: '',
      gender: '',
      biNumber: '',
      biIssuance: new Date(),
      biValidity: new Date(),
      nif: 0,
      admissionDate: new Date(),
      exitDate: new Date(),
      rgpdAut: '',
      departmentId: '',
      departmentName: '',
      professionId: '',
      professionName: '',
      categoryId: '',
      categoryName: '',
      groupId: '',
      groupName: '',
      zoneId: '',
      zoneName: '',
      externalEntityId: '',
      externalEntityName: '',
    });
  };

  const handleSubmit = () => {
    if (employee) {
      const token = localStorage.getItem('token');

      fetch('https://localhost:7129/api/Employees', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployeeData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error updating employee');
          }

          setEmployeeData();

        })
        .catch(error => console.error('Error updating employee:', error));
    } else {
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
            console.log(newEmployeeData);
            throw new Error('Error adding new employee');

          }

          setEmployeeData();

        })
        .catch(error => console.error('Error adding new employee:', error));
    }
  };

  useEffect(() => {
    if (employee) {
      setNewEmployeeData(employee);
    }
  }, [employee]);

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
            Add New Employee
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Add and Close
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {fields.map(field => (
          <Grid item xs={4} key={field.key}>
            {field.key === 'gender' || field.key === 'rgpdAut' ? (
              <FormControl fullWidth variant="outlined">
                <InputLabel>{field.label}</InputLabel>
                <Select
                  label={field.required ? `${field.label} *` : field.label}
                  value={newEmployeeData[field.key]}
                  onChange={(e) =>
                    setNewEmployeeData((prevData) => ({
                      ...prevData,
                      [field.key]: e.target.value,
                    }))
                  }
                >
                  {field.key === 'gender' ?
                    [
                      <MenuItem value="male" key="male">Male</MenuItem>,
                      <MenuItem value="female" key="female">Female</MenuItem>,
                      <MenuItem value="" key="">Other</MenuItem>,
                    ]
                    :
                    [
                      <MenuItem value="yes" key="yes">Yes</MenuItem>,
                      <MenuItem value="no" key="no">No</MenuItem>,
                    ]
                  }
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                label={field.required ? `${field.label} *` : field.label}
                variant="outlined"
                value={newEmployeeData[field.key]}
                onChange={(e) =>
                  setNewEmployeeData((prevData) => ({
                    ...prevData,
                    [field.key]: e.target.value,
                  }))
                }
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Dialog>
  );
}
