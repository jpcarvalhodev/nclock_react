import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { EmailCompany, EmailUser, EmailUserCompany, Employee } from '../helpers/Types';
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
import nreality from '../assets/img/navbar/navbar/nreality.webp';
import nhologram from '../assets/img/navbar/navbar/nhologram.webp';
import npower from '../assets/img/navbar/navbar/npower.webp';
import ncharge from '../assets/img/navbar/navbar/ncharge.webp';
import ncity from '../assets/img/navbar/navbar/ncity.png';
import nkiosk from '../assets/img/navbar/navbar/nkiosk.webp';
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
import payment_card from '../assets/img/navbar/nkiosk/payment_card.png';
import coin from '../assets/img/navbar/nkiosk/coin.png';
import intercom from '../assets/img/navbar/nkiosk/intercom.png';
import kiosk from '../assets/img/navbar/nkiosk/kiosk.png';
import barrier from '../assets/img/navbar/nkiosk/barrier.png';
import ads from '../assets/img/navbar/nkiosk/ads.png';
import video from '../assets/img/navbar/nkiosk/video.png';
import image from '../assets/img/navbar/nkiosk/image.png';
import online from '../assets/img/navbar/nkiosk/online.png';
import card_report from '../assets/img/navbar/nkiosk/card_report.png';
import coin_report from '../assets/img/navbar/nkiosk/coin_report.png';
import offline from '../assets/img/navbar/nkiosk/offline.png';
import maps from '../assets/img/navbar/nkiosk/maps.png';
import logs from '../assets/img/navbar/nkiosk/logs.png';
import bell from '../assets/img/navbar/nkiosk/bell.png';
import registry from '../assets/img/navbar/nkiosk/registry.png';
import alert from '../assets/img/navbar/nkiosk/alert.png';
import accessControl from '../assets/img/navbar/nkiosk/accessControl.png';
import anydesk from '../assets/img/navbar/ajuda/anydesk.png';
import home from '../assets/img/navbar/home.png';
import terminalmb from '../assets/img/navbar/dispositivos/terminalmb.png';
import open from '../assets/img/navbar/nkiosk/open.png';
import print from '../assets/img/navbar/nkiosk/print.png';
import graphs from '../assets/img/navbar/nkiosk/graphs.png';
import version from '../assets/img/navbar/ajuda/version.png';
import { ColorProvider, useColor } from '../context/ColorContext';
import { CreateModalAds } from '../modals/CreateModalAds';
import { Button } from 'react-bootstrap';
import { adsFields, emailAndCompanyFields } from '../helpers/Fields';
import { useAds } from '../context/AdsContext';
import { EmailOptionsModal } from '../modals/EmailOptions';
import * as apiService from "../helpers/apiService";
import { toast } from 'react-toastify';
import { AboutModal } from '../modals/AboutModal';

// Define a interface para o payload do token
interface MyTokenPayload extends JwtPayload {
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
}

// Define os nomes das abas
type RibbonName = 'pessoas' | 'dispositivos' | 'configuracao' | 'ajuda' | 'nclock' | 'naccess' | 'nvisitor' | 'npark' | 'ndoor' | 'npatrol' | 'ncard' | 'nview' | 'nsecur' | 'nsoftware' | 'nsystem' | 'napp' | 'ncyber' | 'ndigital' | 'nserver' | 'naut' | 'nequip' | 'nproject' | 'nsmart' | 'nreality' | 'nhologram' | 'npower' | 'ncharge' | 'ncity' | 'nkiosk' | 'nled' | 'nfire' | 'nfurniture' | 'npartition' | 'ndecor' | 'nping' | 'nconnect' | 'nlight' | 'ncomfort' | 'nsound' | 'nhome';

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
	style?: React.CSSProperties;
}

// Definição dos tipos para os nomes das ribbons e das tabs
type RibbonKey = 'Nclock' | 'Naccess' | 'Nvisitor' | 'Npark' | 'Ndoor' | 'Npatrol' | 'Ncard' | 'Nview' | 'Nsecur' | 'Nsoftware' | 'Nsystem' | 'Napp' | 'Ncyber' | 'Ndigital' | 'Nserver' | 'Naut' | 'Nequip' | 'Nproject' | 'Nsmart' | 'Nreality' | 'Nhologram' | 'Npower' | 'Ncharge' | 'Ncity' | 'Nkiosk' | 'Nled' | 'Nfire' | 'Nfurniture' | 'Npartition' | 'Ndecor' | 'Nping' | 'Nconnect' | 'Nlight' | 'Ncomfort' | 'Nsound' | 'Nhome';

// Define os setters para as abas e ribbons
type RibbonKeys = 'pessoas' | 'dispositivos' | 'configuracao' | 'ajuda';

// Interface para os setters das ribbons e das tabs
interface Setters {
	setShowRibbon: React.Dispatch<React.SetStateAction<boolean>>;
	setShowTab: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define a interface para a ul de tabs
interface TabsInfo {
	id: string;
	title: string;
	show: boolean;
}

// Define as propriedades do componente
export const NavBar = ({ style }: NavBarProps) => {
	const { navbarColor, setNavbarColor, setFooterColor } = useColor();
	const { handleAddModalNavbar } = useAds();
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
	const [showNsoftwareRibbon, setShowNsoftwareRibbon] = useState(false);
	const [showNsystemRibbon, setShowNsystemRibbon] = useState(false);
	const [showNappRibbon, setShowNappRibbon] = useState(false);
	const [showNcyberRibbon, setShowNcyberRibbon] = useState(false);
	const [showNdigitalRibbon, setShowNdigitalRibbon] = useState(false);
	const [showNserverRibbon, setShowNserverRibbon] = useState(false);
	const [showNautRibbon, setShowNautRibbon] = useState(false);
	const [showNequipRibbon, setShowNequipRibbon] = useState(false);
	const [showNprojectRibbon, setShowNprojectRibbon] = useState(false);
	const [showNsmartRibbon, setShowNsmartRibbon] = useState(false);
	const [showNrealityRibbon, setShowNrealityRibbon] = useState(false);
	const [showNhologramRibbon, setShowNhologramRibbon] = useState(false);
	const [showNpowerRibbon, setShowNpowerRibbon] = useState(false);
	const [showNchargeRibbon, setShowNchargeRibbon] = useState(false);
	const [showNcityRibbon, setShowNcityRibbon] = useState(false);
	const [showNkioskRibbon, setShowNkioskRibbon] = useState(false);
	const [showNledRibbon, setShowNledRibbon] = useState(false);
	const [showNfireRibbon, setShowNfireRibbon] = useState(false);
	const [showNfurnitureRibbon, setShowNfurnitureRibbon] = useState(false);
	const [showNpartitionRibbon, setShowNpartitionRibbon] = useState(false);
	const [showNdecorRibbon, setShowNdecorRibbon] = useState(false);
	const [showNpingRibbon, setShowNpingRibbon] = useState(false);
	const [showNconnectRibbon, setShowNconnectRibbon] = useState(false);
	const [showNlightRibbon, setShowNlightRibbon] = useState(false);
	const [showNcomfortRibbon, setShowNcomfortRibbon] = useState(false);
	const [showNsoundRibbon, setShowNsoundRibbon] = useState(false);
	const [showNhomeRibbon, setShowNhomeRibbon] = useState(false);
	const [showNclockTab, setShowNclockTab] = useState(false);
	const [showNaccessTab, setShowNaccessTab] = useState(false);
	const [showNvisitorTab, setShowNvisitorTab] = useState(false);
	const [showNparkTab, setShowNparkTab] = useState(false);
	const [showNdoorTab, setShowNdoorTab] = useState(false);
	const [showNpatrolTab, setShowNpatrolTab] = useState(false);
	const [showNcardTab, setShowNcardTab] = useState(false);
	const [showNviewTab, setShowNviewTab] = useState(false);
	const [showNsecurTab, setShowNsecurTab] = useState(false);
	const [showNsoftwareTab, setShowNsoftwareTab] = useState(false);
	const [showNsystemTab, setShowNsystemTab] = useState(false);
	const [showNappTab, setShowNappTab] = useState(false);
	const [showNcyberTab, setShowNcyberTab] = useState(false);
	const [showNdigitalTab, setShowNdigitalTab] = useState(false);
	const [showNserverTab, setShowNserverTab] = useState(false);
	const [showNautTab, setShowNautTab] = useState(false);
	const [showNequipTab, setShowNequipTab] = useState(false);
	const [showNprojectTab, setShowNprojectTab] = useState(false);
	const [showNsmartTab, setShowNsmartTab] = useState(false);
	const [showNrealityTab, setShowNrealityTab] = useState(false);
	const [showNhologramTab, setShowNhologramTab] = useState(false);
	const [showNpowerTab, setShowNpowerTab] = useState(false);
	const [showNchargeTab, setShowNchargeTab] = useState(false);
	const [showNcityTab, setShowNcityTab] = useState(false);
	const [showNkioskTab, setShowNkioskTab] = useState(false);
	const [showNledTab, setShowNledTab] = useState(false);
	const [showNfireTab, setShowNfireTab] = useState(false);
	const [showNfurnitureTab, setShowNfurnitureTab] = useState(false);
	const [showNpartitionTab, setShowNpartitionTab] = useState(false);
	const [showNdecorTab, setShowNdecorTab] = useState(false);
	const [showNpingTab, setShowNpingTab] = useState(false);
	const [showNconnectTab, setShowNconnectTab] = useState(false);
	const [showNlightTab, setShowNlightTab] = useState(false);
	const [showNcomfortTab, setShowNcomfortTab] = useState(false);
	const [showNsoundTab, setShowNsoundTab] = useState(false);
	const [showNhomeTab, setShowNhomeTab] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeMenu, setActiveMenu] = useState<string | null>(null);
	const location = useLocation();
	const [showPhotoAdsModal, setShowPhotoAdsModal] = useState(false);
	const [showVideoAdsModal, setShowVideoAdsModal] = useState(false);
	const [showEmailModal, setShowEmailModal] = useState(false);
	const [emailCompanyConfig, setEmailCompanyConfig] = useState<EmailUserCompany>();
	const [visibleGroup, setVisibleGroup] = useState<string | null>(null);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [showAboutModal, setShowAboutModal] = useState(false);

