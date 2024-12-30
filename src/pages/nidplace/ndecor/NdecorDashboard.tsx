import { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

import product_ndecor from "../../../assets/img/carousel/product_ndecor.png";
import naccess from '../../../assets/img/navbar/navbar/naccess.webp';
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
import sisnidlogo from '../../../assets/img/navbar/navbar/sisnidlogo.webp';
import ncount from '../../../assets/img/navbar/navbar/ncount.png';
import nbuild from '../../../assets/img/navbar/navbar/nbuild.png';
import ncaravan from '../../../assets/img/navbar/navbar/ncaravan.png';
import ncard from '../../../assets/img/navbar/navbar/ncard.webp';
import nmechanic from '../../../assets/img/navbar/navbar/nmechanic.png';
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
import nclock from '../../../assets/img/navbar/navbar/nclock.webp';
import ndoor from '../../../assets/img/navbar/navbar/ndoor.webp';
import nevents from '../../../assets/img/navbar/navbar/nevents.png';
import noptics from '../../../assets/img/navbar/navbar/noptics.png';
import ngold from '../../../assets/img/navbar/navbar/ngold.png';
import npark from '../../../assets/img/navbar/navbar/npark.webp';
import npatrol from '../../../assets/img/navbar/navbar/npatrol.webp';
import nview from '../../../assets/img/navbar/navbar/nview.webp';
import nvisitor from '../../../assets/img/navbar/navbar/nvisitor.webp';
import { CardContainer } from "../../../components/CardContainer";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { useNavbar } from "../../../context/NavbarContext";

// Define o tipo TabName
type TabName = 'SISNID - Segurança' | 'NIDSOF - Gestão' | 'NIDTEC - Tecnologia' | 'NIDPLACE - Conforto';

// Define o tipo CardTitle
type CardTitle = 'Quiosques' | 'Torniquetes' | 'Vigilância' | 'Alarmes' |
    'Assiduidade' | 'Acessos' | 'Parques' | 'Automatismos' | 'Rondas' | 'Cartões' | 'NSoftwares' | 
    'Programação' | 'Sistemas' | 'Aplicativos' | 'Cibernética' | 'Transformação' | 'Integração' |
    'Automação' | 'Equipamentos' | 'Projetos' | 'Contador' | 'Obras' | 'Autocaravanas' | 'Oficinas' |
    'Eventos' | 'Serviços' | 'Tarefas' | 'Produção' | 'Bilhetes' | 'CRM' | 'Faturação' | 'Documental' |
    'Desporto' | 'Ginásios' | 'Escolar' | 'Clínicas' | 'Ópticas' | 'Ourivesarias' |
    'Inteligência' | 'Virtual' | 'Hologramas' | 'Energias' | 'Recarga' | 'Mobilidade' |
    'Painéis' | 'Incêndios' |
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
    Painéis: { route: '/nled/nleddashboard', tabKey: 'showNledTab', ribbonKey: 'showNledRibbon' },
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

export const NdecorDashboard = () => {
    const { navbarColor, footerColor } = useNavbar();
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState<TabName>('NIDPLACE - Conforto');

    // Define a função de clique nos cards
    const handleCardClick = (title: string) => {
        if (isValidCardTitle(title)) {
            const tab = tabData[title];
            let route = tab.route;          

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
        'SISNID - Segurança': [
            { title: 'Assiduidade', img: nclock, tab: 'nclock' },
            { title: 'Acessos', img: naccess, tab: 'naccess' },
            { title: 'Torniquetes', img: nvisitor, tab: 'nvisitor' },
            { title: 'Parques', img: npark, tab: 'npark' },
            { title: 'Automatismos', img: ndoor, tab: 'ndoor' },
            { title: 'Rondas', img: npatrol, tab: 'npatrol' },
            { title: 'Cartões', img: ncard, tab: 'ncard' },
            { title: 'Vigilância', img: nview, tab: 'nview' },
            { title: 'Alarmes', img: nsecur, tab: 'nsecur' },
            { title: 'NSoftwares', img: sisnidlogo }
        ],
        'NIDSOF - Gestão': [
            { title: 'Programação', img: nsoftware, tab: 'nsoftware' },
            { title: 'Sistemas', img: nsystem, tab: 'nsystem' },
            { title: 'Aplicativos', img: napp, tab: 'napp' },
            { title: 'Cibernética', img: ncyber, tab: 'ncyber' },
            { title: 'Transformação', img: ndigital, tab: 'ndigital' },
            { title: 'Integração', img: nserver, tab: 'nserver' },
            { title: 'Automação', img: naut, tab: 'naut' },
            { title: 'Equipamentos', img: nequip, tab: 'nequip' },
            { title: 'Projetos', img: nproject, tab: 'nproject' },
            { title: 'NSoftwares', img: nidsof },
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
        ],
        'NIDTEC - Tecnologia': [
            { title: 'Inteligência', img: nsmart, tab: 'nsmart' },
            { title: 'Virtual', img: nreality, tab: 'nreality' },
            { title: 'Hologramas', img: nhologram, tab: 'nhologram' },
            { title: 'Energias', img: npower, tab: 'npower' },
            { title: 'Recarga', img: ncharge, tab: 'ncharge' },
            { title: 'Mobilidade', img: ncity, tab: 'ncity' },
            { title: 'Quiosques', img: nkiosk, tab: 'nkiosk' },
            { title: 'Painéis', img: nled, tab: 'nled' },
            { title: 'Incêndios', img: nfire, tab: 'nfire' },
            { title: 'NSoftwares', img: nidtec, tab: 'nidtec' }
        ],
        'NIDPLACE - Conforto': [
            { title: 'Mobiliário', img: nfurniture, tab: 'nfurniture' },
            { title: 'Divisórias', img: npartition, tab: 'npartition' },
            { title: 'Design', img: ndecor, tab: 'ndecor' },
            { title: 'Redes', img: nping, tab: 'nping' },
            { title: 'Electricidade', img: nconnect, tab: 'nconnect' },
            { title: 'Iluminação', img: nlight, tab: 'nlight' },
            { title: 'Climatização', img: ncomfort, tab: 'ncomfort' },
            { title: 'Áudio', img: nsound, tab: 'nsound' },
            { title: 'Domótica', img: nhome, tab: 'nhome' },
            { title: 'NSoftwares', img: nidplace }
        ]
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div style={{ marginBottom: 10 }}></div>
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
                                        <CardContainer cards={cardData[key as TabName]} handleCardClick={handleCardClick} />
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
                            <img className="img-carousel" src={product_ndecor} alt="Ndecor" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE NDECOR - Design de Interiores</h3>
                    <p className="dashboard-text-inside">
                        O Ndecor é um software dedicado à Decoração de Interiores. Ele permite-lhe:
                    </p>
                    <p>- Manipular visualmente conteúdos multimédia;</p>
                    <p>- Manipular com realidade virtual;</p>
                    <p>- Projetar imagens 3D mais detalhadas;</p>
                    <p>- Criar uma biblioteca virtual com o próprio estúdio.</p>
                    <p style={{ marginTop: 30 }}>Para mais detalhes do software, visite o site <a href="https://nidplace.pt/produto/software-ndecor/" target="_blank" rel="noopener noreferrer">aqui</a></p>
                    <p style={{ marginTop: 30 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}