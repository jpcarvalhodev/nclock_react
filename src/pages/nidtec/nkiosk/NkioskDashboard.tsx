import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import banner_nkiosk from "../../../assets/img/carousel/banner_nkiosk.jpg";
import { useColor } from "../../../context/ColorContext";
import { PolarArea } from "react-chartjs-2";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, setYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, Nav, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
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
import * as apiService from "../../../helpers/apiService";
import { KioskTransactionCard, KioskTransactionMB } from "../../../helpers/Types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend);

// Define o tipo TabName
type TabName = 'CLIENTE' | 'SISNID' | 'NIDSOF' | 'NIDTEC' | 'NIDPLACE';

// Define o tipo CardTitle
type CardTitle = 'Início' | 'Nclock' | 'Naccess' | 'Nvisitor' | 'Npark' | 'Ndoor' | 'Npatrol' | 'Ncard' | 'Nview' | 'Nsecur' | 'Nsoftware' | 'Nsystem' | 'Napp' | 'Ncyber' | 'Ndigital' | 'Nserver' | 'Naut' | 'Nequip' | 'Nproject' | 'Nsmart' | 'Nreality' | 'Nhologram' | 'Npower' | 'Ncharge' | 'Ncity' | 'Nkiosk' | 'Nled' | 'Nfire' | 'Nfurniture' | 'Npartition' | 'Ndecor' | 'Nping' | 'Nconnect' | 'Nlight' | 'Ncomfort' | 'Nsound' | 'Nhome' | 'Nsoftwares';

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
    uniqueId?: string;
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

export const NkioskDashboard = () => {
    const { navbarColor, footerColor } = useColor();
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState<TabName>('NIDTEC');
    const [payTerminal, setPayTerminal] = useState<KioskTransactionMB[]>([]);
    const [payCoins, setPayCoins] = useState<KioskTransactionMB[]>([]);
    const [moveCard, setMoveCard] = useState<KioskTransactionCard[]>([]);
    const [moveKiosk, setMoveKiosk] = useState<KioskTransactionCard[]>([]);
    const [moveVP, setMoveVP] = useState<KioskTransactionCard[]>([]);
    const [totalMovements, setTotalMovements] = useState<KioskTransactionCard[]>([]);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const deviceSN = 'AGB7234900595';
    const eventDoorId = '1';
    const eventDoorId2 = '2';
    const eventDoorId3 = '3';
    const eventDoorId4 = '4';

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

    // Função para buscar os dados para os gráficos
    const fetchAllData = async () => {
        try {
            const mbData = await apiService.fetchKioskTransactionsByMBAndDeviceSN(eventDoorId, deviceSN);
            const coinData = await apiService.fetchKioskTransactionsByPayCoins(eventDoorId2, deviceSN);
            const cardData = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId3, deviceSN);
            const kioskData = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId4, deviceSN);
            const vpData = await apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId3, deviceSN);
            setPayTerminal(mbData);
            setPayCoins(coinData);
            setMoveCard(cardData);
            setMoveKiosk(kioskData);
            setMoveVP(vpData);

            const totalMove = cardData.concat(kioskData);

            setTotalMovements(totalMove);

            const eventSet = new Set();
            const newEvents = totalMove.reduce((acc: CalendarEvent[], item: KioskTransactionCard) => {
                const eventDate = new Date(item.eventTime);
                const uniqueId = item.eventTime + item.eventName;
                if (!eventSet.has(uniqueId)) {
                    eventSet.add(uniqueId);
                    acc.push({
                        id: uniqueId,
                        title: item.eventName,
                        start: eventDate,
                        end: eventDate,
                        allDay: true,
                        uniqueId: uniqueId
                    });
                }
                return acc;
            }, [] as CalendarEvent[]);


            setEvents(newEvents);
        } catch (error) {
            console.error(error);
        }
    };

    // UseEffect para buscar os dados
    useEffect(() => {
        fetchAllData();
    }, []);

    // Função para agrupar os dados por mês com base no campo correto
    const groupByMonth = <T extends KioskTransactionMB | KioskTransactionCard>(
        data: T[],
        dateField: keyof T
    ): number[] => {
        const months = Array(12).fill(0);

        data.forEach((item, index) => {
            const dateValue = item[dateField];
            let parsedDate: Date | null = null;

            if (typeof dateValue === 'string') {
                if (dateField === 'eventTime') {
                    try {
                        const formattedDate = dateValue.replace(' ', 'T');
                        parsedDate = new Date(formattedDate);

                        if (isNaN(parsedDate.getTime())) {
                            console.warn(`Data inválida encontrada no campo 'eventTime' no item ${index}: ${dateValue}`);
                            return;
                        }
                    } catch (error) {
                        console.error(`Erro ao converter 'eventTime' no item ${index}: ${dateValue}`, error);
                        return;
                    }
                } else {
                    parsedDate = new Date(dateValue);

                    if (isNaN(parsedDate.getTime())) {
                        console.warn(`Data inválida encontrada no campo 'timestamp' no item ${index}: ${dateValue}`);
                        return;
                    }
                }

                if (parsedDate) {
                    const monthIndex = parsedDate.getMonth();

                    if ('cardNo' in item) {
                        months[monthIndex] += 1;
                    } else if ('amount' in item) {
                        months[monthIndex] += parseFloat(item.amount.replace(',', '.'));
                    }
                }
            } else {
                console.warn(`Campo ${String(dateField)} inválido ou não é string no item ${index}`, item);
            }
        });

        return months;
    };

    // Dados para o gráfico PolarArea
    const polarData = {
        labels: ['Multibanco', 'Moedeiro', 'Torniquete', 'Quiosque', 'Video Porteiro'],
        datasets: [
            {
                label: 'Total',
                data: [payTerminal.length, payCoins.length, moveCard.length, moveKiosk.length, moveVP.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Dados para o gráfico Bar
    const barData = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                label: 'Total de Movimentos',
                data: groupByMonth(totalMovements, 'eventTime'),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }
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
                <span>Nkiosk Dashboard</span>
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
            <div className="dashboard-content">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel-licensed" src={banner_nkiosk} alt="Nkiosk" />
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
                        <h2 className="employee-pie-chart-text">Total de Pagamentos e Movimentos: { }</h2>
                        <PolarArea className="employee-pie-chart-pie" data={polarData} />
                    </div>
                </div>
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Total de Movimentos: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barData} />
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}