	// Função para atualizar o estado da aba
	const ribbonSetters = {
		Nclock: setShowNclockRibbon, Naccess: setShowNaccessRibbon, Nvisitor: setShowNvisitorRibbon, Npark: setShowNparkRibbon, Ndoor: setShowNdoorRibbon,
		Npatrol: setShowNpatrolRibbon, Ncard: setShowNcardRibbon, Nview: setShowNviewRibbon, Nsecur: setShowNsecurRibbon, Nsoftware: setShowNsoftwareRibbon,
		Nsystem: setShowNsystemRibbon, Napp: setShowNappRibbon, Ncyber: setShowNcyberRibbon, Ndigital: setShowNdigitalRibbon, Nserver: setShowNserverRibbon,
		Naut: setShowNautRibbon, Nequip: setShowNequipRibbon, Nproject: setShowNprojectRibbon, Nsmart: setShowNsmartRibbon, Nreality: setShowNrealityRibbon,
		Nhologram: setShowNhologramRibbon, Npower: setShowNpowerRibbon, Ncharge: setShowNchargeRibbon, Ncity: setShowNcityRibbon, Nkiosk: setShowNkioskRibbon,
		Nled: setShowNledRibbon, Nfire: setShowNfireRibbon, Nfurniture: setShowNfurnitureRibbon, Npartition: setShowNpartitionRibbon, Ndecor: setShowNdecorRibbon,
		Nping: setShowNpingRibbon, Nconnect: setShowNconnectRibbon, Nlight: setShowNlightRibbon, Ncomfort: setShowNcomfortRibbon, Nsound: setShowNsoundRibbon,
		Nhome: setShowNhomeRibbon,
	};

	// Função para atualizar o estado da tab
	const tabSetters = {
		Nclock: setShowNclockTab, Naccess: setShowNaccessTab, Nvisitor: setShowNvisitorTab, Npark: setShowNparkTab, Ndoor: setShowNdoorTab,
		Npatrol: setShowNpatrolTab, Ncard: setShowNcardTab, Nview: setShowNviewTab, Nsecur: setShowNsecurTab, Nsoftware: setShowNsoftwareTab,
		Nsystem: setShowNsystemTab, Napp: setShowNappTab, Ncyber: setShowNcyberTab, Ndigital: setShowNdigitalTab, Nserver: setShowNserverTab,
		Naut: setShowNautTab, Nequip: setShowNequipTab, Nproject: setShowNprojectTab, Nsmart: setShowNsmartTab, Nreality: setShowNrealityTab,
		Nhologram: setShowNhologramTab, Npower: setShowNpowerTab, Ncharge: setShowNchargeTab, Ncity: setShowNcityTab, Nkiosk: setShowNkioskTab,
		Nled: setShowNledTab, Nfire: setShowNfireTab, Nfurniture: setShowNfurnitureTab, Npartition: setShowNpartitionTab, Ndecor: setShowNdecorTab,
		Nping: setShowNpingTab, Nconnect: setShowNconnectTab, Nlight: setShowNlightTab, Ncomfort: setShowNcomfortTab, Nsound: setShowNsoundTab,
		Nhome: setShowNhomeTab,
	};

