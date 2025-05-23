import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import { Card, Tab, Nav, Button } from "react-bootstrap";
import { Carousel } from 'react-responsive-carousel';
import { useLocation, useNavigate } from "react-router-dom";
import banner_naccess from '../assets/img/carousel/banner_naccess.jpg';

import banner_napp from '../assets/img/carousel/banner_napp.webp';
import banner_naut from '../assets/img/carousel/banner_naut.webp';
import banner_ncard from '../assets/img/carousel/banner_ncard.jpg';
import banner_ncharge from '../assets/img/carousel/banner_ncharge.webp';
import banner_ncity from '../assets/img/carousel/banner_ncity.webp';
import banner_nclock from '../assets/img/carousel/banner_nclock.jpg';
import banner_ncomfort from '../assets/img/carousel/banner_ncomfort.jpg';
import banner_nconnect from '../assets/img/carousel/banner_nconnect.jpg';
import banner_ncyber from '../assets/img/carousel/banner_ncyber.webp';
import banner_ndecor from '../assets/img/carousel/banner_ndecor.jpg';
import banner_ndigital from '../assets/img/carousel/banner_ndigital.webp';
import banner_ndoor from '../assets/img/carousel/banner_ndoor.jpg';
import banner_nequip from '../assets/img/carousel/banner_nequip.jpg';
import banner_news from '../assets/img/carousel/banner_news.jpg';
import banner_nfire from '../assets/img/carousel/banner_nfire.jpg';
import banner_nfurniture from '../assets/img/carousel/banner_nfurniture.jpg';
import banner_nhologram from '../assets/img/carousel/banner_nhologram.jpg';
import banner_nhome from '../assets/img/carousel/banner_nhome.jpg';
import banner_nidgroup from '../assets/img/carousel/banner_nidgroup.jpg';
import banner_nidplace from '../assets/img/carousel/banner_nidplace.webp';
import banner_nidsof from '../assets/img/carousel/banner_nidsof.webp';
import banner_nidtec from '../assets/img/carousel/banner_nidtec.webp';
import banner_nkiosk from '../assets/img/carousel/banner_nkiosk.jpg';
import banner_nled from '../assets/img/carousel/banner_nled.jpg';
import banner_nlight from '../assets/img/carousel/banner_nlight.jpg';
import banner_npark from '../assets/img/carousel/banner_npark.jpg';
import banner_npartition from '../assets/img/carousel/banner_npartition.jpg';
import banner_npatrol from '../assets/img/carousel/banner_npatrol.jpg';
import banner_nping from '../assets/img/carousel/banner_nping.jpg';
import banner_npower from '../assets/img/carousel/banner_npower.webp';
import banner_nproject from '../assets/img/carousel/banner_nproject.webp';
import banner_nreality from '../assets/img/carousel/banner_nreality.jpg';
import banner_nsecur from '../assets/img/carousel/banner_nsecur.jpg';
import banner_nserver from '../assets/img/carousel/banner_nserver.webp';
import banner_nsmart from '../assets/img/carousel/banner_nsmart.webp';
import banner_nsoftware from '../assets/img/carousel/banner_nsoftware.webp';
import banner_nsound from '../assets/img/carousel/banner_nsound.jpg';
import banner_nsystem from '../assets/img/carousel/banner_nsystem.webp';
import banner_nview from '../assets/img/carousel/banner_nview.jpg';
import banner_nvisitor from '../assets/img/carousel/banner_nvisitor.jpg';
import banner_sisnid from '../assets/img/carousel/banner_sisnid.jpg';
import naccess from '../assets/img/navbar/navbar/naccess.webp';
import napp from '../assets/img/navbar/navbar/napp.webp';
import naut from '../assets/img/navbar/navbar/naut.webp';
import nbuild from '../assets/img/navbar/navbar/nbuild.png';
import ncaravan from '../assets/img/navbar/navbar/ncaravan.png';
import ncard from '../assets/img/navbar/navbar/ncard.webp';
import ncharge from '../assets/img/navbar/navbar/ncharge.webp';
import ncity from '../assets/img/navbar/navbar/ncity.png';
import nclinic from '../assets/img/navbar/navbar/nclinic.png';
import nclock from '../assets/img/navbar/navbar/nclock.webp';
import ncomfort from '../assets/img/navbar/navbar/ncomfort.webp';
import nconnect from '../assets/img/navbar/navbar/nconnect.webp';
import ncount from '../assets/img/navbar/navbar/ncount.png';
import ncyber from '../assets/img/navbar/navbar/ncyber.webp';
import ndecor from '../assets/img/navbar/navbar/ndecor.webp';
import ndigital from '../assets/img/navbar/navbar/ndigital.webp';
import ndoc from '../assets/img/navbar/navbar/ndoc.png';
import ndoor from '../assets/img/navbar/navbar/ndoor.webp';
import nequip from '../assets/img/navbar/navbar/nequip.webp';
import nevents from '../assets/img/navbar/navbar/nevents.png';
import nfire from '../assets/img/navbar/navbar/nfire.webp';
import nfurniture from '../assets/img/navbar/navbar/nfurniture.webp';
import ngold from '../assets/img/navbar/navbar/ngold.png';
import ngym from '../assets/img/navbar/navbar/ngym.png';
import nhologram from '../assets/img/navbar/navbar/nhologram.webp';
import nhome from '../assets/img/navbar/navbar/nhome.webp';
import ninvoice from '../assets/img/navbar/navbar/ninvoice.png';
import nkiosk from '../assets/img/navbar/navbar/nkiosk.webp';
import nled from '../assets/img/navbar/navbar/nled.webp';
import nlight from '../assets/img/navbar/navbar/nlight.webp';
import nmechanic from '../assets/img/navbar/navbar/nmechanic.png';
import noptics from '../assets/img/navbar/navbar/noptics.png';
import npark from '../assets/img/navbar/navbar/npark.webp';
import npartition from '../assets/img/navbar/navbar/npartition.webp';
import npatrol from '../assets/img/navbar/navbar/npatrol.webp';
import nping from '../assets/img/navbar/navbar/nping.webp';
import npower from '../assets/img/navbar/navbar/npower.webp';
import nproduction from '../assets/img/navbar/navbar/nproduction.png';
import nproject from '../assets/img/navbar/navbar/nproject.webp';
import nreality from '../assets/img/navbar/navbar/nreality.webp';
import nsales from '../assets/img/navbar/navbar/nsales.png';
import nschool from '../assets/img/navbar/navbar/nschool.png';
import nsecur from '../assets/img/navbar/navbar/nsecur.webp';
import nserver from '../assets/img/navbar/navbar/nserver.webp';
import nservice from '../assets/img/navbar/navbar/nservice.png';
import nsmart from '../assets/img/navbar/navbar/nsmart.webp';
import nsoftware from '../assets/img/navbar/navbar/nsoftware.webp';
import nsound from '../assets/img/navbar/navbar/nsound.webp';
import nsports from '../assets/img/navbar/navbar/nsports.png';
import nsystem from '../assets/img/navbar/navbar/nsystem.webp';
import ntask from '../assets/img/navbar/navbar/ntask.png';
import nticket from '../assets/img/navbar/navbar/nticket.png';
import nview from '../assets/img/navbar/navbar/nview.webp';
import nvisitor from '../assets/img/navbar/navbar/nvisitor.webp';

