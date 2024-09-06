import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Employee } from '../helpers/Types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavBar.css';
import { TerminalOptionsModal } from '../modals/TerminalOptions';
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
import nsoftware from '../assets/img/navbar/navbar/nsoftware.webp';
import nsystem from '../assets/img/navbar/navbar/nsystem.webp';
import napp from '../assets/img/navbar/navbar/napp.webp';
import ncyber from '../assets/img/navbar/navbar/ncyber.webp';
import ndigital from '../assets/img/navbar/navbar/ndigital.webp';
import nserver from '../assets/img/navbar/navbar/nserver.webp';
import naut from '../assets/img/navbar/navbar/naut.webp';
import nequip from '../assets/img/navbar/navbar/nequip.webp';
import nproject from '../assets/img/navbar/navbar/nproject.webp';
import nidgroup from '../assets/img/navbar/navbar/nidgroup.png';
import nidsof from '../assets/img/navbar/navbar/nidsof.webp';
import nidplace from '../assets/img/navbar/navbar/nidplace.webp';
import nidtec from '../assets/img/navbar/navbar/nidtec.png';
import nsmart from '../assets/img/navbar/navbar/nsmart.webp';
import nglasses from '../assets/img/navbar/navbar/nglasses.webp';
import npro from '../assets/img/navbar/navbar/npro.webp';
import npower from '../assets/img/navbar/navbar/npower.webp';
import npost from '../assets/img/navbar/navbar/npost.webp';
import ncity from '../assets/img/navbar/navbar/ncity.png';
import nkio from '../assets/img/navbar/navbar/nkio.webp';
import nled from '../assets/img/navbar/navbar/nled.webp';
import nfire from '../assets/img/navbar/navbar/nfire.webp';
import nfurniture from '../assets/img/navbar/navbar/nfurniture.webp';
import nping from '../assets/img/navbar/navbar/nping.webp';
import nconnect from '../assets/img/navbar/navbar/nconnect.webp';
import nlight from '../assets/img/navbar/navbar/nlight.webp';
import ncomfort from '../assets/img/navbar/navbar/ncomfort.webp';
import nsound from '../assets/img/navbar/navbar/nsound.webp';
import nhome from '../assets/img/navbar/navbar/nhome.webp';
import ndecor from '../assets/img/navbar/navbar/ndecor.webp';
import npartition from '../assets/img/navbar/navbar/npartition.webp';
import payment_card from '../assets/img/navbar/nvisitor/payment_card.png';
import coin from '../assets/img/navbar/nvisitor/coin.png';
import card_movement from '../assets/img/navbar/nvisitor/card_movement.png';
import doorlock_movement from '../assets/img/navbar/nvisitor/doorlock_movement.png';
import ads from '../assets/img/navbar/nvisitor/ads.png';
import video from '../assets/img/navbar/nvisitor/video.png';
import image from '../assets/img/navbar/nvisitor/image.png';
import online from '../assets/img/navbar/nvisitor/online.png';
import card_report from '../assets/img/navbar/nvisitor/card_report.png';
import coin_report from '../assets/img/navbar/nvisitor/coin_report.png';

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

// Define a interface para os dados do menu
interface MenuItem {
	active?: boolean;
	onClick?: () => void;
	label: string;
	image: any;
	alt: string;
	key: string;
	submenu?: MenuItem[];
}

// Define a interface para a estrutura do menu
interface MenuStructure {
	[key: string]: MenuItem;
}

// Define as propriedades do componente
interface NavBarProps {
	color?: string;
	onTabChange?: (tabName: string) => void;
}

