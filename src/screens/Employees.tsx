import React, { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/Employees.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons';

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
    const [showModal, setShowModal] = useState(false);
    const [newEmployeeData, setNewEmployeeData] = useState<Employee>({
        id: 0,
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

    const fetchEmployees = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Employees', {
            headers: {
                'Authorization': `Bearer ${token}`
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
                fetchEmployees();
                setShowModal(false);
            })
            .catch(error => console.error('Erro ao adicionar funcionário:', error));
    };

    const refreshEmployees = () => {
        fetchEmployees();
    };

    return (
        <div>
            <NavBar />
            <button className='add-button' onClick={refreshEmployees}><FontAwesomeIcon icon={faSync} /></button>
            <button className='refresh-button' onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPlus} /></button>
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <h2>Add Employee</h2>
                    <form onSubmit={addEmployee}>
                        {/* Aqui adicione campos de entrada para inserir informações do novo funcionário */}
                        <button type="submit">Add Employee</button>
                    </form>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>ShortName</th>
                            <th>NameAcronym</th>
                            <th>Comments</th>
                            <th>Photo</th>
                            <th>Address</th>
                            <th>ZIPcode</th>
                            <th>Locality</th>
                            <th>Village</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Birthday</th>
                            <th>Nationality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.number}</td>
                                <td>{employee.name}</td>
                                <td>{employee.shortName}</td>
                                <td>{employee.nameAcronym}</td>
                                <td>{employee.comments}</td>
                                <td><img src={employee.photo} alt="Employee Photo" /></td>
                                <td>{employee.address}</td>
                                <td>{employee.zipcode}</td>
                                <td>{employee.locality}</td>
                                <td>{employee.village}</td>
                                <td>{employee.district}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.email}</td>
                                <td>{employee.birthday}</td>
                                <td>{employee.nacionality}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Gender</th>
                            <th>BInumber</th>
                            <th>BIissuance</th>
                            <th>BIValidity</th>
                            <th>NIF</th>
                            <th>AdmissionDate</th>
                            <th>ExitDate</th>
                            <th>RGPDAut</th>
                            <th>DepartmentId</th>
                            <th>ProfessionId</th>
                            <th>CategoryId</th>
                            <th>GroupId</th>
                            <th>ZoneId</th>
                            <th>ExternalEntityId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.gender}</td>
                                <td>{employee.biNumber}</td>
                                <td>{employee.biIssuance}</td>
                                <td>{employee.biValidity}</td>
                                <td>{employee.nif}</td>
                                <td>{employee.admissionDate}</td>
                                <td>{employee.exitDate}</td>
                                <td>{employee.rgpdAut}</td>
                                <td>{employee.departmentId}</td>
                                <td>{employee.professionId}</td>
                                <td>{employee.categoryId}</td>
                                <td>{employee.groupId}</td>
                                <td>{employee.zoneId}</td>
                                <td>{employee.externalEntityId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );

}