import { Footer } from '../components/Footer';
import { useLicense } from "../context/LicenseContext";
import { useNavbar } from '../context/NavbarContext';

// Define o tipo TabName
type TabName = 'SOFTWARES LICENCIADOS';

// Define o tipo CardTitle
type CardTitle = 'Quiosques' | 'Torniquetes' | 'Vigilância' | 'Alarmes' |
    'Assiduidade' | 'Acessos' | 'Parques' | 'Automatismos' | 'Rondas' | 'Cartões' | 'NSoftwares' |
    'Programação' | 'Sistemas' | 'Aplicativos' | 'Cibernética' | 'Transformação' | 'Integração' |
    'Automação' | 'Equipamentos' | 'Projetos' | 'Contador' | 'Obras' | 'Autocaravanas' | 'Oficinas' |
    'Eventos' | 'Serviços' | 'Tarefas' | 'Produção' | 'Bilhetes' | 'CRM' | 'Faturação' | 'Documental' |
    'Desporto' | 'Ginásios' | 'Escolar' | 'Clínicas' | 'Ópticas' | 'Ourivesarias' |
    'Inteligência' | 'Virtual' | 'Hologramas' | 'Energias' | 'Recarga' | 'Mobilidade' |
    'Multimédia' | 'Incêndios' |
    'Mobiliário' | 'Divisórias' | 'Design' | 'Redes' | 'Electricidade' | 'Iluminação' |
    'Climatização' | 'Áudio' | 'Domótica';

