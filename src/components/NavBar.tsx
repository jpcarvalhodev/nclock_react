import { useNavigate } from "react-router-dom";
import '../css/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import profileAvatar from '../assets/img/profileAvatar.png';

export const NavBar = () => {
    const [profilePhoto, setProfilePhoto] = useState(profileAvatar);
    const navigate = useNavigate();
    const [user, setUser] = useState<any>({});
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const response = await fetch('https://localhost:7129/api/Employees', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setEmail(data.email);
            } catch (error) {
                console.error('Failed to fetch email:', error);
            }
        };

        fetchEmail();
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(storedUser);
            const storedProfilePhoto = localStorage.getItem('profilePhoto');
            if (storedProfilePhoto) {
                setProfilePhoto(storedProfilePhoto);
            }
        }
    }, []);

    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div className="navbar dark-blue">
            <div className="navbar-container">
                <a href="#home" className="navbar-brand">Nclock</a>
                <div className="navbar-collapse">
                    <ul className="nav">
                        <li className="dropdown">
                            <a href="#home">Categories</a>
                            <div className="dropdown-content">
                                <a href="#home/1">List Categories</a>
                                <a href="#home/2">Search Category</a>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#home">Departaments</a>
                            <div className="dropdown-content">
                                <a href="#home/1">List Departments</a>
                                <a href="#home/1">Search Department</a>
                                <a href="#home/2">Create Department</a>
                                <a href="#home/2">Update Department</a>
                                <a href="#home/2">Delete Department</a>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#home">Employees</a>
                            <div className="dropdown-content">
                                <a href="#home/1">List Employees</a>
                                <a href="#home/1">Search Employee</a>
                                <a href="#home/2">Create Employee</a>
                                <a href="#home/2">Update Employee</a>
                                <a href="#home/2">Delete Employee</a>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#home">External Entities</a>
                            <div className="dropdown-content">
                                <a href="#home/1">List Ext Entities</a>
                                <a href="#home/1">Search Ext Entity</a>
                                <a href="#home/2">Create Ext Entities</a>
                                <a href="#home/2">Update Ext Entities</a>
                                <a href="#home/2">Delete Ext Entities</a>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#home">Groups</a>
                            <div className="dropdown-content">
                                <a href="#home/1">List Groups</a>
                                <a href="#home/2">Search Group</a>
                                <a href="#home/2">Create Groups</a>
                                <a href="#home/2">Update Groups</a>
                                <a href="#home/2">Delete Groups</a>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#home">Professions</a>
                            <div className="dropdown-content">
                                <a href="#home/1">List Professions</a>
                                <a href="#home/2">Search Profession</a>
                                <a href="#home/1">Create Profession</a>
                                <a href="#home/1">Update Profession</a>
                                <a href="#home/1">Delete Profession</a>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#home">Zones</a>
                            <div className="dropdown-content">
                                <a href="#home/1">List Zones</a>
                                <a href="#home/2">Search Zone</a>
                                <a href="#home/1">Create Zone</a>
                                <a href="#home/1">Update Zone</a>
                                <a href="#home/1">Delete Zone</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="navbar-icons">
                    <div className="dropdown">
                        <FontAwesomeIcon icon={faUser} />
                        <ul className="dropdown-menu">
                            <li className="profile-info">
                                <img className="profile-avatar" src={profilePhoto} alt="Profile" />
                                <p className="username-style">{username}</p>
                                <p className="email-style">{email}</p>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                    <FontAwesomeIcon icon={faBell} />
                </div>
            </div>
        </div>
    );
}