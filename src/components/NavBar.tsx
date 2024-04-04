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
	const [activeTab, setActiveTab] = useState('pessoas');
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

	useEffect(() => {
		const token = localStorage.getItem('token');

		fetch('https://localhost:7129/api/Employees', {
			headers: new Headers({
				'Authorization': `Bearer ${token}`,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				if (data) {
					setEmployee(data);
				} else {
					console.error('No data received');
				}
			})
			.catch(error => console.error('Error:', error));
	}, []);

	const handlePessoasClick = () => {
		setShowRibbon((prevState) => !prevState);
		setActiveTab('pessoas');
	};

	const handleDispositivosClick = () => {
		setShowDispositivos((prevState) => !prevState);
		setActiveTab('dispositivos');
	};

	const handleConfiguracaoClick = () => {
		setShowConfiguracao((prevState) => !prevState);
		setActiveTab('configuracao');
	};

	const handleAjudaClick = () => {
		setShowAjuda((prevState) => !prevState);
		setActiveTab('ajuda');
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
										<button type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={person} alt="Profile" />
											</span>
											<span className="text">Pessoas</span>
										</button>
									</div>
									<div className="grid-container">
										<Link to="/Employees" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar funcionários" />
											</span>
											<span className="text">Funcionários</span>
										</Link>
										<button type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar visitantes" />
											</span>
											<span className="text">Visitantes</span>
										</button>
										<button type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar funcionários externos" />
											</span>
											<span className="text">Funcionários Externos</span>
										</button>
										<button type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar contactos" />
											</span>
											<span className="text">Contactos</span>
										</button>
										<button type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar utentes" />
											</span>
											<span className="text">Utentes</span>
										</button>
										<button type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar provisórios" />
											</span>
											<span className="text">Provisórios</span>
										</button>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Pessoas</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className="grid-container">
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
										<Link to="/ExternalEntities" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={externalEntities} alt="avatar provisórios" />
											</span>
											<span className="text">Entidades Externas</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Organização</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};
