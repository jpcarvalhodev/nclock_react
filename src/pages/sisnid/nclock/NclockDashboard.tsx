import { useEffect, useRef, useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, setYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { Employee, Department, Group } from "../../../helpers/Types";
import * as apiService from "../../../helpers/apiService";
import { Carousel } from "react-responsive-carousel";
import banner_nclock from "../../../assets/img/carousel/banner_nclock.jpg";
import { useColor } from "../../../context/ColorContext";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, PieController, BarController } from 'chart.js';
import { Button, Card, Nav, Tab } from "react-bootstrap";
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

// Registra os elementos do ChartJS
ChartJS.register(PieController, ArcElement, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

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

// Define a linguagem do calendário
const locales = {
    'pt': ptBR,
};

// Define o localizador de datas
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// Define a interface CalendarEvent
interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
}

// Define as mensagens do calendário em português
const messages = {
    allDay: 'Todo o dia',
    previous: '<',
    next: '>',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'Não há eventos neste intervalo',
    showMore: (total: number) => `+ Ver mais (${total})`
};

// Define a página principal
export const NclockDashboard = () => {
    const { navbarColor, footerColor } = useColor();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [totalEmployees, setTotalEmployees] = useState<number>(0);
    const [totalDepartments, setTotalDepartments] = useState<number>(0);
    const [totalGroups, setTotalGroups] = useState<number>(0);
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState<TabName>('SISNID');

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

    // Função para buscar os eventos dos funcionários
    const fetchEvents = async (): Promise<CalendarEvent[]> => {
        try {
            const employees: Employee[] = await apiService.fetchAllEmployees();
            setTotalEmployees(employees.length);
            const currentYear = new Date().getFullYear();
            return employees.map(employee => {
                const birthday = new Date(employee.birthday);
                const birthdayThisYear = setYear(birthday, currentYear);
                return {
                    id: employee.id,
                    title: `Aniversário de ${employee.name}`,
                    start: birthdayThisYear,
                    end: birthdayThisYear,
                    allDay: true,
                };
            });
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
            return [];
        }
    };

    // Função para buscar os departamentos
    const fetchDepartments = async (): Promise<void> => {
        try {
            const departments: Department[] = await apiService.fetchAllDepartments();
            setTotalDepartments(departments.length);
        } catch (error) {
            console.error('Erro ao buscar departamentos:', error);
        }
    };

    // Função para buscar os grupos
    const fetchGroups = async (): Promise<void> => {
        try {
            const groups: Group[] = await apiService.fetchAllGroups();
            setTotalGroups(groups.length);
        } catch (error) {
            console.error('Erro ao buscar grupos:', error);
        }
    };

    // Define os dados do gráfico circular
    const chartData = {
        labels: ['Total de Funcionários'],
        datasets: [{
            label: 'Contagem de Funcionários',
            data: [totalEmployees],
            backgroundColor: [
                '#0050a0'
            ],
            borderColor: [
                '#0080ff'
            ],
            borderWidth: 1
        }]
    };

    // Define os dados do gráfico de barras
    const chartDataDepartmentsGroups = {
        labels: ['Departamentos', 'Grupos'],
        datasets: [{
            label: 'Contagem de Departamentos e Grupos',
            data: [totalDepartments, totalGroups],
            backgroundColor: ['#0050a0'],
            borderColor: ['#0080ff'],
            borderWidth: 1
        }]
    };

    // Carrega os dados
    useEffect(() => {
        loadData();
    }, []);

    // Função para carregar os dados
    const loadData = async () => {
        try {
            const employeeEvents = await fetchEvents();
            setEvents(employeeEvents);
            await fetchDepartments();
            await fetchGroups();
        } catch (error) {
            console.error("Erro ao carregar dados: ", error);
        }
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
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Nclock dashboard</span>
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
            <div className="dashboard-content">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel-licensed" src={banner_nclock} alt="Nclock" />
                        </div>
                    </Carousel>
                </div>
                <div className="calendar-container">
                    <div className="dashboard-calendar" style={{ height: 400 }}>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            messages={messages}
                            culture="pt"
                        />
                    </div>
                </div>
            </div>
            <div className="dashboard-content">
                <div className="chart-container">
                    <div className="employee-pie-chart" style={{ flex: 1 }}>
                        <h2 className="employee-pie-chart-text">Total de Funcionários: {totalEmployees}</h2>
                        <Pie className="employee-pie-chart-pie" data={chartData} />
                    </div>
                </div>
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Departamentos e Grupos</h2>
                        <Bar className="departments-groups-chart-data" data={chartDataDepartmentsGroups} />
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
};