// Define o objeto tabData
const tabData: Record<CardTitle, { route: string; tabKey: string; ribbonKey: string }> = {
    Quiosques: { route: '/nkiosk/nkioskdashboard', tabKey: 'showNkioskTab', ribbonKey: 'showNkioskRibbon' },
    Torniquetes: { route: '/nvisitor/nvisitordashboard', tabKey: 'showNvisitorTab', ribbonKey: 'showNvisitorRibbon' },
    Vigilância: { route: '/nview/nviewdashboard', tabKey: 'showNviewTab', ribbonKey: 'showNviewRibbon' },
    Alarmes: { route: '/nsecur/nsecurdashboard', tabKey: 'showNsecurTab', ribbonKey: 'showNsecurRibbon' },
    Assiduidade: { route: '/nclock/nclockdashboard', tabKey: 'showNclockTab', ribbonKey: 'showNclockRibbon' },
    Acessos: { route: '/naccess/naccessdashboard', tabKey: 'showNaccessTab', ribbonKey: 'showNaccessRibbon' },
    Parques: { route: '/npark/nparkdashboard', tabKey: 'showNparkTab', ribbonKey: 'showNparkRibbon' },
    Automatismos: { route: '/ndoor/ndoordashboard', tabKey: 'showNdoorTab', ribbonKey: 'showNdoorRibbon' },
    Rondas: { route: '/npatrol/npatroldashboard', tabKey: 'showNpatrolTab', ribbonKey: 'showNpatrolRibbon' },
    Cartões: { route: '/ncard/ncarddashboard', tabKey: 'showNcardTab', ribbonKey: 'showNcardRibbon' },
    Programação: { route: '/nsoftware/nsoftwaredashboard', tabKey: 'showNsoftwareTab', ribbonKey: 'showNsoftwareRibbon' },
    Sistemas: { route: '/nsystem/nsystemdashboard', tabKey: 'showNsystemTab', ribbonKey: 'showNsystemRibbon' },
    Aplicativos: { route: '/napp/nappdashboard', tabKey: 'showNappTab', ribbonKey: 'showNappRibbon' },
    Cibernética: { route: '/ncyber/ncyberdashboard', tabKey: 'showNcyberTab', ribbonKey: 'showNcyberRibbon' },
    Transformação: { route: '/ndigital/ndigitaldashboard', tabKey: 'showNdigitalTab', ribbonKey: 'showNdigitalRibbon' },
    Integração: { route: '/nserver/nserverdashboard', tabKey: 'showNserverTab', ribbonKey: 'showNserverRibbon' },
    Automação: { route: '/naut/nautdashboard', tabKey: 'showNautTab', ribbonKey: 'showNautRibbon' },
    Equipamentos: { route: '/nequip/nequipdashboard', tabKey: 'showNequipTab', ribbonKey: 'showNequipRibbon' },
    Projetos: { route: '/nproject/nprojectdashboard', tabKey: 'showNprojectTab', ribbonKey: 'showNprojectRibbon' },
    Contador: { route: '/ncount/ncountdashboard', tabKey: 'showNcountTab', ribbonKey: 'showNcountRibbon' },
    Obras: { route: '/nbuild/nbuilddashboard', tabKey: 'showNbuildTab', ribbonKey: 'showNbuildRibbon' },
    Autocaravanas: { route: '/ncaravan/ncaravandashboard', tabKey: 'showNcaravanTab', ribbonKey: 'showNcaravanRibbon' },
    Oficinas: { route: '/nmechanic/nmechanicdashboard', tabKey: 'showNmechanicTab', ribbonKey: 'showNmechanicRibbon' },
    Eventos: { route: '/nevents/neventsdashboard', tabKey: 'showNeventsTab', ribbonKey: 'showNeventsRibbon' },
    Serviços: { route: '/nservice/nservicedashboard', tabKey: 'showNserviceTab', ribbonKey: 'showNserviceRibbon' },
    Tarefas: { route: '/ntask/ntaskdashboard', tabKey: 'showNtaskTab', ribbonKey: 'showNtaskRibbon' },
    Produção: { route: '/nproduction/nproductiondashboard', tabKey: 'showNproductionTab', ribbonKey: 'showNproductionRibbon' },
    Bilhetes: { route: '/nticket/nticketdashboard', tabKey: 'showNticketTab', ribbonKey: 'showNticketRibbon' },
    CRM: { route: '/nsales/nsalesdashboard', tabKey: 'showNsalesTab', ribbonKey: 'showNsalesRibbon' },
    Faturação: { route: '/ninvoice/ninvoicedashboard', tabKey: 'showNinvoiceTab', ribbonKey: 'showNinvoiceRibbon' },
    Documental: { route: '/ndoc/ndocdashboard', tabKey: 'showNdocTab', ribbonKey: 'showNdocRibbon' },
    Desporto: { route: '/nsports/nsportsdashboard', tabKey: 'showNsportsTab', ribbonKey: 'showNsportsRibbon' },
    Ginásios: { route: '/ngym/ngymdashboard', tabKey: 'showNgymTab', ribbonKey: 'showNgymRibbon' },
    Escolar: { route: '/nschool/nschooldashboard', tabKey: 'showNschoolTab', ribbonKey: 'showNschoolRibbon' },
    Clínicas: { route: '/nclinic/nclinicdashboard', tabKey: 'showNclinicTab', ribbonKey: 'showNclinicRibbon' },
    Ópticas: { route: '/noptics/nopticsdashboard', tabKey: 'showNopticsTab', ribbonKey: 'showNopticsRibbon' },
    Ourivesarias: { route: '/ngold/ngolddashboard', tabKey: 'showNgoldTab', ribbonKey: 'showNgoldRibbon' },
    Inteligência: { route: '/nsmart/nsmartdashboard', tabKey: 'showNsmartTab', ribbonKey: 'showNsmartRibbon' },
    Virtual: { route: '/nreality/nrealitydashboard', tabKey: 'showNrealityTab', ribbonKey: 'showNrealityRibbon' },
    Hologramas: { route: '/nhologram/nhologramdashboard', tabKey: 'showNhologramTab', ribbonKey: 'showNhologramRibbon' },
    Energias: { route: '/npower/npowerdashboard', tabKey: 'showNpowerTab', ribbonKey: 'showNpowerRibbon' },
    Recarga: { route: '/ncharge/nchargedashboard', tabKey: 'showNchargeTab', ribbonKey: 'showNchargeRibbon' },
    Mobilidade: { route: '/ncity/ncitydashboard', tabKey: 'showNcityTab', ribbonKey: 'showNcityRibbon' },
    Multimédia: { route: '/nled/nleddashboard', tabKey: 'showNledTab', ribbonKey: 'showNledRibbon' },
    Incêndios: { route: '/nfire/nfiredashboard', tabKey: 'showNfireTab', ribbonKey: 'showNfireRibbon' },
    Mobiliário: { route: '/nfurniture/nfurnituredashboard', tabKey: 'showNfurnitureTab', ribbonKey: 'showNfurnitureRibbon' },
    Divisórias: { route: '/npartition/npartitiondashboard', tabKey: 'showNpartitionTab', ribbonKey: 'showNpartitionRibbon' },
    Design: { route: '/ndecor/ndecordashboard', tabKey: 'showNdecorTab', ribbonKey: 'showNdecorRibbon' },
    Redes: { route: '/nping/npingdashboard', tabKey: 'showNpingTab', ribbonKey: 'showNpingRibbon' },
    Electricidade: { route: '/nconnect/nconnectdashboard', tabKey: 'showNconnectTab', ribbonKey: 'showNconnectRibbon' },
    Iluminação: { route: '/nlight/nlightdashboard', tabKey: 'showNlightTab', ribbonKey: 'showNlightRibbon' },
    Climatização: { route: '/ncomfort/ncomfortdashboard', tabKey: 'showNcomfortTab', ribbonKey: 'showNcomfortRibbon' },
    Áudio: { route: '/nsound/nsounddashboard', tabKey: 'showNsoundTab', ribbonKey: 'showNsoundRibbon' },
    Domótica: { route: '/nhome/nhomedashboard', tabKey: 'showNhomeTab', ribbonKey: 'showNhomeRibbon' },
    NSoftwares: { route: '/nsoftware/nsoftwaredashboard', tabKey: 'showSoftwaresTab', ribbonKey: 'showSoftwaresRibbon' }
};

