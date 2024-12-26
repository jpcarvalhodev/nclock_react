import React, { Dispatch, SetStateAction } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { EmailUser, KioskConfig } from '../helpers/Types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NavBar.css';
import { TerminalOptionsModal } from '../modals/TerminalOptions';
import profileAvatar from '../assets/img/navbar/navbar/profileAvatar.png';
import person from '../assets/img/navbar/pessoas/person.png';
import category from '../assets/img/navbar/pessoas/categories.png';
import department from '../assets/img/navbar/pessoas/departments.png';
import externalEntities from '../assets/img/navbar/pessoas/externalEntities.png';
import group from '../assets/img/navbar/pessoas/groups.png';
import profession from '../assets/img/navbar/pessoas/professions.png';
import zone from '../assets/img/navbar/pessoas/zones.png';
import fraccoes from '../assets/img/navbar/pessoas/fraccoes.png';
import types from '../assets/img/navbar/pessoas/types.png';
import fonts from '../assets/img/navbar/pessoas/fonts.png';
import interventionAreas from '../assets/img/navbar/pessoas/interventionAreas.png';
import businessAreas from '../assets/img/navbar/pessoas/businessAreas.png';
import internalContacts from '../assets/img/navbar/pessoas/internalContacts.png';
import Dropdown from 'react-bootstrap/Dropdown';
import sisnidlogo from '../assets/img/navbar/navbar/sisnidlogo.webp';
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
import timePlan from '../assets/img/navbar/dispositivos/timePlan.png';
import camera from '../assets/img/navbar/dispositivos/camera.png';
import database from '../assets/img/navbar/configuracao/database.png';
import licenses from '../assets/img/navbar/configuracao/license.png';
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
import log from '../assets/img/navbar/nkiosk/logs.png';
import bell from '../assets/img/navbar/nkiosk/bell.png';
import registry from '../assets/img/navbar/nkiosk/registry.png';
import alert from '../assets/img/navbar/nkiosk/alert.png';
import accessControls from '../assets/img/navbar/nkiosk/accessControl.png';
import anydesk from '../assets/img/navbar/ajuda/anydesk.png';
import home from '../assets/img/navbar/home.png';
import terminalmb from '../assets/img/navbar/dispositivos/terminalmb.png';
import open from '../assets/img/navbar/nkiosk/open.png';
import print from '../assets/img/navbar/nkiosk/print.png';
import graphs from '../assets/img/navbar/nkiosk/graphs.png';
import version from '../assets/img/navbar/ajuda/version.png';
import module from '../assets/img/navbar/nkiosk/module.png';
import { CreateModalAds } from '../modals/CreateModalAds';
import { Button, Navbar } from 'react-bootstrap';
import { accessControlFields, adsFields, categoryFields, counterFields, departmentFields, deviceFields, emailFields, employeeFields, externalEntityFields, groupFields, kioskConfigFields, licenseFields, limpezasEOcorrenciasFields, logsFields, manualOpenDoorFields, mbDeviceCloseOpenFields, professionFields, recolhaMoedeiroEContadorFields, registerFields, timePeriodFields, transactionCardFields, transactionMBFields, zoneFields } from '../helpers/Fields';
import { useAds } from '../context/AdsContext';
import { EmailOptionsModal } from '../modals/EmailOptions';
import * as apiService from "../helpers/apiService";
import { toast } from 'react-toastify';
import { AboutModal } from '../modals/AboutModal';
import ncount from '../assets/img/navbar/navbar/ncount.png';
import nbuild from '../assets/img/navbar/navbar/nbuild.png';
import ncaravan from '../assets/img/navbar/navbar/ncaravan.png';
import nmechanic from '../assets/img/navbar/navbar/nmechanic.png';
import nevents from '../assets/img/navbar/navbar/nevents.png';
import nservice from '../assets/img/navbar/navbar/nservice.png';
import ntask from '../assets/img/navbar/navbar/ntask.png';
import nproduction from '../assets/img/navbar/navbar/nproduction.png';
import nticket from '../assets/img/navbar/navbar/nticket.png';
import nsales from '../assets/img/navbar/navbar/nsales.png';
import ninvoice from '../assets/img/navbar/navbar/ninvoice.png';
import ndoc from '../assets/img/navbar/navbar/ndoc.png';
import nsports from '../assets/img/navbar/navbar/nsports.png';
import ngym from '../assets/img/navbar/navbar/ngym.png';
import nschool from '../assets/img/navbar/navbar/nschool.png';
import nclinic from '../assets/img/navbar/navbar/nclinic.png';
import noptics from '../assets/img/navbar/navbar/noptics.png';
import ngold from '../assets/img/navbar/navbar/ngold.png';
import open_door from '../assets/img/navbar/nkiosk/open_door.png';
import count from '../assets/img/navbar/nkiosk/count.png';
import cleanings from '../assets/img/navbar/nkiosk/cleaning.png';
import certificate from '../assets/img/navbar/certificate.png';
import { LicenseModal } from '../modals/LicenseModal';
import { useLicense } from '../context/LicenseContext';
import { usePersons } from '../context/PersonsContext';
import { KioskOptionsModal } from '../modals/KioskOptions';
import contact from '../assets/img/navbar/ajuda/contact.png';
import { ContactModal } from '../modals/ContactModal';
import sensor from '../assets/img/navbar/nkiosk/sensor.png';
import cell from '../assets/img/navbar/nkiosk/cell.png';
import { fetchWithAuth } from './FetchWithAuth';
import { PrintButton } from './PrintButton';
import { useTerminals } from '../context/TerminalsContext';
import { useEntity } from '../context/EntityContext';
import { useKiosk } from '../context/KioskContext';
import whatsapp from '../assets/img/navbar/ajuda/whatsapp.png';
import { useCardScroll } from '../context/CardScrollContext';
import counts from '../assets/img/navbar/nkiosk/counter.png';
import panel from '../assets/img/navbar/nkiosk/panel.png';
import ribbonControl from '../assets/img/navbar/navbar/ribbonControl.png';
import ribbonControlLock from '../assets/img/navbar/navbar/ribbonControlLock.png';
import { useNavbar } from '../context/NavbarContext';
import cars from '../assets/img/navbar/npark/cars.png';
import payBooth from '../assets/img/navbar/npark/payBooth.png';

// Define a interface para o payload do token
interface MyTokenPayload extends JwtPayload {
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
}

// Define os nomes das abas
type RibbonName = 'pessoas' | 'dispositivos' | 'configuracao' | 'ajuda' | 'nclock' | 'naccess' | 'nvisitor' | 'npark' | 'ndoor' | 'npatrol' | 'ncard' | 'nview' | 'nsecur' | 'nsoftware' | 'nsystem' | 'napp' | 'ncyber' | 'ndigital' | 'nserver' | 'naut' | 'nequip' | 'nproject' | 'ncount' | 'nbuild' | 'ncaravan' | 'nmechanic' | 'nevents' | 'nservice' | 'ntask' | 'nproduction' | 'nticket' | 'nsales' | 'ninvoice' | 'ndoc' | 'nsports' | 'ngym' | 'nschool' | 'nclinic' | 'noptics' | 'ngold' | 'nsmart' | 'nreality' | 'nhologram' | 'npower' | 'ncharge' | 'ncity' | 'nkiosk' | 'nled' | 'nfire' | 'nfurniture' | 'npartition' | 'ndecor' | 'nping' | 'nconnect' | 'nlight' | 'ncomfort' | 'nsound' | 'nhome';

// Define a interface para as informações da aba
type TabInfo = {
	setTab: React.Dispatch<React.SetStateAction<boolean>>;
	setRibbon: React.Dispatch<React.SetStateAction<boolean>>;
	localStorageTabKey: string;
	localStorageRibbonKey?: string;
	route: string;
};

// Define a interface para os dados do menu
interface MenuItem {
	active?: boolean;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	label: string;
	image?: any;
	alt?: string;
	key: string;
	className?: string;
	submenu?: MenuItem[];
}

// Define a interface para a estrutura do menu
interface MenuStructure {
	[key: string]: MenuItem;
}

// Define a interface para os dados do menu
interface DataField {
	label: string;
	key: string;
	type?: string;
	required?: boolean;
}

// Define a interface para os dados do menu
interface MenuConfigItem {
	data: any[];
	fields: DataField[];
}

// Define a interface para a estrutura do menu
interface MenuConfig {
	[key: string]: MenuConfigItem;
}

// Define as propriedades do componente
interface NavBarProps {
	style?: React.CSSProperties;
}

// Definição dos tipos para os nomes das ribbons e das tabs
type RibbonKey = 'Nclock' | 'Naccess' | 'Nvisitor' | 'Npark' | 'Ndoor' | 'Npatrol' | 'Ncard' | 'Nview' | 'Nsecur' | 'Nsoftware' | 'Nsystem' | 'Napp' | 'Ncyber' | 'Ndigital' | 'Nserver' | 'Naut' | 'Nequip' | 'Nproject' | 'Ncount' | 'Nbuild' | 'Ncaravan' | 'Nmechanic' | 'Nevents' | 'Nservice' | 'Ntask' | 'Nproduction' | 'Nticket' | 'Nsales' | 'Ninvoice' | 'Ndoc' | 'Nsports' | 'Ngym' | 'Nschool' | 'Nclinic' | 'Noptics' | 'Ngold' | 'Nsmart' | 'Nreality' | 'Nhologram' | 'Npower' | 'Ncharge' | 'Ncity' | 'Nkiosk' | 'Nled' | 'Nfire' | 'Nfurniture' | 'Npartition' | 'Ndecor' | 'Nping' | 'Nconnect' | 'Nlight' | 'Ncomfort' | 'Nsound' | 'Nhome';

// Define a interface para o toggler da ribbon
type RibbonToggler = 'Pessoas' | 'Dispositivos' | 'Configuracao' | 'Ajuda' | 'Nclock' | 'Naccess' | 'Nvisitor' | 'Npark' | 'Ndoor' | 'Npatrol' | 'Ncard' | 'Nview' | 'Nsecur' | 'Nsoftware' | 'Nsystem' | 'Napp' | 'Ncyber' | 'Ndigital' | 'Nserver' | 'Naut' | 'Nequip' | 'Nproject' | 'Ncount' | 'Nbuild' | 'Ncaravan' | 'Nmechanic' | 'Nevents' | 'Nservice' | 'Ntask' | 'Nproduction' | 'Nticket' | 'Nsales' | 'Ninvoice' | 'Ndoc' | 'Nsports' | 'Ngym' | 'Nschool' | 'Nclinic' | 'Noptics' | 'Ngold' | 'Nsmart' | 'Nreality' | 'Nhologram' | 'Npower' | 'Ncharge' | 'Ncity' | 'Nkiosk' | 'Nled' | 'Nfire' | 'Nfurniture' | 'Npartition' | 'Ndecor' | 'Nping' | 'Nconnect' | 'Nlight' | 'Ncomfort' | 'Nsound' | 'Nhome';

