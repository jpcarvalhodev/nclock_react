import { JwtPayload, jwtDecode } from "jwt-decode";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/NavBar.css";
import { toast } from "react-toastify";
import * as apiService from "../api/apiService";
import favourite from "../assets/img/navbar/navbar/favourite.svg";
import profileAvatar from "../assets/img/navbar/navbar/profileAvatar.png";
import ribbonControl from "../assets/img/navbar/navbar/ribbonControl.png";
import ribbonControlLock from "../assets/img/navbar/navbar/ribbonControlLock.png";
import mail from "../assets/img/navbar/navbar/mail.svg";
import { useAds } from "../context/AdsContext";
import { useCardScroll } from "../context/CardScrollContext";
import { useEntity } from "../context/EntityContext";
import { useKiosk } from "../context/KioskContext";
import { useLicense } from "../context/LicenseContext";
import { useAttendance } from "../context/MovementContext";
import { useNavbar } from "../context/NavbarContext";
import { usePersons } from "../context/PersonsContext";
import { useTerminals } from "../context/TerminalsContext";
import {
  accessControlFields,
  accessesFields,
  adsFields,
  backupDBFields,
  categoryFields,
  counterFields,
  departmentFields,
  deviceFields,
  emailFields,
  employeeAttendanceTimesFields,
  employeeFields,
  employeeVisitorFields,
  externalEntityFields,
  groupFields,
  kioskConfigFields,
  licenseFields,
  limpezasEOcorrenciasFields,
  logsFields,
  manualOpenDoorFields,
  mbDeviceCloseOpenFields,
  professionFields,
  recolhaMoedeiroEContadorFields,
  registerFields,
  timePeriodFields,
  transactionCardFields,
  transactionMBFields,
  zoneFields,
} from "../fields/Fields";
import { AboutModal } from "../modals/AboutModal";
import { BackupDBModal } from "../modals/BackupDBModal";
import { ContactModal } from "../modals/ContactModal";
import { CreateModalAds } from "../modals/CreateModalAds";
import { EmailOptionsModal } from "../modals/EmailOptions";
import { ImportEmployeesModal } from "../modals/ImportEmployeesModal";
import { KioskOptionsModal } from "../modals/KioskOptions";
import { LicenseModal } from "../modals/LicenseModal";
import { TerminalOptionsModal } from "../modals/TerminalOptions";
import { EmailUser, KioskConfig } from "../types/Types";
import { fetchWithAuth } from "./FetchWithAuth";
import { PrintButton } from "./PrintButton";
import { NavbarNotifications } from "./NavbarNotifications";
import { TechInfoModal } from "../modals/TechInfoModal";

// Define a interface para o payload do token
interface MyTokenPayload extends JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
}

// Define os nomes das abas
type RibbonName =
  | "pessoas"
  | "dispositivos"
  | "configuracao"
  | "ajuda"
  | "nclock"
  | "naccess"
  | "nvisitor"
  | "npark"
  | "ndoor"
  | "npatrol"
  | "ncard"
  | "nview"
  | "nsecur"
  | "nsoftware"
  | "nsystem"
  | "napp"
  | "ncyber"
  | "ndigital"
  | "nserver"
  | "naut"
  | "nequip"
  | "nproject"
  | "ncount"
  | "nbuild"
  | "ncaravan"
  | "nmechanic"
  | "nevents"
  | "nservice"
  | "ntask"
  | "nproduction"
  | "nticket"
  | "nsales"
  | "ninvoice"
  | "ndoc"
  | "nsports"
  | "ngym"
  | "nschool"
  | "nclinic"
  | "noptics"
  | "ngold"
  | "nsmart"
  | "nreality"
  | "nhologram"
  | "npower"
  | "ncharge"
  | "ncity"
  | "nkiosk"
  | "nled"
  | "nfire"
  | "nfurniture"
  | "npartition"
  | "ndecor"
  | "nping"
  | "nconnect"
  | "nlight"
  | "ncomfort"
  | "nsound"
  | "nhome";

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
type RibbonKey =
  | "Nclock"
  | "Naccess"
  | "Nvisitor"
  | "Npark"
  | "Ndoor"
  | "Npatrol"
  | "Ncard"
  | "Nview"
  | "Nsecur"
  | "Nsoftware"
  | "Nsystem"
  | "Napp"
  | "Ncyber"
  | "Ndigital"
  | "Nserver"
  | "Naut"
  | "Nequip"
  | "Nproject"
  | "Ncount"
  | "Nbuild"
  | "Ncaravan"
  | "Nmechanic"
  | "Nevents"
  | "Nservice"
  | "Ntask"
  | "Nproduction"
  | "Nticket"
  | "Nsales"
  | "Ninvoice"
  | "Ndoc"
  | "Nsports"
  | "Ngym"
  | "Nschool"
  | "Nclinic"
  | "Noptics"
  | "Ngold"
  | "Nsmart"
  | "Nreality"
  | "Nhologram"
  | "Npower"
  | "Ncharge"
  | "Ncity"
  | "Nkiosk"
  | "Nled"
  | "Nfire"
  | "Nfurniture"
  | "Npartition"
  | "Ndecor"
  | "Nping"
  | "Nconnect"
  | "Nlight"
  | "Ncomfort"
  | "Nsound"
  | "Nhome";

