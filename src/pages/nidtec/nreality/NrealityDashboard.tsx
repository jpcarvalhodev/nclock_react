import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nreality from "../../../assets/img/carousel/product_nreality.webp";
import { useColor } from "../../../context/ColorContext";
import { Card, Nav, Tab } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import nclock from '../../../assets/img/navbar/navbar/nclock.webp';
import naccess from '../../../assets/img/navbar/navbar/naccess.webp';
import nvisitor from '../../../assets/img/navbar/navbar/nvisitor.webp';
import npark from '../../../assets/img/navbar/navbar/npark.webp';
import ndoor from '../../../assets/img/navbar/navbar/ndoor.webp';
import npatrol from '../../../assets/img/navbar/navbar/npatrol.webp';
import ncard from '../../../assets/img/navbar/navbar/ncard.webp';
import nview from '../../../assets/img/navbar/navbar/nview.webp';
import nsecur from '../../../assets/img/navbar/navbar/nsecur.webp';
import nsoftware from '../../../assets/img/navbar/navbar/nsoftware.webp';
import nsystem from '../../../assets/img/navbar/navbar/nsystem.webp';
import napp from '../../../assets/img/navbar/navbar/napp.webp';
import ncyber from '../../../assets/img/navbar/navbar/ncyber.webp';
import ndigital from '../../../assets/img/navbar/navbar/ndigital.webp';
import nserver from '../../../assets/img/navbar/navbar/nserver.webp';
import naut from '../../../assets/img/navbar/navbar/naut.webp';
import nequip from '../../../assets/img/navbar/navbar/nequip.webp';
import nproject from '../../../assets/img/navbar/navbar/nproject.webp';
import nsmart from '../../../assets/img/navbar/navbar/nsmart.webp';
import nreality from '../../../assets/img/navbar/navbar/nreality.webp';
import nhologram from '../../../assets/img/navbar/navbar/nhologram.webp';
import npower from '../../../assets/img/navbar/navbar/npower.webp';
import ncharge from '../../../assets/img/navbar/navbar/ncharge.webp';
import ncity from '../../../assets/img/navbar/navbar/ncity.png';
import nkiosk from '../../../assets/img/navbar/navbar/nkiosk.webp';
import nled from '../../../assets/img/navbar/navbar/nled.webp';
import nfire from '../../../assets/img/navbar/navbar/nfire.webp';
import nfurniture from '../../../assets/img/navbar/navbar/nfurniture.webp';
import npartition from '../../../assets/img/navbar/navbar/npartition.webp';
import ndecor from '../../../assets/img/navbar/navbar/ndecor.webp';
import nping from '../../../assets/img/navbar/navbar/nping.webp';
import nconnect from '../../../assets/img/navbar/navbar/nconnect.webp';
import nlight from '../../../assets/img/navbar/navbar/nlight.webp';
import ncomfort from '../../../assets/img/navbar/navbar/ncomfort.webp';
import nsound from '../../../assets/img/navbar/navbar/nsound.webp';
import nhome from '../../../assets/img/navbar/navbar/nhome.webp';
import nidsof from '../../../assets/img/navbar/navbar/nidsof.webp';
import nidtec from '../../../assets/img/navbar/navbar/nidtec.png';
import nidplace from '../../../assets/img/navbar/navbar/nidplace.webp';
import sisnidlogo from '../../../assets/img/navbar/navbar/sisnidlogo.png';
import nidgroup from '../../../assets/img/navbar/navbar/nidgroup.png';
import ncount from '../../../assets/img/navbar/navbar/ncount.png';
import nbuild from '../../../assets/img/navbar/navbar/nbuild.png';
import ncaravan from '../../../assets/img/navbar/navbar/ncaravan.png';
import nmechanic from '../../../assets/img/navbar/navbar/nmechanic.png';
import nevents from '../../../assets/img/navbar/navbar/nevents.png';
import nservice from '../../../assets/img/navbar/navbar/nservice.png';
import ntask from '../../../assets/img/navbar/navbar/ntask.png';
import nproduction from '../../../assets/img/navbar/navbar/nproduction.png';
import nticket from '../../../assets/img/navbar/navbar/nticket.png';
import nsales from '../../../assets/img/navbar/navbar/nsales.png';
import ninvoice from '../../../assets/img/navbar/navbar/ninvoice.png';
import ndoc from '../../../assets/img/navbar/navbar/ndoc.png';
import nsports from '../../../assets/img/navbar/navbar/nsports.png';
import ngym from '../../../assets/img/navbar/navbar/ngym.png';
import nschool from '../../../assets/img/navbar/navbar/nschool.png';
import nclinic from '../../../assets/img/navbar/navbar/nclinic.png';
import noptics from '../../../assets/img/navbar/navbar/noptics.png';
import ngold from '../../../assets/img/navbar/navbar/ngold.png';

// Define o tipo TabName
type TabName = 'CLIENTE' | 'SISNID' | 'NIDSOF' | 'NIDTEC' | 'NIDPLACE';

// Define o tipo CardTitle
type CardTitle = 'Início' | 'Nclock' | 'Naccess' | 'Nvisitor' | 'Npark' | 'Ndoor' | 'Npatrol' | 'Ncard' | 'Nview' | 'Nsecur' | 'Nsoftware' | 'Nsystem' | 'Napp' | 'Ncyber' | 'Ndigital' | 'Nserver' | 'Naut' | 'Nequip' | 'Nproject' | 'Ncount' | 'Nbuild' | 'Ncaravan' | 'Nmechanic' | 'Nevents' | 'Nservice' | 'Ntask' | 'Nproduction' | 'Nticket' | 'Nsales' | 'Ninvoice' | 'Ndoc' | 'Nsports' | 'Ngym' | 'Nschool' | 'Nclinic' | 'Noptics' | 'Ngold' | 'Nsmart' | 'Nreality' | 'Nhologram' | 'Npower' | 'Ncharge' | 'Ncity' | 'Nkiosk' | 'Nled' | 'Nfire' | 'Nfurniture' | 'Npartition' | 'Ndecor' | 'Nping' | 'Nconnect' | 'Nlight' | 'Ncomfort' | 'Nsound' | 'Nhome' | 'Nsoftwares';

// Define o objeto tabData
const tabData: Record<CardTitle, { route: string; tabKey: string; ribbonKey: string }> = {
    Início: { route: '/dashboard', tabKey: '', ribbonKey: '' },
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

export const NrealityDashboard = () => {
    const { navbarColor, footerColor } = useColor();
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState<TabName>('NIDTEC');

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
            { title: 'Início', img: nidgroup, tab: '' },
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
            { title: 'Nsoftwares', img: nidsof }
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
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Nreality Dashboard</span>
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
                                        {renderCards(key as TabName)}
                                    </div>
                                </div>
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Tab.Container>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nreality} alt="Nreality" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE REALIDADE VIRTUAL- NREALITY</h3>
                    <p className="dashboard-text-inside">
                        O Nreality é um software dedicado à Realidade Virtual (RV) da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Criar uma vantagem competitiva, face aos seus concorrentes, pois inclui o seu cliente no projeto;</p>
                    <p>- Acompanhar a evolução do setor de atuação;</p>
                    <p>- Manter um investimento inicial reduzido;</p>
                    <p>- Reduzir o (re)trabalho, ao permitir uma pré-visualização;</p>
                    <p>- Simular cenários reais controlados.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}