import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Employee } from '../helpers/Types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavBar.css';
import profileAvatar from '../assets/img/navbar/profileAvatar.png';
import person from '../assets/img/navbar/person.png';
import categories from '../assets/img/navbar/categories.png';
import departments from '../assets/img/navbar/departments.png';
import externalEntities from '../assets/img/navbar/externalEntities.png';
import groups from '../assets/img/navbar/groups.png';
import professions from '../assets/img/navbar/professions.png';
import zones from '../assets/img/navbar/zones.png';
import fraccoes from '../assets/img/navbar/fraccoes.png';
import types from '../assets/img/navbar/types.png';
import fonts from '../assets/img/navbar/fonts.png';
import interventionAreas from '../assets/img/navbar/interventionAreas.png';
import businessAreas from '../assets/img/navbar/businessAreas.png';
import internalContacts from '../assets/img/navbar/internalContacts.png';
import Dropdown from 'react-bootstrap/Dropdown';
import pin from '../assets/img/navbar/pin.png';
import unpin from '../assets/img/navbar/unpin.png';
import sisnidlogo from '../assets/img/navbar/sisnidlogo.png';
import nclock from '../assets/img/navbar/nclock.webp';
import naccess from '../assets/img/navbar/naccess.webp';
import nvisitor from '../assets/img/navbar/nvisitor.webp';
import npark from '../assets/img/navbar/npark.webp';
import ndoor from '../assets/img/navbar/ndoor.webp';
import npatrol from '../assets/img/navbar/npatrol.webp';
import ncard from '../assets/img/navbar/ncard.webp';
import nview from '../assets/img/navbar/nview.webp';
import nsecur from '../assets/img/navbar/nsecur.webp';

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
	const [showNclockRibbon, setShowNclockRibbon] = useState(false);
	const [showNaccessRibbon, setShowNaccessRibbon] = useState(false);
	const [showNvisitorRibbon, setShowNvisitorRibbon] = useState(false);
	const [showNparkRibbon, setShowNparkRibbon] = useState(false);
	const [showNdoorRibbon, setShowNdoorRibbon] = useState(false);
	const [showNpatrolRibbon, setShowNpatrolRibbon] = useState(false);
	const [showNcardRibbon, setShowNcardRibbon] = useState(false);
	const [showNviewRibbon, setShowNviewRibbon] = useState(false);
	const [showNsecurRibbon, setShowNsecurRibbon] = useState(false);
	const [showNclockTab, setShowNclockTab] = useState(false);
	const [showNaccessTab, setShowNaccessTab] = useState(false);
	const [showNvisitorTab, setShowNvisitorTab] = useState(false);
	const [showNparkTab, setShowNparkTab] = useState(false);
	const [showNdoorTab, setShowNdoorTab] = useState(false);
	const [showNpatrolTab, setShowNpatrolTab] = useState(false);
	const [showNcardTab, setShowNcardTab] = useState(false);
	const [showNviewTab, setShowNviewTab] = useState(false);
	const [showNsecurTab, setShowNsecurTab] = useState(false);

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

	const handleRibbonClick = (tabName: string) => {
		switch (tabName) {
			case 'pessoas':
				if (!isRibbonPinned || activeTab === 'pessoas') {
					toggleRibbon(setShowPessoasRibbon);
					setActiveTab(prevTab => prevTab === 'pessoas' ? '' : 'pessoas');
				}
				break;
			case 'dispositivos':
				if (!isRibbonPinned || activeTab === 'dispositivos') {
					toggleRibbon(setShowDispositivosRibbon);
					setActiveTab(prevTab => prevTab === 'dispositivos' ? '' : 'dispositivos');
				}
				break;
			case 'configuracao':
				if (!isRibbonPinned || activeTab === 'configuracao') {
					toggleRibbon(setShowConfiguracaoRibbon);
					setActiveTab(prevTab => prevTab === 'configuracao' ? '' : 'configuracao');
				}
				break;
			case 'ajuda':
				if (!isRibbonPinned || activeTab === 'ajuda') {
					toggleRibbon(setShowAjudaRibbon);
					setActiveTab(prevTab => prevTab === 'ajuda' ? '' : 'ajuda');
				}
				break;
			case 'nclock':
				toggleRibbon(setShowNclockRibbon);
				setActiveTab('nclock');
				break;
			case 'naccess':
				toggleRibbon(setShowNaccessRibbon);
				setActiveTab('naccess');
				break;
			case 'nvisitor':
				toggleRibbon(setShowNvisitorRibbon);
				setActiveTab('nvisitor');
				break;
			case 'npark':
				toggleRibbon(setShowNparkRibbon);
				setActiveTab('npark');
				break;
			case 'ndoor':
				toggleRibbon(setShowNdoorRibbon);
				setActiveTab('ndoor');
				break;
			case 'npatrol':
				toggleRibbon(setShowNpatrolRibbon);
				setActiveTab('npatrol');
				break;
			case 'ncard':
				toggleRibbon(setShowNcardRibbon);
				setActiveTab('ncard');
				break;
			case 'nview':
				toggleRibbon(setShowNviewRibbon);
				setActiveTab('nview');
				break;
			case 'nsecur':
				toggleRibbon(setShowNsecurRibbon);
				setActiveTab('nsecur');
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		switch (activeTab) {
			case 'nclock':
				navigate('/nclockdashboard');
				break;
			case 'naccess':
				navigate('/#');
				break;
			case 'nvisitor':
				navigate('/#');
				break;
			case 'npark':
				navigate('/#');
				break;
			case 'ndoor':
				navigate('/#');
				break;
			case 'npatrol':
				navigate('/#');
				break;
			case 'ncard':
				navigate('/#');
				break;
			case 'nview':
				navigate('/#');
				break;
			case 'nsecur':
				navigate('/#');
				break;
			default:
				break;
		}
	}, [activeTab, navigate]);

	const handleTab = (tabName: string) => {
		setActiveTab(tabName);
	};

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

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
				<Dropdown className='dropdown-icon'>
					<Dropdown.Toggle variant="basic" id="dropdown-basic">
						<span className="logo">NID Software</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<div>
							<a href='/dashboard' className="image-text">
								<img src={sisnidlogo} alt="início" />
								<span>Início</span>
							</a>
							<a href='#' className="image-text" onClick={() => handleTab('nclock')}>
								<img src={nclock} alt="nclock" />
								<span>Nclock</span>
							</a>
							<a href='#' className="image-text" onClick={() => handleTab('naccess')}>
								<img src={naccess} alt="naccess" />
								<span>Naccess</span>
							</a>
							<a href='#' className="image-text" onClick={() => handleTab('nvisitor')}>
								<img src={nvisitor} alt="nvisitor" />
								<span>Nvisitor</span>
							</a>
							<a href='#' className="image-text" onClick={() => handleTab('npark')}>
								<img src={npark} alt="npark" />
								<span>Npark</span>
							</a>
							<a href='#' className="image-text" onClick={() => handleTab('ndoor')}>
								<img src={ndoor} alt="ndoor" />
								<span>Ndoor</span>
							</a>
							<a href='#' className="image-text" onClick={() => handleTab('npatrol')}>
								<img src={npatrol} alt="npatrol" />
								<span>Npatrol</span>
							</a>
							<a href='#' className="image-text" onClick={() => handleTab('ncard')}>
								<img src={ncard} alt="ncard" />
								<span>Ncard</span>
							</a>
							<a href='#' className="image-text" onClick={() => handleTab('nview')}>
								<img src={nview} alt="nview" />
								<span>Nview</span>
							</a>
							<a href='#' className="image-text" onClick={() => handleTab('nsecur')}>
								<img src={nsecur} alt="nsecur" />
								<span>Nsecur</span>
							</a>
						</div>
					</Dropdown.Menu>
				</Dropdown>
				<ul className="nav nav-tabs">
					{showNclockTab && (
						<li className={`nav-item ${activeTab === 'nclock' ? 'active' : ''}`}>
							<a className="nav-link nclock-tab" id="nclock-tab" onClick={() => handleRibbonClick('nclock')}>Nclock</a>
						</li>
					)}
					{showNaccessTab && (
						<li className={`nav-item ${activeTab === 'naccess' ? 'active' : ''}`}>
							<a className="nav-link naccess-tab" id="naccess-tab" onClick={() => handleRibbonClick('naccess')}>Naccess</a>
						</li>
					)}
					{showNvisitorTab && (
						<li className={`nav-item ${activeTab === 'nvisitor' ? 'active' : ''}`}>
							<a className="nav-link nvisitor-tab" id="nvisitor-tab" onClick={() => handleRibbonClick('nvisitor')}>Nvisitor</a>
						</li>
					)}
					{showNparkTab && (
						<li className={`nav-item ${activeTab === 'npark' ? 'active' : ''}`}>
							<a className="nav-link npark-tab" id="npark-tab" onClick={() => handleRibbonClick('npark')}>Npark</a>
						</li>
					)}
					{showNdoorTab && (
						<li className={`nav-item ${activeTab === 'ndoor' ? 'active' : ''}`}>
							<a className="nav-link ndoor-tab" id="ndoor-tab" onClick={() => handleRibbonClick('ndoor')}>Ndoor</a>
						</li>
					)}
					{showNpatrolTab && (
						<li className={`nav-item ${activeTab === 'npatrol' ? 'active' : ''}`}>
							<a className="nav-link npatrol-tab" id="npatrol-tab" onClick={() => handleRibbonClick('npatrol')}>Npatrol</a>
						</li>
					)}
					{showNcardTab && (
						<li className={`nav-item ${activeTab === 'ncard' ? 'active' : ''}`}>
							<a className="nav-link ncard-tab" id="ncard-tab" onClick={() => handleRibbonClick('ncard')}>Ncard</a>
						</li>
					)}
					{showNviewTab && (
						<li className={`nav-item ${activeTab === 'nview' ? 'active' : ''}`}>
							<a className="nav-link nview-tab" id="nview-tab" onClick={() => handleRibbonClick('nview')}>Nview</a>
						</li>
					)}
					{showNsecurTab && (
						<li className={`nav-item ${activeTab === 'nsecur' ? 'active' : ''}`}>
							<a className="nav-link nsecur-tab" id="nsecur-tab" onClick={() => handleRibbonClick('nsecur')}>Nsecur</a>
						</li>
					)}
					<li className={`nav-item ${activeTab === 'pessoas' ? 'active' : ''}`}>
						<a className="nav-link pessoas-tab" id="pessoas-tab" onClick={() => handleRibbonClick('pessoas')}>Pessoas</a>
					</li>
					<li className={`nav-item ${activeTab === 'dispositivos' ? 'active' : ''}`}>
						<a className="nav-link dispositivos-tab" id="dispositivos-tab" onClick={() => handleRibbonClick('dispositivos')}>Dispositivos</a>
					</li>
					<li className={`nav-item ${activeTab === 'configuracao' ? 'active' : ''}`}>
						<a className="nav-link configuracao-tab" id="configuracao-tab" onClick={() => handleRibbonClick('configuracao')}>Configuração</a>
					</li>
					<li className={`nav-item ${activeTab === 'ajuda' ? 'active' : ''}`}>
						<a className="nav-link ajuda-tab" id="ajuda-tab" onClick={() => handleRibbonClick('ajuda')}>Ajuda</a>
					</li>
				</ul>
				<div className="user-section">
					<Dropdown className='dropdown-icon'>
						<Dropdown.Toggle variant="basic" id="dropdown-basic-2">
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