// Define as propriedades do componente
export const NavBar = ({ color, onTabChange }: NavBarProps) => {
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
	const [showSubMenu, setShowSubMenu] = useState<{ [key: string]: boolean }>({});

	// Carrega o token inicial e o estado do ribbon
	useEffect(() => {
		loadInitialToken();
		loadRibbonState();

		const ribbonPinned = localStorage.getItem('ribbonPinned') === 'true';
		setIsRibbonPinned(ribbonPinned);

		if (ribbonPinned && activeTab in ribbons) {
			const [setRibbon] = ribbons[activeTab as RibbonName];
			setRibbon(true);
		}
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
				if (!isRibbonPinned) {
					setRibbon(false);
					setActiveTab('');
				}
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
			route: '/nvisitor/nvisitordashboard',
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
		localStorage.clear();
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

		localStorage.setItem('ribbonPinned', String(newState));

		if (!newState) {
			Object.values(ribbons).forEach(([setRibbon]) => setRibbon(false));
			setActiveTab('');
		} else {
			if (activeTab in ribbons) {
				const [setRibbon] = ribbons[activeTab as RibbonName];
				setRibbon(true);
			}
		}
	};

	// Função para alternar o submenu
	const toggleSubMenu = (menuKey: keyof MenuStructure) => {
		setShowSubMenu((prev) => ({
			...prev,
			[menuKey]: !prev[menuKey],
		}));
	};

	// Define o componente do item de menu
	const menuStructure: MenuStructure = {
		dashboard: { label: 'NIDGROUP', image: nidgroup, alt: 'NIDGROUP', key: 'dashboard' },
		sisnid: {
			label: 'SISNID',
			image: sisnidlogo,
			alt: 'SISNID',
			key: 'sisnid',
			submenu: [
				{ label: 'Nclock', image: nclock, alt: 'nclock', key: 'nclock' },
				{ label: 'Naccess', image: naccess, alt: 'naccess', key: 'naccess' },
				{ label: 'Nvisitor', image: nvisitor, alt: 'nvisitor', key: 'nvisitor' },
				{ label: 'Npark', image: npark, alt: 'npark', key: 'npark' },
				{ label: 'Ndoor', image: ndoor, alt: 'ndoor', key: 'ndoor' },
				{ label: 'Npatrol', image: npatrol, alt: 'npatrol', key: 'npatrol' },
				{ label: 'Ncard', image: ncard, alt: 'ncard', key: 'ncard' },
				{ label: 'Nview', image: nview, alt: 'nview', key: 'nview' },
				{ label: 'Nsecur', image: nsecur, alt: 'nsecur', key: 'nsecur' },
				{ label: 'Nsoftwares', image: sisnidlogo, alt: 'nsoftwares', key: 'nsoftwares' }
			],
		},
		nidsof: {
			label: 'NIDSOF',
			image: nidsof,
			alt: 'NIDSOF',
			key: 'nidsof',
			submenu: [
				{ label: 'Nsoftware', image: nsoftware, alt: 'nsoftware', key: 'nsoftware' },
				{ label: 'Nsystem', image: nsystem, alt: 'nsystem', key: 'nsystem' },
				{ label: 'Napp', image: napp, alt: 'napp', key: 'napp' },
				{ label: 'Ncyber', image: ncyber, alt: 'ncyber', key: 'ncyber' },
				{ label: 'Ndigital', image: ndigital, alt: 'ndigital', key: 'ndigital' },
				{ label: 'Nserver', image: nserver, alt: 'nserver', key: 'nserver' },
				{ label: 'Naut', image: naut, alt: 'naut', key: 'naut' },
				{ label: 'Nequip', image: nequip, alt: 'nequip', key: 'nequip' },
				{ label: 'Nproject', image: nproject, alt: 'nproject', key: 'nproject' },
				{ label: 'Nsoftwares', image: nidsof, alt: 'nsoftwares', key: 'nsoftwares' }
			],
		},
		nidtec: {
			label: 'NIDTEC',
			image: nidtec,
			alt: 'NIDTEC',
			key: 'nidtec',
			submenu: [
				{ label: 'Nsmart', image: nsmart, alt: 'nsmart', key: 'nsmart' },
				{ label: 'Nglasses', image: nglasses, alt: 'nglasses', key: 'nglasses' },
				{ label: 'Npro', image: npro, alt: 'npro', key: 'npro' },
				{ label: 'Npower', image: npower, alt: 'npower', key: 'npower' },
				{ label: 'Npost', image: npost, alt: 'npost', key: 'npost' },
				{ label: 'Ncity', image: ncity, alt: 'ncity', key: 'ncity' },
				{ label: 'Nkio', image: nkio, alt: 'nkio', key: 'nkio' },
				{ label: 'Nled', image: nled, alt: 'nled', key: 'nled' },
				{ label: 'Nfire', image: nfire, alt: 'nfire', key: 'nfire' },
				{ label: 'Nsoftwares', image: nidtec, alt: 'nsoftwares', key: 'nsoftwares' }
			],
		},
		nidplace: {
			label: 'NIDPLACE',
			image: nidplace,
			alt: 'NIDPLACE',
			key: 'nidplace',
			submenu: [
				{ label: 'Nfurniture', image: nfurniture, alt: 'nfurniture', key: 'nfurniture' },
				{ label: 'Npartition', image: npartition, alt: 'npartition', key: 'npartition' },
				{ label: 'Ndecor', image: ndecor, alt: 'ndecor', key: 'ndecor' },
				{ label: 'Nping', image: nping, alt: 'nping', key: 'nping' },
				{ label: 'Nconnect', image: nconnect, alt: 'nconnect', key: 'nconnect' },
				{ label: 'Nlight', image: nlight, alt: 'nlight', key: 'nlight' },
				{ label: 'Ncomfort', image: ncomfort, alt: 'ncomfort', key: 'ncomfort' },
				{ label: 'Nsound', image: nsound, alt: 'nsound', key: 'nsound' },
				{ label: 'Nhome', image: nhome, alt: 'nhome', key: 'nhome' },
				{ label: 'Nsoftwares', image: nidplace, alt: 'nsoftwares', key: 'nsoftwares' }
			],
		},
	};


	// Define o componente do item de menu
	const MenuItem = ({ active, onClick, image, alt, label }: MenuItem) => (
		<li
			className={`image-text ${active ? 'active' : ''}`}
			onClick={onClick}
			style={{ display: 'flex', flexDirection: 'row' }}
		>
			<img src={image} alt={alt} />
			<span>{label}</span>
		</li>
	);

	// Função genérica para renderizar o menu
	const renderMenu = (menuKey: keyof MenuStructure) => {
		const menu = menuStructure[menuKey as string];
		return (
			<div key={menuKey as string}>
				<MenuItem
					key={menuKey as string}
					active={activeTab === menuKey}
					onClick={() => (menu.submenu ? toggleSubMenu(menuKey) : handleTab(menuKey as string))}
					image={menu.image}
					alt={menu.alt}
					label={menu.label}
				/>
				{showSubMenu[menuKey] && menu.submenu && (
					<div className="submenu">
						{menu.submenu.map((item: MenuItem) => (
							<MenuItem
								key={item.key}
								active={activeTab === item.key}
								onClick={() => handleTab(item.key)}
								image={item.image}
								alt={item.alt}
								label={item.label}
							/>
						))}
					</div>
				)}
			</div>
		);
	};

	// Função para combinar as duas funções
	const handleTabClick = (tabName: string) => {
		handleRibbonClick(tabName);
		if (onTabChange) {
			onTabChange(tabName);
		}
		setActiveTab(tabName);
	}

	// Função para abrir o modal de opções do terminal
	const toggleTerminalOptionsModal = () => setShowModal(!showModal);

	return (
		<nav data-role="ribbonmenu" style={{ backgroundColor: color }}>
			<div className="nav-container">
				<Dropdown className='dropdown-icon'>
					<Dropdown.Toggle variant="basic" id="dropdown-basic">
						<span className="logo">NIDGROUP</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<div style={{ position: 'relative' }}>
							{Object.keys(menuStructure).map((menuKey) => renderMenu(menuKey))}
						</div>
					</Dropdown.Menu>
				</Dropdown>
				<ul className="nav nav-tabs">
					{showNclockTab && (
						<li className={`nav-item ${activeTab === 'nclock' ? 'active' : ''}`}>
							<a className="nav-link nclock-tab" id="nclock-tab" onClick={() => handleTabClick('nclock')}>NCLOCK</a>
						</li>
					)}
					{showNaccessTab && (
						<li className={`nav-item ${activeTab === 'naccess' ? 'active' : ''}`}>
							<a className="nav-link naccess-tab" id="naccess-tab" onClick={() => handleTabClick('naccess')}>NACCESS</a>
						</li>
					)}
					{showNvisitorTab && (
						<li className={`nav-item ${activeTab === 'nvisitor' ? 'active' : ''}`}>
							<a className="nav-link nvisitor-tab" id="nvisitor-tab" onClick={() => handleTabClick('nvisitor')}>NVISITOR</a>
						</li>
					)}
					{showNparkTab && (
						<li className={`nav-item ${activeTab === 'npark' ? 'active' : ''}`}>
							<a className="nav-link npark-tab" id="npark-tab" onClick={() => handleTabClick('npark')}>NPARK</a>
						</li>
					)}
					{showNdoorTab && (
						<li className={`nav-item ${activeTab === 'ndoor' ? 'active' : ''}`}>
							<a className="nav-link ndoor-tab" id="ndoor-tab" onClick={() => handleTabClick('ndoor')}>NDOOR</a>
						</li>
					)}
					{showNpatrolTab && (
						<li className={`nav-item ${activeTab === 'npatrol' ? 'active' : ''}`}>
							<a className="nav-link npatrol-tab" id="npatrol-tab" onClick={() => handleTabClick('npatrol')}>NPATROL</a>
						</li>
					)}
					{showNcardTab && (
						<li className={`nav-item ${activeTab === 'ncard' ? 'active' : ''}`}>
							<a className="nav-link ncard-tab" id="ncard-tab" onClick={() => handleTabClick('ncard')}>NCARD</a>
						</li>
					)}
					{showNviewTab && (
						<li className={`nav-item ${activeTab === 'nview' ? 'active' : ''}`}>
							<a className="nav-link nview-tab" id="nview-tab" onClick={() => handleTabClick('nview')}>Nview</a>
						</li>
					)}
					{showNsecurTab && (
						<li className={`nav-item ${activeTab === 'nsecur' ? 'active' : ''}`}>
							<a className="nav-link nsecur-tab" id="nsecur-tab" onClick={() => handleTabClick('nsecur')}>NSECUR</a>
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
								<Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
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
									<span className="title">Horários</span>
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
									<span className="title">Escalas</span>
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
			{showNvisitorRibbon && (
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="nvisitor" role="tabpanel" aria-labelledby="nvisitor-tab">
						<div className="section" id="section-group">
							<div className="group">
								<div className="btn-group" role="group">
									<div className="grid-container">
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={payment_card} alt="botão pagamento terminal" />
											</span>
											<span className="text">Pagamento Terminal</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={coin} alt="botão pagamento moedas" />
											</span>
											<span className="text">Pagamento Moedas</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={card_movement} alt="botão movimentos cartão" />
											</span>
											<span className="text">Movimentos Cartão</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={doorlock_movement} alt="botão movimentos porteiro" />
											</span>
											<span className="text">Movimentos Porteiro</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Acesso WC</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className="grid-container">
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={camera} alt="botão videovigilância" />
											</span>
											<span className="text">Videovigilância</span>
										</Link>
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={ads} alt="botão publicidade" />
											</span>
											<span className="text">Publicidade</span>
										</Link>
									</div>
									<div>
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={video} alt="botão vídeo" />
											</span>
											<span className="text">Vídeo</span>
										</Link>
										<Link to='#' type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={image} alt="botão imagem" />
											</span>
											<span className="text">Imagem</span>
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
										<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-entidades">
											<span className="icon">
												<img src={online} alt="botão online" />
											</span>
											<span className="text">Online</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Videovigilância</span>
								</div>
							</div>
							<div className="group">
								<div className="btn-group" role="group">
									<div className="grid-container">
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={card_report} alt="botão relatório cartão" />
											</span>
											<span className="text">Relatório Cartão</span>
										</Link>
										<Link to="#" type="button" className="btn btn-light ribbon-button">
											<span className="icon">
												<img src={coin_report} alt="botão relatório moedas" />
											</span>
											<span className="text">Relatório Moedas</span>
										</Link>
									</div>
								</div>
								<div className="title-container">
									<span className="title">Recebimentos</span>
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