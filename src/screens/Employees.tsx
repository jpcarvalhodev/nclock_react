import { useState, useEffect } from 'react';
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/Employees.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import profileAvatar from '../assets/img/profileAvatar.png';

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

    const handleModalOpen = () => {
        setNewEmployeeData({
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
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div>
            <NavBar />
            <button className='refresh-button' onClick={refreshEmployees}><FontAwesomeIcon icon={faSync} /></button>
            <button className='add-button' onClick={handleModalOpen}><FontAwesomeIcon icon={faPlus} /></button>
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={handleModalClose}>&times;</span>
                    <h2>Add Employee</h2>
                    <form onSubmit={addEmployee}>
                        <label htmlFor="number">Number:</label>
                        <input type="text" id="number" name="number" onChange={e => setNewEmployeeData({ ...newEmployeeData, number: e.target.value })} required />
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" onChange={e => setNewEmployeeData({ ...newEmployeeData, name: e.target.value })} required />
                        <label htmlFor="shortName">Short Name:</label>
                        <input type="text" id="shortName" name="shortName" onChange={e => setNewEmployeeData({ ...newEmployeeData, shortName: e.target.value })} required />
                        <label htmlFor="nameAcronym">Name Acronym:</label>
                        <input type="text" id="nameAcronym" name="nameAcronym" onChange={e => setNewEmployeeData({ ...newEmployeeData, nameAcronym: e.target.value })} required />
                        <label htmlFor="comments">Comments:</label>
                        <input type="text" id="comments" name="comments" onChange={e => setNewEmployeeData({ ...newEmployeeData, comments: e.target.value })} />
                        <label htmlFor="photo">Photo:</label>
                        <input type="text" id="photo" name="photo" onChange={e => setNewEmployeeData({ ...newEmployeeData, photo: e.target.value })} />
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" onChange={e => setNewEmployeeData({ ...newEmployeeData, address: e.target.value })} />
                        <label htmlFor="zipcode">ZIP code:</label>
                        <input type="text" id="zipcode" name="zipcode" onChange={e => setNewEmployeeData({ ...newEmployeeData, zipcode: e.target.value })} />
                        <label htmlFor="locality">Locality:</label>
                        <input type="text" id="locality" name="locality" onChange={e => setNewEmployeeData({ ...newEmployeeData, locality: e.target.value })} />
                        <label htmlFor="village">Village:</label>
                        <input type="text" id="village" name="village" onChange={e => setNewEmployeeData({ ...newEmployeeData, village: e.target.value })} />
                        <label htmlFor="district">District:</label>
                        <input type="text" id="district" name="district" onChange={e => setNewEmployeeData({ ...newEmployeeData, district: e.target.value })} />
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" id="phone" name="phone" onChange={e => setNewEmployeeData({ ...newEmployeeData, phone: e.target.value })} />
                        <label htmlFor="mobile">Mobile:</label>
                        <input type="text" id="mobile" name="mobile" onChange={e => setNewEmployeeData({ ...newEmployeeData, mobile: e.target.value })} />
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" name="email" onChange={e => setNewEmployeeData({ ...newEmployeeData, email: e.target.value })} />
                        <label htmlFor="birthday">Birthday:</label>
                        <input type="text" id="birthday" name="birthday" onChange={e => setNewEmployeeData({ ...newEmployeeData, birthday: e.target.value })} />
                        <label htmlFor="nacionality">Nacionality:</label>
                        <input type="text" id="nacionality" name="nacionality" onChange={e => setNewEmployeeData({ ...newEmployeeData, nacionality: e.target.value })} />
                        <label htmlFor="gender">Gender:</label>
                        <input type="text" id="gender" name="gender" onChange={e => setNewEmployeeData({ ...newEmployeeData, gender: e.target.value })} />
                        <label htmlFor="biNumber">BI Number:</label>
                        <input type="text" id="biNumber" name="biNumber" onChange={e => setNewEmployeeData({ ...newEmployeeData, biNumber: e.target.value })} />
                        <label htmlFor="biIssuance">BI Issuance:</label>
                        <input type="text" id="biIssuance" name="biIssuance" onChange={e => setNewEmployeeData({ ...newEmployeeData, biIssuance: e.target.value })} />
                        <label htmlFor="biValidity">BI Validity:</label>
                        <input type="text" id="biValidity" name="biValidity" onChange={e => setNewEmployeeData({ ...newEmployeeData, biValidity: e.target.value })} />
                        <label htmlFor="nif">NIF:</label>
                        <input type="text" id="nif" name="nif" onChange={e => setNewEmployeeData({ ...newEmployeeData, nif: e.target.value })} />
                        <label htmlFor="admissionDate">Admission Date:</label>
                        <input type="text" id="admissionDate" name="admissionDate" onChange={e => setNewEmployeeData({ ...newEmployeeData, admissionDate: e.target.value })} />
                        <label htmlFor="exitDate">Exit Date:</label>
                        <input type="text" id="exitDate" name="exitDate" onChange={e => setNewEmployeeData({ ...newEmployeeData, exitDate: e.target.value })} />
                        <label htmlFor="rgpdAut">RGPD Authorization:</label>
                        <input type="text" id="rgpdAut" name="rgpdAut" onChange={e => setNewEmployeeData({ ...newEmployeeData, rgpdAut: e.target.value })} />
                        <label htmlFor="departmentId">Department ID:</label>
                        <input type="number" id="departmentId" name="departmentId" onChange={e => setNewEmployeeData({ ...newEmployeeData, departmentId: parseInt(e.target.value) })} />
                        <label htmlFor="professionId">Profession ID:</label>
                        <input type="number" id="professionId" name="professionId" onChange={e => setNewEmployeeData({ ...newEmployeeData, professionId: parseInt(e.target.value) })} />
                        <label htmlFor="categoryId">Category ID:</label>
                        <input type="number" id="categoryId" name="categoryId" onChange={e => setNewEmployeeData({ ...newEmployeeData, categoryId: parseInt(e.target.value) })} />
                        <label htmlFor="groupId">Group ID:</label>
                        <input type="number" id="groupId" name="groupId" onChange={e => setNewEmployeeData({ ...newEmployeeData, groupId: parseInt(e.target.value) })} />
                        <label htmlFor="zoneId">Zone ID:</label>
                        <input type="number" id="zoneId" name="zoneId" onChange={e => setNewEmployeeData({ ...newEmployeeData, zoneId: parseInt(e.target.value) })} />
                        <label htmlFor="externalEntityId">External Entity ID:</label>
                        <input type="number" id="externalEntityId" name="externalEntityId" onChange={e => setNewEmployeeData({ ...newEmployeeData, externalEntityId: parseInt(e.target.value) })} />
                        <button type="submit">Add Employee</button>
                    </form>
                </div >
            </div >
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