// Define a interface para o toggler da ribbon
type RibbonToggler =
  | "Pessoas"
  | "Dispositivos"
  | "Configuracao"
  | "Ajuda"
  | "Nclock"
  | "Naccess"
  | "Nvisitor"
  | "Npark"
  | "Ndoor"
  | "Npatrol"
  | "Ncard"
  | "Nview"
  | "Nsecur"
  | "Nsoftware"
  | "Nsystem"
  | "Napp"
  | "Ncyber"
  | "Ndigital"
  | "Nserver"
  | "Naut"
  | "Nequip"
  | "Nproject"
  | "Ncount"
  | "Nbuild"
  | "Ncaravan"
  | "Nmechanic"
  | "Nevents"
  | "Nservice"
  | "Ntask"
  | "Nproduction"
  | "Nticket"
  | "Nsales"
  | "Ninvoice"
  | "Ndoc"
  | "Nsports"
  | "Ngym"
  | "Nschool"
  | "Nclinic"
  | "Noptics"
  | "Ngold"
  | "Nsmart"
  | "Nreality"
  | "Nhologram"
  | "Npower"
  | "Ncharge"
  | "Ncity"
  | "Nkiosk"
  | "Nled"
  | "Nfire"
  | "Nfurniture"
  | "Npartition"
  | "Ndecor"
  | "Nping"
  | "Nconnect"
  | "Nlight"
  | "Ncomfort"
  | "Nsound"
  | "Nhome";

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
  const {
    navbarColor,
    lockRibbon,
    setLockRibbon,
    currentOpenRibbon,
    setCurrentOpenRibbon,
    lastClosedRibbon,
    setLastClosedRibbon,
    emailCompanyConfig,
    handleAddEmailConfig,
    handleAddKioskConfig,
    handleUpdateEmailConfig,
    handleUpdateKioskConfig,
    kioskConfig,
  } = useNavbar();
  const { setScrollPosition } = useCardScroll();
  const { handleAddAds } = useAds();
  const {
    loginLogsNoPagination,
    historyLogsNoPagination,
    exportBackupDB,
    importBackupDB,
    importEmployees,
  } = useEntity();
  const { license, getSoftwareEnabledStatus, handleUpdateLicense } =
    useLicense();
  const { devices, accessControl, period, mbCloseOpen } = useTerminals();
  const {
    employeesNoPagination,
    departments,
    groups,
    registeredUsers,
    categories,
    dataEE,
    professions,
    zones,
    fetchAllDisabledEmployees,
    employeeVisitor,
  } = usePersons();
  const {
    payTerminalNoPagination,
    payCoinsNoPagination,
    totalPaymentsNoPagination,
    moveCardNoPagination,
    moveKioskNoPagination,
    totalMovementsNoPagination,
    moveVP,
    manualOpenDoor,
    getCoins,
    cleaning,
    occurrences,
    counterNoPagination,
    fetchAllPayTerminal,
    fetchAllPayCoins,
    fetchAllMoveCard,
    fetchAllMoveKiosk,
    fetchAllMBAndCoin,
    fetchAllCardAndKiosk,
  } = useKiosk();
  const {
    fetchAllAttendances,
    fetchAllInitialAccessesbyDevice,
    fetchAllAccessesbyDevice,
    attendance,
    accessForGraph,
  } = useAttendance();
  const [user, setUser] = useState({ name: "", email: "" });
  const [showPessoasRibbon, setShowPessoasRibbon] = useState(false);
  const [showDispositivosRibbon, setShowDispositivosRibbon] = useState(false);
  const [showConfiguracaoRibbon, setShowConfiguracaoRibbon] = useState(false);
  const [showAjudaRibbon, setShowAjudaRibbon] = useState(false);
  const [activeTab, setActiveTab] = useState("");
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
  const [submenuTimeout, setSubmenuTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
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
  const [menuStructureStart, setMenuStructureStart] = useState<MenuStructure>(
    {}
  );
  const [menuStructureNG, setMenuStructureNG] = useState<MenuStructure>({});
  const [menuStructureListing, setMenuStructureListing] =
    useState<MenuStructure>({});
  const [menuStructureListingNKiosk, setMenuStructureListingNKiosk] =
    useState<MenuStructure>({});
  const [menuStructureListingNClock, setMenuStructureListingNClock] =
    useState<MenuStructure>({});
  const [menuStructureListingNAccess, setMenuStructureListingNAccess] =
    useState<MenuStructure>({});
  const [menuStructureListingNVisitor, setMenuStructureListingNVisitor] =
    useState<MenuStructure>({});
  const [showContactModal, setShowContactModal] = useState(false);
  const [showKioskDropdown, setShowKioskDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [showPrintButton, setShowPrintButton] = useState(false);
  const [currentData, setCurrentData] = useState<any>(null);
  const [currentFields, setCurrentFields] = useState<any>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [showBackupDBModal, setShowBackupDBModal] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const [showImportEmployeesModal, setShowImportEmployeesModal] =
    useState(false);
  const [showTechInfoModal, setShowTechInfoModal] = useState(false);

  // Função para atualizar o estado da aba
  const ribbonSetters = {
    Pessoas: setShowPessoasRibbon,
    Dispositivos: setShowDispositivosRibbon,
    Configuracao: setShowConfiguracaoRibbon,
    Ajuda: setShowAjudaRibbon,
    Nclock: setShowNclockRibbon,
    Naccess: setShowNaccessRibbon,
    Nvisitor: setShowNvisitorRibbon,
    Npark: setShowNparkRibbon,
    Ndoor: setShowNdoorRibbon,
    Npatrol: setShowNpatrolRibbon,
    Ncard: setShowNcardRibbon,
    Nview: setShowNviewRibbon,
    Nsecur: setShowNsecurRibbon,
    Nsoftware: setShowNsoftwareRibbon,
    Nsystem: setShowNsystemRibbon,
    Napp: setShowNappRibbon,
    Ncyber: setShowNcyberRibbon,
    Ndigital: setShowNdigitalRibbon,
    Nserver: setShowNserverRibbon,
    Naut: setShowNautRibbon,
    Nequip: setShowNequipRibbon,
    Nproject: setShowNprojectRibbon,
    Ncount: setShowNcountRibbon,
    Nbuild: setShowNbuildRibbon,
    Ncaravan: setShowNcaravanRibbon,
    Nmechanic: setShowNmechanicRibbon,
    Nevents: setShowNeventsRibbon,
    Nservice: setShowNserviceRibbon,
    Ntask: setShowNtaskRibbon,
    Nproduction: setShowNproductionRibbon,
    Nticket: setShowNticketRibbon,
    Nsales: setShowNsalesRibbon,
    Ninvoice: setShowNinvoiceRibbon,
    Ndoc: setShowNdocRibbon,
    Nsports: setShowNsportsRibbon,
    Ngym: setShowNgymRibbon,
    Nschool: setShowNschoolRibbon,
    Nclinic: setShowNclinicRibbon,
    Noptics: setShowNopticsRibbon,
    Ngold: setShowNgoldRibbon,
    Nsmart: setShowNsmartRibbon,
    Nreality: setShowNrealityRibbon,
    Nhologram: setShowNhologramRibbon,
    Npower: setShowNpowerRibbon,
    Ncharge: setShowNchargeRibbon,
    Ncity: setShowNcityRibbon,
    Nkiosk: setShowNkioskRibbon,
    Nled: setShowNledRibbon,
    Nfire: setShowNfireRibbon,
    Nfurniture: setShowNfurnitureRibbon,
    Npartition: setShowNpartitionRibbon,
    Ndecor: setShowNdecorRibbon,
    Nping: setShowNpingRibbon,
    Nconnect: setShowNconnectRibbon,
    Nlight: setShowNlightRibbon,
    Ncomfort: setShowNcomfortRibbon,
    Nsound: setShowNsoundRibbon,
    Nhome: setShowNhomeRibbon,
  };

  // Função para atualizar o estado da tab
  const tabSetters = {
    Nclock: setShowNclockTab,
    Naccess: setShowNaccessTab,
    Nvisitor: setShowNvisitorTab,
    Npark: setShowNparkTab,
    Ndoor: setShowNdoorTab,
    Npatrol: setShowNpatrolTab,
    Ncard: setShowNcardTab,
    Nview: setShowNviewTab,
    Nsecur: setShowNsecurTab,
    Nsoftware: setShowNsoftwareTab,
    Nsystem: setShowNsystemTab,
    Napp: setShowNappTab,
    Ncyber: setShowNcyberTab,
    Ndigital: setShowNdigitalTab,
    Nserver: setShowNserverTab,
    Naut: setShowNautTab,
    Nequip: setShowNequipTab,
    Nproject: setShowNprojectTab,
    Ncount: setShowNcountTab,
    Nbuild: setShowNbuildTab,
    Ncaravan: setShowNcaravanTab,
    Nmechanic: setShowNmechanicTab,
    Nevents: setShowNeventsTab,
    Nservice: setShowNserviceTab,
    Ntask: setShowNtaskTab,
    Nproduction: setShowNproductionTab,
    Nticket: setShowNticketTab,
    Nsales: setShowNsalesTab,
    Ninvoice: setShowNinvoiceTab,
    Ndoc: setShowNdocTab,
    Nsports: setShowNsportsTab,
    Ngym: setShowNgymTab,
    Nschool: setShowNschoolTab,
    Nclinic: setShowNclinicTab,
    Noptics: setShowNopticsTab,
    Ngold: setShowNgoldTab,
    Nsmart: setShowNsmartTab,
    Nreality: setShowNrealityTab,
    Nhologram: setShowNhologramTab,
    Npower: setShowNpowerTab,
    Ncharge: setShowNchargeTab,
    Ncity: setShowNcityTab,
    Nkiosk: setShowNkioskTab,
    Nled: setShowNledTab,
    Nfire: setShowNfireTab,
    Nfurniture: setShowNfurnitureTab,
    Npartition: setShowNpartitionTab,
    Ndecor: setShowNdecorTab,
    Nping: setShowNpingTab,
    Nconnect: setShowNconnectTab,
    Nlight: setShowNlightTab,
    Ncomfort: setShowNcomfortTab,
    Nsound: setShowNsoundTab,
    Nhome: setShowNhomeTab,
  };

  // Carrega o token inicial e o estado do ribbon
  useEffect(() => {
    loadInitialToken();
    loadState();

    const storedLockRibbon = localStorage.getItem("lockRibbon");
    if (storedLockRibbon !== null) {
      setLockRibbon(storedLockRibbon === "true");
    }

    const storedLastClosedRibbon = localStorage.getItem("lastClosedRibbon");
    if (storedLastClosedRibbon) {
      setLastClosedRibbon(storedLastClosedRibbon as RibbonToggler);
    }

    const savedActiveTab = localStorage.getItem("activeTab");
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
  }, [localStorage.getItem("activeTab")]);

  // Função para carregar o token inicial
  const loadInitialToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode<MyTokenPayload>(token);

      const userName =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const userEmail =
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];

      setUser({ name: userName, email: userEmail });
    }
  };

  // Função para buscar o user logado e a imagem do perfil
  useEffect(() => {
    const fetchAndSetUserImage = () => {
      const username = localStorage.getItem("username");
      const findUser = registeredUsers.find(
        (user) => user.userName === username
      );
      const imageUrl = findUser?.profileImage
        ? `${apiService.baseURL?.slice(0, -1)}${findUser.profileImage}`
        : profileAvatar;
      localStorage.setItem("profileImage", imageUrl);
      setUserImage(imageUrl);
    };
    fetchAndSetUserImage();
  }, [registeredUsers]);

  // Função para adicionar emails de utilizadores
  const addEmailConfig = async (email: Partial<EmailUser>) => {
    await handleAddEmailConfig(email);
  };
  // Função para adicionar configurações de quiosque
  const addKioskConfig = async (kioskConfig: Partial<KioskConfig>) => {
    await handleAddKioskConfig(kioskConfig);
  };

  // Função de atualização de emails de utilizadores
  const updateEmailConfig = async (email: Partial<EmailUser>) => {
    await handleUpdateEmailConfig(email);
  };

  // Função de atualização de configurações do quiosque
  const updateKioskConfig = async (kioskConfig: Partial<KioskConfig>) => {
    await handleUpdateKioskConfig(kioskConfig);
  };

  // Use useMemo para valores derivados
  const enabledSoftware = useMemo(
    () => getSoftwareEnabledStatus(license),
    [license]
  );

  // Verificar se a tela é mobile
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 1200);
  };

  // Adicionar listener para redimensionar a janela
  useEffect(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Função para lidar com a renderização dinâmica dos ribbons e tabs
  const settersMap: Record<RibbonKey, Setters> = {
    Nclock: {
      setShowRibbon: setShowNclockRibbon,
      setShowTab: setShowNclockTab,
    },
    Naccess: {
      setShowRibbon: setShowNaccessRibbon,
      setShowTab: setShowNaccessTab,
    },
    Nvisitor: {
      setShowRibbon: setShowNvisitorRibbon,
      setShowTab: setShowNvisitorTab,
    },
    Npark: { setShowRibbon: setShowNparkRibbon, setShowTab: setShowNparkTab },
    Ndoor: { setShowRibbon: setShowNdoorRibbon, setShowTab: setShowNdoorTab },
    Npatrol: {
      setShowRibbon: setShowNpatrolRibbon,
      setShowTab: setShowNpatrolTab,
    },
    Ncard: { setShowRibbon: setShowNcardRibbon, setShowTab: setShowNcardTab },
    Nview: { setShowRibbon: setShowNviewRibbon, setShowTab: setShowNviewTab },
    Nsecur: {
      setShowRibbon: setShowNsecurRibbon,
      setShowTab: setShowNsecurTab,
    },
    Nsoftware: {
      setShowRibbon: setShowNsoftwareRibbon,
      setShowTab: setShowNsoftwareTab,
    },
    Nsystem: {
      setShowRibbon: setShowNsystemRibbon,
      setShowTab: setShowNsystemTab,
    },
    Napp: { setShowRibbon: setShowNappRibbon, setShowTab: setShowNappTab },
    Ncyber: {
      setShowRibbon: setShowNcyberRibbon,
      setShowTab: setShowNcyberTab,
    },
    Ndigital: {
      setShowRibbon: setShowNdigitalRibbon,
      setShowTab: setShowNdigitalTab,
    },
    Nserver: {
      setShowRibbon: setShowNserverRibbon,
      setShowTab: setShowNserverTab,
    },
    Naut: { setShowRibbon: setShowNautRibbon, setShowTab: setShowNautTab },
    Nequip: {
      setShowRibbon: setShowNequipRibbon,
      setShowTab: setShowNequipTab,
    },
    Nproject: {
      setShowRibbon: setShowNprojectRibbon,
      setShowTab: setShowNprojectTab,
    },
    Ncount: {
      setShowRibbon: setShowNcountRibbon,
      setShowTab: setShowNcountTab,
    },
    Nbuild: {
      setShowRibbon: setShowNbuildRibbon,
      setShowTab: setShowNbuildTab,
    },
    Ncaravan: {
      setShowRibbon: setShowNcaravanRibbon,
      setShowTab: setShowNcaravanTab,
    },
    Nmechanic: {
      setShowRibbon: setShowNmechanicRibbon,
      setShowTab: setShowNmechanicTab,
    },
    Nevents: {
      setShowRibbon: setShowNeventsRibbon,
      setShowTab: setShowNeventsTab,
    },
    Nservice: {
      setShowRibbon: setShowNserviceRibbon,
      setShowTab: setShowNserviceTab,
    },
    Ntask: { setShowRibbon: setShowNtaskRibbon, setShowTab: setShowNtaskTab },
    Nproduction: {
      setShowRibbon: setShowNproductionRibbon,
      setShowTab: setShowNproductionTab,
    },
    Nticket: {
      setShowRibbon: setShowNticketRibbon,
      setShowTab: setShowNticketTab,
    },
    Nsales: {
      setShowRibbon: setShowNsalesRibbon,
      setShowTab: setShowNsalesTab,
    },
    Ninvoice: {
      setShowRibbon: setShowNinvoiceRibbon,
      setShowTab: setShowNinvoiceTab,
    },
    Ndoc: { setShowRibbon: setShowNdocRibbon, setShowTab: setShowNdocTab },
    Nsports: {
      setShowRibbon: setShowNsportsRibbon,
      setShowTab: setShowNsportsTab,
    },
    Ngym: { setShowRibbon: setShowNgymRibbon, setShowTab: setShowNgymTab },
    Nschool: {
      setShowRibbon: setShowNschoolRibbon,
      setShowTab: setShowNschoolTab,
    },
    Nclinic: {
      setShowRibbon: setShowNclinicRibbon,
      setShowTab: setShowNclinicTab,
    },
    Noptics: {
      setShowRibbon: setShowNopticsRibbon,
      setShowTab: setShowNopticsTab,
    },
    Ngold: { setShowRibbon: setShowNgoldRibbon, setShowTab: setShowNgoldTab },
    Nsmart: {
      setShowRibbon: setShowNsmartRibbon,
      setShowTab: setShowNsmartTab,
    },
    Nreality: {
      setShowRibbon: setShowNrealityRibbon,
      setShowTab: setShowNrealityTab,
    },
    Nhologram: {
      setShowRibbon: setShowNhologramRibbon,
      setShowTab: setShowNhologramTab,
    },
    Npower: {
      setShowRibbon: setShowNpowerRibbon,
      setShowTab: setShowNpowerTab,
    },
    Ncharge: {
      setShowRibbon: setShowNchargeRibbon,
      setShowTab: setShowNchargeTab,
    },
    Ncity: { setShowRibbon: setShowNcityRibbon, setShowTab: setShowNcityTab },
    Nkiosk: {
      setShowRibbon: setShowNkioskRibbon,
      setShowTab: setShowNkioskTab,
    },
    Nled: { setShowRibbon: setShowNledRibbon, setShowTab: setShowNledTab },
    Nfire: { setShowRibbon: setShowNfireRibbon, setShowTab: setShowNfireTab },
    Nfurniture: {
      setShowRibbon: setShowNfurnitureRibbon,
      setShowTab: setShowNfurnitureTab,
    },
    Npartition: {
      setShowRibbon: setShowNpartitionRibbon,
      setShowTab: setShowNpartitionTab,
    },
    Ndecor: {
      setShowRibbon: setShowNdecorRibbon,
      setShowTab: setShowNdecorTab,
    },
    Nping: { setShowRibbon: setShowNpingRibbon, setShowTab: setShowNpingTab },
    Nconnect: {
      setShowRibbon: setShowNconnectRibbon,
      setShowTab: setShowNconnectTab,
    },
    Nlight: {
      setShowRibbon: setShowNlightRibbon,
      setShowTab: setShowNlightTab,
    },
    Ncomfort: {
      setShowRibbon: setShowNcomfortRibbon,
      setShowTab: setShowNcomfortTab,
    },
    Nsound: {
      setShowRibbon: setShowNsoundRibbon,
      setShowTab: setShowNsoundTab,
    },
    Nhome: { setShowRibbon: setShowNhomeRibbon, setShowTab: setShowNhomeTab },
  };

  // Função para atualizar o estado a partir do localStorage
  function setItemState(
    key: RibbonKey,
    setterFunction: React.Dispatch<React.SetStateAction<boolean>>,
    prefix = ""
  ): void {
    const stateValue = localStorage.getItem(`${prefix}${key}`) === "true";
    setterFunction(stateValue);
  }

  // Função para carregar o estado das ribbons e tabs
  function loadState(): void {
    Object.entries(settersMap).forEach(
      ([key, { setShowRibbon, setShowTab }]) => {
        setItemState(key as RibbonKey, setShowRibbon);
        setItemState(key as RibbonKey, setShowTab);
      }
    );
  }

  // Define os itens do menu
  const ribbons: Record<
    RibbonName,
    [React.Dispatch<React.SetStateAction<boolean>>, string]
  > = {
    pessoas: [setShowPessoasRibbon, "pessoas"],
    dispositivos: [setShowDispositivosRibbon, "dispositivos"],
    configuracao: [setShowConfiguracaoRibbon, "configuracao"],
    ajuda: [setShowAjudaRibbon, "ajuda"],
    nclock: [setShowNclockRibbon, "nclock"],
    naccess: [setShowNaccessRibbon, "naccess"],
    nvisitor: [setShowNvisitorRibbon, "nvisitor"],
    npark: [setShowNparkRibbon, "npark"],
    ndoor: [setShowNdoorRibbon, "ndoor"],
    npatrol: [setShowNpatrolRibbon, "npatrol"],
    ncard: [setShowNcardRibbon, "ncard"],
    nview: [setShowNviewRibbon, "nview"],
    nsecur: [setShowNsecurRibbon, "nsecur"],
    nsoftware: [setShowNsoftwareRibbon, "nsoftware"],
    nsystem: [setShowNsystemRibbon, "nsystem"],
    napp: [setShowNappRibbon, "napp"],
    ncyber: [setShowNcyberRibbon, "ncyber"],
    ndigital: [setShowNdigitalRibbon, "ndigital"],
    nserver: [setShowNserverRibbon, "nserver"],
    naut: [setShowNautRibbon, "naut"],
    nequip: [setShowNequipRibbon, "nequip"],
    nproject: [setShowNprojectRibbon, "nproject"],
    ncount: [setShowNcountRibbon, "ncount"],
    nbuild: [setShowNbuildRibbon, "nbuild"],
    ncaravan: [setShowNcaravanRibbon, "ncaravan"],
    nmechanic: [setShowNmechanicRibbon, "nmechanic"],
    nevents: [setShowNeventsRibbon, "nevents"],
    nservice: [setShowNserviceRibbon, "nservice"],
    ntask: [setShowNtaskRibbon, "ntask"],
    nproduction: [setShowNproductionRibbon, "nproduction"],
    nticket: [setShowNticketRibbon, "nticket"],
    nsales: [setShowNsalesRibbon, "nsales"],
    ninvoice: [setShowNinvoiceRibbon, "ninvoice"],
    ndoc: [setShowNdocRibbon, "ndoc"],
    nsports: [setShowNsportsRibbon, "nsports"],
    ngym: [setShowNgymRibbon, "ngym"],
    nschool: [setShowNschoolRibbon, "nschool"],
    nclinic: [setShowNclinicRibbon, "nclinic"],
    noptics: [setShowNopticsRibbon, "noptics"],
    ngold: [setShowNgoldRibbon, "ngold"],
    nsmart: [setShowNsmartRibbon, "nsmart"],
    nreality: [setShowNrealityRibbon, "nreality"],
    nhologram: [setShowNhologramRibbon, "nhologram"],
    npower: [setShowNpowerRibbon, "npower"],
    ncharge: [setShowNchargeRibbon, "ncharge"],
    ncity: [setShowNcityRibbon, "ncity"],
    nkiosk: [setShowNkioskRibbon, "nkiosk"],
    nled: [setShowNledRibbon, "nled"],
    nfire: [setShowNfireRibbon, "nfire"],
    nfurniture: [setShowNfurnitureRibbon, "nfurniture"],
    npartition: [setShowNpartitionRibbon, "npartition"],
    ndecor: [setShowNdecorRibbon, "ndecor"],
    nping: [setShowNpingRibbon, "nping"],
    nconnect: [setShowNconnectRibbon, "nconnect"],
    nlight: [setShowNlightRibbon, "nlight"],
    ncomfort: [setShowNcomfortRibbon, "ncomfort"],
    nsound: [setShowNsoundRibbon, "nsound"],
    nhome: [setShowNhomeRibbon, "nhome"],
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
    const formattedTab = (tab.charAt(0).toUpperCase() +
      tab.slice(1)) as RibbonKey;

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
    nclock: createTabInfo("nclock", "/nclock/nclockdashboard"),
    naccess: createTabInfo("naccess", "/naccess/naccessdashboard"),
    nvisitor: createTabInfo("nvisitor", "/nvisitor/nvisitordashboard"),
    npark: createTabInfo("npark", "/npark/nparkdashboard"),
    ndoor: createTabInfo("ndoor", "/ndoor/ndoordashboard"),
    npatrol: createTabInfo("npatrol", "/npatrol/npatroldashboard"),
    ncard: createTabInfo("ncard", "/ncard/ncarddashboard"),
    nview: createTabInfo("nview", "/nview/nviewdashboard"),
    nsecur: createTabInfo("nsecur", "/nsecur/nsecurdashboard"),
    nsoftware: createTabInfo("nsoftware", "/nsoftware/nsoftwaredashboard"),
    nsystem: createTabInfo("nsystem", "/nsystem/nsystemdashboard"),
    napp: createTabInfo("napp", "/napp/nappdashboard"),
    ncyber: createTabInfo("ncyber", "/ncyber/ncyberdashboard"),
    ndigital: createTabInfo("ndigital", "/ndigital/ndigitaldashboard"),
    nserver: createTabInfo("nserver", "/nserver/nserverdashboard"),
    naut: createTabInfo("naut", "/naut/nautdashboard"),
    nequip: createTabInfo("nequip", "/nequip/nequipdashboard"),
    nproject: createTabInfo("nproject", "/nproject/nprojectdashboard"),
    ncount: createTabInfo("ncount", "/ncount/ncountdashboard"),
    nbuild: createTabInfo("nbuild", "/nbuild/nbuilddashboard"),
    ncaravan: createTabInfo("ncaravan", "/ncaravan/ncaravandashboard"),
    nmechanic: createTabInfo("nmechanic", "/nmechanic/nmechanicdashboard"),
    nevents: createTabInfo("nevents", "/nevents/neventsdashboard"),
    nservice: createTabInfo("nservice", "/nservice/nservicedashboard"),
    ntask: createTabInfo("ntask", "/ntask/ntaskdashboard"),
    nproduction: createTabInfo(
      "nproduction",
      "/nproduction/nproductiondashboard"
    ),
    nticket: createTabInfo("nticket", "/nticket/nticketdashboard"),
    nsales: createTabInfo("nsales", "/nsales/nsalesdashboard"),
    ninvoice: createTabInfo("ninvoice", "/ninvoice/ninvoicedashboard"),
    ndoc: createTabInfo("ndoc", "/ndoc/ndocdashboard"),
    nsports: createTabInfo("nsports", "/nsports/nsportsdashboard"),
    ngym: createTabInfo("ngym", "/ngym/ngymdashboard"),
    nschool: createTabInfo("nschool", "/nschool/nschooldashboard"),
    nclinic: createTabInfo("nclinic", "/nclinic/nclinicdashboard"),
    noptics: createTabInfo("noptics", "/noptics/nopticsdashboard"),
    ngold: createTabInfo("ngold", "/ngold/ngolddashboard"),
    nsmart: createTabInfo("nsmart", "/nsmart/nsmartdashboard"),
    nreality: createTabInfo("nreality", "/nreality/nrealitydashboard"),
    nhologram: createTabInfo("nhologram", "/nhologram/nhologramdashboard"),
    npower: createTabInfo("npower", "/npower/npowerdashboard"),
    ncharge: createTabInfo("ncharge", "/ncharge/nchargedashboard"),
    ncity: createTabInfo("ncity", "/ncity/ncitydashboard"),
    nkiosk: createTabInfo("nkiosk", "/nkiosk/nkioskdashboard"),
    nled: createTabInfo("nled", "/nled/nleddashboard"),
    nfire: createTabInfo("nfire", "/nfire/nfiredashboard"),
    nfurniture: createTabInfo("nfurniture", "/nfurniture/nfurnituredashboard"),
    npartition: createTabInfo("npartition", "/npartition/npartitiondashboard"),
    ndecor: createTabInfo("ndecor", "/ndecor/ndecordashboard"),
    nping: createTabInfo("nping", "/nping/npingdashboard"),
    nconnect: createTabInfo("nconnect", "/nconnect/nconnectdashboard"),
    nlight: createTabInfo("nlight", "/nlight/nlightdashboard"),
    ncomfort: createTabInfo("ncomfort", "/ncomfort/ncomfortdashboard"),
    nsound: createTabInfo("nsound", "/nsound/nsounddashboard"),
    nhome: createTabInfo("nhome", "/nhome/nhomedashboard"),
  };

  // Função para limpar todas as abas
  const clearAllTabs = () => {
    Object.values(tabData).forEach(
      ({ setTab, setRibbon, localStorageTabKey, localStorageRibbonKey }) => {
        setTab(false);
        setRibbon(false);
        localStorage.removeItem(localStorageTabKey);
        if (localStorageRibbonKey) {
          localStorage.removeItem(localStorageRibbonKey);
        }
      }
    );
    setActiveTab("");
    localStorage.removeItem("activeTab");
  };

  // Função para limpar todas as ribbons
  const clearAllRibbons = () => {
    Object.values(ribbons).forEach(([setRibbon]) => {
      setRibbon(false);
    });
  };

  // Função para separar os softwares em grupos
  const softwareGroups = {
    group1: [
      "nclock",
      "naccess",
      "nvisitor",
      "npark",
      "ndoor",
      "npatrol",
      "ncard",
      "nview",
      "nsecur",
    ],
    group2: [
      "nsoftware",
      "nsystem",
      "napp",
      "ncyber",
      "ndigital",
      "nserver",
      "naut",
      "nequip",
      "nproject",
      "ncount",
      "nbuild",
      "ncaravan",
      "nmechanic",
      "nevents",
      "nservice",
      "ntask",
      "nproduction",
      "nticket",
      "nsales",
      "ninvoice",
      "ndoc",
      "nsports",
      "ngym",
      "nschool",
      "nclinic",
      "noptics",
      "ngold",
    ],
    group3: [
      "nsmart",
      "nreality",
      "nhologram",
      "npower",
      "ncharge",
      "ncity",
      "nkiosk",
      "nled",
      "nfire",
    ],
    group4: [
      "nfurniture",
      "npartition",
      "ndecor",
      "nping",
      "nconnect",
      "nlight",
      "ncomfort",
      "nsound",
      "nhome",
    ],
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
    if (tabName === "dashboard") {
      clearAllTabs();
      clearAllRibbons();
      setActiveTab("");
      localStorage.removeItem("activeTab");
      navigate("/dashboard");
      setScrollPosition(0);
    } else if (tabData[tabName]) {
      const { setTab, setRibbon, localStorageRibbonKey, route } =
        tabData[tabName];
      const softwareName = tabName;
      const isSoftwareEnabled = enabledSoftware[softwareName] ? true : false;
      const isSoftwareCliente = menuStructureStart.cliente.submenu?.some(
        (item) => item.key === softwareName
      )
        ? true
        : false;
      const finalRoute =
        softwareName && isSoftwareEnabled && isSoftwareCliente
          ? `${route}licensed`
          : route;

      setTab(true);
      setRibbon(isSoftwareCliente);
      const capitalizedTab = tabName.charAt(0).toUpperCase() + tabName.slice(1);
      setCurrentOpenRibbon(capitalizedTab as RibbonToggler);
      if (
        localStorageRibbonKey &&
        tabName &&
        softwareName &&
        isSoftwareEnabled &&
        isSoftwareCliente
      ) {
        localStorage.setItem(localStorageRibbonKey, "true");
      }
      setActiveTab(tabName);
      localStorage.setItem("activeTab", tabName);
      const index = findTabIndex(tabName);
      const newScrollPosition = index * 130;
      setScrollPosition(newScrollPosition);
      navigate(finalRoute);
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth("Authentication/Logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        const profileImage = localStorage.getItem("profileImage");
        localStorage.clear();
        if (profileImage) {
          localStorage.setItem("profileImage", profileImage);
        }
        navigate("/");
      } else {
        console.error("Erro ao fazer logout");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Atualiza o estado do ribbon no localStorage
  useEffect(() => {
    const handleStateChange = () => {
      localStorage.setItem("showPessoasRibbon", String(showPessoasRibbon));
      localStorage.setItem(
        "showDispositivosRibbon",
        String(showDispositivosRibbon)
      );
      localStorage.setItem(
        "showConfiguracaoRibbon",
        String(showConfiguracaoRibbon)
      );
      localStorage.setItem("showAjudaRibbon", String(showAjudaRibbon));
      localStorage.setItem("showNclockRibbon", String(showNclockRibbon));
      localStorage.setItem("showNaccessRibbon", String(showNaccessRibbon));
      localStorage.setItem("showNvisitorRibbon", String(showNvisitorRibbon));
      localStorage.setItem("showNparkRibbon", String(showNparkRibbon));
      localStorage.setItem("showNdoorRibbon", String(showNdoorRibbon));
      localStorage.setItem("showNpatrolRibbon", String(showNpatrolRibbon));
      localStorage.setItem("showNcardRibbon", String(showNcardRibbon));
      localStorage.setItem("showNviewRibbon", String(showNviewRibbon));
      localStorage.setItem("showNsecurRibbon", String(showNsecurRibbon));
      localStorage.setItem("showNsoftwareRibbon", String(showNsoftwareRibbon));
      localStorage.setItem("showNsystemRibbon", String(showNsystemRibbon));
      localStorage.setItem("showNappRibbon", String(showNappRibbon));
      localStorage.setItem("showNcyberRibbon", String(showNcyberRibbon));
      localStorage.setItem("showNdigitalRibbon", String(showNdigitalRibbon));
      localStorage.setItem("showNserverRibbon", String(showNserverRibbon));
      localStorage.setItem("showNautRibbon", String(showNautRibbon));
      localStorage.setItem("showNequipRibbon", String(showNequipRibbon));
      localStorage.setItem("showNprojectRibbon", String(showNprojectRibbon));
      localStorage.setItem("showNcountRibbon", String(showNcountRibbon));
      localStorage.setItem("showNbuildRibbon", String(showNbuildRibbon));
      localStorage.setItem("showNcaravanRibbon", String(showNcaravanRibbon));
      localStorage.setItem("showNmechanicRibbon", String(showNmechanicRibbon));
      localStorage.setItem("showNeventsRibbon", String(showNeventsRibbon));
      localStorage.setItem("showNserviceRibbon", String(showNserviceRibbon));
      localStorage.setItem("showNtaskRibbon", String(showNtaskRibbon));
      localStorage.setItem(
        "showNproductionRibbon",
        String(showNproductionRibbon)
      );
      localStorage.setItem("showNticketRibbon", String(showNticketRibbon));
      localStorage.setItem("showNsalesRibbon", String(showNsalesRibbon));
      localStorage.setItem("showNinvoiceRibbon", String(showNinvoiceRibbon));
      localStorage.setItem("showNdocRibbon", String(showNdocRibbon));
      localStorage.setItem("showNsportsRibbon", String(showNsportsRibbon));
      localStorage.setItem("showNgymRibbon", String(showNgymRibbon));
      localStorage.setItem("showNschoolRibbon", String(showNschoolRibbon));
      localStorage.setItem("showNclinicRibbon", String(showNclinicRibbon));
      localStorage.setItem("showNopticsRibbon", String(showNopticsRibbon));
      localStorage.setItem("showNgoldRibbon", String(showNgoldRibbon));
      localStorage.setItem("showNsmartRibbon", String(showNsmartRibbon));
      localStorage.setItem("showNrealityRibbon", String(showNrealityRibbon));
      localStorage.setItem("showNhologramRibbon", String(showNhologramRibbon));
      localStorage.setItem("showNpowerRibbon", String(showNpowerRibbon));
      localStorage.setItem("showNchargeRibbon", String(showNchargeRibbon));
      localStorage.setItem("showNcityRibbon", String(showNcityRibbon));
      localStorage.setItem("showNkioskRibbon", String(showNkioskRibbon));
      localStorage.setItem("showNledRibbon", String(showNledRibbon));
      localStorage.setItem("showNfireRibbon", String(showNfireRibbon));
      localStorage.setItem(
        "showNfurnitureRibbon",
        String(showNfurnitureRibbon)
      );
      localStorage.setItem(
        "showNpartitionRibbon",
        String(showNpartitionRibbon)
      );
      localStorage.setItem("showNdecorRibbon", String(showNdecorRibbon));
      localStorage.setItem("showNpingRibbon", String(showNpingRibbon));
      localStorage.setItem("showNconnectRibbon", String(showNconnectRibbon));
      localStorage.setItem("showNlightRibbon", String(showNlightRibbon));
      localStorage.setItem("showNcomfortRibbon", String(showNcomfortRibbon));
      localStorage.setItem("showNsoundRibbon", String(showNsoundRibbon));
      localStorage.setItem("showNhomeRibbon", String(showNhomeRibbon));
    };

    const timer = setTimeout(handleStateChange, 10);

    return () => clearTimeout(timer);
  }, [
    showPessoasRibbon,
    showDispositivosRibbon,
    showConfiguracaoRibbon,
    showAjudaRibbon,
    showNclockRibbon,
    showNaccessRibbon,
    showNvisitorRibbon,
    showNparkRibbon,
    showNdoorRibbon,
    showNpatrolRibbon,
    showNcardRibbon,
    showNviewRibbon,
    showNsecurRibbon,
    showNsoftwareRibbon,
    showNsystemRibbon,
    showNappRibbon,
    showNcyberRibbon,
    showNdigitalRibbon,
    showNserverRibbon,
    showNautRibbon,
    showNequipRibbon,
    showNprojectRibbon,
    showNsmartRibbon,
    showNrealityRibbon,
    showNhologramRibbon,
    showNpowerRibbon,
    showNchargeRibbon,
    showNcityRibbon,
    showNkioskRibbon,
    showNledRibbon,
    showNfireRibbon,
    showNfurnitureRibbon,
    showNpartitionRibbon,
    showNdecorRibbon,
    showNpingRibbon,
    showNconnectRibbon,
    showNlightRibbon,
    showNcomfortRibbon,
    showNsoundRibbon,
    showNhomeRibbon,
  ]);

  // Define a estrutura do menu de softwares
  useEffect(() => {
    const filterUnlicensedSoftware = (submenu: MenuItem[]): MenuItem[] => {
      return submenu.filter((item) => enabledSoftware[item.key] === false);
    };

    // Estrutura de menu original
    const originalMenuStructure: MenuStructure = {
      sisnid: {
        label: "SISNID - Segurança",
        alt: "SISNID",
        key: "sisnid",
        submenu: [
          { label: "Nclock - Assiduidade", alt: "nclock", key: "nclock" },
          { label: "Naccess - Acessos", alt: "naccess", key: "naccess" },
          { label: "Nvisitor - Torniquetes", alt: "nvisitor", key: "nvisitor" },
          { label: "Npark - Parques", alt: "npark", key: "npark" },
          { label: "Ndoor - Automatismos", alt: "ndoor", key: "ndoor" },
          { label: "Npatrol - Rondas", alt: "npatrol", key: "npatrol" },
          { label: "Ncard - Cartões", alt: "ncard", key: "ncard" },
          { label: "Nview - Vigilância", alt: "nview", key: "nview" },
          { label: "Nsecur - Alarmes", alt: "nsecur", key: "nsecur" },
          {
            label: "Nsoftware - Programação",
            alt: "nsoftware",
            key: "nsoftware",
          },
        ],
      },
      nidsof: {
        label: "NIDSOF - Gestão",
        alt: "NIDSOF",
        key: "nidsof",
        submenu: [
          {
            label: "Nsoftware - Programação",
            alt: "nsoftware",
            key: "nsoftware",
          },
          { label: "Nsystem - Sistemas", alt: "nsystem", key: "nsystem" },
          { label: "Napp - Aplicativos", alt: "napp", key: "napp" },
          { label: "Ncyber - Cibernética", alt: "ncyber", key: "ncyber" },
          {
            label: "Ndigital - Transformação",
            alt: "ndigital",
            key: "ndigital",
          },
          { label: "Nserver - Integração", alt: "nserver", key: "nserver" },
          { label: "Naut - Automação", alt: "naut", key: "naut" },
          { label: "Nequip - Equipamentos", alt: "nequip", key: "nequip" },
          { label: "Nproject - Projetos", alt: "nproject", key: "nproject" },
          { label: "Ncount - Contador", alt: "ncount", key: "ncount" },
          { label: "Nbuild - Obras", alt: "nbuild", key: "nbuild" },
          {
            label: "Ncaravan - Autocaravanas",
            alt: "ncaravan",
            key: "ncaravan",
          },
          { label: "Nmechanic - Oficinas", alt: "nmechanic", key: "nmechanic" },
          { label: "Nevents - Eventos", alt: "nevents", key: "nevents" },
          { label: "Nservice - Serviços", alt: "nservice", key: "nservice" },
          { label: "Ntask - Tarefas", alt: "ntask", key: "ntask" },
          {
            label: "Nproduction - Produção",
            alt: "nproduction",
            key: "nproduction",
          },
          { label: "Nticket - Bilhetes", alt: "nticket", key: "nticket" },
          { label: "Nsales - CRM", alt: "nsales", key: "nsales" },
          { label: "Ninvoice - Faturação", alt: "ninvoice", key: "ninvoice" },
          { label: "Ndoc - Documental", alt: "ndoc", key: "ndoc" },
          { label: "Nsports - Desporto", alt: "nsports", key: "nsports" },
          { label: "Ngym - Ginásios", alt: "ngym", key: "ngym" },
          { label: "Nschool - Escolar", alt: "nschool", key: "nschool" },
          { label: "Nclinic - Clínicas", alt: "nclinic", key: "nclinic" },
          { label: "Noptics - Ópticas", alt: "noptics", key: "noptics" },
          { label: "Ngold - Ourivesarias", alt: "ngold", key: "ngold" },
          {
            label: "Nsoftware - Programação",
            alt: "nsoftware",
            key: "nsoftware",
          },
        ],
      },
      nidtec: {
        label: "NIDTEC - Tecnologia",
        alt: "NIDTEC",
        key: "nidtec",
        submenu: [
          { label: "Nsmart - Inteligência", alt: "nsmart", key: "nsmart" },
          { label: "Nreality - Virtual", alt: "nreality", key: "nreality" },
          {
            label: "Nhologram - Hologramas",
            alt: "nhologram",
            key: "nhologram",
          },
          { label: "Npower - Energias", alt: "npower", key: "npower" },
          { label: "Ncharge - Recarga", alt: "ncharge", key: "ncharge" },
          { label: "Ncity - Mobilidade", alt: "ncity", key: "ncity" },
          { label: "Nkiosk - Quiosques", alt: "nkiosk", key: "nkiosk" },
          { label: "Nled - Multimédia", alt: "nled", key: "nled" },
          { label: "Nfire - Incêndios", alt: "nfire", key: "nfire" },
          {
            label: "Nsoftware - Programação",
            alt: "nsoftware",
            key: "nsoftware",
          },
        ],
      },
      nidplace: {
        label: "NIDPLACE - Conforto",
        alt: "NIDPLACE",
        key: "nidplace",
        submenu: [
          {
            label: "Nfurniture - Mobiliário",
            alt: "nfurniture",
            key: "nfurniture",
          },
          {
            label: "Npartition - Divisórias",
            alt: "npartition",
            key: "npartition",
          },
          { label: "Ndecor - Design", alt: "ndecor", key: "ndecor" },
          { label: "Nping - Redes", alt: "nping", key: "nping" },
          {
            label: "Nconnect - Electricidade",
            alt: "nconnect",
            key: "nconnect",
          },
          { label: "Nlight - Iluminação", alt: "nlight", key: "nlight" },
          {
            label: "Ncomfort - Climatização",
            alt: "ncomfort",
            key: "ncomfort",
          },
          { label: "Nsound - Áudio", alt: "nsound", key: "nsound" },
          { label: "Nhome - Domótica", alt: "nhome", key: "nhome" },
          {
            label: "Nsoftware - Programação",
            alt: "nsoftware",
            key: "nsoftware",
          },
        ],
      },
    };

    const newMenuStructure: MenuStructure = {};
    Object.keys(originalMenuStructure).forEach((key) => {
      const menu = originalMenuStructure[key];
      const filteredSubmenu = menu.submenu
        ? filterUnlicensedSoftware(menu.submenu)
        : [];
      newMenuStructure[key] = {
        ...menu,
        submenu: filteredSubmenu,
      };
    });

    setMenuStructureNG(newMenuStructure);
  }, [license]);

  // Estrutura de menu opcional para o nkiosk
  const KioskOptionalMenuStructure: MenuStructure = {
    contador: {
      label: "Contador Passagem",
      alt: "contador",
      key: "contador",
      onClick: () =>
        toast.info(
          "Módulo de Contagem de Pessoas. Sistema pode ser utilizado em diversos contextos, como: Contagem: Controle de entradas e saída de pessoas."
        ),
    },
    sensor: {
      label: "Sensor Movimento",
      alt: "sensor",
      key: "sensor",
      onClick: () =>
        toast.info(
          "Módulo de Sensores de Movimento. Sistema pode ser utilizado em diversos contextos, como: Local: Detetar movimento de uma determinada área."
        ),
    },
    fotocelula: {
      label: "Fotocélula Segurança",
      alt: "fotocélula",
      key: "fotocelula",
      onClick: () =>
        toast.info(
          "Módulo de Fotocélulas de Segurança. Sistema pode ser utilizado em diversos contextos, como: Zona: Alerta de um movimento indesejado num local."
        ),
    },
    painel: {
      label: "Painel de Movimentos",
      alt: "painel",
      key: "painel",
      onClick: () =>
        toast.info(
          "Módulo de Painel de Movimentos. Sistema pode ser utilizado em diversos contextos, como: Movimentos: Visualizar Registos Online com Foto"
        ),
    },
    revista: {
      label: "Revistas Aleatórias",
      alt: "revista",
      key: "revista",
      onClick: () =>
        toast.info(
          "Módulo de Revistas Aleatórias. Sistema pode ser utilizado em diversos contextos, como: Movimentos: Inspecionar aleatoriamente pessoas."
        ),
    },
  };

  // Estrutura de menu opcional para o nkiosk
  const TaskOptionalMenuStructure: MenuStructure = {
    contador: {
      label: "Contador Passagem",
      alt: "contador",
      key: "contador",
      onClick: () =>
        toast.info(
          "Módulo de Contagem de Pessoas. Sistema pode ser utilizado em diversos contextos, como: Contagem: Controle de entradas e saída de pessoas."
        ),
    },
    sensor: {
      label: "Sensor Movimento",
      alt: "sensor",
      key: "sensor",
      onClick: () =>
        toast.info(
          "Módulo de Sensores de Movimento. Sistema pode ser utilizado em diversos contextos, como: Local: Detetar movimento de uma determinada área."
        ),
    },
    fotocelula: {
      label: "Fotocélula Segurança",
      alt: "fotocélula",
      key: "fotocelula",
      onClick: () =>
        toast.info(
          "Módulo de Fotocélulas de Segurança. Sistema pode ser utilizado em diversos contextos, como: Zona: Alerta de um movimento indesejado num local."
        ),
    },
  };

  // Estrutura do menu de listagens
  useEffect(() => {
    const ListingMenuStructure = {
      pessoas: {
        label: "Listagem Pessoas",
        alt: "pessoas",
        key: "pessoas",
        submenu: [
          { label: "Listagem Pessoas", key: "geral_pessoas", alt: "pessoas" },
          {
            label: "Listagem Departamentos",
            key: "geral_departamentos",
            alt: "pessoas",
          },
          { label: "Listagem Grupos", key: "geral_grupos", alt: "pessoas" },
          {
            label: "Listagem Categorias",
            key: "geral_categorias",
            alt: "pessoas",
          },
          {
            label: "Listagem Profissões",
            key: "geral_profissoes",
            alt: "pessoas",
          },
          { label: "Listagem Zonas", key: "geral_zonas", alt: "pessoas" },
          /* { label: 'Listagem Fracções', key: 'geral_fraccoes', alt: 'pessoas' }, */
          {
            label: "Listagem Entidades Externas",
            key: "geral_entext",
            alt: "pessoas",
          },
        ],
      },
      dispositivos: {
        label: "Listagem Dispositivos",
        alt: "dispositivos",
        key: "dispositivos",
        submenu: [
          {
            label: "Listagem Equipamentos",
            key: "geral_equipamentos",
            alt: "dispositivos",
          },
          {
            label: "Listagem Controlo Acessos",
            key: "geral_controlo",
            alt: "dispositivos",
          },
          {
            label: "Listagem Períodos",
            key: "geral_periodos",
            alt: "dispositivos",
          },
          {
            label: "Listagem Fecho e Abertura",
            key: "geral_fecho",
            alt: "dispositivos",
          },
        ],
      },
      configuracao: {
        label: "Listagem Configuração",
        alt: "configuração",
        key: "configuracao",
        submenu: [
          {
            label: "Listagem Utilizadores",
            key: "geral_utilizadores",
            alt: "configuração",
          },
          {
            label: "Listagem Logins",
            key: "geral_logins",
            alt: "configuração",
          },
          {
            label: "Listagem Histórico",
            key: "geral_historico",
            alt: "configuração",
          },
        ],
      },
    };

    // Estrutura do menu de listagens para o nkiosk
    const nkioskSubmenu = {
      label: "Listagem Nkiosk",
      alt: "nkiosk",
      key: "nkiosk",
      submenu: [
        {
          label: "Listagem Recebimentos Multibanco",
          key: "recebimento_multibanco",
          alt: "nkiosk",
        },
        {
          label: "Listagem Recebimentos Moedeiro",
          key: "recebimento_moedeiro",
          alt: "nkiosk",
        },
        {
          label: "Listagem Recebimentos Totais",
          key: "recebimento_totais",
          alt: "nkiosk",
        },
        {
          label: "Listagem Movimentos Torniquete",
          key: "movimento_torniquete",
          alt: "nkiosk",
        },
        {
          label: "Listagem Movimentos Quiosque",
          key: "movimento_quiosque",
          alt: "nkiosk",
        },
        {
          label: "Listagem Movimentos Totais",
          key: "movimento_totais",
          alt: "nkiosk",
        },
        {
          label: "Listagem Remota Video Porteiro",
          key: "remota_vp",
          alt: "nkiosk",
        },
        {
          label: "Listagem Remota Aberturas Manuais",
          key: "remota_abertura",
          alt: "nkiosk",
        },
        {
          label: "Listagem Registos Recolhas Moedas",
          key: "registo_recolhas",
          alt: "nkiosk",
        },
        {
          label: "Listagem Registos Limpeza Geral",
          key: "registo_limpeza",
          alt: "nkiosk",
        },
        {
          label: "Listagem Registos Contador",
          key: "registo_contador",
          alt: "nkiosk",
        },
        {
          label: "Listagem Registos Ocorrências",
          key: "registo_ocorrencias",
          alt: "nkiosk",
        },
      ],
    };

    // Estrutura do menu de listagens para o nclock
    const nclockSubmenu = {
      label: "Listagem Nclock",
      alt: "nclock",
      key: "nclock",
      submenu: [
        {
          label: "Listagem Assiduidades",
          key: "movimentos_assiduidade",
          alt: "nclock",
        },
        {
          label: "Listagem Alterações",
          key: "movimentos_alteracoes",
          alt: "nclock",
        },
        {
          label: "Listagem Acessos",
          key: "acessos_acessos",
          alt: "nclock",
        },
      ],
    };

    // Estrutura do menu de listagens para o naccess
    const naccessSubmenu = {
      label: "Listagem Naccess",
      alt: "naccess",
      key: "naccess",
      submenu: [
        {
          label: "Listagem Acessos",
          key: "movimentos_acessos",
          alt: "naccess",
        },
        {
          label: "Listagem Visitantes",
          key: "movimentos_visitantes",
          alt: "naccess",
        },
        {
          label: "Listagem Aberturas Manuais",
          key: "acessos_aberturas",
          alt: "naccess",
        },
      ],
    };

    // Estrutura do menu de listagens para o nvisitor
    const nvisitorSubmenu = {
      label: "Listagem Nvisitor",
      alt: "nvisitor",
      key: "nvisitor",
      submenu: [
        {
          label: "Listagem Torniquete",
          key: "movimentos_visitor_torniquete",
          alt: "nvisitor",
        },
        {
          label: "Listagem Quiosque",
          key: "movimentos_visitor_quiosque",
          alt: "nvisitor",
        },
        {
          label: "Listagem Movimento Totais",
          key: "movimentos_visitor_totais",
          alt: "nvisitor",
        },
        {
          label: "Listagem Acessos",
          key: "acessos_visitor_acessos",
          alt: "nvisitor",
        },
        {
          label: "Listagem Visitantes",
          key: "acessos_visitor_visitantes",
          alt: "nvisitor",
        },
      ],
    };

    // Função para estender o menu de listagens para um software específico
    function extendMenuForSoftware(
      softwareKey: string,
      softwareSpecificItems: MenuItem
    ): MenuStructure {
      const extendedMenu = JSON.parse(JSON.stringify(ListingMenuStructure));

      extendedMenu[softwareKey] = softwareSpecificItems;
      return extendedMenu;
    }

    // Estrutura do menu de listagens para o nkiosk
    const nkioskMenu = extendMenuForSoftware("nkiosk", nkioskSubmenu);

    setMenuStructureListing(ListingMenuStructure);
    setMenuStructureListingNKiosk(nkioskMenu);

    // Estrutura do menu de listagens para o nclock
    const nclockMenu = extendMenuForSoftware("nclock", nclockSubmenu);

    setMenuStructureListing(ListingMenuStructure);
    setMenuStructureListingNClock(nclockMenu);

    // Estrutura do menu de listagens para o naccess
    const naccessMenu = extendMenuForSoftware("naccess", naccessSubmenu);

    setMenuStructureListing(ListingMenuStructure);
    setMenuStructureListingNAccess(naccessMenu);

    // Estrutura do menu de listagens para o nvisitor
    const nvisitorMenu = extendMenuForSoftware("nvisitor", nvisitorSubmenu);

    setMenuStructureListing(ListingMenuStructure);
    setMenuStructureListingNVisitor(nvisitorMenu);
  }, []);

  // Define a estrutura do menu do nidgroup
  useEffect(() => {
    const filteredSubmenu = [
      { label: "Nclock - Assiduidade", alt: "nclock", key: "nclock" },
      { label: "Naccess - Acessos", alt: "naccess", key: "naccess" },
      { label: "Nvisitor - Torniquetes", alt: "nvisitor", key: "nvisitor" },
      { label: "Npark - Parques", alt: "npark", key: "npark" },
      { label: "Ndoor - Automatismos", alt: "ndoor", key: "ndoor" },
      { label: "Npatrol - Rondas", alt: "npatrol", key: "npatrol" },
      { label: "Ncard - Cartões", alt: "ncard", key: "ncard" },
      { label: "Nview - Vigilância", alt: "nview", key: "nview" },
      { label: "Nsecur - Alarmes", alt: "nsecur", key: "nsecur" },
      { label: "Nsoftware - Programação", alt: "nsoftware", key: "nsoftware" },
      { label: "Nsystem - Sistemas", alt: "nsystem", key: "nsystem" },
      { label: "Napp - Aplicativos", alt: "napp", key: "napp" },
      { label: "Ncyber - Cibernética", alt: "ncyber", key: "ncyber" },
      { label: "Ndigital - Transformação", alt: "ndigital", key: "ndigital" },
      { label: "Nserver - Integração", alt: "nserver", key: "nserver" },
      { label: "Naut - Automação", alt: "naut", key: "naut" },
      { label: "Nequip - Equipamentos", alt: "nequip", key: "nequip" },
      { label: "Nproject - Projetos", alt: "nproject", key: "nproject" },
      { label: "Ncount - Contador", alt: "ncount", key: "ncount" },
      { label: "Nbuild - Obras", alt: "nbuild", key: "nbuild" },
      { label: "Ncaravan - Autocaravanas", alt: "ncaravan", key: "ncaravan" },
      { label: "Nmechanic - Oficinas", alt: "nmechanic", key: "nmechanic" },
      { label: "Nevents - Eventos", alt: "nevents", key: "nevents" },
      { label: "Nservice - Serviços", alt: "nservice", key: "nservice" },
      { label: "Ntask - Tarefas", alt: "ntask", key: "ntask" },
      {
        label: "Nproduction - Produção",
        alt: "nproduction",
        key: "nproduction",
      },
      { label: "Nticket - Bilhetes", alt: "nticket", key: "nticket" },
      { label: "Nsales - CRM", alt: "nsales", key: "nsales" },
      { label: "Ninvoice - Faturação", alt: "ninvoice", key: "ninvoice" },
      { label: "Ndoc - Documental", alt: "ndoc", key: "ndoc" },
      { label: "Nsports - Desporto", alt: "nsports", key: "nsports" },
      { label: "Ngym - Ginásios", alt: "ngym", key: "ngym" },
      { label: "Nschool - Escolar", alt: "nschool", key: "nschool" },
      { label: "Nclinic - Clínicas", alt: "nclinic", key: "nclinic" },
      { label: "Noptics - Ópticas", alt: "noptics", key: "noptics" },
      { label: "Ngold - Ourivesarias", alt: "ngold", key: "ngold" },
      { label: "Nsmart - Inteligência", alt: "nsmart", key: "nsmart" },
      { label: "Nreality - Virtual", alt: "nreality", key: "nreality" },
      { label: "Nhologram - Hologramas", alt: "nhologram", key: "nhologram" },
      { label: "Npower - Energias", alt: "npower", key: "npower" },
      { label: "Ncharge - Recarga", alt: "ncharge", key: "ncharge" },
      { label: "Ncity - Mobilidade", alt: "ncity", key: "ncity" },
      { label: "Nkiosk - Quiosques", alt: "nkiosk", key: "nkiosk" },
      { label: "Nled - Multimédia", alt: "nled", key: "nled" },
      { label: "Nfire - Incêndios", alt: "nfire", key: "nfire" },
      {
        label: "Nfurniture - Mobiliário",
        alt: "nfurniture",
        key: "nfurniture",
      },
      {
        label: "Npartition - Divisórias",
        alt: "npartition",
        key: "npartition",
      },
      { label: "Ndecor - Design", alt: "ndecor", key: "ndecor" },
      { label: "Nping - Redes", alt: "nping", key: "nping" },
      { label: "Nconnect - Electricidade", alt: "nconnect", key: "nconnect" },
      { label: "Nlight - Iluminação", alt: "nlight", key: "nlight" },
      { label: "Ncomfort - Climatização", alt: "ncomfort", key: "ncomfort" },
      { label: "Nsound - Áudio", alt: "nsound", key: "nsound" },
      { label: "Nhome - Domótica", alt: "nhome", key: "nhome" },
    ].filter((item) => enabledSoftware[item.key]);

    const dynamicMenuStructure = {
      dashboard: { label: "INÍCIO", alt: "INÍCIO", key: "dashboard" },
      cliente: {
        label: "LICENÇAS",
        alt: "LICENÇAS",
        key: "cliente",
        submenu: filteredSubmenu,
      },
    };

    setMenuStructureStart(dynamicMenuStructure);
  }, [license]);

  // Define o componente do item de menu
  const MenuItem = ({ active, onClick, label }: MenuItem) => (
    <li
      className={`image-text ${active ? "active" : ""}`}
      onClick={onClick}
      style={{ flexDirection: "row" }}
    >
      <span className="menu-item-text">{label}</span>
    </li>
  );

  // Mapeamento de chaves para dados e campos de cada menu
  const menuConfig: MenuConfig = {
    geral_pessoas: { data: employeesNoPagination, fields: employeeFields },
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
    geral_logins: { data: loginLogsNoPagination, fields: logsFields },
    geral_historico: { data: historyLogsNoPagination, fields: logsFields },
    recebimento_multibanco: {
      data: payTerminalNoPagination,
      fields: transactionMBFields,
    },
    recebimento_moedeiro: {
      data: payCoinsNoPagination,
      fields: transactionMBFields,
    },
    recebimento_totais: {
      data: totalPaymentsNoPagination,
      fields: transactionMBFields,
    },
    movimento_torniquete: {
      data: moveCardNoPagination,
      fields: transactionCardFields,
    },
    movimento_quiosque: {
      data: moveKioskNoPagination,
      fields: transactionCardFields,
    },
    movimento_totais: {
      data: totalMovementsNoPagination,
      fields: transactionCardFields,
    },
    remota_vp: { data: moveVP, fields: transactionCardFields },
    remota_abertura: { data: manualOpenDoor, fields: manualOpenDoorFields },
    registo_recolhas: {
      data: getCoins,
      fields: recolhaMoedeiroEContadorFields,
    },
    registo_limpeza: { data: cleaning, fields: limpezasEOcorrenciasFields },
    registo_contador: { data: counterNoPagination, fields: counterFields },
    registo_ocorrencias: {
      data: occurrences,
      fields: limpezasEOcorrenciasFields,
    },
    movimentos_assiduidade: {
      data: attendance.filter((item) => item.type !== 3),
      fields: employeeAttendanceTimesFields,
    },
    movimentos_alteracoes: {
      data: attendance.filter((item) => item.type === 3),
      fields: employeeAttendanceTimesFields,
    },
    acessos_acessos: { data: accessForGraph, fields: accessesFields },
    movimentos_acessos: { data: accessForGraph, fields: accessesFields },
    movimentos_visitantes: {
      data: employeeVisitor,
      fields: employeeVisitorFields,
    },
    acessos_aberturas: { data: manualOpenDoor, fields: manualOpenDoorFields },
    movimentos_visitor_torniquete: {
      data: moveCardNoPagination,
      fields: transactionCardFields,
    },
    movimentos_visitor_quiosque: {
      data: moveKioskNoPagination,
      fields: transactionCardFields,
    },
    movimentos_visitor_totais: {
      data: totalMovementsNoPagination,
      fields: transactionCardFields,
    },
    acessos_visitor_acessos: { data: accessForGraph, fields: accessesFields },
    acessos_visitor_visitantes: {
      data: employeeVisitor,
      fields: employeeVisitorFields,
    },
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
  };

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
    }, 200);
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
  const renderMenu = (
    menuKey: keyof MenuStructure,
    menuStructure: MenuStructure
  ) => {
    const menu = menuStructure[String(menuKey)];
    if (!menu) {
      return null;
    }

    const pathsNotRequired = [
      "view",
      "caravan",
      "mechanic",
      "events",
      "service",
      "task",
      "production",
      "sales",
      "sports",
      "gym",
      "school",
      "clinic",
      "optics",
      "gold",
      "reality",
      "hologram",
      "fire",
      "light",
      "comfort",
      "sound",
      "home",
    ];

    const isPageNotRequired = pathsNotRequired.some((path) =>
      location.pathname.includes(path)
    );

    const isWideSubmenu =
      menuKey === "pessoas" ||
      menuKey === "dispositivos" ||
      menuKey === "configuracao" ||
      menuKey === "nkiosk" ||
      menuKey === "nclock" ||
      menuKey === "naccess" ||
      menuKey === "nvisitor";
    const isWideSubmenuMain =
      menuKey === "cliente" ||
      menuKey === "sisnid" ||
      menuKey === "nidsof" ||
      menuKey === "nidtec" ||
      menuKey === "nidplace";

    return (
      <div
        key={menuKey as string}
        className="menu"
        onMouseEnter={() => menu.submenu && handleMouseEnter(menuKey as string)}
        onMouseLeave={handleMouseLeave}
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
          alt={menu.alt}
          label={menu.label}
          className="menu-item"
        />
        {activeMenu === menuKey && menu.submenu && (
          <div
            className="submenu"
            style={{
              minWidth: isWideSubmenu || isWideSubmenuMain ? "240px" : "auto",
              right: isWideSubmenu && !isPageNotRequired ? "100%" : "auto",
              left: isWideSubmenu && !isPageNotRequired ? "auto" : "100%",
            }}
          >
            {menu.submenu.map((item: MenuItem) => (
              <MenuItem
                key={item.key}
                active={activeMenu === item.key}
                onClick={() => handleMenuItemClick(item)}
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

  renderMenu("dashboard", menuStructureStart);
  renderMenu("cliente", menuStructureStart);
  renderMenu("sisnid", menuStructureNG);
  renderMenu("nidsof", menuStructureNG);
  renderMenu("nidtec", menuStructureNG);
  renderMenu("nidplace", menuStructureNG);

  // useEffect para atualizar a ribbon ativa
  useEffect(() => {
    const pathSegments = location.pathname.split("/");

    const path = pathSegments[1];

    const isSoftwarePath = [
      "nclock",
      "naccess",
      "nvisitor",
      "npark",
      "ndoor",
      "npatrol",
      "ncard",
      "nview",
      "nsecur",
      "nsoftware",
      "nsystem",
      "napp",
      "ncyber",
      "ndigital",
      "nserver",
      "naut",
      "nequip",
      "nproject",
      "ncount",
      "nbuild",
      "ncaravan",
      "nmechanic",
      "nevents",
      "nservice",
      "ntask",
      "nproduction",
      "nticket",
      "nsales",
      "ninvoice",
      "ndoc",
      "nsports",
      "ngym",
      "nschool",
      "nclinic",
      "noptics",
      "ngold",
      "nsmart",
      "nreality",
      "nhologram",
      "npower",
      "ncharge",
      "ncity",
      "nkiosk",
      "nled",
      "nfire",
      "nfurniture",
      "npartition",
      "ndecor",
      "nping",
      "nconnect",
      "nlight",
      "ncomfort",
      "nsound",
      "nhome",
    ].includes(path);

    if (isSoftwarePath) {
      setShowPessoasRibbon(false);
      setShowDispositivosRibbon(false);
      setShowConfiguracaoRibbon(false);
      setShowAjudaRibbon(false);
    }

    switch (path) {
      case "persons":
        clearAllRibbons();
        setShowPessoasRibbon(true);
        setActiveTab("pessoas");
        break;
      case "devices":
        clearAllRibbons();
        setShowDispositivosRibbon(true);
        setActiveTab("dispositivos");
        break;
      case "configs":
        clearAllRibbons();
        setShowConfiguracaoRibbon(true);
        setActiveTab("configuracao");
        break;
      case "help":
        clearAllRibbons();
        setShowAjudaRibbon(true);
        setActiveTab("ajuda");
        break;
      default:
        setActiveTab("");
        break;
    }
  }, [location.pathname]);

  // Função para geranciar o clique na aba
  const handleTabClick = (tabName: string) => {
    if (activeTab !== tabName) {
      Object.values(ribbons).forEach(([setRibbon]) => setRibbon(false));
      const [setRibbon] = ribbons[tabName as RibbonName];
      setRibbon(true);
      const capitalizedTab = tabName.charAt(0).toUpperCase() + tabName.slice(1);
      setCurrentOpenRibbon(capitalizedTab as RibbonToggler);
      setActiveTab(tabName);
      localStorage.setItem("activeTab", tabName);
    }
  };

  // Função para dinamizar as tabs
  const tabs: TabsInfo[] = [
    { id: "nclock", title: "NCLOCK", show: showNclockTab },
    { id: "naccess", title: "NACCESS", show: showNaccessTab },
    { id: "nvisitor", title: "NVISITOR", show: showNvisitorTab },
    { id: "npark", title: "NPARK", show: showNparkTab },
    { id: "ndoor", title: "NDOOR", show: showNdoorTab },
    { id: "npatrol", title: "NPATROL", show: showNpatrolTab },
    { id: "ncard", title: "NCARD", show: showNcardTab },
    { id: "nview", title: "NVIEW", show: showNviewTab },
    { id: "nsecur", title: "NSECUR", show: showNsecurTab },
    { id: "nsoftware", title: "NSOFTWARE", show: showNsoftwareTab },
    { id: "nsystem", title: "NSYSTEM", show: showNsystemTab },
    { id: "napp", title: "NAPP", show: showNappTab },
    { id: "ncyber", title: "NCYBER", show: showNcyberTab },
    { id: "ndigital", title: "NDIGITAL", show: showNdigitalTab },
    { id: "nserver", title: "NSERVER", show: showNserverTab },
    { id: "naut", title: "NAUT", show: showNautTab },
    { id: "nequip", title: "NEQUIP", show: showNequipTab },
    { id: "nproject", title: "NPROJECT", show: showNprojectTab },
    { id: "ncount", title: "NCOUNT", show: showNcountTab },
    { id: "nbuild", title: "NBUILD", show: showNbuildTab },
    { id: "ncaravan", title: "NCARAVAN", show: showNcaravanTab },
    { id: "nmechanic", title: "NMECHANIC", show: showNmechanicTab },
    { id: "nevents", title: "NEVENTS", show: showNeventsTab },
    { id: "nservice", title: "NSERVICE", show: showNserviceTab },
    { id: "ntask", title: "NTASK", show: showNtaskTab },
    { id: "nproduction", title: "NPRODUCTION", show: showNproductionTab },
    { id: "nticket", title: "NTICKET", show: showNticketTab },
    { id: "nsales", title: "NSALES", show: showNsalesTab },
    { id: "ninvoice", title: "NINVOICE", show: showNinvoiceTab },
    { id: "ndoc", title: "NDOC", show: showNdocTab },
    { id: "nsports", title: "NSPORTS", show: showNsportsTab },
    { id: "ngym", title: "NGYM", show: showNgymTab },
    { id: "nschool", title: "NSCHOOL", show: showNschoolTab },
    { id: "nclinic", title: "NCLINIC", show: showNclinicTab },
    { id: "noptics", title: "NOPTICS", show: showNopticsTab },
    { id: "ngold", title: "NGOLD", show: showNgoldTab },
    { id: "nsmart", title: "NSMART", show: showNsmartTab },
    { id: "nreality", title: "NREALITY", show: showNrealityTab },
    { id: "nhologram", title: "NHOLOGRAM", show: showNhologramTab },
    { id: "npower", title: "NPOWER", show: showNpowerTab },
    { id: "ncharge", title: "NCHARGE", show: showNchargeTab },
    { id: "ncity", title: "NCITY", show: showNcityTab },
    { id: "nkiosk", title: "NKIOSK", show: showNkioskTab },
    { id: "nled", title: "NLED", show: showNledTab },
    { id: "nfire", title: "NFIRE", show: showNfireTab },
    { id: "nfurniture", title: "NFURNITURE", show: showNfurnitureTab },
    { id: "npartition", title: "NPARTITION", show: showNpartitionTab },
    { id: "ndecor", title: "NDECOR", show: showNdecorTab },
    { id: "nping", title: "NPING", show: showNpingTab },
    { id: "nconnect", title: "NCONNECT", show: showNconnectTab },
    { id: "nlight", title: "NLIGHT", show: showNlightTab },
    { id: "ncomfort", title: "NCOMFORT", show: showNcomfortTab },
    { id: "nsound", title: "NSOUND", show: showNsoundTab },
    { id: "nhome", title: "NHOME", show: showNhomeTab },
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

  // Função para abrir o modal de backup da base de dados
  const toggleBackupDBModal = () => setShowBackupDBModal(!showBackupDBModal);

  // Função para abrir o modal de importação de funcionários
  const toggleImportEmployees = () =>
    setShowImportEmployeesModal(!showImportEmployeesModal);

  // Função para abrir o modal de informações técnicas
  const toggleTechInfoModal = () => setShowTechInfoModal(!showTechInfoModal);

  // Função para abrir o anydesk em uma nova janela
  const handleAnydeskWindow = () => {
    window.open("https://anydesk.com/pt");
  };

  // Função para abrir o whatsapp web em uma nova janela
  const handleWhatsappWindow = () => {
    window.open("https://web.whatsapp.com/send?phone=351910203919");
  };

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
      localStorage.setItem("lockRibbon", "true");
      localStorage.setItem("lastClosedRibbon", currentOpenRibbon);
    } else {
      if (lockRibbon && lastClosedRibbon) {
        if (currentOpenRibbon) {
          toggleRibbonVisibility(currentOpenRibbon, true);
        }
        toggleRibbonVisibility(lastClosedRibbon, true);
        setCurrentOpenRibbon(lastClosedRibbon);
        setLockRibbon(false);
        setLastClosedRibbon(null);
        localStorage.setItem("lockRibbon", "false");
        localStorage.setItem("lastClosedRibbon", "");
      }
    }
  };

  // Função para fechar e reabrir a ribbon
  const toggleRibbonVisibility = (
    ribbonName: RibbonToggler,
    forceToggle = false
  ) => {
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
          case "Pessoas":
            return showPessoasRibbon;
          case "Dispositivos":
            return showDispositivosRibbon;
          case "Configuracao":
            return showConfiguracaoRibbon;
          case "Ajuda":
            return showAjudaRibbon;
          case "Nclock":
            return showNclockRibbon;
          case "Naccess":
            return showNaccessRibbon;
          case "Nvisitor":
            return showNvisitorRibbon;
          case "Npark":
            return showNparkRibbon;
          case "Ndoor":
            return showNdoorRibbon;
          case "Npatrol":
            return showNpatrolRibbon;
          case "Ncard":
            return showNcardRibbon;
          case "Nview":
            return showNviewRibbon;
          case "Nsecur":
            return showNsecurRibbon;
          case "Nsoftware":
            return showNsoftwareRibbon;
          case "Nsystem":
            return showNsystemRibbon;
          case "Napp":
            return showNappRibbon;
          case "Ncyber":
            return showNcyberRibbon;
          case "Ndigital":
            return showNdigitalRibbon;
          case "Nserver":
            return showNserverRibbon;
          case "Naut":
            return showNautRibbon;
          case "Nequip":
            return showNequipRibbon;
          case "Nproject":
            return showNprojectRibbon;
          case "Ncount":
            return showNcountRibbon;
          case "Nbuild":
            return showNbuildRibbon;
          case "Ncaravan":
            return showNcaravanRibbon;
          case "Nmechanic":
            return showNmechanicRibbon;
          case "Nevents":
            return showNeventsRibbon;
          case "Nservice":
            return showNserviceRibbon;
          case "Ntask":
            return showNtaskRibbon;
          case "Nproduction":
            return showNproductionRibbon;
          case "Nticket":
            return showNticketRibbon;
          case "Nsales":
            return showNsalesRibbon;
          case "Ninvoice":
            return showNinvoiceRibbon;
          case "Ndoc":
            return showNdocRibbon;
          case "Nsports":
            return showNsportsRibbon;
          case "Ngym":
            return showNgymRibbon;
          case "Nschool":
            return showNschoolRibbon;
          case "Nclinic":
            return showNclinicRibbon;
          case "Noptics":
            return showNopticsRibbon;
          case "Ngold":
            return showNgoldRibbon;
          case "Nsmart":
            return showNsmartRibbon;
          case "Nreality":
            return showNrealityRibbon;
          case "Nhologram":
            return showNhologramRibbon;
          case "Npower":
            return showNpowerRibbon;
          case "Ncharge":
            return showNchargeRibbon;
          case "Ncity":
            return showNcityRibbon;
          case "Nkiosk":
            return showNkioskRibbon;
          case "Nled":
            return showNledRibbon;
          case "Nfire":
            return showNfireRibbon;
          case "Nfurniture":
            return showNfurnitureRibbon;
          case "Npartition":
            return showNpartitionRibbon;
          case "Ndecor":
            return showNdecorRibbon;
          case "Nping":
            return showNpingRibbon;
          case "Nconnect":
            return showNconnectRibbon;
          case "Nlight":
            return showNlightRibbon;
          case "Ncomfort":
            return showNcomfortRibbon;
          case "Nsound":
            return showNsoundRibbon;
          case "Nhome":
            return showNhomeRibbon;
          default:
            return false;
        }
      });
    };

    let timeoutId: ReturnType<typeof setTimeout>;

    if (
      lockRibbon &&
      checkAnyRibbonOpenUpdated() &&
      !isMouseOver &&
      !isMobile
    ) {
      timeoutId = setTimeout(() => {
        Object.keys(ribbonSetters).forEach((ribbonKey) => {
          const setter = ribbonSetters[ribbonKey as RibbonToggler];
          localStorage.setItem(`show${ribbonKey}Ribbon`, "false");
          setter(false);
        });
        setCurrentOpenRibbon(null);
      }, 1000);
    } else {
      if (
        lockRibbon &&
        checkAnyRibbonOpenUpdated() &&
        !isMouseOver &&
        isMobile
      ) {
        timeoutId = setTimeout(() => {
          Object.keys(ribbonSetters).forEach((ribbonKey) => {
            const setter = ribbonSetters[ribbonKey as RibbonToggler];
            localStorage.setItem(`show${ribbonKey}Ribbon`, "false");
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
  }, [
    lockRibbon,
    isMouseOver,
    currentOpenRibbon,
    lastClosedRibbon,
    showPessoasRibbon,
    showDispositivosRibbon,
    showConfiguracaoRibbon,
    showAjudaRibbon,
    showNclockRibbon,
    showNaccessRibbon,
    showNvisitorRibbon,
    showNparkRibbon,
    showNdoorRibbon,
    showNpatrolRibbon,
    showNcardRibbon,
    showNviewRibbon,
    showNsecurRibbon,
    showNsoftwareRibbon,
    showNsystemRibbon,
    showNappRibbon,
    showNcyberRibbon,
    showNdigitalRibbon,
    showNserverRibbon,
    showNautRibbon,
    showNequipRibbon,
    showNprojectRibbon,
    showNcountRibbon,
    showNbuildRibbon,
    showNcaravanRibbon,
    showNmechanicRibbon,
    showNeventsRibbon,
    showNserviceRibbon,
    showNtaskRibbon,
    showNproductionRibbon,
    showNticketRibbon,
    showNsalesRibbon,
    showNinvoiceRibbon,
    showNdocRibbon,
    showNsportsRibbon,
    showNgymRibbon,
    showNschoolRibbon,
    showNclinicRibbon,
    showNopticsRibbon,
    showNgoldRibbon,
    showNsmartRibbon,
    showNrealityRibbon,
    showNhologramRibbon,
    showNpowerRibbon,
    showNchargeRibbon,
    showNcityRibbon,
    showNkioskRibbon,
    showNledRibbon,
    showNfireRibbon,
    showNfurnitureRibbon,
    showNpartitionRibbon,
    showNdecorRibbon,
    showNpingRibbon,
    showNconnectRibbon,
    showNlightRibbon,
    showNcomfortRibbon,
    showNsoundRibbon,
    showNhomeRibbon,
  ]);

  // Função para verificar se o cursor está sobre a ribbon
  const handleRibbonMouseEnter = () => {
    setIsMouseOver(true);
  };

  // Função para verificar se o cursor saiu da ribbon
  const handleRibbonMouseLeave = () => {
    setIsMouseOver(false);
  };

  // Função para fechar o modal de licença
  const handleCloseLicenseModal = () => {
    setShowLicenseModal(false);
    clearAllTabs();
    clearAllRibbons();
    navigate("/dashboard");
  };

  return (
    <nav data-role="ribbonmenu" style={{ backgroundColor: navbarColor }}>
      <div className="nav-container">
        <Navbar expand="lg" className="mobile-navbar">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="mobile-only custom-toggler"
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="navbar-collapse-items"
          >
            <div className="logos mobile-only">
              <Dropdown
                onMouseOver={() => setShowDropdown(true)}
                onMouseLeave={() =>
                  setTimeout(() => setShowDropdown(false), 200)
                }
                show={showDropdown}
                className="dropdown-icon"
                id="dropdown-navbar"
              >
                <Dropdown.Toggle variant="basic" id="dropdown-basic-2">
                  <span className="logo">NSOFTWARES</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-logo">
                  <div style={{ position: "relative" }}>
                    {Object.keys(menuStructureStart).map((menuKey) =>
                      renderMenu(menuKey, menuStructureStart)
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <ul className="nav nav-tabs mobile-only">
              {tabs.map(
                (tab) =>
                  tab.show && (
                    <li
                      key={tab.id}
                      className={`nav-item ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                    >
                      <a
                        className={`nav-link ${tab.id}-tab`}
                        id={`${tab.id}-tab`}
                        onClick={() => handleTabClick(tab.id)}
                      >
                        {tab.title}
                      </a>
                    </li>
                  )
              )}
              <li
                className={`nav-item ${
                  activeTab === "pessoas" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link pessoas-tab"
                  id="pessoas-tab"
                  onClick={() => handleRibbonClick("pessoas")}
                >
                  PESSOAS
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeTab === "dispositivos" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link dispositivos-tab"
                  id="dispositivos-tab"
                  onClick={() => handleRibbonClick("dispositivos")}
                >
                  DISPOSITIVOS
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeTab === "configuracao" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link configuracao-tab"
                  id="configuracao-tab"
                  onClick={() => handleRibbonClick("configuracao")}
                >
                  CONFIGURAÇÃO
                </a>
              </li>
              <div className="logos mobile-only mobile-adjust">
                <Dropdown
                  onMouseOver={() => setShowSoftwaresDropdown(true)}
                  onMouseLeave={() =>
                    setTimeout(() => setShowSoftwaresDropdown(false), 200)
                  }
                  show={showSoftwaresDropdown}
                  className="dropdown-icon"
                  id="dropdown-navbar"
                >
                  <Dropdown.Toggle variant="basic" id="dropdown-basic-2">
                    <span className="logoNG">NIDGROUP</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-logos">
                    <div style={{ position: "relative" }}>
                      {Object.keys(menuStructureNG).map((menuKey) =>
                        renderMenu(menuKey, menuStructureNG)
                      )}
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <li
                className={`nav-item ${activeTab === "ajuda" ? "active" : ""}`}
              >
                <a
                  className="nav-link ajuda-tab"
                  id="ajuda-tab"
                  onClick={() => handleRibbonClick("ajuda")}
                >
                  AJUDA
                </a>
              </li>
            </ul>
            <div className="user-section mobile-only">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={() =>
                    toast.warn("Funcionalidade de mensagens em desenvolvimento")
                  }
                  className="btn btn-light navbar-buttons"
                >
                  <span
                    className="icon"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={mail} alt="botão mensagens" />
                  </span>
                </Button>
                {/* <NavbarNotifications /> */}
                <Button
                  onClick={() =>
                    toast.warn("Funcionalidade de favoritos em desenvolvimento")
                  }
                  className="btn btn-light navbar-buttons"
                >
                  <span
                    className="icon"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={favourite} alt="botão favoritos" />
                  </span>
                </Button>
              </div>
              <Dropdown
                onMouseOver={() => setShowUserDropdown(true)}
                onMouseLeave={() =>
                  setTimeout(() => setShowUserDropdown(false), 200)
                }
                show={showUserDropdown}
                className="dropdown-icon"
                id="dropdown-navbar"
              >
                <Dropdown.Toggle variant="basic" id="dropdown-basic-3">
                  <span className="user-info">
                    <i
                      className="bi bi-door-open"
                      style={{ marginRight: 10 }}
                    ></i>
                    {user.name}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="dropdown-content">
                    <img
                      src={userImage}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: 50,
                      }}
                    />
                    <Dropdown.Item className="dropdown-button" onClick={logout}>
                      Sair
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <div className="logos mobile-hidden">
          <Dropdown
            onMouseOver={() => setShowDropdown(true)}
            onMouseLeave={() => setTimeout(() => setShowDropdown(false), 200)}
            show={showDropdown}
            className="dropdown-icon"
            id="dropdown-navbar"
          >
            <Dropdown.Toggle variant="basic" id="dropdown-basic-2">
              <span className="logo">NSOFTWARES</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-logo">
              <div style={{ position: "relative" }}>
                {Object.keys(menuStructureStart).map((menuKey) =>
                  renderMenu(menuKey, menuStructureStart)
                )}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <ul className="nav nav-tabs mobile-hidden">
          {tabs.map(
            (tab) =>
              tab.show && (
                <li
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
                >
                  <a
                    className={`nav-link ${tab.id}-tab`}
                    id={`${tab.id}-tab`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.title}
                  </a>
                </li>
              )
          )}
          <li className={`nav-item ${activeTab === "pessoas" ? "active" : ""}`}>
            <a
              className="nav-link pessoas-tab"
              id="pessoas-tab"
              onClick={() => handleRibbonClick("pessoas")}
            >
              PESSOAS
            </a>
          </li>
          <li
            className={`nav-item ${
              activeTab === "dispositivos" ? "active" : ""
            }`}
          >
            <a
              className="nav-link dispositivos-tab"
              id="dispositivos-tab"
              onClick={() => handleRibbonClick("dispositivos")}
            >
              DISPOSITIVOS
            </a>
          </li>
          <li
            className={`nav-item ${
              activeTab === "configuracao" ? "active" : ""
            }`}
          >
            <a
              className="nav-link configuracao-tab"
              id="configuracao-tab"
              onClick={() => handleRibbonClick("configuracao")}
            >
              CONFIGURAÇÃO
            </a>
          </li>
          <div className="logos mobile-hidden">
            <Dropdown
              onMouseOver={() => setShowSoftwaresDropdown(true)}
              onMouseLeave={() =>
                setTimeout(() => setShowSoftwaresDropdown(false), 200)
              }
              show={showSoftwaresDropdown}
              className="dropdown-icon"
              id="dropdown-navbar"
            >
              <Dropdown.Toggle variant="basic" id="dropdown-basic-2">
                <span className="logoNG">NIDGROUP</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-logos">
                <div style={{ position: "relative" }}>
                  {Object.keys(menuStructureNG).map((menuKey) =>
                    renderMenu(menuKey, menuStructureNG)
                  )}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <li className={`nav-item ${activeTab === "ajuda" ? "active" : ""}`}>
            <a
              className="nav-link ajuda-tab"
              id="ajuda-tab"
              onClick={() => handleRibbonClick("ajuda")}
            >
              AJUDA
            </a>
          </li>
        </ul>
        <div className="user-section mobile-hidden">
          <Button
            onClick={() =>
              toast.warn("Funcionalidade de mensagens em desenvolvimento")
            }
            className="btn btn-light navbar-buttons"
          >
            <span
              className="icon"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={mail} alt="botão mensagens" />
            </span>
          </Button>
          {/* <NavbarNotifications /> */}
          <Button
            onClick={() =>
              toast.warn("Funcionalidade de favoritos em desenvolvimento")
            }
            className="btn btn-light navbar-buttons"
          >
            <span
              className="icon"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={favourite} alt="botão favoritos" />
            </span>
          </Button>
          <Dropdown
            onMouseOver={() => setShowUserDropdown(true)}
            onMouseLeave={() =>
              setTimeout(() => setShowUserDropdown(false), 200)
            }
            show={showUserDropdown}
            className="dropdown-icon"
            id="dropdown-navbar"
          >
            <Dropdown.Toggle variant="basic" id="dropdown-basic-3">
              <span className="user-info">
                <i className="bi bi-door-open" style={{ marginRight: 10 }}></i>
                {user.name}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div
                className="dropdown-content"
                style={{ position: "relative" }}
              >
                <img
                  src={userImage}
                  style={{ width: "40px", height: "40px", borderRadius: 50 }}
                />
                <Dropdown.Item className="dropdown-button" onClick={logout}>
                  Sair
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div
        className="navbar-ribbon-wrapper"
        onMouseEnter={handleRibbonMouseEnter}
        onMouseLeave={handleRibbonMouseLeave}
        onTouchStart={handleRibbonMouseEnter}
        onTouchEnd={handleRibbonMouseLeave}
      >
        {showNclockRibbon &&
          enabledSoftware["nclock"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nclock"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="nclock-tab"
              >
                <div
                  className={`section ${
                    showNclockRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nclock") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nclock/nclockdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas mt-2 ${
                              currentRoute === "/nclock/nclockdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nclock")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "movimentos nclock") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nclock/nclockmovement"
                            onClick={() =>
                              fetchAllAttendances({
                                filterFunc: (data) =>
                                  data.filter((att) => att.type !== 3),
                              })
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nclock/nclockmovement"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-user-time"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Assiduidade</span>
                          </Link>
                        </div>
                        <div>
                          <Link
                            to="/nclock/nclockpresence"
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nclock/nclockpresence"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-team-check-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Presenças</span>
                          </Link>
                          <Link
                            to="/nclock/nclockrequests"
                            onClick={() =>
                              fetchAllAttendances({
                                filterFunc: (data) =>
                                  data.filter((att) => att.type === 3),
                              })
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nclock/nclockrequests"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-replace"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Alterações</span>
                          </Link>
                          <Link
                            to="/nclock/nclockall"
                            onClick={() => fetchAllAttendances()}
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nclock/nclockall"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-line-up"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Totais</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("movimentos nclock")}
                    >
                      <span className="title">Movimentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "movimentos acessos nclock") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container-entidades">
                          <Link
                            to="/nclock/nclockaccess"
                            type="button"
                            onClick={() =>
                              fetchAllInitialAccessesbyDevice(
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nclock/nclockaccess"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-exit-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Acessos</span>
                          </Link>
                          <Link
                            to="/nclock/nclockaccesspresence"
                            type="button"
                            onClick={() => fetchAllAccessesbyDevice()}
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nclock/nclockaccesspresence"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-team-check-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Presenças</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("movimentos acessos nclock")
                      }
                    >
                      <span className="title">Movimentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "trabalho nclock") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-growth"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Resultados</span>
                          </Button>
                        </div>
                        <div className="grid-container" style={{ width: 240 }}>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-refresh"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Atualizações</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-time-quarter-to"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Segmentos</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-plus-minus"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Compensações</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-battery-three-quarters"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Acumulados</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-hourglass-end"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Banco de Horas</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-time-add"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Horas Extras</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("trabalho nclock")}
                    >
                      <span className="title">Trabalho</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "parametrizacoes nclock") && (
                      <div className="btn-group" role="group">
                        <div
                          className="grid-container-entidades"
                          style={{ width: 120 }}
                        >
                          <Link
                            to="/nclock/nclocktime"
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nclock/nclocktime"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-time-check"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Definir Horários</span>
                          </Link>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-master-plan"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span className="text">Definir Planos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("parametrizacoes nclock")
                      }
                    >
                      <span className="title">Parametrizações</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "codigos trabalho nclock") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container" style={{ width: 250 }}>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ban"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Ausências</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-interrogation"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Indefinido</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-briefcase"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Normal</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-add"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Extraordinário</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-limit-speedometer"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Tolerâncias</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-back-up"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Banco de Horas</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-rules-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Regras</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("codigos trabalho nclock")
                      }
                    >
                      <span className="title">Códigos Trabalho</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "alteracoes codigos nclock") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-doctor"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Ausências</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-umbrella-beach"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Férias</span>
                          </Button>
                        </div>
                        <div style={{ width: 130 }}>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calendar"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Alterações</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-suitcase-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Feriados</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-list-check"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Validações</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("alteracoes codigos nclock")
                      }
                    >
                      <span className="title">Alterações Códigos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "escalas nclock") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calendar"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Calendário</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-time-quarter-past"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Segmentada</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calendar-lines"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Mensal</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-exchange-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Trocas</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-person-circle-question"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Disponível</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-map-location-track"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Planos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("escalas nclock")}
                    >
                      <span className="title">Escalas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nclock") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-informacoes">
                          <Link
                            to="/nclock/nclockalerts"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nclock/nclockalerts"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nclock")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nclock") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-informacoes">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ position: "relative", padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListingNClock).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListingNClock
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-informacoes">
                          <Link
                            to="/nclock/nclockgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nclock/nclockgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nclock")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nclock") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-informacoes">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nclock")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nclock") && (
                      <div className="btn-group" role="group">
                        <div
                          className="icon-text-informacoes"
                          style={{ marginTop: 13 }}
                        >
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-entidades ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nclock")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNaccessRibbon &&
          enabledSoftware["naccess"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "naccess"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="naccess"
                role="tabpanel"
                aria-labelledby="naccess-tab"
              >
                <div
                  className={`section ${
                    showNaccessRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio naccess") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/naccess/naccessdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/naccess/naccessdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio naccess")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "movimentos naccess") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/naccess/naccessaccesses"
                            onClick={() =>
                              fetchAllInitialAccessesbyDevice(
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/naccess/naccessaccesses"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-exit-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Acessos</span>
                          </Link>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/naccess/naccesspresence"
                            onClick={() => fetchAllAccessesbyDevice()}
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/naccess/naccesspresence"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-team-check-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Presenças</span>
                          </Link>
                        </div>
                        <div>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-chart-line-up"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Totais</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lesson-class"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Formações</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/naccess/naccessvisitors"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/naccess/naccessvisitors"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-users-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Visitantes</span>
                          </Link>
                        </div>
                        <div>
                          <Link
                            to="/naccess/naccessmotive"
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/naccess/naccessmotive"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-question-square"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Motivos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("movimentos naccess")
                      }
                    >
                      <span className="title">Movimentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "remota naccess") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-digital-tachograph"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Video Porteiro</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/naccess/naccessdooropen"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/naccess/naccessdooropen"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-door-open"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Abertura Manual</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("remota naccess")}
                    >
                      <span className="title">Remota</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "analise naccess") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-analyse"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Revistas</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-car-journey"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("analise naccess")}
                    >
                      <span className="title">Análise</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracao naccess") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-download"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Importar</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-settings-sliders"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão de Planos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracao naccess")
                      }
                    >
                      <span className="title">Configuração</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas naccess") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/naccess/naccessalerts"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/naccess/naccessalerts"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas naccess")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio naccess") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListingNAccess).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListingNAccess
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/naccess/naccessgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/naccess/naccessgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio naccess")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos naccess") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos naccess")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes naccess") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes naccess")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNvisitorRibbon &&
          enabledSoftware["nvisitor"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nvisitor"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nvisitor"
                role="tabpanel"
                aria-labelledby="nvisitor-tab"
              >
                <div
                  className={`section ${
                    showNvisitorRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nvisitor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nvisitor/nvisitordashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nvisitor/nvisitordashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nvisitor")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "movimentos nvisitor") && (
                      <div className="btn-group" role="group">
                        <div
                          className="grid-container"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Link
                            to="/nvisitor/nvisitormovecard"
                            onClick={() =>
                              fetchAllMoveCard(
                                undefined,
                                "3",
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nvisitor/nvisitormovecard"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-walking"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Torniquete</span>
                          </Link>
                          <Link
                            to="/nvisitor/nvisitormovekiosk"
                            onClick={() =>
                              fetchAllMoveKiosk(
                                undefined,
                                "4",
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nvisitor/nvisitormovekiosk"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-door-closed"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Quiosque</span>
                          </Link>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nvisitor/nvisitorlistmovements"
                            onClick={() =>
                              fetchAllCardAndKiosk(
                                ["3", "4"],
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nvisitor/nvisitorlistmovements"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-line-up"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Totais</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("movimentos nvisitor")
                      }
                    >
                      <span className="title">Movimentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "movimentos nvisitor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nvisitor/nvisitoraccess"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nvisitor/nvisitoraccess"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-exit-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Acessos</span>
                          </Link>
                        </div>
                        <div
                          className="grid-container"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Link
                            to="/nvisitor/nvisitoraccesspresence"
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute ===
                              "/nvisitor/nvisitoraccesspresence"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-team-check-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Presenças</span>
                          </Link>
                          <Link
                            to="/nvisitor/nvisitorvisitors"
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nvisitor/nvisitorvisitors"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-users-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Visitantes</span>
                          </Link>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nvisitor/nvisitoraccess"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nvisitor/nvisitoraccess"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-line-up"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Totais</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("movimentos nvisitor")
                      }
                    >
                      <span className="title">Acessos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "marcacoes nvisitor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nvisitor/nvisitormotive"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nvisitor/nvisitormotive"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-question-square"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Motivos</span>
                          </Link>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("marcacoes nvisitor")
                      }
                    >
                      <span className="title">Marcações</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nvisitor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nvisitor/nvisitoralerts"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nvisitor/nvisitoralerts"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nvisitor")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nvisitor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListingNVisitor).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListingNVisitor
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nvisitor/nvisitorgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nvisitor/nvisitorgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nvisitor")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nvisitor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nvisitor")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nvisitor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nvisitor")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNparkRibbon &&
          enabledSoftware["npark"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "npark")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="npark"
                role="tabpanel"
                aria-labelledby="npark-tab"
              >
                <div
                  className={`section ${
                    showNparkRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio npark") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/npark/nparkdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/npark/nparkdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio npark")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "recebimentos npark") && (
                      <div className="btn-group" role="group">
                        <div
                          className="grid-container"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-credit-card"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Multibanco</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-coins"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Moedeiro</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-chart-line-up"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Totais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("recebimentos npark")
                      }
                    >
                      <span className="title">Recebimentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "movimentos npark") && (
                      <div className="btn-group" role="group">
                        <div
                          className="grid-container"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-traffic-light-stop"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Barreiras</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-cash-register"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Caixa Pagamentos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-chart-line-up"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Totais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("movimentos npark")}
                    >
                      <span className="title">Movimentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "veiculos npark") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-car-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Viaturas</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-exit-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Movimentos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("veiculos npark")}
                    >
                      <span className="title">Veículos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "analise npark") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-analyse"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Revistas</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-car-journey"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("analise npark")}
                    >
                      <span className="title">Análise</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas npark") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas npark")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio npark") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/npark/nparkgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/npark/nparkgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio npark")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos npark") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos npark")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes npark") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes npark")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNdoorRibbon &&
          enabledSoftware["ndoor"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "ndoor")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ndoor"
                role="tabpanel"
                aria-labelledby="ndoor-tab"
              >
                <div
                  className={`section ${
                    showNdoorRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ndoor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ndoor/ndoordashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ndoor/ndoordashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ndoor")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "movimentos ndoor") && (
                      <div className="btn-group" role="group">
                        <div
                          className="grid-container"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-door-open"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Porta Entrada</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bed"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Porta Quarto</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-chart-line-up"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Totais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("movimentos ndoor")}
                    >
                      <span className="title">Movimentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "marcacoes ndoor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-leave"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Entrada e Saída</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-reservation-table"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Reservas Online</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("marcacoes ndoor")}
                    >
                      <span className="title">Marcações</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ndoor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ndoor")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ndoor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ndoor/ndoorgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ndoor/ndoorgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ndoor")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ndoor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ndoor")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ndoor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ndoor")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNpatrolRibbon &&
          enabledSoftware["npatrol"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "npatrol"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="npatrol"
                role="tabpanel"
                aria-labelledby="npatrol-tab"
              >
                <div
                  className={`section ${
                    showNpatrolRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio npatrol") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/npatrol/npatroldashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/npatrol/npatroldashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio npatrol")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "registos npatrol") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-user-police"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Movimentos Rondas</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-chart-histogram"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Análise Movimentos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("registos npatrol")}
                    >
                      <span className="title">Registos Rondas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "marcacoes npatrol") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-time-watch-calendar"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Definir Horários</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-route"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Definir Rotas</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("marcacoes npatrol")}
                    >
                      <span className="title">Parametrizações</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas npatrol") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas npatrol")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio npatrol") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/npatrol/npatrolgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/npatrol/npatrolgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio npatrol")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos npatrol") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos npatrol")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes npatrol") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes npatrol")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNcardRibbon &&
          enabledSoftware["ncard"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "ncard")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ncard"
                role="tabpanel"
                aria-labelledby="ncard-tab"
              >
                <div
                  className={`section ${
                    showNcardRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ncard") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncard/ncarddashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncard/ncarddashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ncard")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "registo ncard") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-rectangle-list"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Movimentos Pontos</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-chart-histogram"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Análise Movimentos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("registo ncard")}
                    >
                      <span className="title">Registos Pontos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ncard") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ncard")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ncard") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncard/ncardgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncard/ncardgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ncard")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ncard") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowCardDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowCardDropdown(false);
                              }, 100)
                            }
                            show={showCardDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-grid"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span className="text">Opcionais</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div>
                                {Object.keys(KioskOptionalMenuStructure).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        KioskOptionalMenuStructure
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ncard")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ncard") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ncard")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNviewRibbon &&
          enabledSoftware["nview"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "nview")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nview"
                role="tabpanel"
                aria-labelledby="nview-tab"
              >
                <div
                  className={`section ${
                    showNviewRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nview") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nview/nviewdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nview/nviewdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nview")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "videovigilancia nview") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nview/nviewonlinecameras"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nview/nviewonlinecameras"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-wifi"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Online</span>
                          </Link>
                        </div>
                        <div>
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-wifi-slash"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Offline</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("videovigilancia nview")
                      }
                    >
                      <span className="title">Videovigilância</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nview") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nview/nviewalerts"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nview/nviewalerts"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nview")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nview") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nview/nviewgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nview/nviewgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nview")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nview") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nview")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nview") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nview")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNsecurRibbon &&
          enabledSoftware["nsecur"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nsecur"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nsecur"
                role="tabpanel"
                aria-labelledby="nsecur-tab"
              >
                <div
                  className={`section ${
                    showNsecurRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nsecur") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsecur/nsecurdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsecur/nsecurdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nsecur")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alarmes nsecur") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-light-emergency-on"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Intrusão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-split"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Divisões</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tablet-android"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Dispositivos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alarmes nsecur")}
                    >
                      <span className="title">Alarmes</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "notificacoes nsecur") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-exit-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Movimentos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-envelope-dot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Registos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("notificacoes nsecur")
                      }
                    >
                      <span className="title">Notificações</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "comando nsecur") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lock"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Armar</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-unlock"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Desarmar</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell-school"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Pânico</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-moon-stars"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Noturno</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("comando nsecur")}
                    >
                      <span className="title">Comando</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nsecur") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nsecur")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nsecur") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsecur/nsecurgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsecur/nsecurgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nsecur")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nsecur") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nsecur")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nsecur") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nsecur")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNsoftwareRibbon &&
          enabledSoftware["nsoftware"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nsoftware"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nsoftware"
                role="tabpanel"
                aria-labelledby="nsoftware-tab"
              >
                <div
                  className={`section ${
                    showNsoftwareRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nsoftware") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsoftware/nsoftwaredashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nsoftware/nsoftwaredashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nsoftware")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "desenvolvimento nsoftware") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-add-document"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Criação</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-url"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Optimização</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-balance-scale-left"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Rentabilização</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("desenvolvimento nsoftware")
                      }
                    >
                      <span className="title">Desenvolvimento</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nsoftware") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nsoftware")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nsoftware") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsoftware/nsoftwaregraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsoftware/nsoftwaregraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nsoftware")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nsoftware") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nsoftware")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nsoftware") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nsoftware")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNsystemRibbon &&
          enabledSoftware["nsystem"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nsystem"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nsystem"
                role="tabpanel"
                aria-labelledby="nsystem-tab"
              >
                <div
                  className={`section ${
                    showNsystemRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nsystem") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsystem/nsystemdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nsystem/nsystemdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nsystem")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "sistemas nsystem") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-parking-circle"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Parqueamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("sistemas nsystem")}
                    >
                      <span className="title">Sistemas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "informacao nsystem") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-master-plan-integrate"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Integração</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-workflow-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Fluxo</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-settings-sliders"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Controlo</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("informacao nsystem")
                      }
                    >
                      <span className="title">Informação</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nsystem") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nsystem")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nsystem") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsystem/nsystemgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsystem/nsystemgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nsystem")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nsystem") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nsystem")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nsystem") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nsystem")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNappRibbon &&
          enabledSoftware["napp"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "napp")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="napp"
                role="tabpanel"
                aria-labelledby="napp-tab"
              >
                <div
                  className={`section ${showNappRibbon ? "visible" : "hidden"}`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio napp") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/napp/nappdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/napp/nappdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio napp")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "aplicativos napp") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-exit-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Acessos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("aplicativos napp")}
                    >
                      <span className="title">Aplicativos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas napp") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas napp")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio napp") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/napp/nappgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/napp/nappgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio napp")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos napp") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos napp")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes napp") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes napp")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNcyberRibbon &&
          enabledSoftware["ncyber"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "ncyber"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ncyber"
                role="tabpanel"
                aria-labelledby="ncyber-tab"
              >
                <div
                  className={`section ${
                    showNcyberRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ncyber") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncyber/ncyberdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncyber/ncyberdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ncyber")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "cibernetica ncyber") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-padlock-check"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Segurança</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-shield-check"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Proteção Dados</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-sitemap"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Dados Redes</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-pharmacy"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Recuperação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("cibernetica ncyber")
                      }
                    >
                      <span className="title">Cibernética</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ncyber") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ncyber")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ncyber") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncyber/ncybergraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncyber/ncybergraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ncyber")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ncyber") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ncyber")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ncyber") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ncyber")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNdigitalRibbon &&
          enabledSoftware["ndigital"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "ndigital"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ndigital"
                role="tabpanel"
                aria-labelledby="ndigital-tab"
              >
                <div
                  className={`section ${
                    showNdigitalRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ndigital") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ndigital/ndigitaldashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/ndigital/ndigitaldashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ndigital")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "transformacao ndigital") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-clock-up-arrow"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Eficiência</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-settings-sliders"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Controlo</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-talent-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Vantagens</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-code-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Simplificar</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("transformacao ndigital")
                      }
                    >
                      <span className="title">Transformação</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ndigital") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ndigital")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ndigital") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ndigital/ndigitalgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ndigital/ndigitalgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio ndigital")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ndigital") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ndigital")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes ndigital") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ndigital")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNserverRibbon &&
          enabledSoftware["nserver"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nserver"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nserver"
                role="tabpanel"
                aria-labelledby="nserver-tab"
              >
                <div
                  className={`section ${
                    showNserverRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nserver") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nserver/nserverdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nserver/nserverdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nserver")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "integracao nserver") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot-check"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Conversão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-robotic-arm"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Automatização</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-pulse"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Monotorização</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("integracao nserver")
                      }
                    >
                      <span className="title">Integração</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nserver") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nserver")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nserver") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nserver/nservergraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nserver/nservergraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nserver")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nserver") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nserver")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nserver") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nserver")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNautRibbon &&
          enabledSoftware["naut"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "naut")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="naut"
                role="tabpanel"
                aria-labelledby="naut-tab"
              >
                <div
                  className={`section ${showNautRibbon ? "visible" : "hidden"}`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio naut") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/naut/nautdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/naut/nautdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio naut")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "integracao naut") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-microchip"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Hardware</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-display-code"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Firmware</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("integracao naut")}
                    >
                      <span className="title">Integração</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas naut") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas naut")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio naut") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/naut/nautgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/naut/nautgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio naut")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos naut") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos naut")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes naut") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes naut")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNequipRibbon &&
          enabledSoftware["nequip"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nequip"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nequip"
                role="tabpanel"
                aria-labelledby="nequip-tab"
              >
                <div
                  className={`section ${
                    showNequipRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nequip") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nequip/nequipdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nequip/nequipdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nequip")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "equipamentos nequip") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-it-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Manutenção</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-users-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Visitas</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-multiple-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Contratos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("equipamentos nequip")
                      }
                    >
                      <span className="title">Equipamentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "gestao nequip") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-broken-chain-link-wrong"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avarias</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot-check"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Substituições</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-curve-arrow"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Análises</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-overview"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Monitorizar</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("gestao nequip")}
                    >
                      <span className="title">Gestão</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "planeamento nequip") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calendar-lines"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Mensal</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calendar-days"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Anual</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("planeamento nequip")
                      }
                    >
                      <span className="title">Planeamento</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nequip") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nequip")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nequip") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nequip/nequipgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nequip/nequipgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nequip")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nequip") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nequip")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nequip") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nequip")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNprojectRibbon &&
          enabledSoftware["nproject"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nproject"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nproject"
                role="tabpanel"
                aria-labelledby="nproject-tab"
              >
                <div
                  className={`section ${
                    showNprojectRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nproject") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nproject/nprojectdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nproject/nprojectdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nproject")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "projetos nproject") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-module"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Produção</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-operation"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Processos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-condition-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Realização</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-duration-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Estimativa</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("projetos nproject")}
                    >
                      <span className="title">Projetos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nproject") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nproject")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nproject") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nproject/nprojectgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nproject/nprojectgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nproject")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nproject") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nproject")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nproject") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nproject")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNcountRibbon &&
          enabledSoftware["ncount"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "ncount"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ncount"
                role="tabpanel"
                aria-labelledby="ncount-tab"
              >
                <div
                  className={`section ${
                    showNcountRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ncount") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncount/ncountdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncount/ncountdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ncount")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "contador ncount") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-users-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Contador Pessoas</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-summary-check"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Resumo Diário</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-system-cloud"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Tempo Real</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-time-fast"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Hora de Pico</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("contador ncount")}
                    >
                      <span className="title">Contador</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "optimizacao ncount") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-users"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Equipas Trabalho</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-gears"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Ajuste Equipas</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("optimizacao ncount")
                      }
                    >
                      <span className="title">Optimização</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "conversao ncount") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-growth-chart-invest"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Vendas</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("conversao ncount")}
                    >
                      <span className="title">Conversão</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ncount") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ncount")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ncount") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncount/ncountgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncount/ncountgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ncount")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ncount") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ncount")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ncount") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ncount")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNbuildRibbon &&
          enabledSoftware["nbuild"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nbuild"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nbuild"
                role="tabpanel"
                aria-labelledby="nbuild-tab"
              >
                <div
                  className={`section ${
                    showNbuildRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nbuild") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nbuild/nbuilddashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nbuild/nbuilddashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nbuild")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "obras nbuild") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-to-do"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Registar</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-dial"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Controlar</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-digging"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Produzir</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gerir</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("obras nbuild")}
                    >
                      <span className="title">Obras</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nbuild") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nbuild")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nbuild") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nbuild/nbuildgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nbuild/nbuildgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nbuild")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nbuild") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nbuild")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nbuild") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nbuild")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNcaravanRibbon &&
          enabledSoftware["ncaravan"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "ncaravan"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ncaravan"
                role="tabpanel"
                aria-labelledby="ncaravan-tab"
              >
                <div
                  className={`section ${
                    showNcaravanRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ncaravan") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncaravan/ncaravandashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/ncaravan/ncaravandashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ncaravan")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "autocaravanas ncaravan") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-parking-circle"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Parqueamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("autocaravanas ncaravan")
                      }
                    >
                      <span className="title">Autocaravanas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ncaravan") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ncaravan")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ncaravan") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncaravan/ncaravangraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncaravan/ncaravangraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio ncaravan")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ncaravan") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ncaravan")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes ncaravan") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ncaravan")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNmechanicRibbon &&
          enabledSoftware["nmechanic"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nmechanic"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nmechanic"
                role="tabpanel"
                aria-labelledby="nmechanic-tab"
              >
                <div
                  className={`section ${
                    showNmechanicRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nmechanic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nmechanic/nmechanicdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nmechanic/nmechanicdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nmechanic")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "oficinas nmechanic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("oficinas nmechanic")
                      }
                    >
                      <span className="title">Oficinas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nmechanic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nmechanic")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nmechanic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nmechanic/nmechanicgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nmechanic/nmechanicgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nmechanic")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nmechanic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nmechanic")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nmechanic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nmechanic")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNeventsRibbon &&
          enabledSoftware["nevents"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nevents"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nevents"
                role="tabpanel"
                aria-labelledby="nevents-tab"
              >
                <div
                  className={`section ${
                    showNeventsRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nevents") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nevents/neventsdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nevents/neventsdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nevents")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "eventos nevents") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("eventos nevents")}
                    >
                      <span className="title">Eventos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nevents") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nevents")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nevents") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nevents/neventsgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nevents/neventsgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nevents")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nevents") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nevents")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nevents") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nevents")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNserviceRibbon &&
          enabledSoftware["nservice"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nservice"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nservice"
                role="tabpanel"
                aria-labelledby="nservice-tab"
              >
                <div
                  className={`section ${
                    showNserviceRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nservice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nservice/nservicedashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nservice/nservicedashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nservice")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "servicos nservice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("servicos nservice")}
                    >
                      <span className="title">Serviços</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nservice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nservice")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nservice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nservice/nservicegraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nservice/nservicegraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nservice")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nservice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nservice")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nservice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nservice")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNtaskRibbon &&
          enabledSoftware["ntask"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "ntask")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ntask"
                role="tabpanel"
                aria-labelledby="ntask-tab"
              >
                <div
                  className={`section ${
                    showNtaskRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ntask") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ntask/ntaskdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ntask/ntaskdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ntask")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "tarefas ntask") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("tarefas ntask")}
                    >
                      <span className="title">Tarefas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ntask") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ntask")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ntask") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ntask/ntaskgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ntask/ntaskgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ntask")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ntask") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowTaskDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowTaskDropdown(false);
                              }, 100)
                            }
                            show={showTaskDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-grid"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span className="text">Opcionais</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div>
                                {Object.keys(TaskOptionalMenuStructure).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        TaskOptionalMenuStructure
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ntask")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ntask") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ntask")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNproductionRibbon &&
          enabledSoftware["nproduction"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nproduction"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nproduction"
                role="tabpanel"
                aria-labelledby="nproduction-tab"
              >
                <div
                  className={`section ${
                    showNproductionRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nproduction") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nproduction/nproductiondashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nproduction/nproductiondashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("inicio nproduction")
                      }
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "proeducao nproduction") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("producao nproduction")
                      }
                    >
                      <span className="title">Produção</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nproduction") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("alertas nproduction")
                      }
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "relatorio nproduction") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nproduction/nproductiongraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nproduction/nproductiongraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nproduction")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nproduction") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("modulos nproduction")
                      }
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nproduction") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nproduction")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNticketRibbon &&
          enabledSoftware["nticket"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nticket"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nticket"
                role="tabpanel"
                aria-labelledby="nticket-tab"
              >
                <div
                  className={`section ${
                    showNticketRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nticket") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nticket/nticketdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nticket/nticketdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nticket")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "bilhetes nticket") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ticket"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Emitir</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-print"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Imprimir</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("bilhetes nticket")}
                    >
                      <span className="title">Bilhetes</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nticket") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nticket")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nticket") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nticket/nticketgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nticket/nticketgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nticket")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nticket") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nticket")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nticket") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nticket")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNsalesRibbon &&
          enabledSoftware["nsales"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nsales"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nsales"
                role="tabpanel"
                aria-labelledby="nsales-tab"
              >
                <div
                  className={`section ${
                    showNsalesRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nsales") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsales/nsalesdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsales/nsalesdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nsales")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "comercial nsales") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("comercial nsales")}
                    >
                      <span className="title">Comercial</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nsales") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nsales")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nsales") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsales/nsalesgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsales/nsalesgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nsales")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nsales") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nsales")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nsales") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nsales")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNinvoiceRibbon &&
          enabledSoftware["ninvoice"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "ninvoice"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ninvoice"
                role="tabpanel"
                aria-labelledby="ninvoice-tab"
              >
                <div
                  className={`section ${
                    showNinvoiceRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ninvoice/ninvoicedashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas mt-2 ${
                              currentRoute ===
                              "/ninvoice/ninvoicedashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ninvoice")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "empresa ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Employees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-users-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Clientes</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Visitors"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-industry-windows"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Fornecedores</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/ExternalEmployees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-corporate"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Entidades</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Contacts"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-brand"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Produtos</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/User"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-exchange-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Exportações</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("empresa ninvoice")}
                    >
                      <span className="title">Empresa</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "vendas ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Employees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calculator-bill"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Faturas</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Visitors"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-document-paid"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Notas Crédito</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/ExternalEmployees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-receipt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Recibos</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Contacts"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-handshake"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Avenças</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/User"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-airplane-journey"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Guia Transporte</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("vendas ninvoice")}
                    >
                      <span className="title">Vendas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "compras ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Employees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calculator-bill"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Faturas</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Visitors"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-document-paid"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Notas Crédito</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/ExternalEmployees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-piggy-bank"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Pagamentos</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Contacts"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-hand-bill"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>E-fatura</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/User"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-airplane-journey"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Guia Transporte</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("compras ninvoice")}
                    >
                      <span className="title">Compras</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "bancos ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Employees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-portrait"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Contas</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Visitors"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calculator-money"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Contabilidade</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/ExternalEmployees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-point-of-sale-bill"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Extratos</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Contacts"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-handshake"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Reconciliações</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/User"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-exclamation"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Posição</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("bancos ninvoice")}
                    >
                      <span className="title">Bancos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "salarios ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Employees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-users-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Pessoal</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Visitors"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-umbrella-beach"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Mapa Férias</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/ExternalEmployees"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-coins"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Vencimentos</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/Contacts"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-users"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Organigrama</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/persons/User"
                                ? "current-active"
                                : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-memo-circle-check"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Abonos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("salarios ninvoice")}
                    >
                      <span className="title">Salários</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ninvoice")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas mt-2"
                              id="dropdown-basic-4"
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ninvoice/ninvoicegraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas mt-2 ${
                              currentRoute === "/ninvoice/ninvoicegraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio ninvoice")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ninvoice")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes ninvoice") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ninvoice")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNdocRibbon &&
          enabledSoftware["ndoc"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "ndoc")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ndoc"
                role="tabpanel"
                aria-labelledby="ndoc-tab"
              >
                <div
                  className={`section ${showNdocRibbon ? "visible" : "hidden"}`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ndoc") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ndoc/ndocdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ndoc/ndocdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ndoc")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "gestao ndoc") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-folder"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Pastas/Subpastas</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-process"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Processos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-books"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Arquivo Geral</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-remove-folder"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Arquivo Morto</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("gestao ndoc")}
                    >
                      <span className="title">Gestão</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "documentos ndoc") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="i fi-rr-folder-tree"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Arquivo Digital</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-workflow-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Workflow</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-cars"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Trânsito</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("documentos ndoc")}
                    >
                      <span className="title">Documentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "consulta ndoc") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-cursor"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Consulta Online</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-overview"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Visualização Rápida</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-corporate"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Entidades</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("consulta ndoc")}
                    >
                      <span className="title">Consulta</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ndoc") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ndoc")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ndoc") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ndoc/ndocgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ndoc/ndocgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ndoc")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ndoc") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ndoc")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ndoc") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ndoc")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNsportsRibbon &&
          enabledSoftware["nsports"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nsports"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nsports"
                role="tabpanel"
                aria-labelledby="nsports-tab"
              >
                <div
                  className={`section ${
                    showNsportsRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nsports") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsports/nsportsdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nsports/nsportsdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nsports")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "desporto nsports") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("desporto nsports")}
                    >
                      <span className="title">Desporto</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nsports") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nsports")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nsports") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsports/nsportsgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsports/nsportsgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nsports")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nsports") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nsports")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nsports") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nsports")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNgymRibbon &&
          enabledSoftware["ngym"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "ngym")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ngym"
                role="tabpanel"
                aria-labelledby="ngym-tab"
              >
                <div
                  className={`section ${showNgymRibbon ? "visible" : "hidden"}`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ngym") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ngym/ngymdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ngym/ngymdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ngym")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "ginasio ngym") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("ginasio ngym")}
                    >
                      <span className="title">Ginásio</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ngym") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ngym")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ngym") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ngym/ngymgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ngym/ngymgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ngym")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ngym") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ngym")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ngym") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ngym")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNschoolRibbon &&
          enabledSoftware["nschool"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nschool"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nschool"
                role="tabpanel"
                aria-labelledby="nschool-tab"
              >
                <div
                  className={`section ${
                    showNschoolRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nschool") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nschool/nschooldashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nschool/nschooldashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nschool")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "escolar nschool") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("escolar nschool")}
                    >
                      <span className="title">Escolar</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nschool") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nschool")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nschool") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nschool/nschoolgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nschool/nschoolgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nschool")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nschool") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nschool")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nschool") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nschool")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNclinicRibbon &&
          enabledSoftware["nclinic"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nclinic"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nclinic"
                role="tabpanel"
                aria-labelledby="nclinic-tab"
              >
                <div
                  className={`section ${
                    showNclinicRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nclinic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nclinic/nclinicdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nclinic/nclinicdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nclinic")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "clinicas nclinic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("clinicas nclinic")}
                    >
                      <span className="title">Clínicas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nclinic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nclinic")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nclinic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nclinic/nclinicgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nclinic/nclinicgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nclinic")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nclinic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nclinic")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nclinic") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nclinic")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNopticsRibbon &&
          enabledSoftware["noptics"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "noptics"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="noptics"
                role="tabpanel"
                aria-labelledby="noptics-tab"
              >
                <div
                  className={`section ${
                    showNopticsRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio noptics") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/noptics/nopticsdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/noptics/nopticsdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio noptics")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "opticas noptics") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("opticas noptics")}
                    >
                      <span className="title">Ópticas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas noptics") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas noptics")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio noptics") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/noptics/nopticsgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/noptics/nopticsgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio noptics")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos noptics") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos noptics")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes noptics") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes noptics")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNgoldRibbon &&
          enabledSoftware["ngold"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "ngold")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ngold"
                role="tabpanel"
                aria-labelledby="ngold-tab"
              >
                <div
                  className={`section ${
                    showNgoldRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ngold") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ngold/ngolddashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ngold/ngolddashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ngold")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "ourivesaria ngold") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-lead-management"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-career-path"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Planeamento</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("ourivesaria ngold")}
                    >
                      <span className="title">Ourivesaria</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ngold") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ngold")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ngold") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ngold/ngoldgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ngold/ngoldgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ngold")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ngold") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ngold")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ngold") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ngold")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNsmartRibbon &&
          enabledSoftware["nsmart"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nsmart"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nsmart"
                role="tabpanel"
                aria-labelledby="nsmart-tab"
              >
                <div
                  className={`section ${
                    showNsmartRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nsmart") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsmart/nsmartdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsmart/nsmartdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nsmart")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "inteligencia nsmart") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-wifi-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Tempo Real</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-map-marker"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Localização</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-overview"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Monitorização</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("inteligencia nsmart")
                      }
                    >
                      <span className="title">Inteligência</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nsmart") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nsmart")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nsmart") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsmart/nsmartgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsmart/nsmartgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nsmart")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nsmart") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nsmart")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nsmart") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nsmart")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNrealityRibbon &&
          enabledSoftware["nreality"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nreality"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nreality"
                role="tabpanel"
                aria-labelledby="nreality-tab"
              >
                <div
                  className={`section ${
                    showNrealityRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nreality") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nreality/nrealitydashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nreality/nrealitydashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nreality")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "virtual nreality") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-head-vr"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span className="text">Simulação</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("virtual nreality")}
                    >
                      <span className="title">Virtual</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nreality") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nreality")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nreality") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nreality/nrealitygraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nreality/nrealitygraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nreality")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nreality") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nreality")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nreality") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nreality")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNhologramRibbon &&
          enabledSoftware["nhologram"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nhologram"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nhologram"
                role="tabpanel"
                aria-labelledby="nhologram-tab"
              >
                <div
                  className={`section ${
                    showNhologramRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nhologram") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nhologram/nhologramdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nhologram/nhologramdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nhologram")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "hologramas nhologram") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-picture"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Imagens</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-play-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Vídeos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("hologramas nhologram")
                      }
                    >
                      <span className="title">Hologramas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nhologram") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nhologram")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nhologram") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nhologram/nhologramgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nhologram/nhologramgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nhologram")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nhologram") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nhologram")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nhologram") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nhologram")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNpowerRibbon &&
          enabledSoftware["npower"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "npower"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="npower"
                role="tabpanel"
                aria-labelledby="npower-tab"
              >
                <div
                  className={`section ${
                    showNpowerRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio npower") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/npower/npowerdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/npower/npowerdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio npower")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "energia npower") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bolt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Consumos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("energia npower")}
                    >
                      <span className="title">Energia</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "sistemas npower") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-wind-turbine"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Eólicos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-solar-panel-sun"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Solares</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-utility-pole-double"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Fisica</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("sistemas npower")}
                    >
                      <span className="title">Sistemas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "custos npower") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-hourglass-end"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Hora</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-clock"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Dia</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calendar"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Meses</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calendar-days"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Ano</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("custos npower")}
                    >
                      <span className="title">Custos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "poupança npower") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-plug-connection"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Energia</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-eco-electric"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Renovável</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-clock-future-past"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Horários</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("poupança npower")}
                    >
                      <span className="title">Poupança</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "equipamentos npower") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tally-1"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Monofásicos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tally-2"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Bifásicos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tally-3"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Trifásicos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("equipamentos npower")
                      }
                    >
                      <span className="title">Equipamentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas npower") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas npower")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio npower") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/npower/npowergraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/npower/npowergraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio npower")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos npower") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos npower")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes npower") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes npower")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNchargeRibbon &&
          enabledSoftware["ncharge"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "ncharge"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ncharge"
                role="tabpanel"
                aria-labelledby="ncharge-tab"
              >
                <div
                  className={`section ${
                    showNchargeRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ncharge") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncharge/nchargedashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/ncharge/nchargedashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ncharge")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "carregamentos ncharge") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-swap"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Movimentos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("carregamentos ncharge")
                      }
                    >
                      <span className="title">Carregamentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "custos ncharge") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot-check"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Registos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-curve-arrow"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Análises</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("custos ncharge")}
                    >
                      <span className="title">Custos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ncharge") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ncharge")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ncharge") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncharge/nchargegraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncharge/nchargegraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ncharge")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ncharge") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ncharge")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes ncharge") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ncharge")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNcityRibbon &&
          enabledSoftware["ncity"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "ncity")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ncity"
                role="tabpanel"
                aria-labelledby="ncity-tab"
              >
                <div
                  className={`section ${
                    showNcityRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncity/ncitydashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncity/ncitydashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ncity")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "mobilidade ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-car-alt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Veículo</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-clock-future-past"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Horário</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-calendar"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Calendário</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("mobilidade ncity")}
                    >
                      <span className="title">Mobilidade</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "gestão ncity") && (
                      <div className="btn-group" role="group">
                        <div className="grid-container">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-wifi"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Remota</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button mt-2 ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-completed"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Conteúdos</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-dashboard-monitor"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Interativa</span>
                          </Button>
                          <Button
                            /* to='#' */ type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-hand-key"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Aluguer</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("gestão ncity")}
                    >
                      <span className="title">Gestão</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "noticias ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-newspaper"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Artigos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-search"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Pesquisas</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-comment-pen"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Sugestões</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("noticias ncity")}
                    >
                      <span className="title">Notícias</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "pontos ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bank"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Museus</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-corporate"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Comércio</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Serviços</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("pontos ncity")}
                    >
                      <span className="title">Pontos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "informacoes ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-map-marker"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Mapas</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-subway"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Transportes</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-route"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Rotas</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("informacoes ncity")}
                    >
                      <span className="title">Informações</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ncity")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncity/ncitygraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncity/ncitygraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ncity")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ncity")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ncity")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNkioskRibbon &&
          enabledSoftware["nkiosk"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nkiosk"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nkiosk"
                role="tabpanel"
                aria-labelledby="nkiosk-tab"
              >
                <div
                  className={`section ${
                    showNkioskRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nkiosk") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkioskdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkioskdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nkiosk")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "recebimentos nkiosk") && (
                      <div className="btn-group" role="group">
                        <div
                          className="grid-container"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Link
                            to="/nkiosk/nkioskpayterminal"
                            onClick={() =>
                              fetchAllPayTerminal(
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nkiosk/nkioskpayterminal"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-credit-card"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Multibanco</span>
                          </Link>
                          <Link
                            to="/nkiosk/nkioskpaycoins"
                            onClick={() =>
                              fetchAllPayCoins(
                                "2",
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nkiosk/nkioskpaycoins"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-coins"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Moedeiro</span>
                          </Link>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkiosklistpayments"
                            onClick={() =>
                              fetchAllMBAndCoin(
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkiosklistpayments"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-line-up"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Totais</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("recebimentos nkiosk")
                      }
                    >
                      <span className="title">Recebimentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "movimentos nkiosk") && (
                      <div className="btn-group" role="group">
                        <div
                          className="grid-container"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Link
                            to="/nkiosk/nkioskmovecard"
                            onClick={() =>
                              fetchAllMoveCard(
                                undefined,
                                "3",
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nkiosk/nkioskmovecard"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-running"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Torniquete</span>
                          </Link>
                          <Link
                            to="/nkiosk/nkioskmovekiosk"
                            onClick={() =>
                              fetchAllMoveKiosk(
                                undefined,
                                "4",
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nkiosk/nkioskmovekiosk"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-door-closed"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Quiosque</span>
                          </Link>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkiosklistmovements"
                            onClick={() =>
                              fetchAllCardAndKiosk(
                                ["3", "4"],
                                undefined,
                                undefined,
                                undefined,
                                undefined,
                                "1",
                                "20"
                              )
                            }
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkiosklistmovements"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-line-up"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Totais</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("movimentos nkiosk")}
                    >
                      <span className="title">Movimentos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "remota nkiosk") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkioskmovevp"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkioskmovevp"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-digital-tachograph"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Video Porteiro</span>
                          </Link>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkioskdooropen"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkioskdooropen"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-door-open"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Abertura Manual</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("remota nkiosk")}
                    >
                      <span className="title">Remota</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "registos nkiosk") && (
                      <div className="btn-group" role="group">
                        <div
                          className="grid-container"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Link
                            to="/nkiosk/nkioskgetcoins"
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nkiosk/nkioskgetcoins"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-coins"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Recolha Moedas</span>
                          </Link>
                          <Link
                            to="/nkiosk/nkioskcleaning"
                            type="button"
                            className={`btn btn-light ribbon-button ${
                              currentRoute === "/nkiosk/nkioskcleaning"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-broom"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Limpeza Geral</span>
                          </Link>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkioskcounter"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkioskcounter"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-calculator-money"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Contador</span>
                          </Link>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkioskoccurrences"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkioskoccurrences"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-ballot-check"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Ocorrências</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("registos nkiosk")}
                    >
                      <span className="title">Registos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "zonas nkiosk") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkioskmap"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkioskmap"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-map-marker"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Mapa</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("zonas nkiosk")}
                    >
                      <span className="title">Zonas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nkiosk") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkioskalerts"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkioskalerts"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nkiosk")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nkiosk") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListingNKiosk).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListingNKiosk
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nkiosk/nkioskgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nkiosk/nkioskgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nkiosk")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nkiosk") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowKioskDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowKioskDropdown(false);
                              }, 100)
                            }
                            show={showKioskDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-grid"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span className="text">Opcionais</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div>
                                {Object.keys(KioskOptionalMenuStructure).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        KioskOptionalMenuStructure
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nkiosk")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "opcoes nkiosk") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            onClick={toggleKioskOptionsModal}
                            type="button"
                            className="btn btn-light ribbon-button ribbon-button-pessoas"
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("opcoes nkiosk")}
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNledRibbon &&
          enabledSoftware["nled"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "nled")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nled"
                role="tabpanel"
                aria-labelledby="nled-tab"
              >
                <div
                  className={`section ${showNledRibbon ? "visible" : "hidden"}`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nled") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nled/nleddashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nled/nleddashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nled")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "paineis ncity") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-desktop-wallpaper"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Leds</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("paineis ncity")}
                    >
                      <span className="title">Multimédia</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "anuncios nled") && (
                      <div className="btn-group" role="group">
                        <div
                          className="grid-container"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Button
                            onClick={toggleVideoAdsModal}
                            type="button"
                            className="btn btn-light ribbon-button"
                          >
                            <span
                              className="fi fi-rr-play-alt"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Vídeo</span>
                          </Button>
                          <Button
                            onClick={togglePhotoAdsModal}
                            type="button"
                            className="btn btn-light ribbon-button"
                          >
                            <span
                              className="fi fi-rr-picture"
                              style={{ fontSize: "1rem", marginRight: 5 }}
                            ></span>
                            <span>Imagem</span>
                          </Button>
                        </div>
                        <div>
                          <Link
                            to="/nled/nledads"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nled/nledads"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-ad"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Publicidade</span>
                          </Link>
                        </div>
                        <div>
                          <Button
                            /* to="" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("anuncios nled")}
                    >
                      <span className="title">Anúncios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nled") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nled/nledalerts"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nled/nledalerts"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nled")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nled") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nled/nledgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nled/nledgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nled")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nled") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nled")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nled") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nled")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNfireRibbon &&
          enabledSoftware["nfire"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "nfire")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nfire"
                role="tabpanel"
                aria-labelledby="nfire-tab"
              >
                <div
                  className={`section ${
                    showNfireRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nfire") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nfire/nfiredashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nfire/nfiredashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nfire")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "incêndio nfire") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-meter-fire"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Prevenção</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-fire-extinguisher"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Extinção</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("incêndio nfire")}
                    >
                      <span className="title">Incêndio</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nfire") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nfire")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nfire") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nfire/nfiregraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nfire/nfiregraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nfire")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nfire") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nfire")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nfire") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nfire")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNfurnitureRibbon &&
          enabledSoftware["nfurniture"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nfurniture"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nfurniture"
                role="tabpanel"
                aria-labelledby="nfurniture-tab"
              >
                <div
                  className={`section ${
                    showNfurnitureRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nfurniture") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nfurniture/nfurnituredashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nfurniture/nfurnituredashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nfurniture")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "mobiliario nfurniture") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-arrow-small-up"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Subir</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-arrow-small-down"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Descer</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("mobiliario nfurniture")
                      }
                    >
                      <span className="title">Mobiliário</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nfurniture") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("alertas nfurniture")
                      }
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nfurniture") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nfurniture/nfurnituregraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nfurniture/nfurnituregraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nfurniture")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nfurniture") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("modulos nfurniture")
                      }
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nfurniture") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nfurniture")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNpartitionRibbon &&
          enabledSoftware["npartition"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "npartition"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="npartition"
                role="tabpanel"
                aria-labelledby="npartition-tab"
              >
                <div
                  className={`section ${
                    showNpartitionRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio npartition") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/npartition/npartitiondashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/npartition/npartitiondashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio npartition")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "divisorias npartition") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-check"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Abrir</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-cross-small"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Fechar</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("divisorias npartition")
                      }
                    >
                      <span className="title">Divisórias</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "estores npartition") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-arrow-small-up"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Subir</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-arrow-small-down"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Descer</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("estores npartition")
                      }
                    >
                      <span className="title">Estores</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas npartition") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("alertas npartition")
                      }
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio npartition") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/npartition/npartitiongraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/npartition/npartitiongraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio npartition")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos npartition") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("modulos npartition")
                      }
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes npartition") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes npartition")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNdecorRibbon &&
          enabledSoftware["ndecor"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "ndecor"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ndecor"
                role="tabpanel"
                aria-labelledby="ndecor-tab"
              >
                <div
                  className={`section ${
                    showNdecorRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ndecor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ndecor/ndecordashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ndecor/ndecordashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ndecor")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "design ndecor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-head-vr"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Realidade Virtual</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-model-cube-arrows"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Imagens 3D</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-books"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Biblioteca Virtual</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("design ndecor")}
                    >
                      <span className="title">Design</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ndecor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ndecor")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ndecor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ndecor/ndecorgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ndecor/ndecorgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio ndecor")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ndecor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ndecor")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes ndecor") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ndecor")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNpingRibbon &&
          enabledSoftware["nping"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "nping")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nping"
                role="tabpanel"
                aria-labelledby="nping-tab"
              >
                <div
                  className={`section ${
                    showNpingRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nping") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nping/npingdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nping/npingdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nping")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "redes nping") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-sitemap"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Rede Informática</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ethernet"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Largura de Banda</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tachometer-alt-fastest"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Teste de Rede</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("redes nping")}
                    >
                      <span className="title">Redes</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nping") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nping")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nping") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nping/npinggraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nping/npinggraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nping")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nping") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nping")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nping") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nping")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNconnectRibbon &&
          enabledSoftware["nconnect"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nconnect"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nconnect"
                role="tabpanel"
                aria-labelledby="nconnect-tab"
              >
                <div
                  className={`section ${
                    showNconnectRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nconnect") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nconnect/nconnectdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/nconnect/nconnectdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nconnect")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "electricidade nconnect") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bolt"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Testes Consumos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-usd-circle"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Valores Consumos</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("electricidade nconnect")
                      }
                    >
                      <span className="title">Electricidade</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nconnect") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nconnect")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nconnect") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nconnect/nconnectgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nconnect/nconnectgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio nconnect")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nconnect") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nconnect")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes nconnect") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nconnect")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNlightRibbon &&
          enabledSoftware["nlight"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nlight"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nlight"
                role="tabpanel"
                aria-labelledby="nlight-tab"
              >
                <div
                  className={`section ${
                    showNlightRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nlight") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nlight/nlightdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nlight/nlightdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nlight")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "iluminacao nlight") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-settings-sliders"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("iluminacao nlight")}
                    >
                      <span className="title">Iluminação</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nlight") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nlight")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nlight") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="light"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nlight/nlightgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nlight/nlightgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nlight")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nlight") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nlight")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nlight") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nlight")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNcomfortRibbon &&
          enabledSoftware["ncomfort"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "ncomfort"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="ncomfort"
                role="tabpanel"
                aria-labelledby="ncomfort-tab"
              >
                <div
                  className={`section ${
                    showNcomfortRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio ncomfort") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncomfort/ncomfortdashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute ===
                              "/ncomfort/ncomfortdashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio ncomfort")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "climatizacao ncomfort") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-settings-sliders"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("climatizacao ncomfort")
                      }
                    >
                      <span className="title">Climatização</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas ncomfort") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas ncomfort")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio ncomfort") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="comfort"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/ncomfort/ncomfortgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/ncomfort/ncomfortgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("relatorio ncomfort")
                      }
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos ncomfort") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos ncomfort")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile ||
                      visibleGroup === "configuracoes ncomfort") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes ncomfort")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNsoundRibbon &&
          enabledSoftware["nsound"] &&
          menuStructureStart.cliente.submenu?.find(
            (sub) => sub.key === "nsound"
          )?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nsound"
                role="tabpanel"
                aria-labelledby="nsound-tab"
              >
                <div
                  className={`section ${
                    showNsoundRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nsound") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsound/nsounddashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsound/nsounddashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nsound")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "audio nsound") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-settings-sliders"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("audio nsound")}
                    >
                      <span className="title">Áudio</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nsound") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nsound")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nsound") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="sound"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nsound/nsoundgraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nsound/nsoundgraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nsound")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nsound") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nsound")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nsound") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nsound")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showNhomeRibbon &&
          enabledSoftware["nhome"] &&
          menuStructureStart.cliente.submenu?.find((sub) => sub.key === "nhome")
            ?.label &&
          !currentRoute.endsWith("dashboard") && (
            <div className="tab-content-navbar" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="nhome"
                role="tabpanel"
                aria-labelledby="nhome-tab"
              >
                <div
                  className={`section ${
                    showNhomeRibbon ? "visible" : "hidden"
                  }`}
                  id="section-group"
                >
                  <div className="group group-start">
                    {(!isMobile || visibleGroup === "inicio nhome") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nhome/nhomedashboardlicensed"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nhome/nhomedashboardlicensed"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-home"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Destaques</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("inicio nhome")}
                    >
                      <span className="title">Início</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "domotica nhome") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-settings-sliders"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gestão</span>
                          </Button>
                        </div>
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-ballot"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Programação</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("domotica nhome")}
                    >
                      <span className="title">Domótica</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "alertas nhome") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-bell"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Avisos</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("alertas nhome")}
                    >
                      <span className="title">Alertas</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "relatorio nhome") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Dropdown
                            onMouseOver={() => setShowListDropdown(true)}
                            onMouseLeave={() =>
                              setTimeout(() => {
                                setShowListDropdown(false);
                              }, 100)
                            }
                            show={showListDropdown}
                          >
                            <Dropdown.Toggle
                              as={Button}
                              variant="home"
                              className="ribbon-button ribbon-button-pessoas"
                              id="dropdown-basic-4"
                              style={{ padding: 5 }}
                            >
                              <span
                                className="fi fi-rr-print"
                                style={{ fontSize: "2rem" }}
                              ></span>
                              <span>Listagens</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div style={{ position: "relative" }}>
                                {Object.keys(menuStructureListing).map(
                                  (menuKey) => (
                                    <div key={menuKey}>
                                      {renderMenu(
                                        menuKey,
                                        menuStructureListing
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="icon-text-pessoas">
                          <Link
                            to="/nhome/nhomegraph"
                            type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "/nhome/nhomegraph"
                                ? "current-active"
                                : ""
                            }`}
                          >
                            <span
                              className="fi fi-rr-chart-simple"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Gráficos</span>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("relatorio nhome")}
                    >
                      <span className="title">Relatórios</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "modulos nhome") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-grid"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opcionais</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() => toggleGroupVisibility("modulos nhome")}
                    >
                      <span className="title">Módulos</span>
                    </div>
                  </div>
                  <div className="group">
                    {(!isMobile || visibleGroup === "configuracoes nhome") && (
                      <div className="btn-group" role="group">
                        <div className="icon-text-pessoas">
                          <Button
                            /* to="#" */ type="button"
                            className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                              currentRoute === "#" ? "current-active" : ""
                            }`}
                            disabled
                          >
                            <span
                              className="fi fi-rr-tools"
                              style={{ fontSize: "2rem" }}
                            ></span>
                            <span>Opções</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      className="title-container"
                      onClick={() =>
                        toggleGroupVisibility("configuracoes nhome")
                      }
                    >
                      <span className="title">Configurações</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {showPessoasRibbon && (
          <div className="tab-content-navbar" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="pessoas"
              role="tabpanel"
              aria-labelledby="pessoas-tab"
            >
              <div
                className={`section ${
                  showPessoasRibbon ? "visible" : "hidden"
                }`}
                id="section-group"
              >
                <div className="group group-start">
                  {(!isMobile || visibleGroup === "pessoas pessoas") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Link
                          to="/persons/Persons"
                          type="button"
                          onClick={() => fetchAllDisabledEmployees("1", "20")}
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/persons/Persons"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-users-alt"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Pessoas</span>
                        </Link>
                      </div>
                      <div className="grid-container">
                        <Link
                          to="/persons/Employees"
                          type="button"
                          onClick={() =>
                            fetchAllDisabledEmployees("1", "20", "Funcionário")
                          }
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/Employees"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-user"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Funcionários</span>
                        </Link>
                        <Link
                          to="/persons/Visitors"
                          type="button"
                          onClick={() =>
                            fetchAllDisabledEmployees("1", "20", "Visitante")
                          }
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/Visitors"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-user"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Visitantes</span>
                        </Link>
                        <Link
                          to="/persons/ExternalEmployees"
                          type="button"
                          onClick={() =>
                            fetchAllDisabledEmployees(
                              "1",
                              "20",
                              "Subcontratado"
                            )
                          }
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/ExternalEmployees"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-user"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Subcontratados</span>
                        </Link>
                        <Link
                          to="/persons/Contacts"
                          type="button"
                          onClick={() =>
                            fetchAllDisabledEmployees("1", "20", "Contacto")
                          }
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/Contacts"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-user"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Contactos</span>
                        </Link>
                        <Link
                          to="/persons/User"
                          type="button"
                          onClick={() =>
                            fetchAllDisabledEmployees("1", "20", "Utente")
                          }
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/User"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-user"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Utentes</span>
                        </Link>
                        <Link
                          to="/persons/Temporaries"
                          type="button"
                          onClick={() =>
                            fetchAllDisabledEmployees("1", "20", "Provisório")
                          }
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/Temporaries"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-user"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Provisórios</span>
                        </Link>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("pessoas pessoas")}
                  >
                    <span className="title">Pessoas</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile || visibleGroup === "organizacao pessoas") && (
                    <div className="btn-group" role="group">
                      <div className="grid-container">
                        <Link
                          to="/persons/Departments"
                          type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/Departments"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-industry-windows"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Departamentos</span>
                        </Link>
                        <Link
                          to="/persons/Professions"
                          type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/Professions"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-user-helmet-safety"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Profissões</span>
                        </Link>
                        <Link
                          to="/persons/Groups"
                          type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/Groups"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-users"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Grupos</span>
                        </Link>
                        <Link
                          to="/persons/Zones"
                          type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/Zones"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-land-layer-location"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Zonas</span>
                        </Link>
                        <Link
                          to="/persons/Categories"
                          type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/Categories"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-category"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Categorias</span>
                        </Link>
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-car-side"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Fracções</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("organizacao pessoas")}
                  >
                    <span className="title">Organização</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile || visibleGroup === "entidades pessoas") && (
                    <div className="btn-group" role="group">
                      <div className="grid-container-entidades">
                        <Link
                          to="/persons/externalentities"
                          type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/externalentities"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-corporate"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Entidades Externas</span>
                        </Link>
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-id-badge"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Áreas Intervenção</span>
                        </Button>
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-credit-card"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Áreas Negócios</span>
                        </Button>
                      </div>
                      <div>
                        <Link
                          to="/persons/types"
                          type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "/persons/types"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-corporate-alt"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Tipos Entidades</span>
                        </Link>
                        <Button
                          /* to='#' */ type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-building"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Origem Entidade</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("entidades pessoas")}
                  >
                    <span className="title">Entidades</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile || visibleGroup === "informacoes pessoas") && (
                    <div className="btn-group" role="group">
                      <div className="grid-container-entidades">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-address-book"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Contactos Internos</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("informacoes pessoas")}
                  >
                    <span className="title">Informações</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile || visibleGroup === "configuracoes pessoas") && (
                    <div className="btn-group" role="group">
                      <div className="grid-container-entidades">
                        <Button
                          onClick={toggleImportEmployees}
                          type="button"
                          className={`btn btn-light ribbon-button ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-download"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Importar Pessoas</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() =>
                      toggleGroupVisibility("configuracoes pessoas")
                    }
                  >
                    <span className="title">Configurações</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showDispositivosRibbon && (
          <div className="tab-content-navbar" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="dispositivos"
              role="tabpanel"
              aria-labelledby="dispositivos-tab"
            >
              <div
                className={`section ${
                  showDispositivosRibbon ? "visible" : "hidden"
                }`}
                id="section-group"
              >
                <div className="group group-start">
                  {(!isMobile || visibleGroup === "terminais terminais") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Link
                          to="/devices/terminals"
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/devices/terminals"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-devices"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Equipamentos</span>
                        </Link>
                      </div>
                      <div className="icon-text-pessoas">
                        <Link
                          to="/devices/timeperiods"
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/devices/timeperiods"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-clock"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Períodos Horários</span>
                        </Link>
                      </div>
                      <div className="icon-text-pessoas">
                        <Link
                          to="/devices/timeplans"
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/devices/timeplans"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-calendar-clock"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Planos Horários</span>
                        </Link>
                      </div>
                      <div className="icon-text-pessoas">
                        <Link
                          to="/devices/accesscontrols"
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/devices/accesscontrols"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-enter"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Planos Acessos</span>
                        </Link>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          onClick={toggleTerminalOptionsModal}
                          className="btn btn-light ribbon-button ribbon-button-pessoas"
                          disabled
                        >
                          <span
                            className="fi fi-rr-tools"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Opções</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("terminais terminais")}
                  >
                    <span className="title">Terminais</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile || visibleGroup === "banco terminais") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Link
                          to="/devices/terminalcloseopen"
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/devices/terminalcloseopen"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-wallet-income"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Fecho/Abertura</span>
                        </Link>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("banco terminais")}
                  >
                    <span className="title">Banco</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile || visibleGroup === "cameras terminais") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-camera-cctv"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Câmeras</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("cameras terminais")}
                  >
                    <span className="title">Câmeras</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showConfiguracaoRibbon && (
          <div className="tab-content-navbar" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="configuracao"
              role="tabpanel"
              aria-labelledby="configuracao-tab"
            >
              <div
                className={`section ${
                  showConfiguracaoRibbon ? "visible" : "hidden"
                }`}
                id="section-group"
              >
                <div className="group group-start">
                  {(!isMobile || visibleGroup === "base configuracoes") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-sql-server"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Base de Dados</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          onClick={toggleBackupDBModal}
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-file-download"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Backup BD</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Link
                          to="/configs/entities"
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/configs/entities"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-corporate"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Entidade</span>
                        </Link>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          onClick={toggleLicenseModal}
                          type="button"
                          className="btn btn-light ribbon-button ribbon-button-pessoas"
                        >
                          <span
                            className="fi fi-rr-license"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Licença</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          onClick={toggleEmailOptionsModal}
                          type="button"
                          className="btn btn-light ribbon-button ribbon-button-pessoas"
                        >
                          <span
                            className="fi fi-rr-tools"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Opções</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("base configuracoes")}
                  >
                    <span className="title">Base</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile || visibleGroup === "geral configuracoes") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-globe"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Fusos Horários</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-flag-alt"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Nacionalidades</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-tools"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Opções</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("geral configuracoes")}
                  >
                    <span className="title">Geral</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile ||
                    visibleGroup === "permissoes configuracoes") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-users"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Perfis</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Link
                          to="/configs/newusers"
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/configs/newusers"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-users-alt"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Utilizadores</span>
                        </Link>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() =>
                      toggleGroupVisibility("permissoes configuracoes")
                    }
                  >
                    <span className="title">Permissões</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile ||
                    visibleGroup === "documentos configuracoes") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-inbox"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Documentos</span>
                        </Button>
                      </div>
                      <div>
                        <Button
                          /* to="#" */ type="button"
                          className="btn btn-light ribbon-button-ent"
                          disabled
                        >
                          <span
                            className="fi fi-rr-corporate-alt"
                            style={{ fontSize: "1rem", marginRight: 5 }}
                          ></span>
                          <span>Tipos</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() =>
                      toggleGroupVisibility("documentos configuracoes")
                    }
                  >
                    <span className="title">Documentos</span>
                  </div>
                </div>
                <div className="group">
                  {(!isMobile ||
                    visibleGroup === "actividade configuracoes") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Link
                          to="/configs/loginlogs"
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/logs/loginlogs"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-clipboard-list"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Logins</span>
                        </Link>
                      </div>
                      <div className="icon-text-pessoas">
                        <Link
                          to="/configs/historylogs"
                          type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "/logs/historylogs"
                              ? "current-active"
                              : ""
                          }`}
                        >
                          <span
                            className="fi fi-rr-clipboard-list"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Histórico</span>
                        </Link>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-search-alt"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Consultar</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-file-invoice"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Consultar DPO</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() =>
                      toggleGroupVisibility("actividade configuracoes")
                    }
                  >
                    <span className="title">Actividade do Sistema</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAjudaRibbon && (
          <div className="tab-content-navbar" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="ajuda"
              role="tabpanel"
              aria-labelledby="ajuda-tab"
            >
              <div
                className={`section ${showAjudaRibbon ? "visible" : "hidden"}`}
                id="section-group"
              >
                <div className="group group-start">
                  {(!isMobile || visibleGroup === "suporte ajuda") && (
                    <div className="btn-group" role="group">
                      <div className="icon-text-pessoas">
                        <Button
                          onClick={toggleAboutModalOpen}
                          type="button"
                          className="btn btn-light ribbon-button ribbon-button-pessoas"
                        >
                          <span
                            className="fi fi-rr-book-bookmark"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Acerca de</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-employee-handbook"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Manual</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          onClick={toggleTechInfoModal}
                          type="button"
                          className="btn btn-light ribbon-button ribbon-button-pessoas"
                        >
                          <span
                            className="fi fi-rr-blueprint"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span className="text">Informações Técnicas</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-code-compare"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Versão</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          /* to="#" */ type="button"
                          className={`btn btn-light ribbon-button ribbon-button-pessoas ${
                            currentRoute === "#" ? "current-active" : ""
                          }`}
                          disabled
                        >
                          <span
                            className="fi fi-rr-user-headset"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Helpdesk</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          onClick={toggleContactModal}
                          type="button"
                          className="btn btn-light ribbon-button ribbon-button-pessoas"
                        >
                          <span
                            className="fi fi-rr-phone-call"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Contacto</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          onClick={handleAnydeskWindow}
                          type="button"
                          className="btn btn-light ribbon-button ribbon-button-pessoas"
                        >
                          <span
                            className="fi fi-rr-computer"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Anydesk</span>
                        </Button>
                      </div>
                      <div className="icon-text-pessoas">
                        <Button
                          onClick={handleWhatsappWindow}
                          type="button"
                          className="btn btn-light ribbon-button ribbon-button-pessoas"
                        >
                          <span
                            className="fi fi-brands-whatsapp"
                            style={{ fontSize: "2rem" }}
                          ></span>
                          <span>Whatsapp</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    className="title-container"
                    onClick={() => toggleGroupVisibility("suporte ajuda")}
                  >
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
          title="Opções de Email"
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
          title="Opções de Quiosque"
        />
      )}
      {showPhotoAdsModal && (
        <CreateModalAds
          open={showPhotoAdsModal}
          onClose={() => setShowPhotoAdsModal(false)}
          onSave={handleAddAds}
          fields={adsFields}
          initialValues={{}}
          title="Publicidades"
          entities="photo"
        />
      )}
      {showVideoAdsModal && (
        <CreateModalAds
          open={showVideoAdsModal}
          onClose={() => setShowVideoAdsModal(false)}
          onSave={handleAddAds}
          fields={adsFields}
          initialValues={{}}
          title="Publicidades"
          entities="video"
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
          onClose={handleCloseLicenseModal}
          onUpdate={handleUpdateLicense}
          fields={licenseFields}
        />
      )}
      {showPrintButton && (
        <div style={{ display: "none" }}>
          <PrintButton
            data={currentData}
            fields={currentFields}
            showModalOnInit={true}
            onClose={clearData}
          />
        </div>
      )}
      <BackupDBModal
        open={showBackupDBModal}
        onClose={() => setShowBackupDBModal(false)}
        onSave={(formData) => Promise.resolve(exportBackupDB(formData))}
        onUpdate={(formData: FormData) =>
          Promise.resolve(importBackupDB(formData))
        }
        fields={backupDBFields}
        title="Backup BD"
      />
      <ImportEmployeesModal
        open={showImportEmployeesModal}
        onClose={() => setShowImportEmployeesModal(false)}
        onUpdate={(formData: FormData) =>
          Promise.resolve(importEmployees(formData))
        }
        title="Importar Pessoas"
      />
      {showTechInfoModal && (
        <TechInfoModal
          open={showTechInfoModal}
          onClose={() => setShowTechInfoModal(false)}
        />
      )}
    </nav>
  );
};