	// Carrega o token inicial e o estado do ribbon
	useEffect(() => {
		loadInitialToken();
		loadState();

		const ribbonPinned = localStorage.getItem('ribbonPinned') === 'true';
		setIsRibbonPinned(ribbonPinned);

		const savedActiveTab = localStorage.getItem('activeTab');
		if (savedActiveTab && tabData[savedActiveTab]) {
			setActiveTab(savedActiveTab);
			const { setTab, setRibbon } = tabData[savedActiveTab];
			setTab(true);
			setRibbon(true);
		}

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

	// Função para carregar os dados das configurações de email
	const fetchEmailConfig = async () => {
		try {
			const data = await apiService.fetchAllEmailConfig();
			setEmailCompanyConfig(data);
		} catch (error) {
			console.error('Erro ao carregar os emails registados:', error);
		}
	}

	// Função para carregar os dados das configurações da empresa
	const fetchCompanyConfig = async () => {
		try {
			const data = await apiService.fetchAllCompanyConfig();
			setEmailCompanyConfig(data);
		} catch (error) {
			console.error('Erro ao carregar os emails registados:', error);
		}
	}

	// Função para adicionar emails de utilizadores
	const handleAddEmailConfig = async (email: EmailUser) => {
		try {
			const data = await apiService.addUserEmailConfig(email);
			setEmailCompanyConfig(data);
			toast.success('Email adicionado com sucesso!');
		} catch (error) {
			console.error('Erro ao adicionar o email registado:', error);
		}
	}

	// Função de atualização de emails de utilizadores e as configurações da empresa
	const handleUpdateEmailConfig = async (email: Partial<EmailUser>, companyConfig: Partial<EmailCompany>) => {
		try {
			const data = await apiService.updateUserEmailConfig(email);
			const updatedUsers = email.map((u: EmailUser) => u.id === data.id ? data : u);
			setEmailCompanyConfig(updatedUsers);
			await apiService.updateCompanyConfig(companyConfig);
			toast.success(data.value || 'Email atualizado com sucesso!');
		} catch (error) {
			console.error('Erro ao atualizar o email registado:', error);
		}
	}

	// Carregamento inicial dos dados de configuração de email
	useEffect(() => {
		fetchEmailConfig();
		fetchCompanyConfig();
	}, []);

	// Verificar se a tela é mobile
	const checkIfMobile = () => {
		setIsMobile(window.innerWidth <= 1200);
	};

	// Adicionar listener para redimensionar a janela
	useEffect(() => {
		checkIfMobile();
		window.addEventListener('resize', checkIfMobile);

		return () => {
			window.removeEventListener('resize', checkIfMobile);
		};
	}, []);

	// Função para lidar com a renderização dinâmica dos ribbons e tabs
	const settersMap: Record<RibbonKey, Setters> = {
		Nclock: { setShowRibbon: setShowNclockRibbon, setShowTab: setShowNclockTab },
		Naccess: { setShowRibbon: setShowNaccessRibbon, setShowTab: setShowNaccessTab },
		Nvisitor: { setShowRibbon: setShowNvisitorRibbon, setShowTab: setShowNvisitorTab },
		Npark: { setShowRibbon: setShowNparkRibbon, setShowTab: setShowNparkTab },
		Ndoor: { setShowRibbon: setShowNdoorRibbon, setShowTab: setShowNdoorTab },
		Npatrol: { setShowRibbon: setShowNpatrolRibbon, setShowTab: setShowNpatrolTab },
		Ncard: { setShowRibbon: setShowNcardRibbon, setShowTab: setShowNcardTab },
		Nview: { setShowRibbon: setShowNviewRibbon, setShowTab: setShowNviewTab },
		Nsecur: { setShowRibbon: setShowNsecurRibbon, setShowTab: setShowNsecurTab },
		Nsoftware: { setShowRibbon: setShowNsoftwareRibbon, setShowTab: setShowNsoftwareTab },
		Nsystem: { setShowRibbon: setShowNsystemRibbon, setShowTab: setShowNsystemTab },
		Napp: { setShowRibbon: setShowNappRibbon, setShowTab: setShowNappTab },
		Ncyber: { setShowRibbon: setShowNcyberRibbon, setShowTab: setShowNcyberTab },
		Ndigital: { setShowRibbon: setShowNdigitalRibbon, setShowTab: setShowNdigitalTab },
		Nserver: { setShowRibbon: setShowNserverRibbon, setShowTab: setShowNserverTab },
		Naut: { setShowRibbon: setShowNautRibbon, setShowTab: setShowNautTab },
		Nequip: { setShowRibbon: setShowNequipRibbon, setShowTab: setShowNequipTab },
		Nproject: { setShowRibbon: setShowNprojectRibbon, setShowTab: setShowNprojectTab },
		Nsmart: { setShowRibbon: setShowNsmartRibbon, setShowTab: setShowNsmartTab },
		Nreality: { setShowRibbon: setShowNrealityRibbon, setShowTab: setShowNrealityTab },
		Nhologram: { setShowRibbon: setShowNhologramRibbon, setShowTab: setShowNhologramTab },
		Npower: { setShowRibbon: setShowNpowerRibbon, setShowTab: setShowNpowerTab },
		Ncharge: { setShowRibbon: setShowNchargeRibbon, setShowTab: setShowNchargeTab },
		Ncity: { setShowRibbon: setShowNcityRibbon, setShowTab: setShowNcityTab },
		Nkiosk: { setShowRibbon: setShowNkioskRibbon, setShowTab: setShowNkioskTab },
		Nled: { setShowRibbon: setShowNledRibbon, setShowTab: setShowNledTab },
		Nfire: { setShowRibbon: setShowNfireRibbon, setShowTab: setShowNfireTab },
		Nfurniture: { setShowRibbon: setShowNfurnitureRibbon, setShowTab: setShowNfurnitureTab },
		Npartition: { setShowRibbon: setShowNpartitionRibbon, setShowTab: setShowNpartitionTab },
		Ndecor: { setShowRibbon: setShowNdecorRibbon, setShowTab: setShowNdecorTab },
		Nping: { setShowRibbon: setShowNpingRibbon, setShowTab: setShowNpingTab },
		Nconnect: { setShowRibbon: setShowNconnectRibbon, setShowTab: setShowNconnectTab },
		Nlight: { setShowRibbon: setShowNlightRibbon, setShowTab: setShowNlightTab },
		Ncomfort: { setShowRibbon: setShowNcomfortRibbon, setShowTab: setShowNcomfortTab },
		Nsound: { setShowRibbon: setShowNsoundRibbon, setShowTab: setShowNsoundTab },
		Nhome: { setShowRibbon: setShowNhomeRibbon, setShowTab: setShowNhomeTab },
	};

	// Função para atualizar o estado a partir do localStorage
	function setItemState(key: RibbonKey, setterFunction: React.Dispatch<React.SetStateAction<boolean>>, prefix: string = ''): void {
		const stateValue = localStorage.getItem(`${prefix}${key}`) === 'true';
		setterFunction(stateValue);
	}

	// Função para carregar o estado das ribbons e tabs
	function loadState(): void {
		const ribbonPinned = localStorage.getItem('ribbonPinned') === 'true';
		setIsRibbonPinned(ribbonPinned);

		Object.entries(settersMap).forEach(([key, { setShowRibbon, setShowTab }]) => {
			setItemState(key as RibbonKey, setShowRibbon, ribbonPinned ? '' : 'show');
			setItemState(key as RibbonKey, setShowTab);
		});
	}

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
		'nsoftware': [setShowNsoftwareRibbon, 'nsoftware'],
		'nsystem': [setShowNsystemRibbon, 'nsystem'],
		'napp': [setShowNappRibbon, 'napp'],
		'ncyber': [setShowNcyberRibbon, 'ncyber'],
		'ndigital': [setShowNdigitalRibbon, 'ndigital'],
		'nserver': [setShowNserverRibbon, 'nserver'],
		'naut': [setShowNautRibbon, 'naut'],
		'nequip': [setShowNequipRibbon, 'nequip'],
		'nproject': [setShowNprojectRibbon, 'nproject'],
		'nsmart': [setShowNsmartRibbon, 'nsmart'],
		'nreality': [setShowNrealityRibbon, 'nreality'],
		'nhologram': [setShowNhologramRibbon, 'nhologram'],
		'npower': [setShowNpowerRibbon, 'npower'],
		'ncharge': [setShowNchargeRibbon, 'ncharge'],
		'ncity': [setShowNcityRibbon, 'ncity'],
		'nkiosk': [setShowNkioskRibbon, 'nkiosk'],
		'nled': [setShowNledRibbon, 'nled'],
		'nfire': [setShowNfireRibbon, 'nfire'],
		'nfurniture': [setShowNfurnitureRibbon, 'nfurniture'],
		'npartition': [setShowNpartitionRibbon, 'npartition'],
		'ndecor': [setShowNdecorRibbon, 'ndecor'],
		'nping': [setShowNpingRibbon, 'nping'],
		'nconnect': [setShowNconnectRibbon, 'nconnect'],
		'nlight': [setShowNlightRibbon, 'nlight'],
		'ncomfort': [setShowNcomfortRibbon, 'ncomfort'],
		'nsound': [setShowNsoundRibbon, 'nsound'],
		'nhome': [setShowNhomeRibbon, 'nhome'],
	};

	// Função para lidar com o clique no ribbon
	const handleRibbonClick = (tabName: RibbonName) => {
		if (tabName in ribbons) {
			const [setRibbon, ribbonName] = ribbons[tabName];

			if (activeTab === ribbonName) {
				if (!isRibbonPinned) {
					setRibbon(false);
					setActiveTab('');
				}
			} else {
				Object.keys(ribbons).forEach((key) => {
					const [setOtherRibbon] = ribbons[key as RibbonName];
					setOtherRibbon(false);
				});
				setRibbon(true);
				setActiveTab(ribbonName);
			}
		}
	};

	// Função para criar as abas
	const createTabInfo = (tab: string, route: string): TabInfo => {
		const formattedTab = tab.charAt(0).toUpperCase() + tab.slice(1) as RibbonKey;

		return {
			setTab: tabSetters[formattedTab],
			setRibbon: ribbonSetters[formattedTab],
			localStorageTabKey: `show${formattedTab}Tab`,
			localStorageRibbonKey: `show${formattedTab}Ribbon`,
			route: route,
		};
	};

	// Define os dados das abas
	const tabData: Record<string, TabInfo> = {
		nclock: createTabInfo('nclock', '/nclock/nclockdashboard'),
		naccess: createTabInfo('naccess', '/naccess/naccessdashboard'),
		nvisitor: createTabInfo('nvisitor', '/nvisitor/nvisitordashboard'),
		npark: createTabInfo('npark', '/npark/nparkdashboard'),
		ndoor: createTabInfo('ndoor', '/ndoor/ndoordashboard'),
		npatrol: createTabInfo('npatrol', '/npatrol/npatroldashboard'),
		ncard: createTabInfo('ncard', '/ncard/ncarddashboard'),
		nview: createTabInfo('nview', '/nview/nviewdashboard'),
		nsecur: createTabInfo('nsecur', '/nsecur/nsecurdashboard'),
		nsoftware: createTabInfo('nsoftware', '/nsoftware/nsoftwaredashboard'),
		nsystem: createTabInfo('nsystem', '/nsystem/nsystemdashboard'),
		napp: createTabInfo('napp', '/napp/nappdashboard'),
		ncyber: createTabInfo('ncyber', '/ncyber/ncyberdashboard'),
		ndigital: createTabInfo('ndigital', '/ndigital/ndigitaldashboard'),
		nserver: createTabInfo('nserver', '/nserver/nserverdashboard'),
		naut: createTabInfo('naut', '/naut/nautdashboard'),
		nequip: createTabInfo('nequip', '/nequip/nequipdashboard'),
		nproject: createTabInfo('nproject', '/nproject/nprojectdashboard'),
		nsmart: createTabInfo('nsmart', '/nsmart/nsmartdashboard'),
		nreality: createTabInfo('nreality', '/nreality/nrealitydashboard'),
		nhologram: createTabInfo('nhologram', '/nhologram/nhologramdashboard'),
		npower: createTabInfo('npower', '/npower/npowerdashboard'),
		ncharge: createTabInfo('ncharge', '/ncharge/nchargedashboard'),
		ncity: createTabInfo('ncity', '/ncity/ncitydashboard'),
		nkiosk: createTabInfo('nkiosk', '/nkiosk/nkioskdashboard'),
		nled: createTabInfo('nled', '/nled/nleddashboard'),
		nfire: createTabInfo('nfire', '/nfire/nfiredashboard'),
		nfurniture: createTabInfo('nfurniture', '/nfurniture/nfurnituredashboard'),
		npartition: createTabInfo('npartition', '/npartition/npartitiondashboard'),
		ndecor: createTabInfo('ndecor', '/ndecor/ndecordashboard'),
		nping: createTabInfo('nping', '/nping/npingdashboard'),
		nconnect: createTabInfo('nconnect', '/nconnect/nconnectdashboard'),
		nlight: createTabInfo('nlight', '/nlight/nlightdashboard'),
		ncomfort: createTabInfo('ncomfort', '/ncomfort/ncomfortdashboard'),
		nsound: createTabInfo('nsound', '/nsound/nsounddashboard'),
		nhome: createTabInfo('nhome', '/nhome/nhomedashboard')
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
		localStorage.removeItem('activeTab');
	};

	// Função para lidar com a aba
	const handleTab = (tabName: string) => {
		clearAllTabs();

		if (tabName === 'dashboard') {
			setActiveTab('');
			localStorage.removeItem('activeTab');
			navigate('/dashboard');
		} else if (tabData[tabName]) {
			const { setTab, setRibbon, localStorageTabKey, localStorageRibbonKey, route } = tabData[tabName];

			if (activeTab === tabName) {
				setTab(false);
				setRibbon(false);
				localStorage.removeItem(localStorageTabKey);
				localStorage.removeItem(localStorageRibbonKey);
				setActiveTab('');
				localStorage.removeItem('activeTab');
			} else {
				setTab(true);
				setRibbon(true);
				localStorage.setItem(localStorageTabKey, 'true');
				localStorage.setItem(localStorageRibbonKey, 'true');
				setActiveTab(tabName);
				localStorage.setItem('activeTab', tabName);
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
			localStorage.setItem('showNsoftwareRibbon', String(showNsoftwareRibbon));
			localStorage.setItem('showNsystemRibbon', String(showNsystemRibbon));
			localStorage.setItem('showNappRibbon', String(showNappRibbon));
			localStorage.setItem('showNcyberRibbon', String(showNcyberRibbon));
			localStorage.setItem('showNdigitalRibbon', String(showNdigitalRibbon));
			localStorage.setItem('showNserverRibbon', String(showNserverRibbon));
			localStorage.setItem('showNautRibbon', String(showNautRibbon));
			localStorage.setItem('showNequipRibbon', String(showNequipRibbon));
			localStorage.setItem('showNprojectRibbon', String(showNprojectRibbon));
			localStorage.setItem('showNsmartRibbon', String(showNsmartRibbon));
			localStorage.setItem('showNrealityRibbon', String(showNrealityRibbon));
			localStorage.setItem('showNhologramRibbon', String(showNhologramRibbon));
			localStorage.setItem('showNpowerRibbon', String(showNpowerRibbon));
			localStorage.setItem('showNchargeRibbon', String(showNchargeRibbon));
			localStorage.setItem('showNcityRibbon', String(showNcityRibbon));
			localStorage.setItem('showNkioskRibbon', String(showNkioskRibbon));
			localStorage.setItem('showNledRibbon', String(showNledRibbon));
			localStorage.setItem('showNfireRibbon', String(showNfireRibbon));
			localStorage.setItem('showNfurnitureRibbon', String(showNfurnitureRibbon));
			localStorage.setItem('showNpartitionRibbon', String(showNpartitionRibbon));
			localStorage.setItem('showNdecorRibbon', String(showNdecorRibbon));
			localStorage.setItem('showNpingRibbon', String(showNpingRibbon));
			localStorage.setItem('showNconnectRibbon', String(showNconnectRibbon));
			localStorage.setItem('showNlightRibbon', String(showNlightRibbon));
			localStorage.setItem('showNcomfortRibbon', String(showNcomfortRibbon));
			localStorage.setItem('showNsoundRibbon', String(showNsoundRibbon));
			localStorage.setItem('showNhomeRibbon', String(showNhomeRibbon));
			localStorage.setItem('ribbonPinned', String(isRibbonPinned));
		};

		const timer = setTimeout(handleStateChange, 10);

		return () => clearTimeout(timer);
	}, [isRibbonPinned, showPessoasRibbon, showDispositivosRibbon, showConfiguracaoRibbon, showAjudaRibbon, showNclockRibbon, showNaccessRibbon, showNvisitorRibbon, showNparkRibbon, showNdoorRibbon, showNpatrolRibbon, showNcardRibbon, showNviewRibbon, showNsecurRibbon, showNsoftwareRibbon, showNsystemRibbon, showNappRibbon, showNcyberRibbon, showNdigitalRibbon, showNserverRibbon, showNautRibbon, showNequipRibbon, showNprojectRibbon, showNsmartRibbon, showNrealityRibbon, showNhologramRibbon, showNpowerRibbon, showNchargeRibbon, showNcityRibbon, showNkioskRibbon, showNledRibbon, showNfireRibbon, showNfurnitureRibbon, showNpartitionRibbon, showNdecorRibbon, showNpingRibbon, showNconnectRibbon, showNlightRibbon, showNcomfortRibbon, showNsoundRibbon, showNhomeRibbon]);

	// Função para alternar o estado do ribbon
	const togglePinRibbon = () => {
		const newState = !isRibbonPinned;
		setIsRibbonPinned(newState);
		localStorage.setItem('ribbonPinned', String(newState));

		if (!newState) {
			Object.values(ribbons).forEach(([setRibbon]) => setRibbon(false));
			Object.values(settersMap).forEach(({ setShowRibbon }) => setShowRibbon(false));
			setActiveTab('');
		} else {
			if (activeTab in ribbons) {
				const [setRibbon] = ribbons[activeTab as RibbonName];
				setRibbon(true);
			} else if (activeTab in settersMap) {
				const { setShowRibbon } = settersMap[activeTab as RibbonKey];
				setShowRibbon(true);
			}
		}
	};

	// Função para alternar o submenu
	const toggleSubMenu = (menuKey: string) => {
		if (activeMenu === menuKey) {
			setActiveMenu(null);
		} else {
			setActiveMenu(menuKey);
		}
	};

	// Define o componente do item de menu
	const menuStructure: MenuStructure = {
		dashboard: { label: 'INÍCIO', image: nidgroup, alt: 'INÍCIO', key: 'dashboard' },
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
				{ label: 'Nreality', image: nreality, alt: 'nreality', key: 'nreality' },
				{ label: 'Nhologram', image: nhologram, alt: 'nhologram', key: 'nhologram' },
				{ label: 'Npower', image: npower, alt: 'npower', key: 'npower' },
				{ label: 'Ncharge', image: ncharge, alt: 'ncharge', key: 'ncharge' },
				{ label: 'Ncity', image: ncity, alt: 'ncity', key: 'ncity' },
				{ label: 'Nkiosk', image: nkiosk, alt: 'nkiosk', key: 'nkiosk' },
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
		const menu = menuStructure[String(menuKey)];
		return (
			<div key={menuKey as string}>
				<MenuItem
					key={menuKey as string}
					active={activeMenu === menuKey}
					onClick={() => menu.submenu ? toggleSubMenu(String(menuKey)) : handleTab(String(menuKey))}
					image={menu.image}
					alt={menu.alt}
					label={menu.label}
				/>
				{activeMenu === menuKey && menu.submenu && (
					<div className="submenu">
						{menu.submenu.map((item: MenuItem) => (
							<MenuItem
								key={item.key}
								active={activeMenu === item.key}
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

	// Defina o mapeamento das cores para cada aba
	const tabColors: Record<string, { navbarColor: string; footerColor: string }> = {
		default: { navbarColor: '#000000', footerColor: '#000000' },
		dashboard: { navbarColor: '#000000', footerColor: '#000000' },
		nclock: { navbarColor: '#0050a0', footerColor: '#0050a0' },
		naccess: { navbarColor: '#0050a0', footerColor: '#0050a0' },
		nvisitor: { navbarColor: '#0050a0', footerColor: '#0050a0' },
		npark: { navbarColor: '#0050a0', footerColor: '#0050a0' },
		ndoor: { navbarColor: '#0050a0', footerColor: '#0050a0' },
		npatrol: { navbarColor: '#0050a0', footerColor: '#0050a0' },
		ncard: { navbarColor: '#0050a0', footerColor: '#0050a0' },
		nview: { navbarColor: '#0050a0', footerColor: '#0050a0' },
		nsecur: { navbarColor: '#0050a0', footerColor: '#0050a0' },
		nsoftware: { navbarColor: '#D01313', footerColor: '#D01313' },
		nsystem: { navbarColor: '#D01313', footerColor: '#D01313' },
		napp: { navbarColor: '#D01313', footerColor: '#D01313' },
		ncyber: { navbarColor: '#D01313', footerColor: '#D01313' },
		ndigital: { navbarColor: '#D01313', footerColor: '#D01313' },
		nserver: { navbarColor: '#D01313', footerColor: '#D01313' },
		naut: { navbarColor: '#D01313', footerColor: '#D01313' },
		nequip: { navbarColor: '#D01313', footerColor: '#D01313' },
		nproject: { navbarColor: '#D01313', footerColor: '#D01313' },
		nsmart: { navbarColor: '#009739', footerColor: '#009739' },
		nreality: { navbarColor: '#009739', footerColor: '#009739' },
		nhologram: { navbarColor: '#009739', footerColor: '#009739' },
		npower: { navbarColor: '#009739', footerColor: '#009739' },
		ncharge: { navbarColor: '#009739', footerColor: '#009739' },
		ncity: { navbarColor: '#009739', footerColor: '#009739' },
		nkiosk: { navbarColor: '#009739', footerColor: '#009739' },
		nled: { navbarColor: '#009739', footerColor: '#009739' },
		nfire: { navbarColor: '#009739', footerColor: '#009739' },
		nfurniture: { navbarColor: '#FEC629', footerColor: '#FEC629' },
		npartition: { navbarColor: '#FEC629', footerColor: '#FEC629' },
		ndecor: { navbarColor: '#FEC629', footerColor: '#FEC629' },
		nping: { navbarColor: '#FEC629', footerColor: '#FEC629' },
		nconnect: { navbarColor: '#FEC629', footerColor: '#FEC629' },
		nlight: { navbarColor: '#FEC629', footerColor: '#FEC629' },
		ncomfort: { navbarColor: '#FEC629', footerColor: '#FEC629' },
		nsound: { navbarColor: '#FEC629', footerColor: '#FEC629' },
		nhome: { navbarColor: '#FEC629', footerColor: '#FEC629' },
	};

	// useEffect para atualizar as cores da navbar e do footer e manter a ribbon da tab ativa
	useEffect(() => {
		const pathSegments = location.pathname.split('/');
		const mainSegment = pathSegments[1];
		const colorConfig = tabColors[mainSegment] || tabColors.default;
		const path = pathSegments[1];

		switch (path) {
			case 'persons':
				setShowPessoasRibbon(true);
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
				setShowNsoftwareRibbon(false);
				setShowNsystemRibbon(false);
				setShowNappRibbon(false);
				setShowNcyberRibbon(false);
				setShowNdigitalRibbon(false);
				setShowNserverRibbon(false);
				setShowNautRibbon(false);
				setShowNequipRibbon(false);
				setShowNprojectRibbon(false);
				setShowNsmartRibbon(false);
				setShowNrealityRibbon(false);
				setShowNhologramRibbon(false);
				setShowNpowerRibbon(false);
				setShowNchargeRibbon(false);
				setShowNcityRibbon(false);
				setShowNkioskRibbon(false);
				setShowNledRibbon(false);
				setShowNfireRibbon(false);
				setShowNfurnitureRibbon(false);
				setShowNpartitionRibbon(false);
				setShowNdecorRibbon(false);
				setShowNpingRibbon(false);
				setShowNconnectRibbon(false);
				setShowNlightRibbon(false);
				setShowNcomfortRibbon(false);
				setShowNsoundRibbon(false);
				setShowNhomeRibbon(false);
				setActiveTab('pessoas');
				break;
			case 'devices':
				setShowPessoasRibbon(false);
				setShowDispositivosRibbon(true);
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
				setShowNsoftwareRibbon(false);
				setShowNsystemRibbon(false);
				setShowNappRibbon(false);
				setShowNcyberRibbon(false);
				setShowNdigitalRibbon(false);
				setShowNserverRibbon(false);
				setShowNautRibbon(false);
				setShowNequipRibbon(false);
				setShowNprojectRibbon(false);
				setShowNsmartRibbon(false);
				setShowNrealityRibbon(false);
				setShowNhologramRibbon(false);
				setShowNpowerRibbon(false);
				setShowNchargeRibbon(false);
				setShowNcityRibbon(false);
				setShowNkioskRibbon(false);
				setShowNledRibbon(false);
				setShowNfireRibbon(false);
				setShowNfurnitureRibbon(false);
				setShowNpartitionRibbon(false);
				setShowNdecorRibbon(false);
				setShowNpingRibbon(false);
				setShowNconnectRibbon(false);
				setShowNlightRibbon(false);
				setShowNcomfortRibbon(false);
				setShowNsoundRibbon(false);
				setShowNhomeRibbon(false);
				setActiveTab('dispositivos');
				break;
			case 'configs':
				setShowPessoasRibbon(false);
				setShowDispositivosRibbon(false);
				setShowConfiguracaoRibbon(true);
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
				setShowNsoftwareRibbon(false);
				setShowNsystemRibbon(false);
				setShowNappRibbon(false);
				setShowNcyberRibbon(false);
				setShowNdigitalRibbon(false);
				setShowNserverRibbon(false);
				setShowNautRibbon(false);
				setShowNequipRibbon(false);
				setShowNprojectRibbon(false);
				setShowNsmartRibbon(false);
				setShowNrealityRibbon(false);
				setShowNhologramRibbon(false);
				setShowNpowerRibbon(false);
				setShowNchargeRibbon(false);
				setShowNcityRibbon(false);
				setShowNkioskRibbon(false);
				setShowNledRibbon(false);
				setShowNfireRibbon(false);
				setShowNfurnitureRibbon(false);
				setShowNpartitionRibbon(false);
				setShowNdecorRibbon(false);
				setShowNpingRibbon(false);
				setShowNconnectRibbon(false);
				setShowNlightRibbon(false);
				setShowNcomfortRibbon(false);
				setShowNsoundRibbon(false);
				setShowNhomeRibbon(false);
				setActiveTab('configuracao');
				break;
			case 'help':
				setShowPessoasRibbon(false);
				setShowDispositivosRibbon(false);
				setShowConfiguracaoRibbon(false);
				setShowAjudaRibbon(true);
				setShowNclockRibbon(false);
				setShowNaccessRibbon(false);
				setShowNvisitorRibbon(false);
				setShowNparkRibbon(false);
				setShowNdoorRibbon(false);
				setShowNpatrolRibbon(false);
				setShowNcardRibbon(false);
				setShowNviewRibbon(false);
				setShowNsecurRibbon(false);
				setShowNsoftwareRibbon(false);
				setShowNsystemRibbon(false);
				setShowNappRibbon(false);
				setShowNcyberRibbon(false);
				setShowNdigitalRibbon(false);
				setShowNserverRibbon(false);
				setShowNautRibbon(false);
				setShowNequipRibbon(false);
				setShowNprojectRibbon(false);
				setShowNsmartRibbon(false);
				setShowNrealityRibbon(false);
				setShowNhologramRibbon(false);
				setShowNpowerRibbon(false);
				setShowNchargeRibbon(false);
				setShowNcityRibbon(false);
				setShowNkioskRibbon(false);
				setShowNledRibbon(false);
				setShowNfireRibbon(false);
				setShowNfurnitureRibbon(false);
				setShowNpartitionRibbon(false);
				setShowNdecorRibbon(false);
				setShowNpingRibbon(false);
				setShowNconnectRibbon(false);
				setShowNlightRibbon(false);
				setShowNcomfortRibbon(false);
				setShowNsoundRibbon(false);
				setShowNhomeRibbon(false);
				setActiveTab('ajuda');
				break;
			default:
				setActiveTab('');
				break;
		}

		setNavbarColor(colorConfig.navbarColor);
		setFooterColor(colorConfig.footerColor);
	}, [location.pathname, setNavbarColor, setFooterColor]);

	// Função para geranciar o clique na aba
	const handleTabClick = (tabName: string) => {
		if (activeTab === tabName) {
			setActiveTab('');
			const [setRibbon] = ribbons[tabName as RibbonName];
			setRibbon(false);
			localStorage.removeItem('activeTab');
		} else {
			Object.values(ribbons).forEach(([setRibbon]) => setRibbon(false));
			const [setRibbon] = ribbons[tabName as RibbonName];
			setRibbon(true);
			setActiveTab(tabName);
			localStorage.setItem('activeTab', tabName);
		}
	};

	// Função para dinamizar as tabs
	const tabs: TabsInfo[] = [
		{ id: 'nclock', title: 'NCLOCK', show: showNclockTab },
		{ id: 'naccess', title: 'NACCESS', show: showNaccessTab },
		{ id: 'nvisitor', title: 'NVISITOR', show: showNvisitorTab },
		{ id: 'npark', title: 'NPARK', show: showNparkTab },
		{ id: 'ndoor', title: 'NDOOR', show: showNdoorTab },
		{ id: 'npatrol', title: 'NPATROL', show: showNpatrolTab },
		{ id: 'ncard', title: 'NCARD', show: showNcardTab },
		{ id: 'nview', title: 'NVIEW', show: showNviewTab },
		{ id: 'nsecur', title: 'NSECUR', show: showNsecurTab },
		{ id: 'nsoftware', title: 'NSOFTWARE', show: showNsoftwareTab },
		{ id: 'nsystem', title: 'NSYSTEM', show: showNsystemTab },
		{ id: 'napp', title: 'NAPP', show: showNappTab },
		{ id: 'ncyber', title: 'NCYBER', show: showNcyberTab },
		{ id: 'ndigital', title: 'NDIGITAL', show: showNdigitalTab },
		{ id: 'nserver', title: 'NSERVER', show: showNserverTab },
		{ id: 'naut', title: 'NAUT', show: showNautTab },
		{ id: 'nequip', title: 'NEQUIP', show: showNequipTab },
		{ id: 'nproject', title: 'NPROJECT', show: showNprojectTab },
		{ id: 'nsmart', title: 'NSMART', show: showNsmartTab },
		{ id: 'nreality', title: 'NREALITY', show: showNrealityTab },
		{ id: 'nhologram', title: 'NHOLOGRAM', show: showNhologramTab },
		{ id: 'npower', title: 'NPOWER', show: showNpowerTab },
		{ id: 'ncharge', title: 'NCHARGE', show: showNchargeTab },
		{ id: 'ncity', title: 'NCITY', show: showNcityTab },
		{ id: 'nkiosk', title: 'NKIOSK', show: showNkioskTab },
		{ id: 'nled', title: 'NLED', show: showNledTab },
		{ id: 'nfire', title: 'NFIRE', show: showNfireTab },
		{ id: 'nfurniture', title: 'NFURNITURE', show: showNfurnitureTab },
		{ id: 'npartition', title: 'NPARTITION', show: showNpartitionTab },
		{ id: 'ndecor', title: 'NDECOR', show: showNdecorTab },
		{ id: 'nping', title: 'NPING', show: showNpingTab },
		{ id: 'nconnect', title: 'NCONNECT', show: showNconnectTab },
		{ id: 'nlight', title: 'NLIGHT', show: showNlightTab },
		{ id: 'ncomfort', title: 'NCOMFORT', show: showNcomfortTab },
		{ id: 'nsound', title: 'NSOUND', show: showNsoundTab },
		{ id: 'nhome', title: 'NHOME', show: showNhomeTab }
	];

	// Função para abrir o modal de opções do terminal
	const toggleTerminalOptionsModal = () => setShowModal(!showModal);

	// Função para abrir o modal de opções de email
	const toggleEmailOptionsModal = () => setShowEmailModal(!showEmailModal);

	// Função para abrir o modal de publicidade para fotos
	const togglePhotoAdsModal = () => setShowPhotoAdsModal(!showPhotoAdsModal);

	// Função para abrir o modal de publicidade para vídeos
	const toggleVideoAdsModal = () => setShowVideoAdsModal(!showVideoAdsModal);

	// Função para abrir o modal de acerca de
	const toggleAboutModalOpen = () => setShowAboutModal(!showAboutModal);

	// Função para adicionar publicidade via contexto
	const handleUploadClick = (ad: FormData) => {
		handleAddModalNavbar(ad);
	};

	// Função para abrir o anydesk em uma nova janela
	const handleAnydeskWindow = () => {
		window.open('https://anydesk.com/pt');
	}

	// Função para alternar a visibilidade da seção quando o título for clicado
	const toggleGroupVisibility = (groupId: string) => {
		setVisibleGroup((prev) => (prev === groupId ? null : groupId));
	};

	return (
		<ColorProvider>
			<nav data-role="ribbonmenu" style={{ backgroundColor: navbarColor }}>
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
						{tabs.map(tab => tab.show && (
							<li key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}>
								<a className={`nav-link ${tab.id}-tab`} id={`${tab.id}-tab`} onClick={() => handleTabClick(tab.id)}>
									{tab.title}
								</a>
							</li>
						))}
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
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="nclock" role="tabpanel" aria-labelledby="nclock-tab">
							<div className="section" id="section-group">
								<div className="group">
									{(!isMobile || visibleGroup === 'inicio nclock') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nclockdashboard" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas mt-2">
													<span className="icon">
														<img src={home} alt="botão início" />
													</span>
													<span className="text">Destaques</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('inicio nclock')}>
										<span className="title">Início</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'assiduidade nclock') && (
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
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('assiduidade nclock')}>
										<span className="title">Assiduidade</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'acessos nclock') && (
										<div className="btn-group" role="group">
											<div className="grid-container-entidades">
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={movement} alt="botão acessos movimentos" />
													</span>
													<span className="text">Movimentos</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={presence} alt="botão acessos presenças" />
													</span>
													<span className="text">Presenças</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('acessos nclock')}>
										<span className="title">Acessos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'resultados nclock') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={clipboard} alt="botão resultados" />
													</span>
													<span className="text">Resultados</span>
												</Button>
											</div>
											<div className="grid-container">
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={processing} alt="botão processamento" />
													</span>
													<span className="text">Processamento</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={segmentation} alt="botão segmentos" />
													</span>
													<span className="text">Segmentos</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={plusMinus} alt="botão compensações" />
													</span>
													<span className="text">Compensações</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={battery} alt="botão acumulados" />
													</span>
													<span className="text">Acumulados</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={hourDatabase} alt="botão banco de horas" />
													</span>
													<span className="text">Banco de Horas</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={clock} alt="botão trabalho suplementar" />
													</span>
													<span className="text">Trabalho Suplementar</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('resultados nclock')}>
										<span className="title">Resultados</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'horarios nclock') && (
										<div className="btn-group" role="group">
											<div className="grid-container-entidades">
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={time} alt="botão horários" />
													</span>
													<span className="text">Horários</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={workPlan} alt="botão planos de trabalho" />
													</span>
													<span className="text">Planos de Trabalho</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('horarios nclock')}>
										<span className="title">Horários</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'codigos de resultados nclock') && (
										<div className="btn-group" role="group">
											<div className="grid-container">
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={absent} alt="botão ausências faltas" />
													</span>
													<span className="text">Ausências Faltas</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={unknown} alt="botão não definido" />
													</span>
													<span className="text">Não Definido</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={work} alt="botão trabalho" />
													</span>
													<span className="text">Trabalho</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={extra} alt="botão extra" />
													</span>
													<span className="text">Extra</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={limit} alt="botão tolerâncias" />
													</span>
													<span className="text">Tolerâncias</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={addHour} alt="botão banco de horas" />
													</span>
													<span className="text">Banco de Horas</span>
												</Button>
											</div>
											<div>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={rules} alt="botão regras" />
													</span>
													<span className="text">Regras</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('codigos de resultados nclock')}>
										<span className="title">Códigos de Resultados</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'alteracoes nclock') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={medicalLeave} alt="botão ausências" />
													</span>
													<span className="text">Ausências</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={vacation} alt="botão férias" />
													</span>
													<span className="text">Férias</span>
												</Button>
											</div>
											<div>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={vacation} alt="botão alteração de férias" />
													</span>
													<span className="text">Alteração de Férias</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={holidays} alt="botão feriados" />
													</span>
													<span className="text">Feriados</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={autorization} alt="botão autorizações" />
													</span>
													<span className="text">Autorizações</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alteracoes nclock')}>
										<span className="title">Alterações</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'escalas nclock') && (
										<div className="btn-group" role="group">
											<div className="grid-container">
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={calendar} alt="botão calendário" />
													</span>
													<span className="text">Calendário</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={segmentation} alt="botão segmentos" />
													</span>
													<span className="text">Segmentos</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={monthly} alt="botão mensal" />
													</span>
													<span className="text">Mensal</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={exchange} alt="botão trocas" />
													</span>
													<span className="text">Trocas</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={availability} alt="botão disponibilidades" />
													</span>
													<span className="text">Disponibilidades</span>
												</Button>
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={plans} alt="botão planos" />
													</span>
													<span className="text">Planos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('escalas nclock')}>
										<span className="title">Escalas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'configuracoes nclock') && (
										<div className="btn-group" role="group">
											<div className='icon-text-informacoes'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-entidades" disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('configuracoes nclock')}>
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
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="naccess" role="tabpanel" aria-labelledby="naccess-tab">
							<div className="section" id="section-group">
								<div className="group">
									{(!isMobile || visibleGroup === 'inicio naccess') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/naccessdashboard" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={home} alt="botão início" />
													</span>
													<span className="text">Destaques</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('inicio naccess')}>
										<span className="title">Início</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'acessos naccess') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={movement} alt="botão movimentos" />
													</span>
													<span className="text">Movimentos</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={presence} alt="botão presença" />
													</span>
													<span className="text">Presença</span>
												</Button>
											</div>
											<div>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={all} alt="botão todos" />
													</span>
													<span className="text">Todos</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={formation} alt="botão formação" />
													</span>
													<span className="text">Formação</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={person} alt="botão visitas" />
													</span>
													<span className="text">Visitas</span>
												</Button>
											</div>
											<div>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={motives} alt="botão motivos" />
													</span>
													<span className="text">Motivos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('acessos naccess')}>
										<span className="title">Acessos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'revistas naccess') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={search} alt="botão revistas" />
													</span>
													<span className="text">Revistas</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={plans} alt="botão planos" />
													</span>
													<span className="text">Planos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('revistas naccess')}>
										<span className="title">Revistas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'configuracao naccess') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={imports} alt="botão importações" />
													</span>
													<span className="text">Importações</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={controlPanel} alt="botão painel de controlo" />
													</span>
													<span className="text">Painel de Controlo</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('configuracao naccess')}>
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
				{showNkioskRibbon && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="nkiosk" role="tabpanel" aria-labelledby="nkiosk-tab">
							<div className="section" id="section-group">
								<div className="group">
									{(!isMobile || visibleGroup === 'inicio nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nkioskdashboard" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={home} alt="botão início" />
													</span>
													<span className="text">Destaques</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('inicio nkiosk')}>
										<span className="title">Início</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'recebimentos nkiosk') && (
										<div className="btn-group" role="group">
											<div className="grid-container" style={{ gridTemplateColumns: '1fr' }}>
												<Link to="/nkiosk/nkioskpayterminal" type="button" className="btn btn-light ribbon-button">
													<span className="icon">
														<img src={payment_card} alt="botão pagamento terminal" />
													</span>
													<span className="text">Pagamento Multibanco</span>
												</Link>
												<Link to='/nkiosk/nkioskpaycoins' type="button" className="btn btn-light ribbon-button">
													<span className="icon">
														<img src={coin} alt="botão pagamento moedas" />
													</span>
													<span className="text">Pagamento Moedeiro</span>
												</Link>
											</div>
											<div className="icon-text-pessoas">
												<Link to="/nkiosk/nkiosklistpayments" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={card_report} alt="botão listagem de pagamentos" />
													</span>
													<span className="text">Pagamentos Totais</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('recebimentos nkiosk')}>
										<span className="title">Recebimentos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'movimentos nkiosk') && (
										<div className="btn-group" role="group">
											<div className="grid-container" style={{ gridTemplateColumns: '1fr' }}>
												<Link to='/nkiosk/nkioskmovecard' type="button" className="btn btn-light ribbon-button">
													<span className="icon">
														<img src={barrier} alt="botão movimentos cartão" />
													</span>
													<span className="text">Movimentos Torniquete</span>
												</Link>
												<Link to='/nkiosk/nkioskmovekiosk' type="button" className="btn btn-light ribbon-button">
													<span className="icon">
														<img src={kiosk} alt="botão movimentos porteiro" />
													</span>
													<span className="text">Movimentos Quiosque</span>
												</Link>
											</div>
											<div className="icon-text-pessoas">
												<Link to="/nkiosk/nkiosklistmovements" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={coin_report} alt="botão listagem de movimentos " />
													</span>
													<span className="text">Movimentos Totais</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('movimentos nkiosk')}>
										<span className="title">Movimentos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'remota nkiosk') && (
										<div className="btn-group" role="group">
											<div className="icon-text-pessoas">
												<Link to="/nkiosk/nkioskmovevp" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={intercom} alt="botão listagem de movimentos " />
													</span>
													<span className="text">Video Porteiro</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('remota nkiosk')}>
										<span className="title">Remota</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'registos nkiosk') && (
										<div className="btn-group" role="group">
											<div className="grid-container" style={{ gridTemplateColumns: '1fr' }}>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={coin} alt="botão recolha moedeiro" />
													</span>
													<span className="text">Recolha Moedeiro</span>
												</Button>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={coin} alt="botão limpeza wc" />
													</span>
													<span className="text">Limpeza WC</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={registry} alt="botão ocorrências gerais" />
													</span>
													<span className="text">Ocorrências Gerais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('registos nkiosk')}>
										<span className="title">Registos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'anuncios nkiosk') && (
										<div className="btn-group" role="group">
											<div>
												<Button /* to="/nkiosk/NkioskAds" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={ads} alt="botão publicidade" />
													</span>
													<span className="text">Publicidade</span>
												</Button>
											</div>
											<div>
												<Button onClick={toggleVideoAdsModal} type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={video} alt="botão vídeo" />
													</span>
													<span className="text">Vídeo</span>
												</Button>
												<Button onClick={togglePhotoAdsModal} type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={image} alt="botão imagem" />
													</span>
													<span className="text">Imagem</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('anuncios nkiosk')}>
										<span className="title">Anúncios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'videovigilancia nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={online} alt="botão online" />
													</span>
													<span className="text">Online</span>
												</Button>
											</div>
											<div>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={offline} alt="botão offline" />
													</span>
													<span className="text">Offline</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('videovigilancia nkiosk')}>
										<span className="title">Videovigilância</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'zonas nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nkioskmap" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={maps} alt="botão mapa" />
													</span>
													<span className="text">Mapa</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('zonas nkiosk')}>
										<span className="title">Zonas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'logs nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nkiosklogs" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={logs} alt="botão log de utilizadores" />
													</span>
													<span className="text">Log de Utilizadores</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('logs nkiosk')}>
										<span className="title">Logs</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'alertas nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="#" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={bell} alt="botão avisos" />
													</span>
													<span className="text">Avisos</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alertas nkiosk')}>
										<span className="title">Alertas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'alarmes nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={alert} alt="botão intrusão" />
													</span>
													<span className="text">Intrusão</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alarmes nkiosk')}>
										<span className="title">Alarmes</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'relatorio nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={print} alt="botão listagens" />
													</span>
													<span className="text">Listagens</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={graphs} alt="botão gráficos" />
													</span>
													<span className="text">Gráficos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('relatorio nkiosk')}>
										<span className="title">Relatórios</span>
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
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="pessoas" role="tabpanel" aria-labelledby="pessoas-tab">
							<div className="section" id="section-group">
								<div className="group">
									{(!isMobile || visibleGroup === 'pessoas pessoas') && (
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
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('pessoas pessoas')}>
										<span className="title">Pessoas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'organizacao pessoas') && (
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
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={fraccoes} alt="botão provisórios" />
													</span>
													<span className="text">Fracções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('organizacao pessoas')}>
										<span className="title">Organização</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'entidades pessoas') && (
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
												<Button /* to='#' */ type="button" className="btn btn-light ribbon-button" disabled>
													<span className="icon">
														<img src={fonts} alt="botão fontes" />
													</span>
													<span className="text">Fontes</span>
												</Button>
											</div>
											<div className='icon-text-informacoes'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-entidades" disabled>
													<span className="icon">
														<img src={interventionAreas} alt="botão áreas de intervenção" />
													</span>
													<span className="text">Áreas de Intervenção</span>
												</Button>
											</div>
											<div className='icon-text-informacoes'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-entidades" disabled>
													<span className="icon">
														<img src={businessAreas} alt="botão áreas de negócios" />
													</span>
													<span className="text">Áreas de Negócios</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('entidades pessoas')}>
										<span className="title">Entidades</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'informacoes pessoas') && (
										<div className="btn-group" role="group">
											<div className='icon-text-informacoes'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-entidades" disabled>
													<span className="icon">
														<img src={internalContacts} alt="botão contactos internos" />
													</span>
													<span className="text">Contactos Internos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('informacoes pessoas')}>
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
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="dispositivos" role="tabpanel" aria-labelledby="dispositivos-tab">
							<div className="section" id="section-group">
								<div className="group">
									{(!isMobile || visibleGroup === 'terminais terminais') && (
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
												<Link to="/devices/terminalsmb" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={terminalmb} alt="botão terminais multibanco" />
													</span>
													<span className="text">Terminais MB</span>
												</Link>
											</div>
											<div className="icon-text-pessoas">
												<Link to="/devices/accesscontrols" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={accessControl} alt="botão controle de acesso " />
													</span>
													<span className="text">Controle de Acesso</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={accessPlan} alt="botão planos de acesso" />
													</span>
													<span className="text">Planos de Acesso</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={timePlan} alt="botão planos de horários" />
													</span>
													<span className="text">Planos de Horários</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/devices/timeperiods" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={clock} alt="botão períodos" />
													</span>
													<span className="text">Períodos</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Button onClick={toggleTerminalOptionsModal} className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('terminais terminais')}>
										<span className="title">Terminais</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'banco terminais') && (
										<div className="btn-group" role="group">
											<div className="icon-text-pessoas">
												<Link to="/devices/terminalcloseopen" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={open} alt="botão fecho/abertura pagamentos" />
													</span>
													<span className="text">Fecho/Abertura</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('banco terminais')}>
										<span className="title">Banco</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'cameras terminais') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={camera} alt="botão câmeras" />
													</span>
													<span className="text">Câmeras</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('cameras terminais')}>
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
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="configuracao" role="tabpanel" aria-labelledby="configuracao-tab">
							<div className="section" id="section-group">
								<div className="group">
									{(!isMobile || visibleGroup === 'base configuracoes') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={database} alt="botão base de dados" />
													</span>
													<span className="text">Base de Dados</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={imports} alt="botão backup bd" />
													</span>
													<span className="text">Backup BD</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={departments} alt="botão entidade" />
													</span>
													<span className="text">Entidade</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={license} alt="botão licença" />
													</span>
													<span className="text">Licença</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button onClick={toggleEmailOptionsModal} type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('base configuracoes')}>
										<span className="title">Base</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'geral configuracoes') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={timeZone} alt="botão fusos horários" />
													</span>
													<span className="text">Fusos Horários</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={nacionalities} alt="botão nacionalidades" />
													</span>
													<span className="text">Nacionalidades</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('geral configuracoes')}>
										<span className="title">Geral</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'permissoes configuracoes') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={groups} alt="botão perfis" />
													</span>
													<span className="text">Perfis</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/configs/newusers" type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={person} alt="botão utilizadores" />
													</span>
													<span className="text">Utilizadores</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('permissoes configuracoes')}>
										<span className="title">Permissões</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'documentos configuracoes') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={document} alt="botão documentos" />
													</span>
													<span className="text">Documentos</span>
												</Button>
											</div>
											<div>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button-ent" disabled>
													<span className="icon">
														<img src={types} alt="botão tipos" />
													</span>
													<span className="text">Tipos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('documentos configuracoes')}>
										<span className="title">Documentos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'actividade configuracoes') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={consult} alt="botão consultar" />
													</span>
													<span className="text">Consultar</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={dpoConsult} alt="botão consultar dpo" />
													</span>
													<span className="text">Consultar DPO</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('actividade configuracoes')}>
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
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="ajuda" role="tabpanel" aria-labelledby="ajuda-tab">
							<div className="section" id="section-group">
								<div className="group">
									{(!isMobile || visibleGroup === 'suporte ajuda') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button onClick={toggleAboutModalOpen} type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={about} alt="botão acerca de" />
													</span>
													<span className="text">Acerca de</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={manual} alt="botão manual" />
													</span>
													<span className="text">Manual</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={version} alt="botão versão" />
													</span>
													<span className="text">Versão</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" disabled>
													<span className="icon">
														<img src={helpdesk} alt="botão helpdesk" />
													</span>
													<span className="text">Helpdesk</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button onClick={handleAnydeskWindow} type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={anydesk} alt="botão anydesk" />
													</span>
													<span className="text">Anydesk</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('suporte ajuda')}>
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
				{showEmailModal && emailCompanyConfig && (
					<EmailOptionsModal
						open={showEmailModal}
						onClose={() => setShowEmailModal(false)}
						onSave={handleAddEmailConfig}
						onUpdate={handleUpdateEmailConfig}
						entity={emailCompanyConfig}
						fields={emailAndCompanyFields}
						title='Opções de E-Mail'
					/>
				)}
				{showPhotoAdsModal && (
					<CreateModalAds
						open={showPhotoAdsModal}
						onClose={() => setShowPhotoAdsModal(false)}
						onSave={handleUploadClick}
						fields={adsFields}
						initialValues={{}}
						title='Publicidades'
						entities='photo'
					/>
				)}
				{showVideoAdsModal && (
					<CreateModalAds
						open={showVideoAdsModal}
						onClose={() => setShowVideoAdsModal(false)}
						onSave={handleUploadClick}
						fields={adsFields}
						initialValues={{}}
						title='Publicidades'
						entities='video'
					/>
				)}
				{showAboutModal && (
					<AboutModal
						open={showAboutModal}
						onClose={() => setShowAboutModal(false)}
					/>
				)}
			</nav>
		</ColorProvider>
	);
};