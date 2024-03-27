import '../css/PagesStyles.css';
import profileAvatar from '../assets/img/profileAvatar.png';
import departments from '../assets/img/departments.png';
import groups from '../assets/img/groups.png';
import categories from '../assets/img/categories.png';
import professions from '../assets/img/professions.png';
import zones from '../assets/img/zones.png';
import externalEntities from '../assets/img/externalEntities.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { MdArrowDropDown } from 'react-icons/md';

interface MyTokenPayload extends JwtPayload {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
}

export const NavBar = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwtDecode<MyTokenPayload>(token);

            const userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            const userEmail = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

            setUser({ name: userName, email: userEmail });
        }
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav data-role="ribbonmenu" className='ribbonmenu'>
            <ul className="tabs-holder">
                <p onClick={() => navigate('/Dashboard')}>Nclock</p>
                <li><a href="#section-1-1">Pessoas</a></li>
                <li><a href="#section-1-2">Configuração</a></li>
                <li><a href="#section-1-3">Ajuda</a></li>
                <div className="user-profile" onClick={toggleDropdown}> {/* Toggle dropdown on user profile click */}
                    <img src={profileAvatar} alt="Profile Avatar" />
                    <span>{user.name} <MdArrowDropDown /></span>
                </div>
                {showDropdown && (
                    <div className="dropdown-menu">
                        <img src={profileAvatar} alt="Profile Avatar" />
                        <p>Nome: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
            </ul>
            <div className="content-holder">
                <div className="section" id="section-1-1">
                    <div className="group">
                        <button className="ribbon-button">
                            <span className="icon">
                                <img src={profileAvatar} />
                            </span>
                            <span className="caption">Pessoas</span>
                        </button>
                        <div className="ribbon-toggle-group">
                            <button className="ribbon-icon-button" onClick={() => navigate('/Employees')}>
                                <span className="icon">
                                    <img src={profileAvatar} />
                                </span>
                                <span className="caption">Empregados</span>
                            </button>
                            <button className="ribbon-icon-button">
                                <span className="icon">
                                    <img src={profileAvatar} />
                                </span>
                                <span className="caption">Empregados Externos</span>
                            </button>
                            <button className="ribbon-icon-button">
                                <span className="icon">
                                    <img src={profileAvatar} />
                                </span>
                                <span className="caption">Utentes</span>
                            </button>
                            <button className="ribbon-icon-button">
                                <span className="icon">
                                    <img src={profileAvatar} />
                                </span>
                                <span className="caption">Visitantes</span>
                            </button>
                            <button className="ribbon-icon-button">
                                <span className="icon">
                                    <img src={profileAvatar} />
                                </span>
                                <span className="caption">Contactos</span>
                            </button>
                            <button className="ribbon-icon-button">
                                <span className="icon">
                                    <img src={profileAvatar} />
                                </span>
                                <span className="caption">Provisórios</span>
                            </button>
                        </div>
                        <span className="title">Pessoas</span>
                    </div>
                    <div className="group">
                        <div className="ribbon-toggle-group">
                            <button className="ribbon-icon-button" onClick={() => navigate('/Departments')}>
                                <span className="icon">
                                    <img src={departments} />
                                </span>
                                <span className="caption">Departamentos</span>
                            </button>

                            <button className="ribbon-icon-button" onClick={() => navigate('/Groups')}>
                                <span className="icon">
                                    <img src={groups} />
                                </span>
                                <span className="caption">Grupos</span>
                            </button>

                            <button className="ribbon-icon-button" onClick={() => navigate('/Categories')}>
                                <span className="icon">
                                    <img src={categories} />
                                </span>
                                <span className="caption">Categorias</span>
                            </button>

                            <button className="ribbon-icon-button" onClick={() => navigate('/Professions')}>
                                <span className="icon">
                                    <img src={professions} />
                                </span>
                                <span className="caption">Profissões</span>
                            </button>

                            <button className="ribbon-icon-button" onClick={() => navigate('/Zones')}>
                                <span className="icon">
                                    <img src={zones} />
                                </span>
                                <span className="caption">Zonas</span>
                            </button>

                            <button className="ribbon-icon-button" onClick={() => navigate('/ExternalEntities')}>
                                <span className="icon">
                                    <img src={externalEntities} />
                                </span>
                                <span className="caption">Entidades Externas</span>
                            </button>
                        </div>
                        <span className="title">Organização</span>
                    </div>
                </div>
            </div>
        </nav >
    );
};
