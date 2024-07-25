import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Employee } from '../helpers/Types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavBar.css';
import profileAvatar from '../assets/img/navbar/navbar/profileAvatar.png';
import person from '../assets/img/navbar/pessoas/person.png';
import categories from '../assets/img/navbar/pessoas/categories.png';
import departments from '../assets/img/navbar/pessoas/departments.png';
import externalEntities from '../assets/img/navbar/pessoas/externalEntities.png';
import groups from '../assets/img/navbar/pessoas/groups.png';
import professions from '../assets/img/navbar/pessoas/professions.png';
import zones from '../assets/img/navbar/pessoas/zones.png';
import fraccoes from '../assets/img/navbar/pessoas/fraccoes.png';
import types from '../assets/img/navbar/pessoas/types.png';
import fonts from '../assets/img/navbar/pessoas/fonts.png';
import interventionAreas from '../assets/img/navbar/pessoas/interventionAreas.png';
import businessAreas from '../assets/img/navbar/pessoas/businessAreas.png';
import internalContacts from '../assets/img/navbar/pessoas/internalContacts.png';
import Dropdown from 'react-bootstrap/Dropdown';
import pin from '../assets/img/navbar/navbar/pin.png';
import unpin from '../assets/img/navbar/navbar/unpin.png';
import sisnidlogo from '../assets/img/navbar/navbar/sisnidlogo.png';
import nclock from '../assets/img/navbar/navbar/nclock.webp';
import naccess from '../assets/img/navbar/navbar/naccess.webp';
import nvisitor from '../assets/img/navbar/navbar/nvisitor.webp';
import npark from '../assets/img/navbar/navbar/npark.webp';
import ndoor from '../assets/img/navbar/navbar/ndoor.webp';
import npatrol from '../assets/img/navbar/navbar/npatrol.webp';
import ncard from '../assets/img/navbar/navbar/ncard.webp';
import nview from '../assets/img/navbar/navbar/nview.webp';
import nsecur from '../assets/img/navbar/navbar/nsecur.webp';
import movement from '../assets/img/navbar/nclock/movement.png';
import presence from '../assets/img/navbar/nclock/presence.png';
import request from '../assets/img/navbar/nclock/request.png';
import all from '../assets/img/navbar/nclock/all.png';
import clipboard from '../assets/img/navbar/nclock/clipboard.png';
import processing from '../assets/img/navbar/nclock/processing.png';
import plusMinus from '../assets/img/navbar/nclock/plusMinus.png';
import hourDatabase from '../assets/img/navbar/nclock/hourDatabase.png';
import segmentation from '../assets/img/navbar/nclock/segmentation.png';
import battery from '../assets/img/navbar/nclock/battery.png';
import clock from '../assets/img/navbar/nclock/clock.png';
import time from '../assets/img/navbar/nclock/time.png';
import workPlan from '../assets/img/navbar/nclock/workPlan.png';
import absent from '../assets/img/navbar/nclock/absent.png';
import unknown from '../assets/img/navbar/nclock/unknown.png';
import work from '../assets/img/navbar/nclock/work.png';
import extra from '../assets/img/navbar/nclock/extra.png';
import limit from '../assets/img/navbar/nclock/limit.png';
import addHour from '../assets/img/navbar/nclock/addHour.png';
import rules from '../assets/img/navbar/nclock/rules.png';
import medicalLeave from '../assets/img/navbar/nclock/medicalLeave.png';
import vacation from '../assets/img/navbar/nclock/vacation.png';
import holidays from '../assets/img/navbar/nclock/holidays.png';
import autorization from '../assets/img/navbar/nclock/autorization.png';
import calendar from '../assets/img/navbar/nclock/calendar.png';
import monthly from '../assets/img/navbar/nclock/monthly.png';
import exchange from '../assets/img/navbar/nclock/exchange.png';
import availability from '../assets/img/navbar/nclock/availability.png';
import plans from '../assets/img/navbar/nclock/plans.png';
import settings from '../assets/img/navbar/nclock/settings.png';
import formation from '../assets/img/navbar/naccess/formation.png';
import motives from '../assets/img/navbar/naccess/motives.png';
import search from '../assets/img/navbar/naccess/search.png';
import imports from '../assets/img/navbar/naccess/imports.png';
import controlPanel from '../assets/img/navbar/naccess/controlPanel.png';
import terminal from '../assets/img/navbar/dispositivos/terminal.png';
import accessPlan from '../assets/img/navbar/dispositivos/accessPlan.png';
import timePlan from '../assets/img/navbar/dispositivos/timePlan.png';
import camera from '../assets/img/navbar/dispositivos/camera.png';
import database from '../assets/img/navbar/configuracao/database.png';
import license from '../assets/img/navbar/configuracao/license.png';
import timeZone from '../assets/img/navbar/configuracao/timeZone.png';
import nacionalities from '../assets/img/navbar/configuracao/nacionalities.png';
import document from '../assets/img/navbar/configuracao/document.png';
import consult from '../assets/img/navbar/configuracao/consult.png';
import dpoConsult from '../assets/img/navbar/configuracao/dpoConsult.png';
import about from '../assets/img/navbar/ajuda/about.png';
import manual from '../assets/img/navbar/ajuda/manual.png';
import helpdesk from '../assets/img/navbar/ajuda/helpdesk.png';
import { TerminalOptionsModal } from '../modals/TerminalOptions';

