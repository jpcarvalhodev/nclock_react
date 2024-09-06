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
import { Card, Tab, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import nsoftware from '../assets/img/navbar/navbar/nsoftware.webp';
import nsystem from '../assets/img/navbar/navbar/nsystem.webp';
import napp from '../assets/img/navbar/navbar/napp.webp';
import ncyber from '../assets/img/navbar/navbar/ncyber.webp';
import ndigital from '../assets/img/navbar/navbar/ndigital.webp';
import nserver from '../assets/img/navbar/navbar/nserver.webp';
import naut from '../assets/img/navbar/navbar/naut.webp';
import nequip from '../assets/img/navbar/navbar/nequip.webp';
import nproject from '../assets/img/navbar/navbar/nproject.webp';
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
import banner_nout from '../assets/img/carousel/banner_nout.webp';
import banner_nequip from '../assets/img/carousel/banner_nequip.webp';
import banner_nsmart from '../assets/img/carousel/banner_nsmart.webp';
import banner_npro from '../assets/img/carousel/banner_npro.webp';
import banner_npower from '../assets/img/carousel/banner_npower.webp';
import banner_npost from '../assets/img/carousel/banner_npost.webp';
import banner_ncity from '../assets/img/carousel/banner_ncity.webp';
import banner_nkio from '../assets/img/carousel/banner_nkio.webp';
import banner_nled from '../assets/img/carousel/banner_nled.webp';
import banner_nfire from '../assets/img/carousel/banner_nfire.webp';
import banner_nfurniture from '../assets/img/carousel/banner_nfurniture.webp';
import banner_npartition from '../assets/img/carousel/banner_npartition.webp';
import banner_ndecor from '../assets/img/carousel/banner_ndecor.webp';
import banner_nping from '../assets/img/carousel/banner_nping.webp';
import banner_nconnect from '../assets/img/carousel/banner_nconnect.webp';
import banner_ncomfort from '../assets/img/carousel/banner_ncomfort.webp';
import banner_nhome from '../assets/img/carousel/banner_nhome.webp';
import banner_nidgroup from '../assets/img/carousel/banner_nidgroup.jpg';

// Define o tipo TabName
type TabName = 'NIDGROUP' | 'SISNID' | 'NIDSOF' | 'NIDTEC' | 'NIDPLACE';

// Define o tipo CardTitle
type CardTitle = 'Nclock' | 'Naccess' | 'Nvisitor' | 'Npark' | 'Ndoor' | 'Npatrol' | 'Ncard' | 'Nview' | 'Nsecur' | 'Nsoftware' | 'Nsystem' | 'Napp' | 'Ncyber' | 'Ndigital' | 'Nserver' | 'Naut' | 'Nequip' | 'Nproject' | 'Nsmart' | 'Nglasses' | 'Npro' | 'Npower' | 'Npost' | 'Ncity' | 'Nkio' | 'Nled' | 'Nfire' | 'Nfurniture' | 'Npartition' | 'Ndecor' | 'Nping' | 'Nconnect' | 'Nlight' | 'Ncomfort' | 'Nsound' | 'Nhome' | 'Nsoftwares';

// Define o objeto tabData
const tabData: Record<CardTitle, { route: string; tabKey: string; ribbonKey: string }> = {
    Nclock: { route: '/nclock/nclockdashboard', tabKey: 'showNclockTab', ribbonKey: 'showNclockRibbon' },
    Naccess: { route: '/naccess/naccessdashboard', tabKey: 'showNaccessTab', ribbonKey: 'showNaccessRibbon' },
    Nvisitor: { route: '/nvisitor/nvisitordashboard', tabKey: 'showNvisitorTab', ribbonKey: 'showNvisitorRibbon' },
    Npark: { route: '#', tabKey: 'showNparkTab', ribbonKey: 'showNparkRibbon' },
    Ndoor: { route: '#', tabKey: 'showNdoorTab', ribbonKey: 'showNdoorRibbon' },
    Npatrol: { route: '#', tabKey: 'showNpatrolTab', ribbonKey: 'showNpatrolRibbon' },
    Ncard: { route: '#', tabKey: 'showNcardTab', ribbonKey: 'showNcardRibbon' },
    Nview: { route: '#', tabKey: 'showNviewTab', ribbonKey: 'showNviewRibbon' },
    Nsecur: { route: '#', tabKey: 'showNsecurTab', ribbonKey: 'showNsecurRibbon' },
    Nsoftware: { route: '#', tabKey: 'showNsoftwareTab', ribbonKey: 'showNsoftwareRibbon' },
    Nsystem: { route: '#', tabKey: 'showNsystemTab', ribbonKey: 'showNsystemRibbon' },
    Napp: { route: '#', tabKey: 'showNappTab', ribbonKey: 'showNappRibbon' },
    Ncyber: { route: '#', tabKey: 'showNcyberTab', ribbonKey: 'showNcyberRibbon' },
    Ndigital: { route: '#', tabKey: 'showNdigitalTab', ribbonKey: 'showNdigitalRibbon' },
    Nserver: { route: '#', tabKey: 'showNserverTab', ribbonKey: 'showNserverRibbon' },
    Naut: { route: '#', tabKey: 'showNautTab', ribbonKey: 'showNautRibbon' },
    Nequip: { route: '#', tabKey: 'showNequipTab', ribbonKey: 'showNequipRibbon' },
    Nproject: { route: '#', tabKey: 'showNprojectTab', ribbonKey: 'showNprojectRibbon' },
    Nsmart: { route: '#', tabKey: 'showNsmartTab', ribbonKey: 'showNsmartRibbon' },
    Nglasses: { route: '#', tabKey: 'showNglassesTab', ribbonKey: 'showNglassesRibbon' },
    Npro: { route: '#', tabKey: 'showNproTab', ribbonKey: 'showNproRibbon' },
    Npower: { route: '#', tabKey: 'showNpowerTab', ribbonKey: 'showNpowerRibbon' },
    Npost: { route: '#', tabKey: 'showNpostTab', ribbonKey: 'showNpostRibbon' },
    Ncity: { route: '#', tabKey: 'showNcityTab', ribbonKey: 'showNcityRibbon' },
    Nkio: { route: '#', tabKey: 'showNkioTab', ribbonKey: 'showNkioRibbon' },
    Nled: { route: '#', tabKey: 'showNledTab', ribbonKey: 'showNledRibbon' },
    Nfire: { route: '#', tabKey: 'showNfireTab', ribbonKey: 'showNfireRibbon' },
    Nfurniture: { route: '#', tabKey: 'showNfurnitureTab', ribbonKey: 'showNfurnitureRibbon' },
    Npartition: { route: '#', tabKey: 'showNpartitionTab', ribbonKey: 'showNpartitionRibbon' },
    Ndecor: { route: '#', tabKey: 'showNdecorTab', ribbonKey: 'showNdecorRibbon' },
    Nping: { route: '#', tabKey: 'showNpingTab', ribbonKey: 'showNpingRibbon' },
    Nconnect: { route: '#', tabKey: 'showNconnectTab', ribbonKey: 'showNconnectRibbon' },
    Nlight: { route: '#', tabKey: 'showNlightTab', ribbonKey: 'showNlightRibbon' },
    Ncomfort: { route: '#', tabKey: 'showNcomfortTab', ribbonKey: 'showNcomfortRibbon' },
    Nsound: { route: '#', tabKey: 'showNsoundTab', ribbonKey: 'showNsoundRibbon' },
    Nhome: { route: '#', tabKey: 'showNhomeTab', ribbonKey: 'showNhomeRibbon' },
    Nsoftwares: { route: '#', tabKey: 'showSoftwaresTab', ribbonKey: 'showSoftwaresRibbon' }
};

// Função para verificar se o título é válido
const isValidCardTitle = (title: string): title is CardTitle => {
    return title in tabData;
};

// Defina o mapeamento das cores para cada aba
const tabColors: Record<string, { navbarColor: string; footerColor: string }> = {
    nclock: { navbarColor: '#0050a0', footerColor: '#0050a0' },
    naccess: { navbarColor: '#0050a0', footerColor: '#0050a0' },
    nvisitor: { navbarColor: '#0050a0', footerColor: '#0050a0' },
};

// Define a página principal
export const Dashboard = () => {
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState<TabName>('NIDGROUP');
    const [activeTab, setActiveTab] = useState('');

    // Obtenha as cores atuais com base na aba ativa
    const currentColors = tabColors[activeTab] || { navbarColor: '#000000', footerColor: '#000000' };

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
    };

    // Define a função de clique nos cards
    const handleCardClick = (title: string) => {
        if (isValidCardTitle(title)) {
            const tab = tabData[title];
            localStorage.setItem(tab.tabKey, 'true');
            localStorage.setItem(tab.ribbonKey, 'true');
            navigate(tab.route);
        }
    };

    const cardData = {
        'NIDGROUP': [
            { title: 'Nvisitor', img: nvisitor },
            { title: 'Nview', img: nview },
            { title: 'Nkiosk', img: nkio }
        ],
        'SISNID': [
            { title: 'Nclock', img: nclock },
            { title: 'Naccess', img: naccess },
            { title: 'Nvisitor', img: nvisitor },
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
            { title: 'Nsoftwares', img: nidsof }
        ],
        'NIDTEC': [
            { title: 'Nsmart', img: nsmart },
            { title: 'Nglasses', img: nglasses },
            { title: 'Npro', img: npro },
            { title: 'Npower', img: npower },
            { title: 'Npost', img: npost },
            { title: 'Ncity', img: ncity },
            { title: 'Nkiosk', img: nkio },
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
    const renderCards = (tabKey: TabName) => (
        <div className="dashboard-cards-container">
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
    );

    return (
        <div className="dashboard-container">
            <NavBar color={currentColors.navbarColor} onTabChange={handleTabChange} />
            <div className="dashboard-title-text">
                <span>Seja bem vindo aos softwares do NIDGROUP</span>
            </div>
            <div className="dashboard-tabs-container">
                <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k as TabName)}>
                    <Nav variant="pills" className="nav-pills mb-1 justify-content-center align-items-center">
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
                                        {renderCards(key as TabName)}
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
                    {activeKey === 'NIDGROUP' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel" src={banner_nidgroup} alt="NIDGROUP" />
                            </div>
                        </Carousel>
                    )}
                    {activeKey === 'SISNID' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>

                        </Carousel>
                    )}
                    {activeKey === 'NIDSOF' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>

                        </Carousel>
                    )}
                    {activeKey === 'NIDTEC' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>

                        </Carousel>
                    )}
                    {activeKey === 'NIDPLACE' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>

                        </Carousel>
                    )}
                </motion.div>
                <motion.div
                    className="dashboard-carousel-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {activeKey === 'NIDGROUP' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                            <div>
                                <img className="img-carousel" src={banner_sisnid} alt="SISNID" />
                            </div>
                            <div>
                                <img className="img-carousel" src={banner_nidsof} alt="NIDSOF" />
                            </div>
                            <div>
                                <img className="img-carousel" src={banner_nidtec} alt="NIDTEC" />
                            </div>
                            <div>
                                <img className="img-carousel" src={banner_nidplace} alt="NIDPLACE" />
                            </div>
                        </Carousel>
                    )}
                    {activeKey === 'SISNID' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>

                        </Carousel>
                    )}
                    {activeKey === 'NIDSOF' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>

                        </Carousel>
                    )}
                    {activeKey === 'NIDTEC' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>

                        </Carousel>
                    )}
                    {activeKey === 'NIDPLACE' && (
                        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>

                        </Carousel>
                    )}
                </motion.div>
            </div>
            <Footer color={currentColors.footerColor} />
        </div>
    );
};