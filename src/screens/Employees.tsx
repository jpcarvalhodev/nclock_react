import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/Employees.css';
import profileAvatar from '../assets/img/profileAvatar.png';
import { EmployeeModal } from "../Modals/EmployeeModal";
import IconButton from '@mui/material/IconButton';
import { PersonAdd, Refresh } from '@mui/icons-material';

type Employee = {
    id: number;
    number: string;
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
    phone: string;
    mobile: string;
    email: string;
    birthday: string;
    nacionality: string;
    gender: string;
    biNumber: string;
    biIssuance: string;
    biValidity: string;
    nif: string;
    admissionDate: string;
    exitDate: string;
    rgpdAut: string;
    departmentId: number;
    professionId: number;
    categoryId: number;
    groupId: number;
    zoneId: number;
    externalEntityId: number;
};

export const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [open, setOpen] = useState(false);
    

    const fetchEmployees = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Employees', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados dos funcionários');
                }
                return response.json();
            })
            .then(data => setEmployees(data))
            .catch(error => console.error('Erro ao buscar os funcionários:', error));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    

    const refreshEmployees = () => {
        fetchEmployees();
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
            <IconButton className='refresh-button' color="primary" aria-label="refresh" onClick={refreshEmployees}>
                <Refresh />
            </IconButton>
            <IconButton className='add-button'  color="primary" aria-label="add-employee" onClick={handleOpen}>
                <PersonAdd />
            </IconButton>
            <EmployeeModal open={open} onClose={handleClose} />
            </div>
            <div className="table-container">
                <table>
                    <div className="employees-content">
                        {/* <Filter filters={filters} handleFilterSelection={handleFilterSelection} /> */}
                        <thead>
                            <tr>
                                <th title="Number">Number</th>
                                <th title="Name">Name</th>
                                <th title="ShortName">ShortName</th>
                                <th title="NameAcronym">NameAcronym</th>
                                <th title="Comments">Comments</th>
                                <th title="Photo">Photo</th>
                                <th title="Address">Address</th>
                                <th title="ZIPcode">ZIPcode</th>
                                <th title="Locality">Locality</th>
                                <th title="Village">Village</th>
                                <th title="District">District</th>
                                <th title="Phone">Phone</th>
                                <th title="Mobile">Mobile</th>
                                <th title="Email">Email</th>
                                <th title="Birthday">Birthday</th>
                                <th title="Nationality">Nationality</th>
                                <th title="Gender">Gender</th>
                                <th title="BInumber">BInumber</th>
                                <th title="BIissuance">BIissuance</th>
                                <th title="BIValidity">BIValidity</th>
                                <th title="NIF">NIF</th>
                                <th title="AdmissionDate">AdmissionDate</th>
                                <th title="ExitDate">ExitDate</th>
                                <th title="RGPDAut">RGPDAut</th>
                                <th title="DepartmentId">DepartmentId</th>
                                <th title="ProfessionId">ProfessionId</th>
                                <th title="CategoryId">CategoryId</th>
                                <th title="GroupId">GroupId</th>
                                <th title="ZoneId">ZoneId</th>
                                <th title="ExternalEntityId">ExternalEntityId</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id}>
                                    <td title={employee.number}>{employee.number}</td>
                                    <td title={employee.name}>{employee.name}</td>
                                    <td title={employee.shortName}>{employee.shortName}</td>
                                    <td title={employee.nameAcronym}>{employee.nameAcronym}</td>
                                    <td title={employee.comments}>{employee.comments}</td>
                                    <td>
                                        {employee.photo
                                            ? <img src={employee.photo} alt="Employee Photo" title={employee.photo} />
                                            : <img src={profileAvatar} alt="Profile" />
                                        }
                                    </td>
                                    <td title={employee.address}>{employee.address}</td>
                                    <td title={employee.zipcode}>{employee.zipcode}</td>
                                    <td title={employee.locality}>{employee.locality}</td>
                                    <td title={employee.village}>{employee.village}</td>
                                    <td title={employee.district}>{employee.district}</td>
                                    <td title={employee.phone}>{employee.phone}</td>
                                    <td title={employee.mobile}>{employee.mobile}</td>
                                    <td title={employee.email}>{employee.email}</td>
                                    <td title={employee.birthday}>{employee.birthday}</td>
                                    <td title={employee.nacionality}>{employee.nacionality}</td>
                                    <td title={employee.gender}>{employee.gender}</td>
                                    <td title={employee.biNumber}>{employee.biNumber}</td>
                                    <td title={employee.biIssuance}>{employee.biIssuance}</td>
                                    <td title={employee.biValidity}>{employee.biValidity}</td>
                                    <td title={employee.nif}>{employee.nif}</td>
                                    <td title={employee.admissionDate}>{employee.admissionDate}</td>
                                    <td title={employee.exitDate}>{employee.exitDate}</td>
                                    <td title={employee.rgpdAut}>{employee.rgpdAut}</td>
                                    <td title={employee.departmentId ? employee.departmentId.toString() : ''}>{employee.departmentId}</td>
                                    <td title={employee.professionId ? employee.professionId.toString() : ''}>{employee.professionId}</td>
                                    <td title={employee.categoryId ? employee.categoryId.toString() : ''}>{employee.categoryId}</td>
                                    <td title={employee.groupId ? employee.groupId.toString() : ''}>{employee.groupId}</td>
                                    <td title={employee.zoneId ? employee.zoneId.toString() : ''}>{employee.zoneId}</td>
                                    <td title={employee.externalEntityId ? employee.externalEntityId.toString() : ''}>{employee.externalEntityId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </div>
                </table>
            </div>
            <Footer />
        </div >
    );
}