// Define a interface para os setters das ribbons
type RibbonSetters = {
	[key: string]: [boolean, Dispatch<SetStateAction<boolean>>];
};

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
	const { navbarColor, setNavbarColor, setFooterColor, lockRibbon, setLockRibbon, currentOpenRibbon, setCurrentOpenRibbon, lastClosedRibbon, setLastClosedRibbon, emailCompanyConfig, fetchEmailConfig, fetchKioskConfig, handleAddEmailConfig, handleAddKioskConfig, handleUpdateEmailConfig, handleUpdateKioskConfig, kioskConfig } = useNavbar();
	const { setScrollPosition } = useCardScroll();
	const { handleAddAds } = useAds();
	const { loginLogs, historyLogs } = useEntity();
	const { license, getSoftwareEnabledStatus, handleUpdateLicense } = useLicense();
	const { devices, accessControl, period, mbCloseOpen } = useTerminals();
	const { employees, departments, groups, registeredUsers, categories, dataEE, professions, zones } = usePersons();
	const { payTerminal, payCoins, listPayments, moveCard, moveKiosk, listMovements, moveVP, manualOpenDoor, getCoins, cleaning, occurrences, counter } = useKiosk();
	const [user, setUser] = useState({ name: '', email: '' });
	const [showPessoasRibbon, setShowPessoasRibbon] = useState(false);
	const [showDispositivosRibbon, setShowDispositivosRibbon] = useState(false);
	const [showConfiguracaoRibbon, setShowConfiguracaoRibbon] = useState(false);
	const [showAjudaRibbon, setShowAjudaRibbon] = useState(false);
	const [activeTab, setActiveTab] = useState('');
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
	const [showNcountRibbon, setShowNcountRibbon] = useState(false);
	const [showNbuildRibbon, setShowNbuildRibbon] = useState(false);
	const [showNcaravanRibbon, setShowNcaravanRibbon] = useState(false);
	const [showNmechanicRibbon, setShowNmechanicRibbon] = useState(false);
	const [showNeventsRibbon, setShowNeventsRibbon] = useState(false);
	const [showNserviceRibbon, setShowNserviceRibbon] = useState(false);
	const [showNtaskRibbon, setShowNtaskRibbon] = useState(false);
	const [showNproductionRibbon, setShowNproductionRibbon] = useState(false);
	const [showNticketRibbon, setShowNticketRibbon] = useState(false);
	const [showNsalesRibbon, setShowNsalesRibbon] = useState(false);
	const [showNinvoiceRibbon, setShowNinvoiceRibbon] = useState(false);
	const [showNdocRibbon, setShowNdocRibbon] = useState(false);
	const [showNsportsRibbon, setShowNsportsRibbon] = useState(false);
	const [showNgymRibbon, setShowNgymRibbon] = useState(false);
	const [showNschoolRibbon, setShowNschoolRibbon] = useState(false);
	const [showNclinicRibbon, setShowNclinicRibbon] = useState(false);
	const [showNopticsRibbon, setShowNopticsRibbon] = useState(false);
	const [showNgoldRibbon, setShowNgoldRibbon] = useState(false);
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
	const [showNcountTab, setShowNcountTab] = useState(false);
	const [showNbuildTab, setShowNbuildTab] = useState(false);
	const [showNcaravanTab, setShowNcaravanTab] = useState(false);
	const [showNmechanicTab, setShowNmechanicTab] = useState(false);
	const [showNeventsTab, setShowNeventsTab] = useState(false);
	const [showNserviceTab, setShowNserviceTab] = useState(false);
	const [showNtaskTab, setShowNtaskTab] = useState(false);
	const [showNproductionTab, setShowNproductionTab] = useState(false);
	const [showNticketTab, setShowNticketTab] = useState(false);
	const [showNsalesTab, setShowNsalesTab] = useState(false);
	const [showNinvoiceTab, setShowNinvoiceTab] = useState(false);
	const [showNdocTab, setShowNdocTab] = useState(false);
	const [showNsportsTab, setShowNsportsTab] = useState(false);
	const [showNgymTab, setShowNgymTab] = useState(false);
	const [showNschoolTab, setShowNschoolTab] = useState(false);
	const [showNclinicTab, setShowNclinicTab] = useState(false);
	const [showNopticsTab, setShowNopticsTab] = useState(false);
	const [showNgoldTab, setShowNgoldTab] = useState(false);
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
	const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);
	const location = useLocation();
	const [showPhotoAdsModal, setShowPhotoAdsModal] = useState(false);
	const [showVideoAdsModal, setShowVideoAdsModal] = useState(false);
	const [showEmailModal, setShowEmailModal] = useState(false);
	const [showKioskModal, setShowKioskModal] = useState(false);
	const [visibleGroup, setVisibleGroup] = useState<string | null>(null);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [showAboutModal, setShowAboutModal] = useState(false);
	const [showLicenseModal, setShowLicenseModal] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [showSoftwaresDropdown, setShowSoftwaresDropdown] = useState(false);
	const [menuStructureStart, setMenuStructureStart] = useState<MenuStructure>({});
	const [menuStructureNG, setMenuStructureNG] = useState<MenuStructure>({});
	const [menuStructureListing, setMenuStructureListing] = useState<MenuStructure>({});
	const [menuStructureListingNKiosk, setMenuStructureListingNKiosk] = useState<MenuStructure>({});
	const [showContactModal, setShowContactModal] = useState(false);
	const [showKioskDropdown, setShowKioskDropdown] = useState(false);
	const [showUserDropdown, setShowUserDropdown] = useState(false);
	const [showListDropdown, setShowListDropdown] = useState(false);
	const [userImage, setUserImage] = useState('');
	const [showPrintButton, setShowPrintButton] = useState(false);
	const [currentData, setCurrentData] = useState<any>(null);
	const [currentFields, setCurrentFields] = useState<any>(null);
	const [isMouseOver, setIsMouseOver] = useState(false);

	// Função para atualizar o estado da aba
	const ribbonSetters = {
		Pessoas: setShowPessoasRibbon, Dispositivos: setShowDispositivosRibbon, Configuracao: setShowConfiguracaoRibbon, Ajuda: setShowAjudaRibbon, Nclock: setShowNclockRibbon, Naccess: setShowNaccessRibbon, Nvisitor: setShowNvisitorRibbon, Npark: setShowNparkRibbon, Ndoor: setShowNdoorRibbon,
		Npatrol: setShowNpatrolRibbon, Ncard: setShowNcardRibbon, Nview: setShowNviewRibbon, Nsecur: setShowNsecurRibbon, Nsoftware: setShowNsoftwareRibbon,
		Nsystem: setShowNsystemRibbon, Napp: setShowNappRibbon, Ncyber: setShowNcyberRibbon, Ndigital: setShowNdigitalRibbon, Nserver: setShowNserverRibbon,
		Naut: setShowNautRibbon, Nequip: setShowNequipRibbon, Nproject: setShowNprojectRibbon, Ncount: setShowNcountRibbon, Nbuild: setShowNbuildRibbon, Ncaravan: setShowNcaravanRibbon, Nmechanic: setShowNmechanicRibbon,
		Nevents: setShowNeventsRibbon, Nservice: setShowNserviceRibbon, Ntask: setShowNtaskRibbon, Nproduction: setShowNproductionRibbon,
		Nticket: setShowNticketRibbon, Nsales: setShowNsalesRibbon, Ninvoice: setShowNinvoiceRibbon, Ndoc: setShowNdocRibbon,
		Nsports: setShowNsportsRibbon, Ngym: setShowNgymRibbon, Nschool: setShowNschoolRibbon, Nclinic: setShowNclinicRibbon,
		Noptics: setShowNopticsRibbon, Ngold: setShowNgoldRibbon, Nsmart: setShowNsmartRibbon, Nreality: setShowNrealityRibbon,
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
		Naut: setShowNautTab, Nequip: setShowNequipTab, Nproject: setShowNprojectTab, Ncount: setShowNcountTab, Nbuild: setShowNbuildTab, Ncaravan: setShowNcaravanTab, Nmechanic: setShowNmechanicTab,
		Nevents: setShowNeventsTab, Nservice: setShowNserviceTab, Ntask: setShowNtaskTab, Nproduction: setShowNproductionTab,
		Nticket: setShowNticketTab, Nsales: setShowNsalesTab, Ninvoice: setShowNinvoiceTab, Ndoc: setShowNdocTab,
		Nsports: setShowNsportsTab, Ngym: setShowNgymTab, Nschool: setShowNschoolTab, Nclinic: setShowNclinicTab,
		Noptics: setShowNopticsTab, Ngold: setShowNgoldTab, Nsmart: setShowNsmartTab, Nreality: setShowNrealityTab,
		Nhologram: setShowNhologramTab, Npower: setShowNpowerTab, Ncharge: setShowNchargeTab, Ncity: setShowNcityTab, Nkiosk: setShowNkioskTab,
		Nled: setShowNledTab, Nfire: setShowNfireTab, Nfurniture: setShowNfurnitureTab, Npartition: setShowNpartitionTab, Ndecor: setShowNdecorTab,
		Nping: setShowNpingTab, Nconnect: setShowNconnectTab, Nlight: setShowNlightTab, Ncomfort: setShowNcomfortTab, Nsound: setShowNsoundTab,
		Nhome: setShowNhomeTab,
	};

	// Carrega o token inicial e o estado do ribbon
	useEffect(() => {
		loadInitialToken();
		loadState();

		const storedLockRibbon = localStorage.getItem('lockRibbon');
		if (storedLockRibbon !== null) {
			setLockRibbon(storedLockRibbon === 'true');
		}

		const storedLastClosedRibbon = localStorage.getItem('lastClosedRibbon');
		if (storedLastClosedRibbon) {
			setLastClosedRibbon(storedLastClosedRibbon as RibbonToggler);
		}

		const savedActiveTab = localStorage.getItem('activeTab');
		if (savedActiveTab && tabData[savedActiveTab]) {
			setActiveTab(savedActiveTab);
			const { setTab, setRibbon } = tabData[savedActiveTab];
			setTab(true);
			setRibbon(true);

			if (activeTab in ribbons) {
				const [setRibbon] = ribbons[activeTab as RibbonName];
				setRibbon(true);
			}
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

	// Função para buscar o user logado e a imagem do perfil
	useEffect(() => {
		const preloadImage = (src: string) => {
			const img = new Image();
			img.src = src;
		};

		const fetchAndSetUserImage = () => {
			const username = localStorage.getItem('username');
			const findUser = registeredUsers.find(user => user.userName === username);
			const imageUrl = findUser?.profileImage ? `${apiService.baseURL?.slice(0, -1)}${findUser.profileImage}` : profileAvatar;

			setUserImage(imageUrl);
			preloadImage(imageUrl);
		};

		fetchAndSetUserImage();
	}, [license, registeredUsers]);

	// Função para adicionar emails de utilizadores
	const addEmailConfig = async (email: Partial<EmailUser>) => {
		await handleAddEmailConfig(email);
	}
	// Função para adicionar configurações de quiosque
	const addKioskConfig = async (kioskConfig: Partial<KioskConfig>) => {
		await handleAddKioskConfig(kioskConfig);
	}

	// Função de atualização de emails de utilizadores
	const updateEmailConfig = async (email: Partial<EmailUser>) => {
		await handleUpdateEmailConfig(email);
	}

	// Função de atualização de configurações do quiosque
	const updateKioskConfig = async (kioskConfig: Partial<KioskConfig>) => {
		await handleUpdateKioskConfig(kioskConfig);
	}

	// Função para buscar os dados de email e kiosk
	useEffect(() => {
		fetchEmailConfig();
		fetchKioskConfig();
	}, []);

	// Verificar se a tela é mobile
	const checkIfMobile = () => {
		setIsMobile(window.innerWidth <= 500);
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
		Ncount: { setShowRibbon: setShowNcountRibbon, setShowTab: setShowNcountTab },
		Nbuild: { setShowRibbon: setShowNbuildRibbon, setShowTab: setShowNbuildTab },
		Ncaravan: { setShowRibbon: setShowNcaravanRibbon, setShowTab: setShowNcaravanTab },
		Nmechanic: { setShowRibbon: setShowNmechanicRibbon, setShowTab: setShowNmechanicTab },
		Nevents: { setShowRibbon: setShowNeventsRibbon, setShowTab: setShowNeventsTab },
		Nservice: { setShowRibbon: setShowNserviceRibbon, setShowTab: setShowNserviceTab },
		Ntask: { setShowRibbon: setShowNtaskRibbon, setShowTab: setShowNtaskTab },
		Nproduction: { setShowRibbon: setShowNproductionRibbon, setShowTab: setShowNproductionTab },
		Nticket: { setShowRibbon: setShowNticketRibbon, setShowTab: setShowNticketTab },
		Nsales: { setShowRibbon: setShowNsalesRibbon, setShowTab: setShowNsalesTab },
		Ninvoice: { setShowRibbon: setShowNinvoiceRibbon, setShowTab: setShowNinvoiceTab },
		Ndoc: { setShowRibbon: setShowNdocRibbon, setShowTab: setShowNdocTab },
		Nsports: { setShowRibbon: setShowNsportsRibbon, setShowTab: setShowNsportsTab },
		Ngym: { setShowRibbon: setShowNgymRibbon, setShowTab: setShowNgymTab },
		Nschool: { setShowRibbon: setShowNschoolRibbon, setShowTab: setShowNschoolTab },
		Nclinic: { setShowRibbon: setShowNclinicRibbon, setShowTab: setShowNclinicTab },
		Noptics: { setShowRibbon: setShowNopticsRibbon, setShowTab: setShowNopticsTab },
		Ngold: { setShowRibbon: setShowNgoldRibbon, setShowTab: setShowNgoldTab },
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

	// Cria variáveis para verificar se o software está habilitado
	const softwareEnabled = getSoftwareEnabledStatus(license);

	// Função para atualizar o estado a partir do localStorage
	function setItemState(key: RibbonKey, setterFunction: React.Dispatch<React.SetStateAction<boolean>>, prefix: string = ''): void {
		const stateValue = localStorage.getItem(`${prefix}${key}`) === 'true';
		setterFunction(stateValue);
	}

	// Função para carregar o estado das ribbons e tabs
	function loadState(): void {
		Object.entries(settersMap).forEach(([key, { setShowRibbon, setShowTab }]) => {
			setItemState(key as RibbonKey, setShowRibbon);
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
		'ncount': [setShowNcountRibbon, 'ncount'],
		'nbuild': [setShowNbuildRibbon, 'nbuild'],
		'ncaravan': [setShowNcaravanRibbon, 'ncaravan'],
		'nmechanic': [setShowNmechanicRibbon, 'nmechanic'],
		'nevents': [setShowNeventsRibbon, 'nevents'],
		'nservice': [setShowNserviceRibbon, 'nservice'],
		'ntask': [setShowNtaskRibbon, 'ntask'],
		'nproduction': [setShowNproductionRibbon, 'nproduction'],
		'nticket': [setShowNticketRibbon, 'nticket'],
		'nsales': [setShowNsalesRibbon, 'nsales'],
		'ninvoice': [setShowNinvoiceRibbon, 'ninvoice'],
		'ndoc': [setShowNdocRibbon, 'ndoc'],
		'nsports': [setShowNsportsRibbon, 'nsports'],
		'ngym': [setShowNgymRibbon, 'ngym'],
		'nschool': [setShowNschoolRibbon, 'nschool'],
		'nclinic': [setShowNclinicRibbon, 'nclinic'],
		'noptics': [setShowNopticsRibbon, 'noptics'],
		'ngold': [setShowNgoldRibbon, 'ngold'],
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

			Object.keys(ribbons).forEach((key) => {
				const [setOtherRibbon] = ribbons[key as RibbonName];
				setOtherRibbon(false);
			});
			setRibbon(true);
			const capitalizedTab = tabName.charAt(0).toUpperCase() + tabName.slice(1);
			setCurrentOpenRibbon(capitalizedTab as RibbonToggler);
			setActiveTab(ribbonName);
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
		ncount: createTabInfo('ncount', '/ncount/ncountdashboard'),
		nbuild: createTabInfo('nbuild', '/nbuild/nbuilddashboard'),
		ncaravan: createTabInfo('ncaravan', '/ncaravan/ncaravandashboard'),
		nmechanic: createTabInfo('nmechanic', '/nmechanic/nmechanicdashboard'),
		nevents: createTabInfo('nevents', '/nevents/neventsdashboard'),
		nservice: createTabInfo('nservice', '/nservice/nservicedashboard'),
		ntask: createTabInfo('ntask', '/ntask/ntaskdashboard'),
		nproduction: createTabInfo('nproduction', '/nproduction/nproductiondashboard'),
		nticket: createTabInfo('nticket', '/nticket/nticketdashboard'),
		nsales: createTabInfo('nsales', '/nsales/nsalesdashboard'),
		ninvoice: createTabInfo('ninvoice', '/ninvoice/ninvoicedashboard'),
		ndoc: createTabInfo('ndoc', '/ndoc/ndocdashboard'),
		nsports: createTabInfo('nsports', '/nsports/nsportsdashboard'),
		ngym: createTabInfo('ngym', '/ngym/ngymdashboard'),
		nschool: createTabInfo('nschool', '/nschool/nschooldashboard'),
		nclinic: createTabInfo('nclinic', '/nclinic/nclinicdashboard'),
		noptics: createTabInfo('noptics', '/noptics/nopticsdashboard'),
		ngold: createTabInfo('ngold', '/ngold/ngolddashboard'),
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
			if (localStorageRibbonKey) {
				localStorage.removeItem(localStorageRibbonKey);
			}
		});
		setActiveTab('');
		localStorage.removeItem('activeTab');
	};

	// Função para separar os softwares em grupos
	const softwareGroups = {
		group1: ['nclock', 'naccess', 'nvisitor', 'npark', 'ndoor', 'npatrol', 'ncard', 'nview', 'nsecur'],
		group2: ['nsoftware', 'nsystem', 'napp', 'ncyber', 'ndigital', 'nserver', 'naut', 'nequip', 'nproject', 'ncount', 'nbuild', 'ncaravan', 'nmechanic', 'nevents', 'nservice', 'ntask', 'nproduction', 'nticket', 'nsales', 'ninvoice', 'ndoc', 'nsports', 'ngym', 'nschool', 'nclinic', 'noptics', 'ngold'],
		group3: ['nsmart', 'nreality', 'nhologram', 'npower', 'ncharge', 'ncity', 'nkiosk', 'nled', 'nfire'],
		group4: ['nfurniture', 'npartition', 'ndecor', 'nping', 'nconnect', 'nlight', 'ncomfort', 'nsound', 'nhome']
	};

	// Função para encontrar o índice da aba
	const findTabIndex = (tabName: string) => {
		for (const [key, group] of Object.entries(softwareGroups)) {
			const idx = group.indexOf(tabName);
			if (idx !== -1) {
				return idx;
			}
		}
		return -1;
	};

	// Função para lidar com a aba
	const handleTab = (tabName: string) => {
		clearAllTabs();

		if (tabName === 'dashboard') {
			setActiveTab('');
			localStorage.removeItem('activeTab');
			navigate('/dashboard');
			setScrollPosition(0);
		} else if (tabData[tabName]) {
			const { setTab, setRibbon, localStorageTabKey, localStorageRibbonKey, route } = tabData[tabName];
			const softwareName = tabName;
			const isSoftwareEnabled = softwareEnabled[softwareName] ? true : false;
			const isSoftwareCliente = menuStructureStart.cliente.submenu?.some(item => item.label.toLowerCase() === softwareName) ? true : false;
			const finalRoute = (softwareName && isSoftwareEnabled && isSoftwareCliente) ? `${route}licensed` : route;

			if (activeTab === tabName) {
				setTab(false);
				localStorage.removeItem(localStorageTabKey);
				if (localStorageRibbonKey) {
					localStorage.removeItem(localStorageRibbonKey);
				}
				setActiveTab('');
				localStorage.removeItem('activeTab');
				setScrollPosition(0);
			} else {
				setTab(true);
				setRibbon(isSoftwareCliente);
				setCurrentOpenRibbon(tabName as RibbonToggler);
				if (localStorageRibbonKey && tabName && softwareName && isSoftwareEnabled && isSoftwareCliente) {
					localStorage.setItem(localStorageRibbonKey, 'true')
				}
				setActiveTab(tabName);
				localStorage.setItem('activeTab', tabName);
				const index = findTabIndex(tabName);
				const newScrollPosition = index * 130;
				setScrollPosition(newScrollPosition);
				navigate(finalRoute);
			}
		}
	};

	// Função para fazer logout
	const logout = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetchWithAuth('Authentication/Logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			});
			if (response.ok) {
				localStorage.clear();
				navigate('/');
			} else {
				console.error('Erro ao fazer logout:', response);
			}
		} catch (error) {
			console.error('Erro ao fazer logout:', error);
		}
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
			localStorage.setItem('showNcountRibbon', String(showNcountRibbon));
			localStorage.setItem('showNbuildRibbon', String(showNbuildRibbon));
			localStorage.setItem('showNcaravanRibbon', String(showNcaravanRibbon));
			localStorage.setItem('showNmechanicRibbon', String(showNmechanicRibbon));
			localStorage.setItem('showNeventsRibbon', String(showNeventsRibbon));
			localStorage.setItem('showNserviceRibbon', String(showNserviceRibbon));
			localStorage.setItem('showNtaskRibbon', String(showNtaskRibbon));
			localStorage.setItem('showNproductionRibbon', String(showNproductionRibbon));
			localStorage.setItem('showNticketRibbon', String(showNticketRibbon));
			localStorage.setItem('showNsalesRibbon', String(showNsalesRibbon));
			localStorage.setItem('showNinvoiceRibbon', String(showNinvoiceRibbon));
			localStorage.setItem('showNdocRibbon', String(showNdocRibbon));
			localStorage.setItem('showNsportsRibbon', String(showNsportsRibbon));
			localStorage.setItem('showNgymRibbon', String(showNgymRibbon));
			localStorage.setItem('showNschoolRibbon', String(showNschoolRibbon));
			localStorage.setItem('showNclinicRibbon', String(showNclinicRibbon));
			localStorage.setItem('showNopticsRibbon', String(showNopticsRibbon));
			localStorage.setItem('showNgoldRibbon', String(showNgoldRibbon));
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
		};

		const timer = setTimeout(handleStateChange, 10);

		return () => clearTimeout(timer);
	}, [showPessoasRibbon, showDispositivosRibbon, showConfiguracaoRibbon, showAjudaRibbon, showNclockRibbon, showNaccessRibbon, showNvisitorRibbon, showNparkRibbon, showNdoorRibbon, showNpatrolRibbon, showNcardRibbon, showNviewRibbon, showNsecurRibbon, showNsoftwareRibbon, showNsystemRibbon, showNappRibbon, showNcyberRibbon, showNdigitalRibbon, showNserverRibbon, showNautRibbon, showNequipRibbon, showNprojectRibbon, showNsmartRibbon, showNrealityRibbon, showNhologramRibbon, showNpowerRibbon, showNchargeRibbon, showNcityRibbon, showNkioskRibbon, showNledRibbon, showNfireRibbon, showNfurnitureRibbon, showNpartitionRibbon, showNdecorRibbon, showNpingRibbon, showNconnectRibbon, showNlightRibbon, showNcomfortRibbon, showNsoundRibbon, showNhomeRibbon]);

	// Define a estrutura do menu de softwares
	useEffect(() => {
		const enabledSoftware = getSoftwareEnabledStatus(license);

		const filterUnlicensedSoftware = (submenu: MenuItem[]): MenuItem[] => {
			return submenu.filter(item => enabledSoftware[item.label.toLowerCase()] === false);
		};

		// Estrutura de menu original
		const originalMenuStructure: MenuStructure = {
			sisnid: {
				label: 'SISNID - Segurança',
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
					{ label: 'Nsoftware', image: sisnidlogo, alt: 'nsoftware', key: 'nsoftware' }
				],
			},
			nidsof: {
				label: 'NIDSOF - Gestão',
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
					{ label: 'Ncount', image: ncount, alt: 'ncount', key: 'ncount' },
					{ label: 'Nbuild', image: nbuild, alt: 'nbuild', key: 'nbuild' },
					{ label: 'Ncaravan', image: ncaravan, alt: 'ncaravan', key: 'ncaravan' },
					{ label: 'Nmechanic', image: nmechanic, alt: 'nmechanic', key: 'nmechanic' },
					{ label: 'Nevents', image: nevents, alt: 'nevents', key: 'nevents' },
					{ label: 'Nservice', image: nservice, alt: 'nservice', key: 'nservice' },
					{ label: 'Ntask', image: ntask, alt: 'ntask', key: 'ntask' },
					{ label: 'Nproduction', image: nproduction, alt: 'nproduction', key: 'nproduction' },
					{ label: 'Nticket', image: nticket, alt: 'nticket', key: 'nticket' },
					{ label: 'Nsales', image: nsales, alt: 'nsales', key: 'nsales' },
					{ label: 'Ninvoice', image: ninvoice, alt: 'ninvoice', key: 'ninvoice' },
					{ label: 'Ndoc', image: ndoc, alt: 'ndoc', key: 'ndoc' },
					{ label: 'Nsports', image: nsports, alt: 'nsports', key: 'nsports' },
					{ label: 'Ngym', image: ngym, alt: 'ngym', key: 'ngym' },
					{ label: 'Nschool', image: nschool, alt: 'nschool', key: 'nschool' },
					{ label: 'Nclinic', image: nclinic, alt: 'nclinic', key: 'nclinic' },
					{ label: 'Noptics', image: noptics, alt: 'noptics', key: 'noptics' },
					{ label: 'Ngold', image: ngold, alt: 'ngold', key: 'ngold' },
					{ label: 'Nsoftware', image: nidsof, alt: 'nsoftware', key: 'nsoftware' }
				],
			},
			nidtec: {
				label: 'NIDTEC - Tecnologia',
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
					{ label: 'Nsoftware', image: nidtec, alt: 'nsoftware', key: 'nsoftware' }
				],
			},
			nidplace: {
				label: 'NIDPLACE - Conforto',
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
					{ label: 'Nsoftware', image: nidplace, alt: 'nsoftware', key: 'nsoftware' }
				],
			},

		};

		const newMenuStructure: MenuStructure = {};
		Object.keys(originalMenuStructure).forEach(key => {
			const menu = originalMenuStructure[key];
			const filteredSubmenu = menu.submenu ? filterUnlicensedSoftware(menu.submenu) : [];
			newMenuStructure[key] = {
				...menu,
				submenu: filteredSubmenu
			};
		});

		setMenuStructureNG(newMenuStructure);
	}, [license]);

	// Estrutura de menu opcional para o nkiosk
	const KioskOptionalMenuStructure: MenuStructure = {
		contador: {
			label: 'Contador Passagem',
			image: counts,
			alt: 'contador',
			key: 'contador',
			onClick: () => toast.error('Módulo de Contagem de Pessoas. Sistema pode ser utilizado em diversos contextos, como: Contagem: Controle de entradas e saída de pessoas.'),
		},
		sensor: {
			label: 'Sensor Movimento',
			image: sensor,
			alt: 'sensor',
			key: 'sensor',
			onClick: () => toast.error('Módulo de Sensores de Movimento. Sistema pode ser utilizado em diversos contextos, como: Local: Detetar movimento de uma determinada área.'),
		},
		fotocelula: {
			label: 'Fotocélula Segurança',
			image: cell,
			alt: 'fotocélula',
			key: 'fotocelula',
			onClick: () => toast.error('Módulo de Fotocélulas de Segurança. Sistema pode ser utilizado em diversos contextos, como: Zona: Alerta de um movimento indesejado num local.'),
		},
		painel: {
			label: 'Painel de Movimentos',
			image: panel,
			alt: 'painel',
			key: 'painel',
			onClick: () => toast.error('Módulo de Painel de Movimentos. Sistema pode ser utilizado em diversos contextos, como: Movimentos: Visualizar Registos Online com Foto'),
		},
		revista: {
			label: 'Revistas Aleatórias',
			image: search,
			alt: 'revista',
			key: 'revista',
			onClick: () => toast.error('Módulo de Revistas Aleatórias. Sistema pode ser utilizado em diversos contextos, como: Movimentos: Inspecionar aleatoriamente pessoas.'),
		},
	};

	// Estrutura do menu de listagens
	useEffect(() => {
		const ListingMenuStructure = {
			pessoas: {
				label: 'Listagem Pessoas',
				image: person,
				alt: 'pessoas',
				key: 'pessoas',
				submenu: [
					{ label: 'Listagem Geral de Pessoas', key: 'geral_pessoas', image: person, alt: 'pessoas' },
					{ label: 'Listagem Geral de Departamentos', key: 'geral_departamentos', image: person, alt: 'pessoas' },
					{ label: 'Listagem Geral de Grupos', key: 'geral_grupos', image: person, alt: 'pessoas' },
					{ label: 'Listagem Geral de Categorias', key: 'geral_categorias', image: person, alt: 'pessoas' },
					{ label: 'Listagem Geral de Profissões', key: 'geral_profissoes', image: person, alt: 'pessoas' },
					{ label: 'Listagem Geral de Zonas', key: 'geral_zonas', image: person, alt: 'pessoas' },
					/* { label: 'Listagem Geral de Fracções', key: 'geral_fraccoes', image: person, alt: 'pessoas' }, */
					{ label: 'Listagem Geral de Entidades Externas', key: 'geral_entext', image: person, alt: 'pessoas' }
				],
			},
			dispositivos: {
				label: 'Listagem Dispositivos',
				image: terminal,
				alt: 'dispositivos',
				key: 'dispositivos',
				submenu: [
					{ label: 'Listagem Geral de Equipamentos', key: 'geral_equipamentos', image: terminal, alt: 'dispositivos' },
					{ label: 'Listagem Geral de Controlo de Acessos', key: 'geral_controlo', image: terminal, alt: 'dispositivos' },
					{ label: 'Listagem Geral de Períodos', key: 'geral_periodos', image: terminal, alt: 'dispositivos' },
					{ label: 'Listagem Geral de Fecho e Abertura', key: 'geral_fecho', image: terminal, alt: 'dispositivos' }
				],
			},
			configuracao: {
				label: 'Listagem Configuração',
				image: settings,
				alt: 'configuração',
				key: 'configuracao',
				submenu: [
					{ label: 'Listagem Geral de Utilizadores', key: 'geral_utilizadores', image: settings, alt: 'configuração' },
					{ label: 'Listagem Geral de Logins', key: 'geral_logins', image: settings, alt: 'configuração' },
					{ label: 'Listagem Geral de Histórico', key: 'geral_historico', image: settings, alt: 'configuração' }
				],
			}
		};

		// Estrutura do menu de listagens para o nkiosk
		const nkioskSubmenu = {
			label: 'Listagem Nkiosk',
			image: nkiosk,
			alt: 'nkiosk',
			key: 'nkiosk',
			submenu: [
				{ label: 'Listagem Recebimento Multibanco', key: 'recebimento_multibanco', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Recebimento Moedeiro', key: 'recebimento_moedeiro', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Recebimentos Totais', key: 'recebimento_totais', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Movimento Torniquete', key: 'movimento_torniquete', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Movimento Quiosque', key: 'movimento_quiosque', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Movimentos Totais', key: 'movimento_totais', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Remota Video Porteiro', key: 'remota_vp', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Remota Abertura Manual', key: 'remota_abertura', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Registos Recolha Moedas', key: 'registo_recolhas', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Registos Limpeza Geral', key: 'registo_limpeza', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Registos Contador', key: 'registo_contador', image: nkiosk, alt: 'nkiosk' },
				{ label: 'Listagem Registos Ocorrências', key: 'registo_ocorrencias', image: nkiosk, alt: 'nkiosk' }
			],
		}

		// Função para estender o menu de listagens para um software específico
		function extendMenuForSoftware(softwareKey: string, softwareSpecificItems: MenuItem): MenuStructure {
			const extendedMenu = JSON.parse(JSON.stringify(ListingMenuStructure));

			extendedMenu[softwareKey] = softwareSpecificItems;
			return extendedMenu;
		}

		// Estrutura do menu de listagens para o nkiosk
		const nkioskMenu = extendMenuForSoftware('nkiosk', nkioskSubmenu);

		setMenuStructureListing(ListingMenuStructure);
		setMenuStructureListingNKiosk(nkioskMenu);
	}, []);

	// Define a estrutura do menu do nidgroup
	useEffect(() => {
		const enabledSoftware = getSoftwareEnabledStatus(license);

		const filteredSubmenu = [
			{ label: 'Nclock', image: nclock, alt: 'nclock', key: 'nclock' },
			{ label: 'Naccess', image: naccess, alt: 'naccess', key: 'naccess' },
			{ label: 'Nvisitor', image: nvisitor, alt: 'nvisitor', key: 'nvisitor' },
			{ label: 'Npark', image: npark, alt: 'npark', key: 'npark' },
			{ label: 'Ndoor', image: ndoor, alt: 'ndoor', key: 'ndoor' },
			{ label: 'Npatrol', image: npatrol, alt: 'npatrol', key: 'npatrol' },
			{ label: 'Ncard', image: ncard, alt: 'ncard', key: 'ncard' },
			{ label: 'Nview', image: nview, alt: 'nview', key: 'nview' },
			{ label: 'Nsecur', image: nsecur, alt: 'nsecur', key: 'nsecur' },
			{ label: 'Nsoftware', image: nsoftware, alt: 'nsoftware', key: 'nsoftware' },
			{ label: 'Nsystem', image: nsystem, alt: 'nsystem', key: 'nsystem' },
			{ label: 'Napp', image: napp, alt: 'napp', key: 'napp' },
			{ label: 'Ncyber', image: ncyber, alt: 'ncyber', key: 'ncyber' },
			{ label: 'Ndigital', image: ndigital, alt: 'ndigital', key: 'ndigital' },
			{ label: 'Nserver', image: nserver, alt: 'nserver', key: 'nserver' },
			{ label: 'Naut', image: naut, alt: 'naut', key: 'naut' },
			{ label: 'Nequip', image: nequip, alt: 'nequip', key: 'nequip' },
			{ label: 'Nproject', image: nproject, alt: 'nproject', key: 'nproject' },
			{ label: 'Ncount', image: ncount, alt: 'ncount', key: 'ncount' },
			{ label: 'Nbuild', image: nbuild, alt: 'nbuild', key: 'nbuild' },
			{ label: 'Ncaravan', image: ncaravan, alt: 'ncaravan', key: 'ncaravan' },
			{ label: 'Nmechanic', image: nmechanic, alt: 'nmechanic', key: 'nmechanic' },
			{ label: 'Nevents', image: nevents, alt: 'nevents', key: 'nevents' },
			{ label: 'Nservice', image: nservice, alt: 'nservice', key: 'nservice' },
			{ label: 'Ntask', image: ntask, alt: 'ntask', key: 'ntask' },
			{ label: 'Nproduction', image: nproduction, alt: 'nproduction', key: 'nproduction' },
			{ label: 'Nticket', image: nticket, alt: 'nticket', key: 'nticket' },
			{ label: 'Nsales', image: nsales, alt: 'nsales', key: 'nsales' },
			{ label: 'Ninvoice', image: ninvoice, alt: 'ninvoice', key: 'ninvoice' },
			{ label: 'Ndoc', image: ndoc, alt: 'ndoc', key: 'ndoc' },
			{ label: 'Nsports', image: nsports, alt: 'nsports', key: 'nsports' },
			{ label: 'Ngym', image: ngym, alt: 'ngym', key: 'ngym' },
			{ label: 'Nschool', image: nschool, alt: 'nschool', key: 'nschool' },
			{ label: 'Nclinic', image: nclinic, alt: 'nclinic', key: 'nclinic' },
			{ label: 'Noptics', image: noptics, alt: 'noptics', key: 'noptics' },
			{ label: 'Ngold', image: ngold, alt: 'ngold', key: 'ngold' },
			{ label: 'Nsmart', image: nsmart, alt: 'nsmart', key: 'nsmart' },
			{ label: 'Nreality', image: nreality, alt: 'nreality', key: 'nreality' },
			{ label: 'Nhologram', image: nhologram, alt: 'nhologram', key: 'nhologram' },
			{ label: 'Npower', image: npower, alt: 'npower', key: 'npower' },
			{ label: 'Ncharge', image: ncharge, alt: 'ncharge', key: 'ncharge' },
			{ label: 'Ncity', image: ncity, alt: 'ncity', key: 'ncity' },
			{ label: 'Nkiosk', image: nkiosk, alt: 'nkiosk', key: 'nkiosk' },
			{ label: 'Nled', image: nled, alt: 'nled', key: 'nled' },
			{ label: 'Nfire', image: nfire, alt: 'nfire', key: 'nfire' },
			{ label: 'Nfurniture', image: nfurniture, alt: 'nfurniture', key: 'nfurniture' },
			{ label: 'Npartition', image: npartition, alt: 'npartition', key: 'npartition' },
			{ label: 'Ndecor', image: ndecor, alt: 'ndecor', key: 'ndecor' },
			{ label: 'Nping', image: nping, alt: 'nping', key: 'nping' },
			{ label: 'Nconnect', image: nconnect, alt: 'nconnect', key: 'nconnect' },
			{ label: 'Nlight', image: nlight, alt: 'nlight', key: 'nlight' },
			{ label: 'Ncomfort', image: ncomfort, alt: 'ncomfort', key: 'ncomfort' },
			{ label: 'Nsound', image: nsound, alt: 'nsound', key: 'nsound' },
			{ label: 'Nhome', image: nhome, alt: 'nhome', key: 'nhome' },
		].filter(item => enabledSoftware[item.label.toLowerCase()]);

		const dynamicMenuStructure = {
			dashboard: { label: 'INÍCIO', image: nidgroup, alt: 'INÍCIO', key: 'dashboard' },
			cliente: {
				label: 'LICENÇAS',
				image: certificate,
				alt: 'LICENÇAS',
				key: 'cliente',
				submenu: filteredSubmenu,
			},
		};

		setMenuStructureStart(dynamicMenuStructure);
	}, [license]);

	// Define o componente do item de menu
	const MenuItem = ({ active, onClick, image, alt, label }: MenuItem) => (
		<li
			className={`image-text ${active ? 'active' : ''}`}
			onClick={onClick}
			style={{ display: 'flex', flexDirection: 'row' }}
		>
			<img src={image} alt={alt} className='menu-item-image' />
			<span className='menu-item-text'>{label}</span>
		</li>
	);

	// Mapeamento de chaves para dados e campos de cada menu
	const menuConfig: MenuConfig = {
		geral_pessoas: { data: employees, fields: employeeFields },
		geral_departamentos: { data: departments, fields: departmentFields },
		geral_grupos: { data: groups, fields: groupFields },
		geral_categorias: { data: categories, fields: categoryFields },
		geral_profissoes: { data: professions, fields: professionFields },
		geral_zonas: { data: zones, fields: zoneFields },
		geral_entext: { data: dataEE.externalEntity, fields: externalEntityFields },
		geral_equipamentos: { data: devices, fields: deviceFields },
		geral_controlo: { data: accessControl, fields: accessControlFields },
		geral_periodos: { data: period, fields: timePeriodFields },
		geral_fecho: { data: mbCloseOpen, fields: mbDeviceCloseOpenFields },
		geral_utilizadores: { data: registeredUsers, fields: registerFields },
		geral_logins: { data: loginLogs, fields: logsFields },
		geral_historico: { data: historyLogs, fields: logsFields },
		recebimento_multibanco: { data: payTerminal, fields: transactionMBFields },
		recebimento_moedeiro: { data: payCoins, fields: transactionMBFields },
		recebimento_totais: { data: listPayments, fields: transactionMBFields },
		movimento_torniquete: { data: moveCard, fields: transactionCardFields },
		movimento_quiosque: { data: moveKiosk, fields: transactionCardFields },
		movimento_totais: { data: listMovements, fields: transactionCardFields },
		remota_vp: { data: moveVP, fields: transactionCardFields },
		remota_abertura: { data: manualOpenDoor, fields: manualOpenDoorFields },
		registo_recolhas: { data: getCoins, fields: recolhaMoedeiroEContadorFields },
		registo_limpeza: { data: cleaning, fields: limpezasEOcorrenciasFields },
		registo_contador: { data: counter, fields: counterFields },
		registo_ocorrencias: { data: occurrences, fields: limpezasEOcorrenciasFields },
	};

	// Função para lidar com o clique do menu
	const handleMenuItemClick = (item: MenuItem) => {
		const config = menuConfig[item.key];
		if (config) {
			setCurrentData(config.data);
			setCurrentFields(config.fields);
			setShowPrintButton(true);
		} else {
			handleTab(item.key);
		}
	}

	// Iniciar o timeout do submenu
	const handleMouseEnter = (menuKey: React.SetStateAction<string | null>) => {
		if (submenuTimeout) {
			clearTimeout(submenuTimeout);
		}
		setActiveMenu(menuKey);
	};

	// Terminar o timeout do submenu
	const handleMouseLeave = () => {
		const timeoutId = setTimeout(() => {
			setActiveMenu(null);
		}, 300);
		setSubmenuTimeout(timeoutId);
	};

	// Atualiza o timeout do submenu
	useEffect(() => {
		return () => {
			if (submenuTimeout) {
				clearTimeout(submenuTimeout);
			}
		};
	}, [submenuTimeout]);

	// Função genérica para renderizar o menu
	const renderMenu = (menuKey: keyof MenuStructure, menuStructure: MenuStructure) => {
		const menu = menuStructure[String(menuKey)];
		if (!menu) {
			return null;
		}

		const isWideMenu = menuKey === 'sisnid' || menuKey === 'nidsof' || menuKey === 'nidtec' || menuKey === 'nidplace' || menuKey === 'pessoas' || menuKey === 'dispositivos' || menuKey === 'configuracao' || menuKey === 'nkiosk' || menuKey === 'contador' || menuKey === 'sensor' || menuKey === 'fotocelula' || menuKey === 'painel' || menuKey === 'revista';
		const isWideSubmenu = menuKey === 'pessoas' || menuKey === 'dispositivos' || menuKey === 'configuracao' || menuKey === 'nkiosk';

		return (
			<div key={menuKey as string} className='menu' onMouseEnter={() => menu.submenu && handleMouseEnter(menuKey as string)} onMouseLeave={handleMouseLeave}
				style={{
					minWidth: isWideMenu ? '200px' : 'auto',
					zIndex: 1000
				}}
			>
				<MenuItem
					key={menuKey as string}
					active={activeMenu === menuKey}
					onClick={(e: React.MouseEvent<HTMLElement>) => {
						if (menu.onClick) {
							e.preventDefault();
							e.stopPropagation();
							menu.onClick(e);
						}
						if (!menu.submenu && !menu.onClick) {
							handleTab(String(menuKey));
						}
					}}
					image={menu.image}
					alt={menu.alt}
					label={menu.label}
					className="menu-item"
				/>
				{activeMenu === menuKey && menu.submenu && (
					<div className="submenu" style={{
						width: isWideSubmenu ? '300px' : 'auto',
						right: isWideSubmenu ? '100%' : undefined,
						left: isWideSubmenu ? undefined : '100%',
						zIndex: 1000
					}}>
						{menu.submenu.map((item: MenuItem) => (
							<MenuItem
								key={item.key}
								active={activeMenu === item.key}
								onClick={() => handleMenuItemClick(item)}
								image={item.image}
								alt={item.alt}
								label={item.label}
								className="submenu-item"
							/>
						))}
					</div>
				)}
			</div>
		);
	};

	renderMenu('dashboard', menuStructureStart);
	renderMenu('cliente', menuStructureStart);
	renderMenu('sisnid', menuStructureNG);
	renderMenu('nidsof', menuStructureNG);
	renderMenu('nidtec', menuStructureNG);
	renderMenu('nidplace', menuStructureNG);

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
		ncount: { navbarColor: '#D01313', footerColor: '#D01313' },
		nbuild: { navbarColor: '#D01313', footerColor: '#D01313' },
		ncaravan: { navbarColor: '#D01313', footerColor: '#D01313' },
		nmechanic: { navbarColor: '#D01313', footerColor: '#D01313' },
		nevents: { navbarColor: '#D01313', footerColor: '#D01313' },
		nservice: { navbarColor: '#D01313', footerColor: '#D01313' },
		ntask: { navbarColor: '#D01313', footerColor: '#D01313' },
		nproduction: { navbarColor: '#D01313', footerColor: '#D01313' },
		nticket: { navbarColor: '#D01313', footerColor: '#D01313' },
		nsales: { navbarColor: '#D01313', footerColor: '#D01313' },
		ninvoice: { navbarColor: '#D01313', footerColor: '#D01313' },
		ndoc: { navbarColor: '#D01313', footerColor: '#D01313' },
		nsports: { navbarColor: '#D01313', footerColor: '#D01313' },
		ngym: { navbarColor: '#D01313', footerColor: '#D01313' },
		nschool: { navbarColor: '#D01313', footerColor: '#D01313' },
		nclinic: { navbarColor: '#D01313', footerColor: '#D01313' },
		noptics: { navbarColor: '#D01313', footerColor: '#D01313' },
		ngold: { navbarColor: '#D01313', footerColor: '#D01313' },
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
				setShowNcountRibbon(false);
				setShowNbuildRibbon(false);
				setShowNcaravanRibbon(false);
				setShowNmechanicRibbon(false);
				setShowNeventsRibbon(false);
				setShowNserviceRibbon(false);
				setShowNtaskRibbon(false);
				setShowNproductionRibbon(false);
				setShowNticketRibbon(false);
				setShowNsalesRibbon(false);
				setShowNinvoiceRibbon(false);
				setShowNdocRibbon(false);
				setShowNsportsRibbon(false);
				setShowNgymRibbon(false);
				setShowNschoolRibbon(false);
				setShowNclinicRibbon(false);
				setShowNopticsRibbon(false);
				setShowNgoldRibbon(false);
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
				setShowNcountRibbon(false);
				setShowNbuildRibbon(false);
				setShowNcaravanRibbon(false);
				setShowNmechanicRibbon(false);
				setShowNeventsRibbon(false);
				setShowNserviceRibbon(false);
				setShowNtaskRibbon(false);
				setShowNproductionRibbon(false);
				setShowNticketRibbon(false);
				setShowNsalesRibbon(false);
				setShowNinvoiceRibbon(false);
				setShowNdocRibbon(false);
				setShowNsportsRibbon(false);
				setShowNgymRibbon(false);
				setShowNschoolRibbon(false);
				setShowNclinicRibbon(false);
				setShowNopticsRibbon(false);
				setShowNgoldRibbon(false);
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
				setShowNcountRibbon(false);
				setShowNbuildRibbon(false);
				setShowNcaravanRibbon(false);
				setShowNmechanicRibbon(false);
				setShowNeventsRibbon(false);
				setShowNserviceRibbon(false);
				setShowNtaskRibbon(false);
				setShowNproductionRibbon(false);
				setShowNticketRibbon(false);
				setShowNsalesRibbon(false);
				setShowNinvoiceRibbon(false);
				setShowNdocRibbon(false);
				setShowNsportsRibbon(false);
				setShowNgymRibbon(false);
				setShowNschoolRibbon(false);
				setShowNclinicRibbon(false);
				setShowNopticsRibbon(false);
				setShowNgoldRibbon(false);
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
				setShowNcountRibbon(false);
				setShowNbuildRibbon(false);
				setShowNcaravanRibbon(false);
				setShowNmechanicRibbon(false);
				setShowNeventsRibbon(false);
				setShowNserviceRibbon(false);
				setShowNtaskRibbon(false);
				setShowNproductionRibbon(false);
				setShowNticketRibbon(false);
				setShowNsalesRibbon(false);
				setShowNinvoiceRibbon(false);
				setShowNdocRibbon(false);
				setShowNsportsRibbon(false);
				setShowNgymRibbon(false);
				setShowNschoolRibbon(false);
				setShowNclinicRibbon(false);
				setShowNopticsRibbon(false);
				setShowNgoldRibbon(false);
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
			localStorage.removeItem('activeTab');
		} else {
			Object.values(ribbons).forEach(([setRibbon]) => setRibbon(false));
			const [setRibbon] = ribbons[tabName as RibbonName];
			setRibbon(true);
			const capitalizedTab = tabName.charAt(0).toUpperCase() + tabName.slice(1);
			setCurrentOpenRibbon(capitalizedTab as RibbonToggler);
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
		{ id: 'ncount', title: 'NCOUNT', show: showNcountTab },
		{ id: 'nbuild', title: 'NBUILD', show: showNbuildTab },
		{ id: 'ncaravan', title: 'NCARAVAN', show: showNcaravanTab },
		{ id: 'nmechanic', title: 'NMECHANIC', show: showNmechanicTab },
		{ id: 'nevents', title: 'NEVENTS', show: showNeventsTab },
		{ id: 'nservice', title: 'NSERVICE', show: showNserviceTab },
		{ id: 'ntask', title: 'NTASK', show: showNtaskTab },
		{ id: 'nproduction', title: 'NPRODUCTION', show: showNproductionTab },
		{ id: 'nticket', title: 'NTICKET', show: showNticketTab },
		{ id: 'nsales', title: 'NSALES', show: showNsalesTab },
		{ id: 'ninvoice', title: 'NINVOICE', show: showNinvoiceTab },
		{ id: 'ndoc', title: 'NDOC', show: showNdocTab },
		{ id: 'nsports', title: 'NSPORTS', show: showNsportsTab },
		{ id: 'ngym', title: 'NGYM', show: showNgymTab },
		{ id: 'nschool', title: 'NSCHOOL', show: showNschoolTab },
		{ id: 'nclinic', title: 'NCLINIC', show: showNclinicTab },
		{ id: 'noptics', title: 'NOPTICS', show: showNopticsTab },
		{ id: 'ngold', title: 'NGOLD', show: showNgoldTab },
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

	// Função para abrir o modal de opções de kiosk
	const toggleKioskOptionsModal = () => setShowKioskModal(!showKioskModal);

	// Função para abrir o modal de publicidade para fotos
	const togglePhotoAdsModal = () => setShowPhotoAdsModal(!showPhotoAdsModal);

	// Função para abrir o modal de publicidade para vídeos
	const toggleVideoAdsModal = () => setShowVideoAdsModal(!showVideoAdsModal);

	// Função para abrir o modal de acerca de
	const toggleAboutModalOpen = () => setShowAboutModal(!showAboutModal);

	// Função para abrir o modal de contacto
	const toggleContactModal = () => setShowContactModal(!showContactModal);

	// Função para abrir o modal de licença
	const toggleLicenseModal = () => setShowLicenseModal(!showLicenseModal);

	// Função para abrir o anydesk em uma nova janela
	const handleAnydeskWindow = () => {
		window.open('https://anydesk.com/pt');
	}

	// Função para abrir o whatsapp web em uma nova janela
	const handleWhatsappWindow = () => {
		window.open('https://web.whatsapp.com/send?phone=351910203919');
	}

	// Função para alternar a visibilidade da seção quando o título for clicado
	const toggleGroupVisibility = (groupId: string) => {
		setVisibleGroup((prev) => (prev === groupId ? null : groupId));
	};

	// Rota para verificar as ribbons
	const currentRoute = window.location.pathname;

	// Função para fechar o modal de impressão
	const clearData = () => {
		setCurrentData(null);
		setCurrentFields(null);
		setShowPrintButton(false);
	};

	// Função para fechar e reabrir a ribbon global
	const handleGlobalRibbonToggle = () => {
		if (!lockRibbon && currentOpenRibbon) {
			toggleRibbonVisibility(currentOpenRibbon);
			setLockRibbon(true);
			setLastClosedRibbon(currentOpenRibbon);
			localStorage.setItem('lockRibbon', 'true');
			localStorage.setItem('lastClosedRibbon', currentOpenRibbon);
		} else {
			if (lockRibbon && lastClosedRibbon) {
				if (currentOpenRibbon) {
					toggleRibbonVisibility(currentOpenRibbon, true);
				}
				toggleRibbonVisibility(lastClosedRibbon, true);
				setCurrentOpenRibbon(lastClosedRibbon);
				setLockRibbon(false);
				setLastClosedRibbon(null);
				localStorage.setItem('lockRibbon', 'false');
				localStorage.setItem('lastClosedRibbon', '');
			}
		}
	};

	// Reabre a última ribbon fechada
	useEffect(() => {
		if (!lockRibbon && lastClosedRibbon) {
			toggleRibbonVisibility(lastClosedRibbon);
			setCurrentOpenRibbon(lastClosedRibbon);
			setLastClosedRibbon(null);
		}
	}, [lockRibbon, lastClosedRibbon]);

	// Função para fechar e reabrir a ribbon
	const toggleRibbonVisibility = (ribbonName: RibbonToggler, forceToggle: boolean = false) => {

		if (lockRibbon && !forceToggle) {
			return;
		}

		const localStorageKey = `show${ribbonName}Ribbon`;

		const storedValue = localStorage.getItem(localStorageKey);
		const currentState = storedValue ? JSON.parse(storedValue) : false;

		const newState = !currentState;

		localStorage.setItem(localStorageKey, JSON.stringify(newState));

		const setter = ribbonSetters[ribbonName as keyof typeof ribbonSetters];

		if (setter) {
			setter(newState);
		}

		if (newState) {
			setCurrentOpenRibbon(ribbonName);
		} else {
			setCurrentOpenRibbon(null);
			setLastClosedRibbon(ribbonName);
		}
	};

	// Efeito para fechar as ribbons após 10 segundos se lockRibbon for true
	useEffect(() => {
		const checkAnyRibbonOpenUpdated = () => {
			return Object.keys(ribbonSetters).some((ribbonKey) => {
				switch (ribbonKey) {
					case 'Pessoas':
						return showPessoasRibbon;
					case 'Dispositivos':
						return showDispositivosRibbon;
					case 'Configuracao':
						return showConfiguracaoRibbon;
					case 'Ajuda':
						return showAjudaRibbon;
					case 'Nclock':
						return showNclockRibbon;
					case 'Naccess':
						return showNaccessRibbon;
					case 'Nvisitor':
						return showNvisitorRibbon;
					case 'Npark':
						return showNparkRibbon;
					case 'Ndoor':
						return showNdoorRibbon;
					case 'Npatrol':
						return showNpatrolRibbon;
					case 'Ncard':
						return showNcardRibbon;
					case 'Nview':
						return showNviewRibbon;
					case 'Nsecur':
						return showNsecurRibbon;
					case 'Nsoftware':
						return showNsoftwareRibbon;
					case 'Nsystem':
						return showNsystemRibbon;
					case 'Napp':
						return showNappRibbon;
					case 'Ncyber':
						return showNcyberRibbon;
					case 'Ndigital':
						return showNdigitalRibbon;
					case 'Nserver':
						return showNserverRibbon;
					case 'Naut':
						return showNautRibbon;
					case 'Nequip':
						return showNequipRibbon;
					case 'Nproject':
						return showNprojectRibbon;
					case 'Ncount':
						return showNcountRibbon;
					case 'Nbuild':
						return showNbuildRibbon;
					case 'Ncaravan':
						return showNcaravanRibbon;
					case 'Nmechanic':
						return showNmechanicRibbon;
					case 'Nevents':
						return showNeventsRibbon;
					case 'Nservice':
						return showNserviceRibbon;
					case 'Ntask':
						return showNtaskRibbon;
					case 'Nproduction':
						return showNproductionRibbon;
					case 'Nticket':
						return showNticketRibbon;
					case 'Nsales':
						return showNsalesRibbon;
					case 'Ninvoice':
						return showNinvoiceRibbon;
					case 'Ndoc':
						return showNdocRibbon;
					case 'Nsports':
						return showNsportsRibbon;
					case 'Ngym':
						return showNgymRibbon;
					case 'Nschool':
						return showNschoolRibbon;
					case 'Nclinic':
						return showNclinicRibbon;
					case 'Noptics':
						return showNopticsRibbon;
					case 'Ngold':
						return showNgoldRibbon;
					case 'Nsmart':
						return showNsmartRibbon;
					case 'Nreality':
						return showNrealityRibbon;
					case 'Nhologram':
						return showNhologramRibbon;
					case 'Npower':
						return showNpowerRibbon;
					case 'Ncharge':
						return showNchargeRibbon;
					case 'Ncity':
						return showNcityRibbon;
					case 'Nkiosk':
						return showNkioskRibbon;
					case 'Nled':
						return showNledRibbon;
					case 'Nfire':
						return showNfireRibbon;
					case 'Nfurniture':
						return showNfurnitureRibbon;
					case 'Npartition':
						return showNpartitionRibbon;
					case 'Ndecor':
						return showNdecorRibbon;
					case 'Nping':
						return showNpingRibbon;
					case 'Nconnect':
						return showNconnectRibbon;
					case 'Nlight':
						return showNlightRibbon;
					case 'Ncomfort':
						return showNcomfortRibbon;
					case 'Nsound':
						return showNsoundRibbon;
					case 'Nhome':
						return showNhomeRibbon;
					default:
						return false;
				}
			});
		};

		let timeoutId: ReturnType<typeof setTimeout>;

		if (lockRibbon && checkAnyRibbonOpenUpdated() && !isMouseOver && !isMobile) {
			timeoutId = setTimeout(() => {
				Object.keys(ribbonSetters).forEach((ribbonKey) => {
					const setter = ribbonSetters[ribbonKey as RibbonToggler];
					localStorage.setItem(`show${ribbonKey}Ribbon`, 'false');
					setter(false);
				});
				setCurrentOpenRibbon(null);
			}, 1000);
		} else {
			if (lockRibbon && checkAnyRibbonOpenUpdated() && !isMouseOver && isMobile) {
				timeoutId = setTimeout(() => {
					Object.keys(ribbonSetters).forEach((ribbonKey) => {
						const setter = ribbonSetters[ribbonKey as RibbonToggler];
						localStorage.setItem(`show${ribbonKey}Ribbon`, 'false');
						setter(false);
					});
					setCurrentOpenRibbon(null);
				}, 5000);
			}
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [lockRibbon, isMouseOver, currentOpenRibbon, lastClosedRibbon, showPessoasRibbon, showDispositivosRibbon, showConfiguracaoRibbon, showAjudaRibbon, showNclockRibbon, showNaccessRibbon, showNvisitorRibbon, showNparkRibbon, showNdoorRibbon, showNpatrolRibbon, showNcardRibbon, showNviewRibbon, showNsecurRibbon, showNsoftwareRibbon, showNsystemRibbon, showNappRibbon, showNcyberRibbon, showNdigitalRibbon, showNserverRibbon, showNautRibbon, showNequipRibbon, showNprojectRibbon, showNcountRibbon, showNbuildRibbon, showNcaravanRibbon, showNmechanicRibbon, showNeventsRibbon, showNserviceRibbon, showNtaskRibbon, showNproductionRibbon, showNticketRibbon, showNsalesRibbon, showNinvoiceRibbon, showNdocRibbon, showNsportsRibbon, showNgymRibbon, showNschoolRibbon, showNclinicRibbon, showNopticsRibbon, showNgoldRibbon, showNsmartRibbon, showNrealityRibbon, showNhologramRibbon, showNpowerRibbon, showNchargeRibbon, showNcityRibbon, showNkioskRibbon, showNledRibbon, showNfireRibbon, showNfurnitureRibbon, showNpartitionRibbon, showNdecorRibbon, showNpingRibbon, showNconnectRibbon, showNlightRibbon, showNcomfortRibbon, showNsoundRibbon, showNhomeRibbon]);

	// Função para verificar se o cursor está sobre a ribbon
	const handleRibbonMouseEnter = () => {
		setIsMouseOver(true);
	};

	// Função para verificar se o cursor saiu da ribbon
	const handleRibbonMouseLeave = () => {
		setIsMouseOver(false);
	};

	return (
		<nav data-role="ribbonmenu" style={{ backgroundColor: navbarColor }}>
			<div className="nav-container">
				<Navbar expand="lg" className="mobile-navbar">
					<Navbar.Toggle aria-controls="basic-navbar-nav" className="mobile-only">
						<span className="navbar-toggler-icon"></span>
					</Navbar.Toggle>
					<Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse-items'>
						<div className='logos mobile-only'>
							<Dropdown onMouseOver={() => setShowDropdown(true)}
								onMouseLeave={() => setTimeout(() => setShowDropdown(false), 300)}
								show={showDropdown}
								className='dropdown-icon'
								id='dropdown-navbar'
							>
								<Dropdown.Toggle variant="basic" id="dropdown-basic-2">
									<span className="logo">NIDGROUP</span>
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<div style={{ position: 'relative' }}>
										{Object.keys(menuStructureStart).map((menuKey) => renderMenu(menuKey, menuStructureStart))}
									</div>
								</Dropdown.Menu>
							</Dropdown>
						</div>
						<ul className="nav nav-tabs mobile-only">
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
							<div className='logos mobile-only'>
								<Dropdown
									onMouseOver={() => setShowSoftwaresDropdown(true)}
									onMouseLeave={() => setTimeout(() => setShowSoftwaresDropdown(false), 300)}
									show={showSoftwaresDropdown}
									className='dropdown-icon'
									id='dropdown-navbar'
								>
									<Dropdown.Toggle variant="basic" id="dropdown-basic-2">
										<span className="logoNG">NSOFTWARES</span>
									</Dropdown.Toggle>
									<Dropdown.Menu className='dropdown-menu-logos'>
										<div style={{ position: 'relative' }}>
											{Object.keys(menuStructureNG).map((menuKey) => renderMenu(menuKey, menuStructureNG))}
										</div>
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<li className={`nav-item ${activeTab === 'ajuda' ? 'active' : ''}`}>
								<a className="nav-link ajuda-tab" id="ajuda-tab" onClick={() => handleRibbonClick('ajuda')}>AJUDA</a>
							</li>
						</ul>
						<div className="user-section mobile-only">
							<Dropdown
								onMouseOver={() => setShowUserDropdown(true)}
								onMouseLeave={() => setTimeout(() => setShowUserDropdown(false), 300)}
								show={showUserDropdown}
								className='dropdown-icon'
								id='dropdown-navbar'
							>
								<Dropdown.Toggle variant="basic" id="dropdown-basic-3">
									<span className='user-info'><i className="bi bi-door-open" style={{ marginRight: 10 }}></i>{user.name}</span>
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<div className='dropdown-content'>
										<img src={userImage} style={{ width: '40px', height: '40px', borderRadius: 50 }} />
										<Dropdown.Item className='dropdown-button' onClick={logout}>Sair</Dropdown.Item>
									</div>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</Navbar.Collapse>
				</Navbar>
				<div className='logos mobile-hidden'>
					<Dropdown onMouseOver={() => setShowDropdown(true)}
						onMouseLeave={() => setTimeout(() => setShowDropdown(false), 300)}
						show={showDropdown}
						className='dropdown-icon'
						id='dropdown-navbar'
					>
						<Dropdown.Toggle variant="basic" id="dropdown-basic-2">
							<span className="logo">NIDGROUP</span>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<div style={{ position: 'relative' }}>
								{Object.keys(menuStructureStart).map((menuKey) => renderMenu(menuKey, menuStructureStart))}
							</div>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<ul className="nav nav-tabs mobile-hidden">
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
					<div className='logos mobile-hidden'>
						<Dropdown
							onMouseOver={() => setShowSoftwaresDropdown(true)}
							onMouseLeave={() => setTimeout(() => setShowSoftwaresDropdown(false), 300)}
							show={showSoftwaresDropdown}
							className='dropdown-icon'
							id='dropdown-navbar'
						>
							<Dropdown.Toggle variant="basic" id="dropdown-basic-2">
								<span className="logoNG">NSOFTWARES</span>
							</Dropdown.Toggle>
							<Dropdown.Menu className='dropdown-menu-logos'>
								<div style={{ position: 'relative' }}>
									{Object.keys(menuStructureNG).map((menuKey) => renderMenu(menuKey, menuStructureNG))}
								</div>
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<li className={`nav-item ${activeTab === 'ajuda' ? 'active' : ''}`}>
						<a className="nav-link ajuda-tab" id="ajuda-tab" onClick={() => handleRibbonClick('ajuda')}>AJUDA</a>
					</li>
				</ul>
				<div className="user-section mobile-hidden">
					<Dropdown
						onMouseOver={() => setShowUserDropdown(true)}
						onMouseLeave={() => setTimeout(() => setShowUserDropdown(false), 300)}
						show={showUserDropdown}
						className='dropdown-icon'
						id='dropdown-navbar'
					>
						<Dropdown.Toggle variant="basic" id="dropdown-basic-3">
							<span className='user-info'><i className="bi bi-door-open" style={{ marginRight: 10 }}></i>{user.name}</span>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<div className='dropdown-content'>
								<img src={userImage} style={{ width: '40px', height: '40px', borderRadius: 50 }} />
								<Dropdown.Item className='dropdown-button' onClick={logout}>Sair</Dropdown.Item>
							</div>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<div className="navbar-ribbon-wrapper" onMouseEnter={handleRibbonMouseEnter} onMouseLeave={handleRibbonMouseLeave} onTouchStart={handleRibbonMouseEnter} onTouchEnd={handleRibbonMouseLeave}>
				{showNclockRibbon && softwareEnabled['nclock'] && menuStructureStart.cliente.submenu?.find(sub => sub.key === 'nclock')?.label && !currentRoute.endsWith('dashboard') && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" role="tabpanel" aria-labelledby="nclock-tab">
							<div className={`section ${showNclockRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'inicio nclock') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nclock/nclockdashboardlicensed" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas mt-2 ${currentRoute === '/nclock/nclockdashboardlicensed' ? 'current-active' : ''}`}>
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
												<Link to="/nclock/nclockmovement" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nclock/nclockmovement' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={movement} alt="botão assiduidade movimentos" />
													</span>
													<span className="text">Movimentos</span>
												</Link>
											</div>
											<div>
												<Link to="/nclock/nclockpresence" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nclock/nclockpresence' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={presence} alt="botão assiduidade presenças" />
													</span>
													<span className="text">Presenças</span>
												</Link>
												<Link to='/nclock/nclockrequests' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nclock/nclockrequests' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={request} alt="botão pedidos" />
													</span>
													<span className="text">Pedidos</span>
												</Link>
												<Link to='/nclock/nclockall' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nclock/nclockall' ? 'current-active' : ''}`}>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={movement} alt="botão acessos movimentos" />
													</span>
													<span className="text">Movimentos</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={clipboard} alt="botão resultados" />
													</span>
													<span className="text">Resultados</span>
												</Button>
											</div>
											<div className="grid-container" style={{ width: 240 }}>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={processing} alt="botão processamento" />
													</span>
													<span className="text">Processamento</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={segmentation} alt="botão segmentos" />
													</span>
													<span className="text">Segmentos</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={plusMinus} alt="botão compensações" />
													</span>
													<span className="text">Compensações</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={battery} alt="botão acumulados" />
													</span>
													<span className="text">Acumulados</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={hourDatabase} alt="botão banco de horas" />
													</span>
													<span className="text">Banco de Horas</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={clock} alt="botão trabalho suplementar" />
													</span>
													<span className="text">Suplementar</span>
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
											<div className="grid-container-entidades" style={{ width: 120 }}>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={time} alt="botão horários" />
													</span>
													<span className="text">Horários</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={workPlan} alt="botão planos de trabalho" />
													</span>
													<span className="text">Planos Trabalho</span>
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
											<div className="grid-container" style={{ width: 250 }}>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={absent} alt="botão ausências faltas" />
													</span>
													<span className="text">Ausências Faltas</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={unknown} alt="botão não definido" />
													</span>
													<span className="text">Não Definido</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={work} alt="botão trabalho" />
													</span>
													<span className="text">Trabalho</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={extra} alt="botão extra" />
													</span>
													<span className="text">Extra</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={limit} alt="botão tolerâncias" />
													</span>
													<span className="text">Tolerâncias</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={addHour} alt="botão banco de horas" />
													</span>
													<span className="text">Banco de Horas</span>
												</Button>
											</div>
											<div>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={medicalLeave} alt="botão ausências" />
													</span>
													<span className="text">Ausências</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={vacation} alt="botão férias" />
													</span>
													<span className="text">Férias</span>
												</Button>
											</div>
											<div style={{ width: 130 }}>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={vacation} alt="botão alteração de férias" />
													</span>
													<span className="text">Alteração de Férias</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={holidays} alt="botão feriados" />
													</span>
													<span className="text">Feriados</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={calendar} alt="botão calendário" />
													</span>
													<span className="text">Calendário</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={segmentation} alt="botão segmentos" />
													</span>
													<span className="text">Segmentos</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={monthly} alt="botão mensal" />
													</span>
													<span className="text">Mensal</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={exchange} alt="botão trocas" />
													</span>
													<span className="text">Trocas</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={availability} alt="botão disponibilidades" />
													</span>
													<span className="text">Disponibilidades</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
									{(!isMobile || visibleGroup === 'alertas nclock') && (
										<div className="btn-group" role="group">
											<div className='icon-text-informacoes'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={bell} alt="botão avisos" />
													</span>
													<span className="text">Avisos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alertas nclock')}>
										<span className="title">Alertas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'relatorio nclock') && (
										<div className="btn-group" role="group">
											<div className='icon-text-informacoes'>
												<Dropdown
													onMouseOver={() => setShowListDropdown(true)}
													onMouseLeave={() => setTimeout(() => { setShowListDropdown(false); }, 300)}
													show={showListDropdown}
												>
													<Dropdown.Toggle as={Button} variant="light" className="ribbon-button ribbon-button-pessoas" id="dropdown-basic-4">
														<span className="icon">
															<img src={print} alt="botão listagens" />
														</span>
														<span className="text">Listagens</span>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<div style={{ position: 'relative' }}>
															{Object.keys(menuStructureListing).map((menuKey) => (
																<div key={menuKey}>{renderMenu(menuKey, menuStructureListing)}</div>
															))}
														</div>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className='icon-text-informacoes'>
												<Link to="/nclock/nclockgraph" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nclock/nclockgraph' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={graphs} alt="botão gráficos" />
													</span>
													<span className="text">Gráficos</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('relatorio nclock')}>
										<span className="title">Relatórios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'modulos nclock') && (
										<div className="btn-group" role="group">
											<div className='icon-text-informacoes'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={module} alt="botão opcionais" />
													</span>
													<span className="text">Opcionais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('modulos nclock')}>
										<span className="title">Módulos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'configuracoes nclock') && (
										<div className="btn-group" role="group">
											<div className='icon-text-informacoes' style={{ marginTop: 13 }}>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-entidades ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
					</div>
				)}
				{showNaccessRibbon && softwareEnabled['naccess'] && menuStructureStart.cliente.submenu?.find(sub => sub.key === 'naccess')?.label && !currentRoute.endsWith('dashboard') && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="naccess" role="tabpanel" aria-labelledby="naccess-tab">
							<div className={`section ${showNaccessRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'inicio naccess') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/naccess/naccessdashboardlicensed" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/naccess/naccessdashboardlicensed' ? 'current-active' : ''}`}>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={movement} alt="botão movimentos" />
													</span>
													<span className="text">Movimentos</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={presence} alt="botão presença" />
													</span>
													<span className="text">Presença</span>
												</Button>
											</div>
											<div>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={all} alt="botão todos" />
													</span>
													<span className="text">Todos</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={formation} alt="botão formação" />
													</span>
													<span className="text">Formação</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={person} alt="botão visitas" />
													</span>
													<span className="text">Visitas</span>
												</Button>
											</div>
											<div>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={search} alt="botão revistas" />
													</span>
													<span className="text">Revistas</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={imports} alt="botão importações" />
													</span>
													<span className="text">Importações</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={controlPanel} alt="botão painel de controlo" />
													</span>
													<span className="text">Painel de Controlo</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
								<div className="group">
									{(!isMobile || visibleGroup === 'alertas naccess') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={bell} alt="botão avisos" />
													</span>
													<span className="text">Avisos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alertas naccess')}>
										<span className="title">Alertas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'relatorio naccess') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Dropdown
													onMouseOver={() => setShowListDropdown(true)}
													onMouseLeave={() => setTimeout(() => { setShowListDropdown(false); }, 300)}
													show={showListDropdown}
												>
													<Dropdown.Toggle as={Button} variant="light" className="ribbon-button ribbon-button-pessoas" id="dropdown-basic-4">
														<span className="icon">
															<img src={print} alt="botão listagens" />
														</span>
														<span className="text">Listagens</span>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<div style={{ position: 'relative' }}>
															{Object.keys(menuStructureListing).map((menuKey) => (
																<div key={menuKey}>{renderMenu(menuKey, menuStructureListing)}</div>
															))}
														</div>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/naccess/naccessgraph" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/naccess/naccessgraph' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={graphs} alt="botão gráficos" />
													</span>
													<span className="text">Gráficos</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('relatorio naccess')}>
										<span className="title">Relatórios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'modulos naccess') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={module} alt="botão opcionais" />
													</span>
													<span className="text">Opcionais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('modulos naccess')}>
										<span className="title">Módulos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'configuracoes naccess') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('configuracoes naccess')}>
										<span className="title">Configurações</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{showNvisitorRibbon && softwareEnabled['nvisitor'] && menuStructureStart.cliente.submenu?.find(sub => sub.key === 'nvisitor')?.label && !currentRoute.endsWith('dashboard') && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="nvisitor" role="tabpanel" aria-labelledby="nvisitor-tab">
							<div className={`section ${showNvisitorRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'inicio nvisitor') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nvisitor/nvisitordashboardlicensed" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nvisitor/nvisitordashboardlicensed' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={home} alt="botão início" />
													</span>
													<span className="text">Destaques</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('inicio nvisitor')}>
										<span className="title">Início</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'movimentos nvisitor') && (
										<div className="btn-group" role="group">
											<div className="grid-container" style={{ gridTemplateColumns: '1fr' }}>
												<Link to='/nvisitor/nvisitormovecard' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nvisitor/nvisitormovecard' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={barrier} alt="botão movimentos cartão" />
													</span>
													<span className="text">Torniquete</span>
												</Link>
												<Link to='/nvisitor/nvisitormovekiosk' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nvisitor/nvisitormovekiosk' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={kiosk} alt="botão movimentos porteiro" />
													</span>
													<span className="text">Quiosque</span>
												</Link>
											</div>
											<div className="icon-text-pessoas">
												<Link to="/nvisitor/nvisitorlistmovements" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nvisitor/nvisitorlistmovements' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={coin_report} alt="botão movimentos totais" />
													</span>
													<span className="text">Totais</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('movimentos nvisitor')}>
										<span className="title">Movimentos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'alertas nvisitor') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={bell} alt="botão avisos" />
													</span>
													<span className="text">Avisos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alertas nvisitor')}>
										<span className="title">Alertas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'relatorio nvisitor') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Dropdown
													onMouseOver={() => setShowListDropdown(true)}
													onMouseLeave={() => setTimeout(() => { setShowListDropdown(false); }, 300)}
													show={showListDropdown}
												>
													<Dropdown.Toggle as={Button} variant="light" className="ribbon-button ribbon-button-pessoas" id="dropdown-basic-4">
														<span className="icon">
															<img src={print} alt="botão listagens" />
														</span>
														<span className="text">Listagens</span>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<div style={{ position: 'relative' }}>
															{Object.keys(menuStructureListing).map((menuKey) => (
																<div key={menuKey}>{renderMenu(menuKey, menuStructureListing)}</div>
															))}
														</div>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/nvisitor/nvisitorgraph" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nvisitor/nvisitorgraph' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={graphs} alt="botão gráficos" />
													</span>
													<span className="text">Gráficos</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('relatorio nvisitor')}>
										<span className="title">Relatórios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'modulos nvisitor') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={module} alt="botão opcionais" />
													</span>
													<span className="text">Opcionais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('modulos nvisitor')}>
										<span className="title">Módulos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'configuracoes nvisitor') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('configuracoes nvisitor')}>
										<span className="title">Configurações</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{showNparkRibbon && softwareEnabled['npark'] && menuStructureStart.cliente.submenu?.find(sub => sub.key === 'npark')?.label && !currentRoute.endsWith('dashboard') && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="npark" role="tabpanel" aria-labelledby="npark-tab">
							<div className={`section ${showNparkRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'inicio npark') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/npark/nparkdashboardlicensed" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/npark/nparkdashboardlicensed' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={home} alt="botão início" />
													</span>
													<span className="text">Destaques</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('inicio npark')}>
										<span className="title">Início</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'recebimentos npark') && (
										<div className="btn-group" role="group">
											<div className="grid-container" style={{ gridTemplateColumns: '1fr' }}>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={payment_card} alt="botão pagamento terminal" />
													</span>
													<span className="text">Multibanco</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={coin} alt="botão pagamento moedas" />
													</span>
													<span className="text">Moedeiro</span>
												</Button>
											</div>
											<div className="icon-text-pessoas">
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={card_report} alt="botão pagamentos totais" />
													</span>
													<span className="text">Totais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('recebimentos npark')}>
										<span className="title">Recebimentos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'movimentos npark') && (
										<div className="btn-group" role="group">
											<div className="grid-container" style={{ gridTemplateColumns: '1fr' }}>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={barrier} alt="botão movimentos barreiras" />
													</span>
													<span className="text">Barreiras</span>
												</Button>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={payBooth} alt="botão movimentos caixa pagamentos" />
													</span>
													<span className="text">Caixa Pagamentos</span>
												</Button>
											</div>
											<div className="icon-text-pessoas">
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={coin_report} alt="botão movimentos totais" />
													</span>
													<span className="text">Totais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('movimentos npark')}>
										<span className="title">Movimentos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'veiculos npark') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={cars} alt="botão viaturas" />
													</span>
													<span className="text">Viaturas</span>
												</Button>
											</div>
											<div>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={movement} alt="botão movimentos" />
													</span>
													<span className="text">Movimentos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('veiculos npark')}>
										<span className="title">Veículos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'analise npark') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={search} alt="botão revistas" />
													</span>
													<span className="text">Revistas</span>
												</Button>
											</div>
											<div>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={plans} alt="botão planos" />
													</span>
													<span className="text">Planos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('analise npark')}>
										<span className="title">Análise</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'alertas npark') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={bell} alt="botão avisos" />
													</span>
													<span className="text">Avisos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alertas npark')}>
										<span className="title">Alertas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'relatorio npark') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Dropdown
													onMouseOver={() => setShowListDropdown(true)}
													onMouseLeave={() => setTimeout(() => { setShowListDropdown(false); }, 300)}
													show={showListDropdown}
												>
													<Dropdown.Toggle as={Button} variant="light" className="ribbon-button ribbon-button-pessoas" id="dropdown-basic-4">
														<span className="icon">
															<img src={print} alt="botão listagens" />
														</span>
														<span className="text">Listagens</span>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<div style={{ position: 'relative' }}>
															{Object.keys(menuStructureListing).map((menuKey) => (
																<div key={menuKey}>{renderMenu(menuKey, menuStructureListing)}</div>
															))}
														</div>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/npark/nparkgraph" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/npark/nparkgraph' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={graphs} alt="botão gráficos" />
													</span>
													<span className="text">Gráficos</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('relatorio npark')}>
										<span className="title">Relatórios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'modulos npark') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={module} alt="botão opcionais" />
													</span>
													<span className="text">Opcionais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('modulos npark')}>
										<span className="title">Módulos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'configuracoes npark') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('configuracoes npark')}>
										<span className="title">Configurações</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{showNviewRibbon && softwareEnabled['nview'] && menuStructureStart.cliente.submenu?.find(sub => sub.key === 'nview')?.label && !currentRoute.endsWith('dashboard') && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="nview" role="tabpanel" aria-labelledby="nview-tab">
							<div className={`section ${showNviewRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'inicio nview') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nview/nviewdashboardlicensed" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nview/nviewdashboardlicensed' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={home} alt="botão início" />
													</span>
													<span className="text">Destaques</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('inicio nview')}>
										<span className="title">Início</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'videovigilancia nview') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nview/nviewonlinecameras" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nview/nviewonlinecameras' ? 'current-active' : ''}`} >
													<span className="icon">
														<img src={online} alt="botão online" />
													</span>
													<span className="text">Online</span>
												</Link>
											</div>
											<div>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={offline} alt="botão offline" />
													</span>
													<span className="text">Offline</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('videovigilancia nview')}>
										<span className="title">Videovigilância</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'alertas nview') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={bell} alt="botão avisos" />
													</span>
													<span className="text">Avisos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alertas nview')}>
										<span className="title">Alertas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'relatorio nview') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Dropdown
													onMouseOver={() => setShowListDropdown(true)}
													onMouseLeave={() => setTimeout(() => { setShowListDropdown(false); }, 300)}
													show={showListDropdown}
												>
													<Dropdown.Toggle as={Button} variant="light" className="ribbon-button ribbon-button-pessoas" id="dropdown-basic-4">
														<span className="icon">
															<img src={print} alt="botão listagens" />
														</span>
														<span className="text">Listagens</span>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<div style={{ position: 'relative' }}>
															{Object.keys(menuStructureListing).map((menuKey) => (
																<div key={menuKey}>{renderMenu(menuKey, menuStructureListing)}</div>
															))}
														</div>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/nview/nviewgraph" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nview/nviewgraph' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={graphs} alt="botão gráficos" />
													</span>
													<span className="text">Gráficos</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('relatorio nview')}>
										<span className="title">Relatórios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'modulos nview') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={module} alt="botão opcionais" />
													</span>
													<span className="text">Opcionais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('modulos nview')}>
										<span className="title">Módulos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'configuracoes nview') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('configuracoes nview')}>
										<span className="title">Configurações</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{showNsecurRibbon && softwareEnabled['nsecur'] && menuStructureStart.cliente.submenu?.find(sub => sub.key === 'nsecur')?.label && !currentRoute.endsWith('dashboard') && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="nsecur" role="tabpanel" aria-labelledby="nsecur-tab">
							<div className={`section ${showNsecurRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'inicio nsecur') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nsecur/nsecurdashboardlicensed" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nsecur/nsecurdashboardlicensed' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={home} alt="botão início" />
													</span>
													<span className="text">Destaques</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('inicio nsecur')}>
										<span className="title">Início</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'alarmes nsecur') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={alert} alt="botão intrusão" />
													</span>
													<span className="text">Intrusão</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alarmes nsecur')}>
										<span className="title">Alarmes</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'alertas nsecur') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={bell} alt="botão avisos" />
													</span>
													<span className="text">Avisos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alertas nsecur')}>
										<span className="title">Alertas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'relatorio nsecur') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Dropdown
													onMouseOver={() => setShowListDropdown(true)}
													onMouseLeave={() => setTimeout(() => { setShowListDropdown(false); }, 300)}
													show={showListDropdown}
												>
													<Dropdown.Toggle as={Button} variant="light" className="ribbon-button ribbon-button-pessoas" id="dropdown-basic-4">
														<span className="icon">
															<img src={print} alt="botão listagens" />
														</span>
														<span className="text">Listagens</span>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<div style={{ position: 'relative' }}>
															{Object.keys(menuStructureListing).map((menuKey) => (
																<div key={menuKey}>{renderMenu(menuKey, menuStructureListing)}</div>
															))}
														</div>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/nsecur/nsecurgraph" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nsecur/nsecurgraph' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={graphs} alt="botão gráficos" />
													</span>
													<span className="text">Gráficos</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('relatorio nsecur')}>
										<span className="title">Relatórios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'modulos nsecur') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={module} alt="botão opcionais" />
													</span>
													<span className="text">Opcionais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('modulos nsecur')}>
										<span className="title">Módulos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'configuracoes nsecur') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('configuracoes nsecur')}>
										<span className="title">Configurações</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{showNkioskRibbon && softwareEnabled['nkiosk'] && menuStructureStart.cliente.submenu?.find(sub => sub.key === 'nkiosk')?.label && !currentRoute.endsWith('dashboard') && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="nkiosk" role="tabpanel" aria-labelledby="nkiosk-tab">
							<div className={`section ${showNkioskRibbon ? 'visible' : 'hidden'}`} id="section-group" >
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'inicio nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nkioskdashboardlicensed" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkioskdashboardlicensed' ? 'current-active' : ''}`}>
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
												<Link to="/nkiosk/nkioskpayterminal" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nkiosk/nkioskpayterminal' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={payment_card} alt="botão pagamento terminal" />
													</span>
													<span className="text">Multibanco</span>
												</Link>
												<Link to='/nkiosk/nkioskpaycoins' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nkiosk/nkioskpaycoins' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={coin} alt="botão pagamento moedas" />
													</span>
													<span className="text">Moedeiro</span>
												</Link>
											</div>
											<div className="icon-text-pessoas">
												<Link to="/nkiosk/nkiosklistpayments" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkiosklistpayments' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={card_report} alt="botão pagamentos totais" />
													</span>
													<span className="text">Totais</span>
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
												<Link to='/nkiosk/nkioskmovecard' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nkiosk/nkioskmovecard' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={barrier} alt="botão movimentos cartão" />
													</span>
													<span className="text">Torniquete</span>
												</Link>
												<Link to='/nkiosk/nkioskmovekiosk' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nkiosk/nkioskmovekiosk' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={kiosk} alt="botão movimentos porteiro" />
													</span>
													<span className="text">Quiosque</span>
												</Link>
											</div>
											<div className="icon-text-pessoas">
												<Link to="/nkiosk/nkiosklistmovements" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkiosklistmovements' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={coin_report} alt="botão movimentos totais" />
													</span>
													<span className="text">Totais</span>
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
												<Link to="/nkiosk/nkioskmovevp" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkioskmovevp' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={intercom} alt="botão vídeo porteiro" />
													</span>
													<span className="text">Video Porteiro</span>
												</Link>
											</div>
											<div className="icon-text-pessoas">
												<Link to="/nkiosk/nkioskdooropen" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkioskdooropen' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={open_door} alt="botão abertura manual" />
													</span>
													<span className="text">Abertura Manual</span>
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
												<Link to="/nkiosk/nkioskgetcoins" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nkiosk/nkioskgetcoins' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={coin} alt="botão recolha moedeiro" />
													</span>
													<span className="text">Recolha Moedas</span>
												</Link>
												<Link to="/nkiosk/nkioskcleaning" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/nkiosk/nkioskcleaning' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={cleanings} alt="botão limpeza wc" />
													</span>
													<span className="text">Limpeza Geral</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nkioskcounter" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkioskcounter' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={count} alt="botão contador" />
													</span>
													<span className="text">Contador</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nkioskoccurrences" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkioskoccurrences' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={registry} alt="botão ocorrências" />
													</span>
													<span className="text">Ocorrências</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('registos nkiosk')}>
										<span className="title">Registos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'zonas nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nkioskmap" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkioskmap' ? 'current-active' : ''}`}>
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
									{(!isMobile || visibleGroup === 'alertas nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nkioskalerts" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkioskalerts' ? 'current-active' : ''}`}>
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
									{(!isMobile || visibleGroup === 'relatorio nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Dropdown
													onMouseOver={() => setShowListDropdown(true)}
													onMouseLeave={() => setTimeout(() => { setShowListDropdown(false); }, 300)}
													show={showListDropdown}
												>
													<Dropdown.Toggle as={Button} variant="light" className="ribbon-button ribbon-button-pessoas" id="dropdown-basic-4">
														<span className="icon">
															<img src={print} alt="botão listagens" />
														</span>
														<span className="text">Listagens</span>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<div style={{ position: 'relative' }}>
															{Object.keys(menuStructureListingNKiosk).map((menuKey) => (
																<div key={menuKey}>{renderMenu(menuKey, menuStructureListingNKiosk)}</div>
															))}
														</div>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/nkiosk/nkioskgraph" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nkiosk/nkioskgraph' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={graphs} alt="botão gráficos" />
													</span>
													<span className="text">Gráficos</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('relatorio nkiosk')}>
										<span className="title">Relatórios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'modulos nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Dropdown
													onMouseOver={() => setShowKioskDropdown(true)}
													onMouseLeave={() => setTimeout(() => { setShowKioskDropdown(false); }, 300)}
													show={showKioskDropdown}
												>
													<Dropdown.Toggle as={Button} variant="light" className="ribbon-button ribbon-button-pessoas" id="dropdown-basic-4">
														<span className="icon">
															<img src={module} alt="botão opcionais" />
														</span>
														<span className="text">Opcionais</span>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<div>
															{Object.keys(KioskOptionalMenuStructure).map((menuKey) => (
																<div key={menuKey}>{renderMenu(menuKey, KioskOptionalMenuStructure)}</div>
															))}
														</div>
													</Dropdown.Menu>
												</Dropdown>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('modulos nkiosk')}>
										<span className="title">Módulos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'opcoes nkiosk') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button onClick={toggleKioskOptionsModal} type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('opcoes nkiosk')}>
										<span className="title">Configurações</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{showNledRibbon && softwareEnabled['nled'] && menuStructureStart.cliente.submenu?.find(sub => sub.key === 'nled')?.label && !currentRoute.endsWith('dashboard') && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="nled" role="tabpanel" aria-labelledby="nled-tab">
							<div className={`section ${showNledRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'inicio nled') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/nled/nleddashboardlicensed" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nled/nleddashboardlicensed' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={home} alt="botão início" />
													</span>
													<span className="text">Destaques</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('inicio nled')}>
										<span className="title">Início</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'anuncios nled') && (
										<div className="btn-group" role="group">
											<div className="grid-container" style={{ gridTemplateColumns: '1fr' }}>
												<Button onClick={toggleVideoAdsModal} type="button" className="btn btn-light ribbon-button">
													<span className="icon">
														<img src={video} alt="botão vídeo" />
													</span>
													<span className="text">Vídeo</span>
												</Button>
												<Button onClick={togglePhotoAdsModal} type="button" className="btn btn-light ribbon-button">
													<span className="icon">
														<img src={image} alt="botão imagem" />
													</span>
													<span className="text">Imagem</span>
												</Button>
											</div>
											<div>
												<Link to="/nled/nledads" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nled/nledads' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={ads} alt="botão publicidade" />
													</span>
													<span className="text">Publicidade</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('anuncios nled')}>
										<span className="title">Anúncios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'alertas nled') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={bell} alt="botão avisos" />
													</span>
													<span className="text">Avisos</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('alertas nled')}>
										<span className="title">Alertas</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'relatorio nled') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Dropdown
													onMouseOver={() => setShowListDropdown(true)}
													onMouseLeave={() => setTimeout(() => { setShowListDropdown(false); }, 300)}
													show={showListDropdown}
												>
													<Dropdown.Toggle as={Button} variant="light" className="ribbon-button ribbon-button-pessoas" id="dropdown-basic-4">
														<span className="icon">
															<img src={print} alt="botão listagens" />
														</span>
														<span className="text">Listagens</span>
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<div style={{ position: 'relative' }}>
															{Object.keys(menuStructureListing).map((menuKey) => (
																<div key={menuKey}>{renderMenu(menuKey, menuStructureListing)}</div>
															))}
														</div>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/nled/nledgraph" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/nled/nledgraph' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={graphs} alt="botão gráficos" />
													</span>
													<span className="text">Gráficos</span>
												</Link>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('relatorio nled')}>
										<span className="title">Relatórios</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'modulos nled') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={module} alt="botão opcionais" />
													</span>
													<span className="text">Opcionais</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('modulos nled')}>
										<span className="title">Módulos</span>
									</div>
								</div>
								<div className="group">
									{(!isMobile || visibleGroup === 'configuracoes nled') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
												</Button>
											</div>
										</div>
									)}
									<div className="title-container" onClick={() => toggleGroupVisibility('configuracoes nled')}>
										<span className="title">Configurações</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{showPessoasRibbon && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="pessoas" role="tabpanel" aria-labelledby="pessoas-tab">
							<div className={`section ${showPessoasRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'pessoas pessoas') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/persons/Persons" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/persons/Persons' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={person} alt="botão pessoas" />
													</span>
													<span className="text">Pessoas</span>
												</Link>
											</div>
											<div className="grid-container">
												<Link to="/persons/Employees" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/Employees' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={person} alt="botão funcionários" />
													</span>
													<span className="text">Funcionários</span>
												</Link>
												<Link to='/persons/Visitors' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/Visitors' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={person} alt="botão visitantes" />
													</span>
													<span className="text">Visitantes</span>
												</Link>
												<Link to='/persons/ExternalEmployees' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/ExternalEmployees' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={person} alt="botão subcontratados" />
													</span>
													<span className="text">Subcontratados</span>
												</Link>
												<Link to='/persons/Contacts' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/Contacts' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={person} alt="botão contactos" />
													</span>
													<span className="text">Contactos</span>
												</Link>
												<Link to='/persons/User' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/User' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={person} alt="botão utentes" />
													</span>
													<span className="text">Utentes</span>
												</Link>
												<Link to='/persons/Temporaries' type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/Temporaries' ? 'current-active' : ''}`}>
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
												<Link to="/persons/Departments" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/Departments' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={department} alt="botão funcionários" />
													</span>
													<span className="text">Departamentos</span>
												</Link>
												<Link to="/persons/Professions" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/Professions' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={profession} alt="botão visitantes" />
													</span>
													<span className="text">Profissões</span>
												</Link>
												<Link to="/persons/Groups" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/Groups' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={group} alt="botão funcionários externos" />
													</span>
													<span className="text">Grupos</span>
												</Link>
												<Link to="/persons/Zones" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/Zones' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={zone} alt="botão contactos" />
													</span>
													<span className="text">Zonas</span>
												</Link>
												<Link to="/persons/Categories" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/Categories' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={category} alt="botão utentes" />
													</span>
													<span className="text">Categorias</span>
												</Link>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
												<Link to="/persons/externalentities" type="button" className={`btn btn-light ribbon-button ribbon-button-entidades ${currentRoute === '/persons/externalentities' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={externalEntities} alt="botão entidades externas" />
													</span>
													<span className="text">Entidades Externas</span>
												</Link>
											</div>
											<div>
												<Link to="/persons/types" type="button" className={`btn btn-light ribbon-button ${currentRoute === '/persons/types' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={types} alt="botão tipos" />
													</span>
													<span className="text">Tipos</span>
												</Link>
												<Button /* to='#' */ type="button" className={`btn btn-light ribbon-button ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={fonts} alt="botão fontes" />
													</span>
													<span className="text">Fontes</span>
												</Button>
											</div>
											<div className='icon-text-informacoes'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-entidades ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={interventionAreas} alt="botão áreas de intervenção" />
													</span>
													<span className="text">Áreas de Intervenção</span>
												</Button>
											</div>
											<div className='icon-text-informacoes'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-entidades ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-entidades ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
					</div>
				)}
				{showDispositivosRibbon && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="dispositivos" role="tabpanel" aria-labelledby="dispositivos-tab">
							<div className={`section ${showDispositivosRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'terminais terminais') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Link to="/devices/terminals" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/devices/terminals' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={terminal} alt="botão terminais" />
													</span>
													<span className="text">Equipamentos</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/devices/terminalsmb" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/devices/terminalsmb' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={terminalmb} alt="botão terminais multibanco" />
													</span>
													<span className="text">Terminais</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/devices/timeperiods" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/devices/timeperiods' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={clock} alt="botão períodos" />
													</span>
													<span className="text">Períodos de Horários</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={timePlan} alt="botão planos de horários" />
													</span>
													<span className="text">Planos de Horários</span>
												</Button>
											</div>
											<div className="icon-text-pessoas">
												<Link to="/devices/accesscontrols" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/devices/accesscontrols' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={accessControls} alt="botão controle de acesso " />
													</span>
													<span className="text">Planos de Acessos</span>
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
												<Link to="/devices/terminalcloseopen" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/devices/terminalcloseopen' ? 'current-active' : ''}`}>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
					</div>
				)}
				{showConfiguracaoRibbon && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="configuracao" role="tabpanel" aria-labelledby="configuracao-tab">
							<div className={`section ${showConfiguracaoRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
									{(!isMobile || visibleGroup === 'base configuracoes') && (
										<div className="btn-group" role="group">
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={database} alt="botão base de dados" />
													</span>
													<span className="text">Base de Dados</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={imports} alt="botão backup bd" />
													</span>
													<span className="text">Backup BD</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/configs/entities" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/configs/entities' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={department} alt="botão entidade" />
													</span>
													<span className="text">Entidade</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Button onClick={toggleLicenseModal} type="button" className="btn btn-light ribbon-button ribbon-button-pessoas" >
													<span className="icon">
														<img src={licenses} alt="botão licença" />
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={timeZone} alt="botão fusos horários" />
													</span>
													<span className="text">Fusos Horários</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={nacionalities} alt="botão nacionalidades" />
													</span>
													<span className="text">Nacionalidades</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={settings} alt="botão opções" />
													</span>
													<span className="text">Opções</span>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={group} alt="botão perfis" />
													</span>
													<span className="text">Perfis</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/configs/newusers" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/configs/newusers' ? 'current-active' : ''}`}>
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
												<Link to="/configs/loginlogs" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/logs/loginlogs' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={log} alt="botão log de logins" />
													</span>
													<span className="text">Logins</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Link to="/configs/historylogs" type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '/logs/historylogs' ? 'current-active' : ''}`}>
													<span className="icon">
														<img src={log} alt="botão log de histórico" />
													</span>
													<span className="text">Histórico</span>
												</Link>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={consult} alt="botão consultar" />
													</span>
													<span className="text">Consultar</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
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
					</div>
				)}
				{showAjudaRibbon && (
					<div className="tab-content-navbar" id="myTabContent">
						<div className="tab-pane fade show active" id="ajuda" role="tabpanel" aria-labelledby="ajuda-tab">
							<div className={`section ${showAjudaRibbon ? 'visible' : 'hidden'}`} id="section-group">
								<div className="group group-start">
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
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={manual} alt="botão manual" />
													</span>
													<span className="text">Manual</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={version} alt="botão versão" />
													</span>
													<span className="text">Versão</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button /* to="#" */ type="button" className={`btn btn-light ribbon-button ribbon-button-pessoas ${currentRoute === '#' ? 'current-active' : ''}`} disabled>
													<span className="icon">
														<img src={helpdesk} alt="botão helpdesk" />
													</span>
													<span className="text">Helpdesk</span>
												</Button>
											</div>
											<div className='icon-text-pessoas'>
												<Button onClick={toggleContactModal} type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={contact} alt="botão contacto" />
													</span>
													<span className="text">Contacto</span>
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
											<div className='icon-text-pessoas'>
												<Button onClick={handleWhatsappWindow} type="button" className="btn btn-light ribbon-button ribbon-button-pessoas">
													<span className="icon">
														<img src={whatsapp} alt="botão whatsapp" />
													</span>
													<span className="text">Whatsapp</span>
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
					</div>
				)}
				<img
					src={lockRibbon ? ribbonControlLock : ribbonControl}
					alt="botão controle da ribbon"
					className="ribbon_control"
					onClick={() => handleGlobalRibbonToggle()}
				/>
			</div>
			{showModal && (
				<TerminalOptionsModal
					open={showModal}
					onClose={() => setShowModal(false)}
					onSave={() => setShowModal(false)}
					initialValues={{}}
				/>
			)}
			{showEmailModal && (
				<EmailOptionsModal
					open={showEmailModal}
					onClose={() => setShowEmailModal(false)}
					onSave={addEmailConfig}
					onUpdate={updateEmailConfig}
					entity={emailCompanyConfig || {}}
					fields={emailFields}
					title='Opções de Email'
				/>
			)}
			{showKioskModal && (
				<KioskOptionsModal
					open={showKioskModal}
					onClose={() => setShowKioskModal(false)}
					onSave={addKioskConfig}
					onUpdate={updateKioskConfig}
					entity={kioskConfig || {}}
					fields={kioskConfigFields}
					title='Opções de Quiosque'
				/>
			)}
			{showPhotoAdsModal && (
				<CreateModalAds
					open={showPhotoAdsModal}
					onClose={() => setShowPhotoAdsModal(false)}
					onSave={handleAddAds}
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
					onSave={handleAddAds}
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
			{showContactModal && (
				<ContactModal
					open={showContactModal}
					onClose={() => setShowContactModal(false)}
				/>
			)}
			{showLicenseModal && (
				<LicenseModal
					open={showLicenseModal}
					onClose={() => setShowLicenseModal(false)}
					onUpdate={handleUpdateLicense}
					fields={licenseFields}
				/>
			)}
			{showPrintButton &&
				<div style={{ display: 'none' }}>
					<PrintButton data={currentData} fields={currentFields} showModalOnInit={true} onClose={clearData} />
				</div>
			}
		</nav>
	);
};