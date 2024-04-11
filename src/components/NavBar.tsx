import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Employee } from '../helpers/Types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavBar.css';
import profileAvatar from '../assets/img/profileAvatar.png';
import person from '../assets/img/person.png';
import categories from '../assets/img/categories.png';
import departments from '../assets/img/departments.png';
import externalEntities from '../assets/img/externalEntities.png';
import groups from '../assets/img/groups.png';
import professions from '../assets/img/professions.png';
import zones from '../assets/img/zones.png';
import fraccoes from '../assets/img/fraccoes.png';
import types from '../assets/img/types.png';
import fonts from '../assets/img/fonts.png';
import interventionAreas from '../assets/img/interventionAreas.png';
import businessAreas from '../assets/img/businessAreas.png';
import internalContacts from '../assets/img/internalContacts.png';
import Dropdown from 'react-bootstrap/Dropdown';

interface MyTokenPayload extends JwtPayload {
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
}

export const NavBar = () => {
	const [user, setUser] = useState({ name: '', email: '' });
	const [employee, setEmployee] = useState<Employee | null>(null);
	const [showRibbon, setShowRibbon] = useState(false);
	const [showDispositivos, setShowDispositivos] = useState(false);
	const [showConfiguracao, setShowConfiguracao] = useState(false);
	const [showAjuda, setShowAjuda] = useState(false);
	const [activeTab, setActiveTab] = useState('');
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

	const handlePessoasClick = () => {
		setShowRibbon((prevState) => !prevState);
		if (showRibbon) {
			setActiveTab('');
		} else {
			setActiveTab('pessoas');
		}
	};

	const handleDispositivosClick = () => {
		setShowDispositivos((prevState) => !prevState);
		if (showDispositivos) {
			setActiveTab('');
		} else {
			setActiveTab('dispositivos');
		}
	};

	const handleConfiguracaoClick = () => {
		setShowConfiguracao((prevState) => !prevState);
		if (showConfiguracao) {
			setActiveTab('');
		} else {
			setActiveTab('configuracao');
		}
	};

	const handleAjudaClick = () => {
		setShowAjuda((prevState) => !prevState);
		if (showAjuda) {
			setActiveTab('');
		} else {
			setActiveTab('ajuda');
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	const handleLogoClick = () => {
		navigate('/dashboard');
	}

	return (
		<nav data-role="ribbonmenu">
			<div className="nav-container">
				<div className="logo">
					<a className="nav-link active" onClick={handleLogoClick}>Nclock</a>
				</div>
				<ul className="nav nav-tabs">
					<li className={`nav-item ${activeTab === 'pessoas' ? 'active' : ''}`}>
						<a className="nav-link pessoas-tab" id="pessoas-tab" onClick={handlePessoasClick}>Pessoas</a>
					</li>
					<li className={`nav-item ${activeTab === 'dispositivos' ? 'active' : ''}`}>
						<a className="nav-link dispositivos-tab" id="dispositivos-tab" onClick={handleDispositivosClick}>Dispositivos</a>
					</li>
					<li className={`nav-item ${activeTab === 'configuracao' ? 'active' : ''}`}>
						<a className="nav-link configuracao-tab" id="configuracao-tab" onClick={handleConfiguracaoClick}>Configuração</a>
					</li>
					<li className={`nav-item ${activeTab === 'ajuda' ? 'active' : ''}`}>
						<a className="nav-link ajuda-tab" id="ajuda-tab" onClick={handleAjudaClick}>Ajuda</a>
					</li>
				</ul>
				<Dropdown className='user-section'>
					<Dropdown.Toggle className='dropdown-icon' variant="basic" id="dropdown-basic">
						<span className='user-info'>{user.name}</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<div className='dropdown-content'>
							<img src={employee?.photo || profileAvatar} alt="user photo" />
							<Dropdown.Item disabled>{user.name}</Dropdown.Item>
							<Dropdown.Item disabled>{user.email}</Dropdown.Item>
							<Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
						</div>
					</Dropdown.Menu>
				</Dropdown>
			</div>

			{showRibbon && (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="pessoas" role="tabpanel" aria-labelledby="pessoas-tab">
						<div className="section" id="section-group">
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="/Persons" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={person} alt="Profile" />
											</span>
											<span className="text">Pessoas</span>
										</Link>
									</div>
									<div className="grid-container">
										<Link to="/Employees" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar funcionários" />
											</span>
											<span className="text">Funcionários</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar visitantes" />
											</span>
											<span className="text">Visitantes</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button-funcext">
											<span className="icon">
												<img src={person} alt="avatar funcionários externos" />
											</span>
											<span className="text">Funcionários Externos</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar contactos" />
											</span>
											<span className="text">Contactos</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar utentes" />
											</span>
											<span className="text">Utentes</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar provisórios" />
											</span>
											<span className="text">Provisórios</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Pessoas</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className="grid-container-organizacao">
										<Link to="/Departments" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={departments} alt="avatar funcionários" />
											</span>
											<span className="text">Departamentos</span>
										</Link>
										<Link to="/Professions" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={professions} alt="avatar visitantes" />
											</span>
											<span className="text">Profissões</span>
										</Link>
										<Link to="/Groups" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={groups} alt="avatar funcionários externos" />
											</span>
											<span className="text">Grupos</span>
										</Link>
										<Link to="/Zones" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={zones} alt="avatar contactos" />
											</span>
											<span className="text">Zonas</span>
										</Link>
										<Link to="/Categories" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={categories} alt="avatar utentes" />
											</span>
											<span className="text">Categorias</span>
										</Link>
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={fraccoes} alt="avatar provisórios" />
											</span>
											<span className="text">Fracções</span>
										</Link>
									</div>
								</div>
								<div className="title-container-organizacao">
									<span className="title">Organização</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-entidades'>
										<Link to="/externalentities" type="button" className="btn btn-light ribbon-button ribbon-button-entidades">
											<span className="icon">
												<img src={externalEntities} alt="Profile" />
											</span>
											<span className="text">Entidades Externas</span>
										</Link>
									</div>
									<div className="grid-container-entidades">
										<Link to="/Employees" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={types} alt="avatar funcionários" />
											</span>
											<span className="text">Tipos</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button-ent">
											<span className="icon">
												<img src={fonts} alt="avatar visitantes" />
											</span>
											<span className="text">Fontes</span>
										</Link>
									</div>
									<div className='icon-text-entidades'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-entidades">
											<span className="icon">
												<img src={interventionAreas} alt="Profile" />
											</span>
											<span className="text">Áreas de Intervenção</span>
										</Link>
									</div>
									<div className='icon-text-entidades'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-entidades">
											<span className="icon">
												<img src={businessAreas} alt="Profile" />
											</span>
											<span className="text">Áreas de Negócios</span>
										</Link>
									</div>
								</div>
								<div className="title-container-entidades">
									<span className="title">Entidades</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-informacoes'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-entidades">
											<span className="icon">
												<img src={internalContacts} alt="Profile" />
											</span>
											<span className="text">Contactos Internos</span>
										</Link>
									</div>
								</div>
								<div className="title-container-informacoes">
									<span className="title">Informações</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};
