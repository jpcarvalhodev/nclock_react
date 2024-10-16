import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import nclock from '../assets/img/navbar/navbar/nclock.webp';
import naccess from '../assets/img/navbar/navbar/naccess.webp';
import nvisitor from '../assets/img/navbar/navbar/nvisitor.webp';
import npark from '../assets/img/navbar/navbar/npark.webp';
import ndoor from '../assets/img/navbar/navbar/ndoor.webp';
import npatrol from '../assets/img/navbar/navbar/npatrol.webp';
import ncard from '../assets/img/navbar/navbar/ncard.webp';
import nview from '../assets/img/navbar/navbar/nview.webp';
import nsecur from '../assets/img/navbar/navbar/nsecur.webp';
import { Card, Tab, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import nsoftware from '../assets/img/navbar/navbar/nsoftware.webp';
import nsystem from '../assets/img/navbar/navbar/nsystem.webp';
import napp from '../assets/img/navbar/navbar/napp.webp';
import ncyber from '../assets/img/navbar/navbar/ncyber.webp';
import ndigital from '../assets/img/navbar/navbar/ndigital.webp';
import nserver from '../assets/img/navbar/navbar/nserver.webp';
import naut from '../assets/img/navbar/navbar/naut.webp';
import nequip from '../assets/img/navbar/navbar/nequip.webp';
import nproject from '../assets/img/navbar/navbar/nproject.webp';
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
import npartition from '../assets/img/navbar/navbar/npartition.webp';
import ndecor from '../assets/img/navbar/navbar/ndecor.webp';
import nping from '../assets/img/navbar/navbar/nping.webp';
import nconnect from '../assets/img/navbar/navbar/nconnect.webp';
import nlight from '../assets/img/navbar/navbar/nlight.webp';
import ncomfort from '../assets/img/navbar/navbar/ncomfort.webp';
import nsound from '../assets/img/navbar/navbar/nsound.webp';
import nhome from '../assets/img/navbar/navbar/nhome.webp';
import nidsof from '../assets/img/navbar/navbar/nidsof.webp';
import nidtec from '../assets/img/navbar/navbar/nidtec.png';
import nidplace from '../assets/img/navbar/navbar/nidplace.webp';
import sisnidlogo from '../assets/img/navbar/navbar/sisnidlogo.png';
import banner_nidgroup from '../assets/img/carousel/banner_nidgroup.jpg';
import banner_nclock from '../assets/img/carousel/banner_nclock.jpg';
import banner_naccess from '../assets/img/carousel/banner_naccess.jpg';
import banner_nvisitor from '../assets/img/carousel/banner_nvisitor.jpg';
import banner_npark from '../assets/img/carousel/banner_npark.jpg';
import banner_ndoor from '../assets/img/carousel/banner_ndoor.jpg';
import banner_npatrol from '../assets/img/carousel/banner_npatrol.jpg';
import banner_ncard from '../assets/img/carousel/banner_ncard.jpg';
import banner_nview from '../assets/img/carousel/banner_nview.jpg';
import banner_nsecur from '../assets/img/carousel/banner_nsecur.jpg';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import banner_sisnid from '../assets/img/carousel/banner_sisnid.jpg';
import banner_nidsof from '../assets/img/carousel/banner_nidsof.webp';
import banner_nidtec from '../assets/img/carousel/banner_nidtec.webp';
import banner_nidplace from '../assets/img/carousel/banner_nidplace.webp';
import banner_nsoftware from '../assets/img/carousel/banner_nsoftware.webp';
import banner_nsystem from '../assets/img/carousel/banner_nsystem.webp';
import banner_napp from '../assets/img/carousel/banner_napp.webp';
import banner_ncyber from '../assets/img/carousel/banner_ncyber.webp';
import banner_ndigital from '../assets/img/carousel/banner_ndigital.webp';
import banner_nserver from '../assets/img/carousel/banner_nserver.webp';
import banner_naut from '../assets/img/carousel/banner_naut.webp';
import banner_nequip from '../assets/img/carousel/banner_nequip.jpg';
import banner_nproject from '../assets/img/carousel/banner_nproject.webp';
import banner_nsmart from '../assets/img/carousel/banner_nsmart.webp';
import banner_nreality from '../assets/img/carousel/banner_nreality.jpg';
import banner_nhologram from '../assets/img/carousel/banner_nhologram.jpg';
import banner_npower from '../assets/img/carousel/banner_npower.webp';
import banner_ncharge from '../assets/img/carousel/banner_ncharge.webp';
import banner_ncity from '../assets/img/carousel/banner_ncity.webp';
import banner_nkiosk from '../assets/img/carousel/banner_nkiosk.jpg';
import banner_nled from '../assets/img/carousel/banner_nled.jpg';
import banner_nfire from '../assets/img/carousel/banner_nfire.jpg';
import banner_nfurniture from '../assets/img/carousel/banner_nfurniture.jpg';
import banner_npartition from '../assets/img/carousel/banner_npartition.jpg';
import banner_ndecor from '../assets/img/carousel/banner_ndecor.jpg';
import banner_nping from '../assets/img/carousel/banner_nping.jpg';
import banner_nconnect from '../assets/img/carousel/banner_nconnect.jpg';
import banner_nlight from '../assets/img/carousel/banner_nlight.jpg';
import banner_ncomfort from '../assets/img/carousel/banner_ncomfort.jpg';
import banner_nsound from '../assets/img/carousel/banner_nsound.jpg';
import banner_nhome from '../assets/img/carousel/banner_nhome.jpg';
import { useColor } from "../context/ColorContext";

// Define o tipo TabName
type TabName = 'CLIENTE' | 'SISNID' | 'NIDSOF' | 'NIDTEC' | 'NIDPLACE';

// Define o tipo CardTitle
type CardTitle = 'Nclock' | 'Naccess' | 'Nvisitor' | 'Npark' | 'Ndoor' | 'Npatrol' | 'Ncard' | 'Nview' | 'Nsecur' | 'Nsoftware' | 'Nsystem' | 'Napp' | 'Ncyber' | 'Ndigital' | 'Nserver' | 'Naut' | 'Nequip' | 'Nproject' | 'Ncount' | 'Nbuild' | 'Ncaravan' | 'Nmechanic' | 'Nevents' | 'Nservice' | 'Ntask' | 'Nproduction' | 'Nticket' | 'Nsales' | 'Ninvoice' | 'Ndoc' | 'Nsports' | 'Ngym' | 'Nschool' | 'Nclinic' | 'Noptics' | 'Ngold' | 'Nsmart' | 'Nreality' | 'Nhologram' | 'Npower' | 'Ncharge' | 'Ncity' | 'Nkiosk' | 'Nled' | 'Nfire' | 'Nfurniture' | 'Npartition' | 'Ndecor' | 'Nping' | 'Nconnect' | 'Nlight' | 'Ncomfort' | 'Nsound' | 'Nhome' | 'Nsoftwares';

// Define o objeto tabData
const tabData: Record<CardTitle, { route: string; tabKey: string; ribbonKey: string }> = {
    Nclock: { route: '/nclock/nclockdashboard', tabKey: 'showNclockTab', ribbonKey: 'showNclockRibbon' },
    Naccess: { route: '/naccess/naccessdashboard', tabKey: 'showNaccessTab', ribbonKey: 'showNaccessRibbon' },
    Nvisitor: { route: '/nvisitor/nvisitordashboard', tabKey: 'showNvisitorTab', ribbonKey: 'showNvisitorRibbon' },
    Npark: { route: '/npark/nparkdashboard', tabKey: 'showNparkTab', ribbonKey: 'showNparkRibbon' },
    Ndoor: { route: '/ndoor/ndoordashboard', tabKey: 'showNdoorTab', ribbonKey: 'showNdoorRibbon' },
    Npatrol: { route: '/npatrol/npatroldashboard', tabKey: 'showNpatrolTab', ribbonKey: 'showNpatrolRibbon' },
    Ncard: { route: '/ncard/ncarddashboard', tabKey: 'showNcardTab', ribbonKey: 'showNcardRibbon' },
    Nview: { route: '/nview/nviewdashboard', tabKey: 'showNviewTab', ribbonKey: 'showNviewRibbon' },
    Nsecur: { route: '/nsecur/nsecurdashboard', tabKey: 'showNsecurTab', ribbonKey: 'showNsecurRibbon' },
    Nsoftware: { route: '/nsoftware/nsoftwaredashboard', tabKey: 'showNsoftwareTab', ribbonKey: 'showNsoftwareRibbon' },
    Nsystem: { route: '/nsystem/nsystemdashboard', tabKey: 'showNsystemTab', ribbonKey: 'showNsystemRibbon' },
    Napp: { route: '/napp/nappdashboard', tabKey: 'showNappTab', ribbonKey: 'showNappRibbon' },
    Ncyber: { route: '/ncyber/ncyberdashboard', tabKey: 'showNcyberTab', ribbonKey: 'showNcyberRibbon' },
    Ndigital: { route: '/ndigital/ndigitaldashboard', tabKey: 'showNdigitalTab', ribbonKey: 'showNdigitalRibbon' },
    Nserver: { route: '/nserver/nserverdashboard', tabKey: 'showNserverTab', ribbonKey: 'showNserverRibbon' },
    Naut: { route: '/naut/nautdashboard', tabKey: 'showNautTab', ribbonKey: 'showNautRibbon' },
    Nequip: { route: '/nequip/nequipdashboard', tabKey: 'showNequipTab', ribbonKey: 'showNequipRibbon' },
    Nproject: { route: '/nproject/nprojectdashboard', tabKey: 'showNprojectTab', ribbonKey: 'showNprojectRibbon' },
    Ncount: { route: '/ncount/ncountdashboard', tabKey: 'showNcountTab', ribbonKey: 'showNcountRibbon' },
    Nbuild: { route: '/nbuild/nbuilddashboard', tabKey: 'showNbuildTab', ribbonKey: 'showNbuildRibbon' },
    Ncaravan: { route: '/ncaravan/ncaravandashboard', tabKey: 'showNcaravanTab', ribbonKey: 'showNcaravanRibbon' },
    Nmechanic: { route: '/nmechanic/nmechanicdashboard', tabKey: 'showNmechanicTab', ribbonKey: 'showNmechanicRibbon' },
    Nevents: { route: '/nevents/neventsdashboard', tabKey: 'showNeventsTab', ribbonKey: 'showNeventsRibbon' },
    Nservice: { route: '/nservice/nservicedashboard', tabKey: 'showNserviceTab', ribbonKey: 'showNserviceRibbon' },
    Ntask: { route: '/ntask/ntaskdashboard', tabKey: 'showNtaskTab', ribbonKey: 'showNtaskRibbon' },
    Nproduction: { route: '/nproduction/nproductiondashboard', tabKey: 'showNproductionTab', ribbonKey: 'showNproductionRibbon' },
    Nticket: { route: '/nticket/nticketdashboard', tabKey: 'showNticketTab', ribbonKey: 'showNticketRibbon' },
    Nsales: { route: '/nsales/nsalesdashboard', tabKey: 'showNsalesTab', ribbonKey: 'showNsalesRibbon' },
    Ninvoice: { route: '/ninvoice/ninvoicedashboard', tabKey: 'showNinvoiceTab', ribbonKey: 'showNinvoiceRibbon' },
    Ndoc: { route: '/ndoc/ndocdashboard', tabKey: 'showNdocTab', ribbonKey: 'showNdocRibbon' },
    Nsports: { route: '/nsports/nsportsdashboard', tabKey: 'showNsportsTab', ribbonKey: 'showNsportsRibbon' },
    Ngym: { route: '/ngym/ngymdashboard', tabKey: 'showNgymTab', ribbonKey: 'showNgymRibbon' },
    Nschool: { route: '/nschool/nschooldashboard', tabKey: 'showNschoolTab', ribbonKey: 'showNschoolRibbon' },
    Nclinic: { route: '/nclinic/nclinicdashboard', tabKey: 'showNclinicTab', ribbonKey: 'showNclinicRibbon' },
    Noptics: { route: '/noptics/nopticsdashboard', tabKey: 'showNopticsTab', ribbonKey: 'showNopticsRibbon' },
    Ngold: { route: '/ngold/ngolddashboard', tabKey: 'showNgoldTab', ribbonKey: 'showNgoldRibbon' },
    Nsmart: { route: '/nsmart/nsmartdashboard', tabKey: 'showNsmartTab', ribbonKey: 'showNsmartRibbon' },
    Nreality: { route: '/nreality/nrealitydashboard', tabKey: 'showNrealityTab', ribbonKey: 'showNrealityRibbon' },
    Nhologram: { route: '/nhologram/nhologramdashboard', tabKey: 'showNhologramTab', ribbonKey: 'showNhologramRibbon' },
    Npower: { route: '/npower/npowerdashboard', tabKey: 'showNpowerTab', ribbonKey: 'showNpowerRibbon' },
    Ncharge: { route: '/ncharge/nchargedashboard', tabKey: 'showNchargeTab', ribbonKey: 'showNchargeRibbon' },
    Ncity: { route: '/ncity/ncitydashboard', tabKey: 'showNcityTab', ribbonKey: 'showNcityRibbon' },
    Nkiosk: { route: '/nkiosk/nkioskdashboard', tabKey: 'showNkioskTab', ribbonKey: 'showNkioskRibbon' },
    Nled: { route: '/nled/nleddashboard', tabKey: 'showNledTab', ribbonKey: 'showNledRibbon' },
    Nfire: { route: '/nfire/nfiredashboard', tabKey: 'showNfireTab', ribbonKey: 'showNfireRibbon' },
    Nfurniture: { route: '/nfurniture/nfurnituredashboard', tabKey: 'showNfurnitureTab', ribbonKey: 'showNfurnitureRibbon' },
    Npartition: { route: '/npartition/npartitiondashboard', tabKey: 'showNpartitionTab', ribbonKey: 'showNpartitionRibbon' },
    Ndecor: { route: '/ndecor/ndecordashboard', tabKey: 'showNdecorTab', ribbonKey: 'showNdecorRibbon' },
    Nping: { route: '/nping/npingdashboard', tabKey: 'showNpingTab', ribbonKey: 'showNpingRibbon' },
    Nconnect: { route: '/nconnect/nconnectdashboard', tabKey: 'showNconnectTab', ribbonKey: 'showNconnectRibbon' },
    Nlight: { route: '/nlight/nlightdashboard', tabKey: 'showNlightTab', ribbonKey: 'showNlightRibbon' },
    Ncomfort: { route: '/ncomfort/ncomfortdashboard', tabKey: 'showNcomfortTab', ribbonKey: 'showNcomfortRibbon' },
    Nsound: { route: '/nsound/nsounddashboard', tabKey: 'showNsoundTab', ribbonKey: 'showNsoundRibbon' },
    Nhome: { route: '/nhome/nhomedashboard', tabKey: 'showNhomeTab', ribbonKey: 'showNhomeRibbon' },
    Nsoftwares: { route: '#', tabKey: 'showSoftwaresTab', ribbonKey: 'showSoftwaresRibbon' }
};

// Função para verificar se o título é válido
const isValidCardTitle = (title: string): title is CardTitle => {
    return title in tabData;
};

// Define a página principal
export const Dashboard = () => {
    const { navbarColor, footerColor } = useColor();
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState<TabName>('CLIENTE');

    // Define a função de clique nos cards
    const handleCardClick = (title: string) => {
        if (isValidCardTitle(title)) {
            const tab = tabData[title];
            localStorage.setItem(tab.tabKey, 'true');
            localStorage.setItem(tab.ribbonKey, 'true');
            localStorage.setItem('activeTab', title.toLowerCase());
            navigate(tab.route);
        }
    };

    const cardData = {
        'CLIENTE': [
            { title: 'Nkiosk', img: nkiosk, tab: 'nkiosk' },
            { title: 'Nclock', img: nclock, tab: 'nclock' },
            { title: 'Naccess', img: naccess, tab: 'naccess' },
            { title: 'Nvisitor', img: nvisitor, tab: 'nvisitor' },
            { title: 'Nview', img: nview, tab: 'nview' },
        ],
        'SISNID': [
            { title: 'Nclock', img: nclock, tab: 'nclock' },
            { title: 'Naccess', img: naccess, tab: 'naccess' },
            { title: 'Nvisitor', img: nvisitor, tab: 'nvisitor' },
            { title: 'Npark', img: npark },
            { title: 'Ndoor', img: ndoor },
            { title: 'Npatrol', img: npatrol },
            { title: 'Ncard', img: ncard },
            { title: 'Nview', img: nview },
            { title: 'Nsecur', img: nsecur },
            { title: 'Nsoftwares', img: sisnidlogo }
        ],
        'NIDSOF': [
            { title: 'Nsoftware', img: nsoftware },
            { title: 'Nsystem', img: nsystem },
            { title: 'Napp', img: napp },
            { title: 'Ncyber', img: ncyber },
            { title: 'Ndigital', img: ndigital },
            { title: 'Nserver', img: nserver },
            { title: 'Naut', img: naut },
            { title: 'Nequip', img: nequip },
            { title: 'Nproject', img: nproject },
            { title: 'Ncount', img: ncount },
            { title: 'Nbuild', img: nbuild },
            { title: 'Ncaravan', img: ncaravan },
            { title: 'Nmechanic', img: nmechanic },
            { title: 'Nevents', img: nevents },
            { title: 'Nservice', img: nservice },
            { title: 'Ntask', img: ntask },
            { title: 'Nproduction', img: nproduction },
            { title: 'Nticket', img: nticket },
            { title: 'Nsales', img: nsales },
            { title: 'Ninvoice', img: ninvoice },
            { title: 'Ndoc', img: ndoc },
            { title: 'Nsports', img: nsports },
            { title: 'Ngym', img: ngym },
            { title: 'Nschool', img: nschool },
            { title: 'Nclinic', img: nclinic },
            { title: 'Noptics', img: noptics },
            { title: 'Ngold', img: ngold },
            { title: 'Nsoftwares', img: nidsof },
        ],
        'NIDTEC': [
            { title: 'Nsmart', img: nsmart },
            { title: 'Nreality', img: nreality },
            { title: 'Nhologram', img: nhologram },
            { title: 'Npower', img: npower },
            { title: 'Ncharge', img: ncharge },
            { title: 'Ncity', img: ncity },
            { title: 'Nkiosk', img: nkiosk },
            { title: 'Nled', img: nled },
            { title: 'Nfire', img: nfire },
            { title: 'Nsoftwares', img: nidtec }
        ],
        'NIDPLACE': [
            { title: 'Nfurniture', img: nfurniture },
            { title: 'Npartition', img: npartition },
            { title: 'Ndecor', img: ndecor },
            { title: 'Nping', img: nping },
            { title: 'Nconnect', img: nconnect },
            { title: 'Nlight', img: nlight },
            { title: 'Ncomfort', img: ncomfort },
            { title: 'Nsound', img: nsound },
            { title: 'Nhome', img: nhome },
            { title: 'Nsoftwares', img: nidplace }
        ]
    };

    // Função para renderizar os cards com base na aba ativa
    const RenderCards = (tabKey: TabName) => {
        const cardContainerRef = useRef<HTMLDivElement>(null);

        const scrollLeft = () => {
            if (cardContainerRef.current) {
                cardContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
            }
        };

        const scrollRight = () => {
            if (cardContainerRef.current) {
                cardContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
            }
        };

        const cards = cardData[tabKey];
        const numCards = cards.length;

        const alignmentClass = numCards <= 10 ? 'cards-center' : 'cards-left';

        return (
            <div className="dashboard-cards-container">
                {numCards > 10 && (
                    <Button id="arrow-cards" className="arrows-cards" onClick={scrollLeft}>{"<"}</Button>
                )}
                <div id="cardContainer" className={`card-container ${alignmentClass}`} ref={cardContainerRef}>
                    {cardData[tabKey].map((card, index) => (
                        <div onClick={() => handleCardClick(card.title)} className="card-link" key={index}>
                            <Card className="card">
                                <Card.Img variant="top" src={card.img} className="card-img" />
                                <Card.Body>
                                    <Card.Title className="card-title">{card.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                {numCards > 10 && (
                    <Button className="arrows-cards" onClick={scrollRight}>{">"}</Button>
                )}
            </div>
        );
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text">
                <span>Seja bem vindo aos softwares do NIDGROUP</span>
            </div>
            <div className="dashboard-tabs-container">
                <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k as TabName)}>
                    <Nav variant="pills" className="nav-pills justify-content-center align-items-center">
                        {Object.keys(cardData).map((key) => (
                            <Nav.Item key={key}>
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
                    className="dashboard-carousel-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <h5 className="dashboard-title-text-inside">Soluções</h5>
                    {activeKey === 'CLIENTE' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidgroup} alt="NIDGROUP" />
                            </div>
                        </Carousel>
                    )}
                    {activeKey === 'SISNID' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_sisnid} alt="SISNID" />
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
                        </Carousel>
                    )}
                    {activeKey === 'NIDSOF' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidsof} alt="NIDSOF" />
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
                        </Carousel>
                    )}
                    {activeKey === 'NIDTEC' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidtec} alt="NIDTEC" />
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
                        </Carousel>
                    )}
                    {activeKey === 'NIDPLACE' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidplace} alt="NIDPLACE" />
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
                    className="dashboard-carousel-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <h5 className="dashboard-title-text-inside">Notícias</h5>
                    {activeKey === 'CLIENTE' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
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
                    {activeKey === 'SISNID' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_sisnid} alt="SISNID" />
                            </div>
                        </Carousel>
                    )}
                    {activeKey === 'NIDSOF' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidsof} alt="NIDSOF" />
                            </div>
                        </Carousel>
                    )}
                    {activeKey === 'NIDTEC' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidtec} alt="NIDTEC" />
                            </div>
                        </Carousel>
                    )}
                    {activeKey === 'NIDPLACE' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel-dashboard" src={banner_nidplace} alt="NIDPLACE" />
                            </div>
                        </Carousel>
                    )}
                </motion.div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
};