// Define a interface para o payload do token
interface MyTokenPayload extends JwtPayload {
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
}

// Define os nomes das abas
type RibbonName =
	| 'pessoas'
	| 'dispositivos'
	| 'configuracao'
	| 'ajuda'
	| 'nclock'
	| 'naccess'
	| 'nvisitor'
	| 'npark'
	| 'ndoor'
	| 'npatrol'
	| 'ncard'
	| 'nview'
	| 'nsecur';

// Define a interface para as informações da aba
type TabInfo = {
	setTab: React.Dispatch<React.SetStateAction<boolean>>;
	setRibbon: React.Dispatch<React.SetStateAction<boolean>>;
	localStorageTabKey: string;
	localStorageRibbonKey: string;
	route: string;
};

// Define as propriedades de um item de menu
type MenuItemProps = {
	active: boolean;
	onClick: () => void;
	image: string;
	alt: string;
	label: string;
};

// Define as propriedades do componente
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
	const [showModal, setShowModal] = useState(false);

	// Carrega o token inicial e o estado do ribbon
	useEffect(() => {
		loadInitialToken();
		loadRibbonState();
	}, []);

	// Função para carregar o token inicial
	const loadInitialToken = () => {
		const token = localStorage.getItem('token');

		if (token) {
			const decoded = jwtDecode<MyTokenPayload>(token);

			const userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
			const userEmail = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

			setUser({ name: userName, email: userEmail });
		}
	};

	// Função para carregar o estado do ribbon
	const loadRibbonState = () => {
		const ribbonPinned = localStorage.getItem('ribbonPinned') === 'true';

		const nclockShown = localStorage.getItem('showNclockTab') === 'true';
		const naccessShown = localStorage.getItem('showNaccessTab') === 'true';
		const nvisitorShown = localStorage.getItem('showNvisitorTab') === 'true';
		const nparkShown = localStorage.getItem('showNparkTab') === 'true';
		const ndoorShown = localStorage.getItem('showNdoorTab') === 'true';
		const npatrolShown = localStorage.getItem('showNpatrolTab') === 'true';
		const ncardShown = localStorage.getItem('showNcardTab') === 'true';
		const nviewShown = localStorage.getItem('showNviewTab') === 'true';
		const nsecurShown = localStorage.getItem('showNsecurTab') === 'true';

		setShowNclockTab(nclockShown);
		setShowNaccessTab(naccessShown);
		setShowNvisitorTab(nvisitorShown);
		setShowNparkTab(nparkShown);
		setShowNdoorTab(ndoorShown);
		setShowNpatrolTab(npatrolShown);
		setShowNcardTab(ncardShown);
		setShowNviewTab(nviewShown);
		setShowNsecurTab(nsecurShown);

		if (!ribbonPinned) {
			setShowPessoasRibbon(false);
			setShowDispositivosRibbon(false);
			setShowConfiguracaoRibbon(false);
			setShowAjudaRibbon(false);
			setShowNclockRibbon(false);
			setShowNaccessRibbon(false);
			setShowNvisitorRibbon(false);
			setShowNparkRibbon(false);
			setShowNdoorRibbon(false);
			setShowNpatrolRibbon(false);
			setShowNcardRibbon(false);
			setShowNviewRibbon(false);
			setShowNsecurRibbon(false);
		} else {
			const pessoasShown = localStorage.getItem('showPessoasRibbon') === 'true';
			const dispositivosShown = localStorage.getItem('showDispositivosRibbon') === 'true';
			const configuracaoShown = localStorage.getItem('showConfiguracaoRibbon') === 'true';
			const ajudaShown = localStorage.getItem('showAjudaRibbon') === 'true';

			setShowPessoasRibbon(pessoasShown);
			setShowDispositivosRibbon(dispositivosShown);
			setShowConfiguracaoRibbon(configuracaoShown);
			setShowAjudaRibbon(ajudaShown);
		}

		setIsRibbonPinned(ribbonPinned);
	};

	// Define os itens do menu
	const ribbons: Record<RibbonName, [React.Dispatch<React.SetStateAction<boolean>>, string]> = {
		'pessoas': [setShowPessoasRibbon, 'pessoas'],
		'dispositivos': [setShowDispositivosRibbon, 'dispositivos'],
		'configuracao': [setShowConfiguracaoRibbon, 'configuracao'],
		'ajuda': [setShowAjudaRibbon, 'ajuda'],
		'nclock': [setShowNclockRibbon, 'nclock'],
		'naccess': [setShowNaccessRibbon, 'naccess'],
		'nvisitor': [setShowNvisitorRibbon, 'nvisitor'],
		'npark': [setShowNparkRibbon, 'npark'],
		'ndoor': [setShowNdoorRibbon, 'ndoor'],
		'npatrol': [setShowNpatrolRibbon, 'npatrol'],
		'ncard': [setShowNcardRibbon, 'ncard'],
		'nview': [setShowNviewRibbon, 'nview'],
		'nsecur': [setShowNsecurRibbon, 'nsecur'],
	};

	// Função para lidar com o clique no ribbon
	const handleRibbonClick = (tabName: string) => {
		if (tabName in ribbons) {
			const [setRibbon, ribbonName] = ribbons[tabName as RibbonName];

			if (activeTab === ribbonName) {
				setRibbon(false);
				setActiveTab('');
			} else {
				Object.values(ribbons).forEach(([setRibbon]) => setRibbon(false));
				setActiveTab(ribbonName);
				setRibbon(true);
			}
		}
	};

	// Define os dados das abas
	const tabData: Record<string, TabInfo> = {
		'nclock': {
			setTab: setShowNclockTab,
			setRibbon: setShowNclockRibbon,
			localStorageTabKey: 'showNclockTab',
			localStorageRibbonKey: 'showNclockRibbon',
			route: '/nclock/nclockdashboard',
		},
		'naccess': {
			setTab: setShowNaccessTab,
			setRibbon: setShowNaccessRibbon,
			localStorageTabKey: 'showNaccessTab',
			localStorageRibbonKey: 'showNaccessRibbon',
			route: '/naccess/naccessdashboard',
		},
		'nvisitor': {
			setTab: setShowNvisitorTab,
			setRibbon: setShowNvisitorRibbon,
			localStorageTabKey: 'showNvisitorTab',
			localStorageRibbonKey: 'showNvisitorRibbon',
			route: '#',
		},
		'npark': {
			setTab: setShowNparkTab,
			setRibbon: setShowNparkRibbon,
			localStorageTabKey: 'showNparkTab',
			localStorageRibbonKey: 'showNparkRibbon',
			route: '#',
		},
		'ndoor': {
			setTab: setShowNdoorTab,
			setRibbon: setShowNdoorRibbon,
			localStorageTabKey: 'showNdoorTab',
			localStorageRibbonKey: 'showNdoorRibbon',
			route: '#',
		},
		'npatrol': {
			setTab: setShowNpatrolTab,
			setRibbon: setShowNpatrolRibbon,
			localStorageTabKey: 'showNpatrolTab',
			localStorageRibbonKey: 'showNpatrolRibbon',
			route: '#',
		},
		'ncard': {
			setTab: setShowNcardTab,
			setRibbon: setShowNcardRibbon,
			localStorageTabKey: 'showNcardTab',
			localStorageRibbonKey: 'showNcardRibbon',
			route: '#',
		},
		'nview': {
			setTab: setShowNviewTab,
			setRibbon: setShowNviewRibbon,
			localStorageTabKey: 'showNviewTab',
			localStorageRibbonKey: 'showNviewRibbon',
			route: '#',
		},
		'nsecur': {
			setTab: setShowNsecurTab,
			setRibbon: setShowNsecurRibbon,
			localStorageTabKey: 'showNsecurTab',
			localStorageRibbonKey: 'showNsecurRibbon',
			route: '#',
		},
	};

	// Função para limpar todas as abas
	const clearAllTabs = () => {
		Object.values(tabData).forEach(({ setTab, setRibbon, localStorageTabKey, localStorageRibbonKey }) => {
			setTab(false);
			setRibbon(false);
			localStorage.removeItem(localStorageTabKey);
			localStorage.removeItem(localStorageRibbonKey);
		});
		setActiveTab('');
	};

	// Função para lidar com a aba
	const handleTab = (tabName: string) => {
		clearAllTabs();
		if (tabName === 'dashboard') {
			setActiveTab('');
			navigate('/dashboard');
		} else if (tabData[tabName]) {
			const { setTab, setRibbon, localStorageTabKey, localStorageRibbonKey, route } = tabData[tabName];

			if (activeTab === tabName) {
				setTab(false);
				setRibbon(false);
				localStorage.removeItem(localStorageTabKey);
				localStorage.removeItem(localStorageRibbonKey);
				setActiveTab('');
			} else {
				setTab(true);
				setRibbon(true);
				localStorage.setItem(localStorageTabKey, 'true');
				localStorage.setItem(localStorageRibbonKey, 'true');
				setActiveTab(tabName);
				navigate(route);
			}
		}
	};

	// Função para fazer logout
	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('showNclockTab');
		localStorage.removeItem('showNaccessTab');
		localStorage.removeItem('showNvisitorTab');
		localStorage.removeItem('showNparkTab');
		localStorage.removeItem('showNdoorTab');
		localStorage.removeItem('showNpatrolTab');
		localStorage.removeItem('showNcardTab');
		localStorage.removeItem('showNviewTab');
		localStorage.removeItem('showNsecurTab');
		navigate('/');
	};

	// Atualiza o estado do ribbon no localStorage
	useEffect(() => {
		const handleStateChange = () => {
			localStorage.setItem('showPessoasRibbon', String(showPessoasRibbon));
			localStorage.setItem('showDispositivosRibbon', String(showDispositivosRibbon));
			localStorage.setItem('showConfiguracaoRibbon', String(showConfiguracaoRibbon));
			localStorage.setItem('showAjudaRibbon', String(showAjudaRibbon));
			localStorage.setItem('showNclockRibbon', String(showNclockRibbon));
			localStorage.setItem('showNaccessRibbon', String(showNaccessRibbon));
			localStorage.setItem('showNvisitorRibbon', String(showNvisitorRibbon));
			localStorage.setItem('showNparkRibbon', String(showNparkRibbon));
			localStorage.setItem('showNdoorRibbon', String(showNdoorRibbon));
			localStorage.setItem('showNpatrolRibbon', String(showNpatrolRibbon));
			localStorage.setItem('showNcardRibbon', String(showNcardRibbon));
			localStorage.setItem('showNviewRibbon', String(showNviewRibbon));
			localStorage.setItem('showNsecurRibbon', String(showNsecurRibbon));
			localStorage.setItem('ribbonPinned', String(isRibbonPinned));
		};

		const timer = setTimeout(handleStateChange, 10);

		return () => clearTimeout(timer);
	}, [isRibbonPinned, showPessoasRibbon, showDispositivosRibbon, showConfiguracaoRibbon, showAjudaRibbon]);

	// Função para alternar o estado do ribbon
	const togglePinRibbon = () => {
		const newState = !isRibbonPinned;
		setIsRibbonPinned(newState);

		if (!newState) {
			Object.values(ribbons).forEach(([setRibbon]) => setRibbon(false));
			setActiveTab('');
		} else {
			if (activeTab in ribbons) {
				const [setRibbon] = ribbons[activeTab as RibbonName];
				setRibbon(true);
			}
		}

		localStorage.setItem('ribbonPinned', String(newState));
	};

	// Define o componente do item de menu
	const MenuItem = ({ active, onClick, image, alt, label }: MenuItemProps) => (
		<li
			className={`image-text ${active ? 'active' : ''}`}
			onClick={onClick}
			style={{ display: 'flex', flexDirection: 'row' }}
		>
			<img src={image} alt={alt} />
			<span>{label}</span>
		</li>
	);

	// Função para abrir o modal de opções do terminal
	const toggleTerminalOptionsModal = () => setShowModal(!showModal);

	return (
		<nav data-role="ribbonmenu">
			<div className="nav-container">
				<Dropdown className='dropdown-icon'>
					<Dropdown.Toggle variant="basic" id="dropdown-basic">
						<span className="logo">NSOFTWARES</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<div>
							<MenuItem
								active={activeTab === 'dashboard'}
								onClick={() => handleTab('dashboard')}
								image={sisnidlogo}
								alt="início"
								label="Início"
							/>
							<MenuItem
								active={activeTab === 'nclock'}
								onClick={() => handleTab('nclock')}
								image={nclock}
								alt="nclock"
								label="Nclock"
							/>
							<MenuItem
								active={activeTab === 'naccess'}
								onClick={() => handleTab('naccess')}
								image={naccess}
								alt="naccess"
								label="Naccess"
							/>
							<MenuItem
								active={activeTab === 'nvisitor'}
								onClick={() => handleTab('nvisitor')}
								image={nvisitor}
								alt="nvisitor"
								label="Nvisitor"
							/>
							<MenuItem
								active={activeTab === 'npark'}
								onClick={() => handleTab('npark')}
								image={npark}
								alt="npark"
								label="Npark"
							/>
							<MenuItem
								active={activeTab === 'ndoor'}
								onClick={() => handleTab('ndoor')}
								image={ndoor}
								alt="ndoor"
								label="Ndoor"
							/>
							<MenuItem
								active={activeTab === 'npatrol'}
								onClick={() => handleTab('npatrol')}
								image={npatrol}
								alt="npatrol"
								label="Npatrol"
							/>
							<MenuItem
								active={activeTab === 'ncard'}
								onClick={() => handleTab('ncard')}
								image={ncard}
								alt="ncard"
								label="Ncard"
							/>
							<MenuItem
								active={activeTab === 'nview'}
								onClick={() => handleTab('nview')}
								image={nview}
								alt="nview"
								label="Nview"
							/>
							<MenuItem
								active={activeTab === 'nsecur'}
								onClick={() => handleTab('nsecur')}
								image={nsecur}
								alt="nsecur"
								label="Nsecur"
							/>
						</div>
					</Dropdown.Menu>
				</Dropdown>
				<ul className="nav nav-tabs">
					{showNclockTab && (
						<li className={`nav-item ${activeTab === 'nclock' ? 'active' : ''}`}>
							<a className="nav-link nclock-tab" id="nclock-tab" onClick={() => handleRibbonClick('nclock')}>NCLOCK</a>
						</li>
					)}
					{showNaccessTab && (
						<li className={`nav-item ${activeTab === 'naccess' ? 'active' : ''}`}>
							<a className="nav-link naccess-tab" id="naccess-tab" onClick={() => handleRibbonClick('naccess')}>NACCESS</a>
						</li>
					)}
					{showNvisitorTab && (
						<li className={`nav-item ${activeTab === 'nvisitor' ? 'active' : ''}`}>
							<a className="nav-link nvisitor-tab" id="nvisitor-tab" onClick={() => handleRibbonClick('nvisitor')}>NVISITOR</a>
						</li>
					)}
					{showNparkTab && (
						<li className={`nav-item ${activeTab === 'npark' ? 'active' : ''}`}>
							<a className="nav-link npark-tab" id="npark-tab" onClick={() => handleRibbonClick('npark')}>NPARK</a>
						</li>
					)}
					{showNdoorTab && (
						<li className={`nav-item ${activeTab === 'ndoor' ? 'active' : ''}`}>
							<a className="nav-link ndoor-tab" id="ndoor-tab" onClick={() => handleRibbonClick('ndoor')}>NDOOR</a>
						</li>
					)}
					{showNpatrolTab && (
						<li className={`nav-item ${activeTab === 'npatrol' ? 'active' : ''}`}>
							<a className="nav-link npatrol-tab" id="npatrol-tab" onClick={() => handleRibbonClick('npatrol')}>NPATROL</a>
						</li>
					)}
					{showNcardTab && (
						<li className={`nav-item ${activeTab === 'ncard' ? 'active' : ''}`}>
							<a className="nav-link ncard-tab" id="ncard-tab" onClick={() => handleRibbonClick('ncard')}>NCARD</a>
						</li>
					)}
					{showNviewTab && (
						<li className={`nav-item ${activeTab === 'nview' ? 'active' : ''}`}>
							<a className="nav-link nview-tab" id="nview-tab" onClick={() => handleRibbonClick('nview')}>Nview</a>
						</li>
					)}
					{showNsecurTab && (
						<li className={`nav-item ${activeTab === 'nsecur' ? 'active' : ''}`}>
							<a className="nav-link nsecur-tab" id="nsecur-tab" onClick={() => handleRibbonClick('nsecur')}>NSECUR</a>
						</li>
					)}
					<li className={`nav-item ${activeTab === 'pessoas' ? 'active' : ''}`}>
						<a className="nav-link pessoas-tab" id="pessoas-tab" onClick={() => handleRibbonClick('pessoas')}>PESSOAS</a>
					</li>
					<li className={`nav-item ${activeTab === 'dispositivos' ? 'active' : ''}`}>
						<a className="nav-link dispositivos-tab" id="dispositivos-tab" onClick={() => handleRibbonClick('dispositivos')}>DISPOSITIVOS</a>
					</li>
					<li className={`nav-item ${activeTab === 'configuracao' ? 'active' : ''}`}>
						<a className="nav-link configuracao-tab" id="configuracao-tab" onClick={() => handleRibbonClick('configuracao')}>CONFIGURAÇÃO</a>
					</li>
					<li className={`nav-item ${activeTab === 'ajuda' ? 'active' : ''}`}>
						<a className="nav-link ajuda-tab" id="ajuda-tab" onClick={() => handleRibbonClick('ajuda')}>AJUDA</a>
					</li>
				</ul>
				<div className="user-section">
					<Dropdown className='dropdown-icon'>
						<Dropdown.Toggle variant="basic" id="dropdown-basic-2">
							<span className='user-info'>{user.name}</span>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<div className='dropdown-content'>
								<img src={employee?.photo || profileAvatar} alt="user photo" className='profile-avatar' />
								<Dropdown.Item disabled>{user.name}</Dropdown.Item>
								<Dropdown.Item disabled>{user.email}</Dropdown.Item>
								<Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
							</div>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			{showNclockRibbon && (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="nclock" role="tabpanel" aria-labelledby="nclock-tab">
						<div className="section" id="section-group">
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="/nclock/nclockmovement" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={movement} alt="botão assiduidade movimentos" />
											</span>
											<span className="text">Movimentos</span>
										</Link>
									</div>
									<div>
										<Link to="/nclock/nclockpresence" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={presence} alt="botão assiduidade presenças" />
											</span>
											<span className="text">Presenças</span>
										</Link>
										<Link to='/nclock/nclockrequests' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={request} alt="botão pedidos" />
											</span>
											<span className="text">Pedidos</span>
										</Link>
										<Link to='/nclock/nclockall' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={all} alt="botão todos" />
											</span>
											<span className="text">Todos</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Assiduidade</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className="grid-container-entidades">
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={movement} alt="botão acessos movimentos" />
											</span>
											<span className="text">Movimentos</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={presence} alt="botão acessos presenças" />
											</span>
											<span className="text">Presenças</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Acessos</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={clipboard} alt="botão resultados" />
											</span>
											<span className="text">Resultados</span>
										</Link>
									</div>
									<div className="grid-container">
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={processing} alt="botão processamento" />
											</span>
											<span className="text">Processamento</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={segmentation} alt="botão segmentos" />
											</span>
											<span className="text">Segmentos</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={plusMinus} alt="botão compensações" />
											</span>
											<span className="text">Compensações</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={battery} alt="botão acumulados" />
											</span>
											<span className="text">Acumulados</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={hourDatabase} alt="botão banco de horas" />
											</span>
											<span className="text">Banco de Horas</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={clock} alt="botão trabalho suplementar" />
											</span>
											<span className="text">Trabalho Suplementar</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Resultados</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className="grid-container-entidades">
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={time} alt="botão horários" />
											</span>
											<span className="text">Horários</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={workPlan} alt="botão planos de trabalho" />
											</span>
											<span className="text">Planos de Trabalho</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Acessos</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className="grid-container">
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={absent} alt="botão ausências faltas" />
											</span>
											<span className="text">Ausências Faltas</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={unknown} alt="botão não definido" />
											</span>
											<span className="text">Não Definido</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={work} alt="botão trabalho" />
											</span>
											<span className="text">Trabalho</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={extra} alt="botão extra" />
											</span>
											<span className="text">Extra</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={limit} alt="botão tolerâncias" />
											</span>
											<span className="text">Tolerâncias</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={addHour} alt="botão banco de horas" />
											</span>
											<span className="text">Banco de Horas</span>
										</Link>
									</div>
									<div>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={rules} alt="botão regras" />
											</span>
											<span className="text">Regras</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Códigos de Resultados</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={medicalLeave} alt="botão ausências" />
											</span>
											<span className="text">Ausências</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={vacation} alt="botão férias" />
											</span>
											<span className="text">Férias</span>
										</Link>
									</div>
									<div>
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={vacation} alt="botão alteração de férias" />
											</span>
											<span className="text">Alteração de Férias</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={holidays} alt="botão feriados" />
											</span>
											<span className="text">Feriados</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={autorization} alt="botão autorizações" />
											</span>
											<span className="text">Autorizações</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Alterações</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className="grid-container">
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={calendar} alt="botão calendário" />
											</span>
											<span className="text">Calendário</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={segmentation} alt="botão segmentos" />
											</span>
											<span className="text">Segmentos</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={monthly} alt="botão mensal" />
											</span>
											<span className="text">Mensal</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={exchange} alt="botão trocas" />
											</span>
											<span className="text">Trocas</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={availability} alt="botão disponibilidades" />
											</span>
											<span className="text">Disponibilidades</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={plans} alt="botão planos" />
											</span>
											<span className="text">Planos</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Códigos de Resultados</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-informacoes'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-entidades">
											<span className="icon">
												<img src={settings} alt="botão opções" />
											</span>
											<span className="text">Opções</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Configurações</span>
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
			{showNaccessRibbon && (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="naccess" role="tabpanel" aria-labelledby="naccess-tab">
						<div className="section" id="section-group">
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={movement} alt="botão movimentos" />
											</span>
											<span className="text">Movimentos</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={presence} alt="botão presença" />
											</span>
											<span className="text">Presença</span>
										</Link>
									</div>
									<div>
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={all} alt="botão todos" />
											</span>
											<span className="text">Todos</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={formation} alt="botão formação" />
											</span>
											<span className="text">Formação</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={person} alt="botão visitas" />
											</span>
											<span className="text">Visitas</span>
										</Link>
									</div>
									<div>
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={motives} alt="botão motivos" />
											</span>
											<span className="text">Motivos</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Acessos</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={search} alt="botão revistas" />
											</span>
											<span className="text">Revistas</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={plans} alt="botão planos" />
											</span>
											<span className="text">Planos</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Revistas</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={imports} alt="botão importações" />
											</span>
											<span className="text">Importações</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={controlPanel} alt="botão painel de controlo" />
											</span>
											<span className="text">Painel de Controlo</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={settings} alt="botão opções" />
											</span>
											<span className="text">Opções</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Configuração</span>
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
			{showPessoasRibbon && (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="pessoas" role="tabpanel" aria-labelledby="pessoas-tab">
						<div className="section" id="section-group">
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="/persons/Persons" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={person} alt="botão pessoas" />
											</span>
											<span className="text">Pessoas</span>
										</Link>
									</div>
									<div className="grid-container">
										<Link to="/persons/Employees" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="botão funcionários" />
											</span>
											<span className="text">Funcionários</span>
										</Link>
										<Link to='/persons/Visitors' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="botão visitantes" />
											</span>
											<span className="text">Visitantes</span>
										</Link>
										<Link to='/persons/ExternalEmployees' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="botão funcionários externos" />
											</span>
											<span className="text">Funcionários Externos</span>
										</Link>
										<Link to='/persons/Contacts' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="botão contactos" />
											</span>
											<span className="text">Contactos</span>
										</Link>
										<Link to='/persons/User' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="botão utentes" />
											</span>
											<span className="text">Utentes</span>
										</Link>
										<Link to='/persons/Temporaries' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={person} alt="botão provisórios" />
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
									<div className="grid-container">
										<Link to="/persons/Departments" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={departments} alt="botão funcionários" />
											</span>
											<span className="text">Departamentos</span>
										</Link>
										<Link to="/persons/Professions" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={professions} alt="botão visitantes" />
											</span>
											<span className="text">Profissões</span>
										</Link>
										<Link to="/persons/Groups" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={groups} alt="botão funcionários externos" />
											</span>
											<span className="text">Grupos</span>
										</Link>
										<Link to="/persons/Zones" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={zones} alt="botão contactos" />
											</span>
											<span className="text">Zonas</span>
										</Link>
										<Link to="/persons/Categories" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={categories} alt="botão utentes" />
											</span>
											<span className="text">Categorias</span>
										</Link>
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={fraccoes} alt="botão provisórios" />
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
									<div className='icon-text-informacoes'>
										<Link to="/persons/externalentities" type="button" className="btn btn-light ribbon-button ribbon-button-entidades">
											<span className="icon">
												<img src={externalEntities} alt="botão entidades externas" />
											</span>
											<span className="text">Entidades Externas</span>
										</Link>
									</div>
									<div>
										<Link to="/persons/types" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={types} alt="botão tipos" />
											</span>
											<span className="text">Tipos</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={fonts} alt="botão fontes" />
											</span>
											<span className="text">Fontes</span>
										</Link>
									</div>
									<div className='icon-text-informacoes'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-entidades">
											<span className="icon">
												<img src={interventionAreas} alt="botão áreas de intervenção" />
											</span>
											<span className="text">Áreas de Intervenção</span>
										</Link>
									</div>
									<div className='icon-text-informacoes'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-entidades">
											<span className="icon">
												<img src={businessAreas} alt="botão áreas de negócios" />
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
												<img src={internalContacts} alt="botão contactos internos" />
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
			{showDispositivosRibbon && (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="dispositivos" role="tabpanel" aria-labelledby="dispositivos-tab">
						<div className="section" id="section-group">
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="/devices/terminals" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={terminal} alt="botão terminais" />
											</span>
											<span className="text">Terminais</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={accessPlan} alt="botão planos de acesso" />
											</span>
											<span className="text">Planos de Acesso</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={timePlan} alt="botão planos de horários" />
											</span>
											<span className="text">Planos de Horários</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={clock} alt="botão períodos" />
											</span>
											<span className="text">Períodos</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<button onClick={toggleTerminalOptionsModal} className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={settings} alt="botão opções" />
											</span>
											<span className="text">Opções</span>
										</button>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Terminais</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={camera} alt="botão câmeras" />
											</span>
											<span className="text">Câmeras</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Câmeras</span>
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
			{showConfiguracaoRibbon && (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="configuracao" role="tabpanel" aria-labelledby="configuracao-tab">
						<div className="section" id="section-group">
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={database} alt="botão base de dados" />
											</span>
											<span className="text">Base de Dados</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={imports} alt="botão backup bd" />
											</span>
											<span className="text">Backup BD</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={departments} alt="botão entidade" />
											</span>
											<span className="text">Entidade</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={license} alt="botão licença" />
											</span>
											<span className="text">Licença</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={settings} alt="botão opções" />
											</span>
											<span className="text">Opções</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Base</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={settings} alt="botão opções" />
											</span>
											<span className="text">Opções</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={timeZone} alt="botão fusos horários" />
											</span>
											<span className="text">Fusos Horários</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={nacionalities} alt="botão nacionalidades" />
											</span>
											<span className="text">Nacionalidades</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Geral</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={groups} alt="botão perfis" />
											</span>
											<span className="text">Perfis</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={person} alt="botão utilizadores" />
											</span>
											<span className="text">Utilizadores</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Permissões</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={document} alt="botão documentos" />
											</span>
											<span className="text">Documentos</span>
										</Link>
									</div>
									<div>
										<Link to="#" type="button" className="btn btn-light ribbon-button-ent">
											<span className="icon">
												<img src={types} alt="botão tipos" />
											</span>
											<span className="text">Tipos</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Documentos</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={consult} alt="botão consultar" />
											</span>
											<span className="text">Consultar</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={dpoConsult} alt="botão consultar dpo" />
											</span>
											<span className="text">Consultar DPO</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Actividade do Sistema</span>
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
			{showAjudaRibbon && (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="ajuda" role="tabpanel" aria-labelledby="ajuda-tab">
						<div className="section" id="section-group">
							<div className="group">
								<div className="btn-group" role="group">
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={about} alt="botão acerca de" />
											</span>
											<span className="text">Acerca de</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={manual} alt="botão manual" />
											</span>
											<span className="text">Manual</span>
										</Link>
									</div>
									<div className='icon-text-pessoas'>
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
											<span className="icon">
												<img src={helpdesk} alt="botão helpdesk" />
											</span>
											<span className="text">Helpdesk</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Suporte</span>
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
			{showModal && (
				<TerminalOptionsModal
					open={showModal}
					onClose={() => setShowModal(false)}
					onSave={() => setShowModal(false)}
					initialValues={{}}
				/>
			)}
		</nav>
	);
};