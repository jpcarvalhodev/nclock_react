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
import pin from '../assets/img/pin.png';
import unpin from '../assets/img/unpin.png';

interface MyTokenPayload extends JwtPayload {
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
}

export const NavBar = () => {
	const [user, setUser] = useState({ name: '', email: '' });
	const [employee, setEmployee] = useState<Employee | null>(null);
	const [showPessoasRibbon, setShowPessoasRibbon] = useState(false);
	const [showDispositivosRibbon, setShowDispositivosRibbon] = useState(false);
	const [showConfiguracaoRibbon, setShowConfiguracaoRibbon] = useState(false);
	const [showAjudaRibbon, setShowAjudaRibbon] = useState(false);
	const [activeTab, setActiveTab] = useState('');
	const [isRibbonPinned, setIsRibbonPinned] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		loadInitialToken();
		loadRibbonState();
	}, []);

	const loadInitialToken = () => {
		const token = localStorage.getItem('token');

		if (token) {
			const decoded = jwtDecode<MyTokenPayload>(token);

			const userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
			const userEmail = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

			setUser({ name: userName, email: userEmail });
		}
	};

	const loadRibbonState = () => {
		const ribbonPinned = localStorage.getItem('ribbonPinned') === 'true';
		const pessoasShown = localStorage.getItem('showPessoasRibbon') === 'true';
		const dispositivosShown = localStorage.getItem('showDispositivosRibbon') === 'true';
		const configuracaoShown = localStorage.getItem('showConfiguracaoRibbon') === 'true';
		const ajudaShown = localStorage.getItem('showAjudaRibbon') === 'true';
		setShowPessoasRibbon(ribbonPinned || pessoasShown);
		setShowDispositivosRibbon(ribbonPinned || dispositivosShown);
		setShowConfiguracaoRibbon(ribbonPinned || configuracaoShown);
		setShowAjudaRibbon(ribbonPinned || ajudaShown);
		setIsRibbonPinned(ribbonPinned);
	};

	const toggleRibbon = (setterFunction: React.Dispatch<React.SetStateAction<boolean>>) => {
		setterFunction(prevState => !prevState);
	};

	const handlePessoasClick = () => {
		if (!isRibbonPinned || activeTab === 'pessoas') {
			toggleRibbon(setShowPessoasRibbon);
			setActiveTab(prevTab => prevTab === 'pessoas' ? '' : 'pessoas');
		}
	};

	const handleDispositivosClick = () => {
		if (!isRibbonPinned || activeTab === 'dispositivos') {
			toggleRibbon(setShowDispositivosRibbon);
			setActiveTab(prevTab => prevTab === 'dispositivos' ? '' : 'dispositivos');
		}
	};

	const handleConfiguracaoClick = () => {
		if (!isRibbonPinned || activeTab === 'configuracao') {
			toggleRibbon(setShowConfiguracaoRibbon);
			setActiveTab(prevTab => prevTab === 'configuracao' ? '' : 'configuracao');
		}
	};

	const handleAjudaClick = () => {
		if (!isRibbonPinned || activeTab === 'ajuda') {
			toggleRibbon(setShowAjudaRibbon);
			setActiveTab(prevTab => prevTab === 'ajuda' ? '' : 'ajuda');
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	const handleLogoClick = () => {
		navigate('/dashboard');
	}

	useEffect(() => {
		const handleStateChange = () => {
			localStorage.setItem('showPessoasRibbon', String(showPessoasRibbon));
			localStorage.setItem('showDispositivosRibbon', String(showDispositivosRibbon));
			localStorage.setItem('showConfiguracaoRibbon', String(showConfiguracaoRibbon));
			localStorage.setItem('showAjudaRibbon', String(showAjudaRibbon));
			localStorage.setItem('ribbonPinned', String(isRibbonPinned));
		};

		const timer = setTimeout(handleStateChange, 10);

		return () => clearTimeout(timer);
	}, [isRibbonPinned]);

	const togglePinRibbon = () => {
		const newState = !isRibbonPinned;
		setIsRibbonPinned(newState);

		if (newState) {
			switch (activeTab) {
				case 'pessoas':
					setShowPessoasRibbon(newState);
					break;
				case 'dispositivos':
					setShowDispositivosRibbon(newState);
					break;
				case 'configuracao':
					setShowConfiguracaoRibbon(newState);
					break;
				case 'ajuda':
					setShowAjudaRibbon(newState);
					break;
				default:
					break;
			}
		} else {
			setShowPessoasRibbon(false);
			setShowDispositivosRibbon(false);
			setShowConfiguracaoRibbon(false);
			setShowAjudaRibbon(false);
		}
	};

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

			{showPessoasRibbon && (
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
										<Link to='/Visitors' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar visitantes" />
											</span>
											<span className="text">Visitantes</span>
										</Link>
										<Link to='/ExternalEmployees' type="button" className="btn btn-light ribbon-button-funcext">
											<span className="icon">
												<img src={person} alt="avatar funcionários externos" />
											</span>
											<span className="text">Funcionários Externos</span>
										</Link>
										<Link to='/Contacts' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar contactos" />
											</span>
											<span className="text">Contactos</span>
										</Link>
										<Link to='/User' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="avatar utentes" />
											</span>
											<span className="text">Utentes</span>
										</Link>
										<Link to='/Temporaries' type="button" className="btn btn-light ribbon-button">
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
								<div className="title-container">
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
										<Link to="/Employees" type="button" className="btn btn-light ribbon-button-ent">
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
								<div className="title-container">
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
								<div className="title-container">
									<span className="title">Informações</span>
								</div>
							</div>
						</div>
					</div>
					<div className="ribbon-toggle">
						<img
							src={isRibbonPinned ? unpin : pin}
							alt="Lock/Unlock Ribbon"
							onClick={togglePinRibbon}
							className='ribbon-icon'
						/>
					</div>
				</div>
			)}
		</nav>
	);
};