// Função para verificar se o título é válido
const isValidCardTitle = (title: string): title is CardTitle => {
    return title in tabData;
};

// Função auxiliar para extrair o nome do software da tabKey
const extractSoftwareNameFromTabKey = (tabKey: string) => {
    const match = tabKey.match(/show(.*)Tab/);
    return match ? match[1] : null;
};

// Define a página principal
export const Dashboard = () => {
    const { license, getSoftwareEnabledStatus } = useLicense();
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState<TabName>('SOFTWARES LICENCIADOS');

    // Define a função de clique nos cards
    const handleCardClick = (title: string) => {
        if (isValidCardTitle(title)) {
            const tab = tabData[title];
            let route = tab.route;

            const softwareName = extractSoftwareNameFromTabKey(tab.tabKey);

            const softwareEnabled = getSoftwareEnabledStatus(license);
            const transformedSoftwareEnabled = Object.keys(softwareEnabled).reduce<Record<string, boolean>>((newObj, key) => {
                const newKey = key.replace('n', 'N');
                newObj[newKey] = softwareEnabled[key];
                return newObj;
            }, {});

            if (activeKey === 'SOFTWARES LICENCIADOS' && softwareName && transformedSoftwareEnabled[softwareName]) {
                route = route.replace('dashboard', 'dashboardlicensed');
            }
            
            localStorage.setItem(tab.tabKey, 'true');
            localStorage.setItem(tab.ribbonKey, 'true');
            const str = tab.tabKey;
            const match = str.match(/show(.*)Tab/);
            const result = match ? match[1] : '';
            localStorage.setItem('activeTab', result.toLowerCase());
            navigate(route);
        }
    };

    const cardData = {
        'SOFTWARES LICENCIADOS': [
            { title: 'Assiduidade', img: nclock, tab: 'nclock' },
            { title: 'Acessos', img: naccess, tab: 'naccess' },
            { title: 'Torniquetes', img: nvisitor, tab: 'nvisitor' },
            { title: 'Parques', img: npark, tab: 'npark' },
            { title: 'Automatismos', img: ndoor, tab: 'ndoor' },
            { title: 'Rondas', img: npatrol, tab: 'npatrol' },
            { title: 'Cartões', img: ncard, tab: 'ncard' },
            { title: 'Vigilância', img: nview, tab: 'nview' },
            { title: 'Alarmes', img: nsecur, tab: 'nsecur' },
            { title: 'Programação', img: nsoftware, tab: 'nsoftware' },
            { title: 'Sistemas', img: nsystem, tab: 'nsystem' },
            { title: 'Aplicativos', img: napp, tab: 'napp' },
            { title: 'Cibernética', img: ncyber, tab: 'ncyber' },
            { title: 'Transformação', img: ndigital, tab: 'ndigital' },
            { title: 'Integração', img: nserver, tab: 'nserver' },
            { title: 'Automação', img: naut, tab: 'naut' },
            { title: 'Equipamentos', img: nequip, tab: 'nequip' },
            { title: 'Projetos', img: nproject, tab: 'nproject' },
            { title: 'Contador', img: ncount, tab: 'ncount' },
            { title: 'Obras', img: nbuild, tab: 'nbuild' },
            { title: 'Autocaravanas', img: ncaravan, tab: 'ncaravan' },
            { title: 'Oficinas', img: nmechanic, tab: 'nmechanic' },
            { title: 'Eventos', img: nevents, tab: 'nevents' },
            { title: 'Serviços', img: nservice, tab: 'nservice' },
            { title: 'Tarefas', img: ntask, tab: 'ntask' },
            { title: 'Produção', img: nproduction, tab: 'nproduction' },
            { title: 'Bilhetes', img: nticket, tab: 'nticket' },
            { title: 'CRM', img: nsales, tab: 'nsales' },
            { title: 'Faturação', img: ninvoice, tab: 'ninvoice' },
            { title: 'Documental', img: ndoc, tab: 'ndoc' },
            { title: 'Desporto', img: nsports, tab: 'nsports' },
            { title: 'Ginásios', img: ngym, tab: 'ngym' },
            { title: 'Escolar', img: nschool, tab: 'nschool' },
            { title: 'Clínicas', img: nclinic, tab: 'nclinic' },
            { title: 'Ópticas', img: noptics, tab: 'noptics' },
            { title: 'Ourivesarias', img: ngold, tab: 'ngold' },
            { title: 'Inteligência', img: nsmart, tab: 'nsmart' },
            { title: 'Virtual', img: nreality, tab: 'nreality' },
            { title: 'Hologramas', img: nhologram, tab: 'nhologram' },
            { title: 'Energias', img: npower, tab: 'npower' },
            { title: 'Recarga', img: ncharge, tab: 'ncharge' },
            { title: 'Mobilidade', img: ncity, tab: 'ncity' },
            { title: 'Quiosques', img: nkiosk, tab: 'nkiosk' },
            { title: 'Multimédia', img: nled, tab: 'nled' },
            { title: 'Incêndios', img: nfire, tab: 'nfire' },
            { title: 'Mobiliário', img: nfurniture, tab: 'nfurniture' },
            { title: 'Divisórias', img: npartition, tab: 'npartition' },
            { title: 'Design', img: ndecor, tab: 'ndecor' },
            { title: 'Redes', img: nping, tab: 'nping' },
            { title: 'Electricidade', img: nconnect, tab: 'nconnect' },
            { title: 'Iluminação', img: nlight, tab: 'nlight' },
            { title: 'Climatização', img: ncomfort, tab: 'ncomfort' },
            { title: 'Áudio', img: nsound, tab: 'nsound' },
            { title: 'Domótica', img: nhome, tab: 'nhome' },
        ]
    };

    // Função para renderizar os cards com base na aba ativa
    const RenderCards = (tabKey: TabName) => {
        const location = useLocation();
        const cardContainerRef = useRef<HTMLDivElement>(null);
        const [maxVisibleCards, setMaxVisibleCards] = useState(10);

        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 1366) {
                setMaxVisibleCards(9);
            } else {
                setMaxVisibleCards(10);
            }
        };

        useEffect(() => {
            window.addEventListener('resize', handleResize);
            handleResize();

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        useEffect(() => {
            if (cardContainerRef.current) {
                const cards = cardData[tabKey];
                const activeCardIndex = cards.findIndex(card => isValidCardTitle(card.title) && location.pathname === tabData[card.title].route);
                if (activeCardIndex !== -1) {
                    const cardWidth = cardContainerRef.current.children[activeCardIndex].clientWidth;
                    const scrollX = cardWidth * activeCardIndex - (cardContainerRef.current.clientWidth / 2) + (cardWidth / 2);
                    cardContainerRef.current.scrollTo({ left: scrollX, behavior: 'smooth' });
                }
            }
        }, [tabKey, location.pathname, cardData]);

        const scrollLeft = () => {
            if (cardContainerRef.current) {
                cardContainerRef.current.scrollBy({ left: -130, behavior: 'smooth' });
            }
        };

        const scrollRight = () => {
            if (cardContainerRef.current) {
                cardContainerRef.current.scrollBy({ left: 130, behavior: 'smooth' });
            }
        };

        const softwareEnabledStatus = getSoftwareEnabledStatus(license);
        const cards = cardData[tabKey].filter(card => {
            return softwareEnabledStatus[card.tab];
        });
        const numCards = cards.length;
        const alignmentClass = numCards <= maxVisibleCards ? 'cards-center' : 'cards-left';

        return (
            <div className="dashboard-cards-container">
                {numCards > maxVisibleCards && (
                    <Button id="arrow-cards" style={{ backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', color: 'black' }} className="arrows-cards" onClick={scrollLeft}>{"<"}</Button>
                )}
                <div id="cardContainer" className={`card-container ${alignmentClass}`} ref={cardContainerRef}>
                    {cards.map((card, index) => {
                        const isCurrentPage = isValidCardTitle(card.title) && location.pathname === tabData[card.title].route;
                        return (
                            <div onClick={() => handleCardClick(card.title)} className="card-link" key={index}>
                                <Card className={`card ${isCurrentPage ? 'current-card' : ''}`}>
                                    <Card.Img variant="top" src={card.img} className="card-img" />
                                    <Card.Body>
                                        <Card.Title className="card-title">{card.title}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                </div>
                {numCards > maxVisibleCards && (
                    <Button className="arrows-cards" style={{ backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', color: 'black' }} onClick={scrollRight}>{">"}</Button>
                )}
            </div>
        );
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-tabs-container" id='cards-dashboard'>
                <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k as TabName)}>
                    <Nav variant="pills" className="nav-pills justify-content-center align-items-center">
                        {Object.keys(cardData).map((key) => (
                            <Nav.Item key={key} style={{ width: '100%' }}>
                                <Nav.Link eventKey={key}>{key}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    <Tab.Content>
                        {Object.keys(cardData).map((key) => (
                            <Tab.Pane eventKey={key} key={key}>
                                <div className='tab-content-wrapper'>
                                    <div className="row d-flex justify-content-center">
                                        {RenderCards(key as TabName)}
                                    </div>
                                </div>
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Tab.Container>
            </div>
            <div className="dashboard-content-wrapper">
                <motion.div
                    className="dashboard-carousel-container-main"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <h5 className="dashboard-title-text-inside">Soluções</h5>
                    {activeKey === 'SOFTWARES LICENCIADOS' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true} interval={5000}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidgroup} alt="NIDGROUP" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nclock} alt="Nclock" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_naccess} alt="Naccess" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nvisitor} alt="Nvisitor" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_npark} alt="Npark" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_ndoor} alt="Ndoor" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_npatrol} alt="Npatrol" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_ncard} alt="Ncard" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nview} alt="Nview" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nsecur} alt="Nsecur" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nsoftware} alt="Nsoftware" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nsystem} alt="Nsystem" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_napp} alt="Napp" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_ncyber} alt="Ncyber" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_ndigital} alt="Ndigital" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nserver} alt="Nserver" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_naut} alt="Naut" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nequip} alt="Nequip" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nproject} alt="Nproject" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nsmart} alt="Nsmart" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nreality} alt="Nreality" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nhologram} alt="Nhologram" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_npower} alt="Npower" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_ncharge} alt="Ncharge" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_ncity} alt="Ncity" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nkiosk} alt="Nkiosk" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nled} alt="Nled" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nfire} alt="Nfire" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nfurniture} alt="Nfurniture" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_npartition} alt="Npartition" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_ndecor} alt="Ndecor" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nping} alt="Nping" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nconnect} alt="Nconnect" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nlight} alt="Nlight" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_ncomfort} alt="Ncomfort" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nsound} alt="Nsound" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nhome} alt="Nhome" />
                            </div>
                        </Carousel>
                    )}
                </motion.div>
                <motion.div
                    className="dashboard-carousel-container-main"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <h5 className="dashboard-title-text-inside">Notícias</h5>
                    {activeKey === 'SOFTWARES LICENCIADOS' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true} interval={30000}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_news} alt="Notícias" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_sisnid} alt="SISNID" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidsof} alt="NIDSOF" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidtec} alt="NIDTEC" />
                            </div>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidplace} alt="NIDPLACE" />
                            </div>
                        </Carousel>
                    )}
                </motion.div>
            </div>
            
        </div>
    );
};