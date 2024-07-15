import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Department, Employee, Group } from "../helpers/Types";
import { format, parse, startOfWeek, getDay, setYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Chart as ChartJS, ArcElement, PieController, Tooltip, Legend, BarElement, BarController, CategoryScale, LinearScale } from 'chart.js';
import { Carousel } from 'react-responsive-carousel';
import banner_1 from '../assets/img/carousel/banner_1.jpg';
import banner_2 from '../assets/img/carousel/banner_2.jpg';
import banner_3 from '../assets/img/carousel/banner_3.jpg';
import banner_4 from '../assets/img/carousel/banner_4.jpg';
import banner_5 from '../assets/img/carousel/banner_5.jpg';
import banner_6 from '../assets/img/carousel/banner_6.jpg';
import banner_7 from '../assets/img/carousel/banner_7.jpg';
import banner_8 from '../assets/img/carousel/banner_8.jpg';
import banner_9 from '../assets/img/carousel/banner_9.jpg';
import nclock from '../assets/img/navbar/navbar/nclock.webp';
import naccess from '../assets/img/navbar/navbar/naccess.webp';
import nvisitor from '../assets/img/navbar/navbar/nvisitor.webp';
import npark from '../assets/img/navbar/navbar/npark.webp';
import ndoor from '../assets/img/navbar/navbar/ndoor.webp';
import npatrol from '../assets/img/navbar/navbar/npatrol.webp';
import ncard from '../assets/img/navbar/navbar/ncard.webp';
import nview from '../assets/img/navbar/navbar/nview.webp';
import nsecur from '../assets/img/navbar/navbar/nsecur.webp';
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as apiService from "../helpers/apiService";

// Registra os elementos do ChartJS
ChartJS.register(PieController, ArcElement, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

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

// Define o tipo TabName
type TabName = 'nclock' | 'naccess' | 'nvisitor' | 'npark' | 'ndoor' | 'npatrol' | 'ncard' | 'nview' | 'nsecur';

// Define a página principal
export const Dashboard = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [totalEmployees, setTotalEmployees] = useState<number>(0);
    const [totalDepartments, setTotalDepartments] = useState<number>(0);
    const [totalGroups, setTotalGroups] = useState<number>(0);
    const navigate = useNavigate();

    // Define a função de busca de eventos
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

    // Define a função de busca de departamentos
    const fetchDepartments = async (): Promise<void> => {
        try {
            const departments: Department[] = await apiService.fetchAllDepartments();
            setTotalDepartments(departments.length);
        } catch (error) {
            console.error('Erro ao buscar departamentos:', error);
        }
    };

    // Define a função de busca de grupos
    const fetchGroups = async (): Promise<void> => {
        try {
            const groups: Group[] = await apiService.fetchAllGroups();
            setTotalGroups(groups.length);
        } catch (error) {
            console.error('Erro ao buscar grupos:', error);
        }
    };

    // Carrega os dados
    useEffect(() => {
        loadData();
    }, []);

    // Define a função de carregamento de dados
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

    // Define a função de clique nos cards
    const handleCardClick = (tabName: TabName) => {
        const tabData = {
            nclock: { route: '/nclock/nclockdashboard', tabKey: 'showNclockTab', ribbonKey: 'showNclockRibbon' },
            naccess: { route: '/naccess/naccessdashboard', tabKey: 'showNaccessTab', ribbonKey: 'showNaccessRibbon' },
            nvisitor: { route: '#', tabKey: 'showNvisitorTab', ribbonKey: 'showNvisitorRibbon' },
            npark: { route: '#', tabKey: 'showNparkTab', ribbonKey: 'showNparkRibbon' },
            ndoor: { route: '#', tabKey: 'showNdoorTab', ribbonKey: 'showNdoorRibbon' },
            npatrol: { route: '#', tabKey: 'showNpatrolTab', ribbonKey: 'showNpatrolRibbon' },
            ncard: { route: '#', tabKey: 'showNcardTab', ribbonKey: 'showNcardRibbon' },
            nview: { route: '#', tabKey: 'showNviewTab', ribbonKey: 'showNviewRibbon' },
            nsecur: { route: '#', tabKey: 'showNsecurTab', ribbonKey: 'showNsecurRibbon' },
        };

        const tab = tabData[tabName];

        if (tab) {
            localStorage.setItem(tab.tabKey, 'true');
            localStorage.setItem(tab.ribbonKey, 'true');
            navigate(tab.route);
        }
    };

    return (
        <div className="dashboard-container">
            <NavBar />
            <div className="datatable-title-text-dashboard">
                <span>Seja bem vindo aos softwares do NIDGROUP</span>
            </div>
            <div className="dashboard-content">
                <div className="cards-container">
                    <div onClick={() => handleCardClick('nclock')} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" src={nclock} className="card-img" />
                            <Card.Body>
                                <Card.Title className="card-title">Nclock</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div onClick={() => handleCardClick('naccess')} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" src={naccess} className="card-img" />
                            <Card.Body>
                                <Card.Title className="card-title">Naccess</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div onClick={() => handleCardClick('nvisitor')} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" src={nvisitor} className="card-img" />
                            <Card.Body>
                                <Card.Title className="card-title">Nvisitor</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div onClick={() => handleCardClick('npark')} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" src={npark} className="card-img" />
                            <Card.Body>
                                <Card.Title className="card-title">Npark</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div onClick={() => handleCardClick('ndoor')} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" src={ndoor} className="card-img" />
                            <Card.Body>
                                <Card.Title className="card-title">Ndoor</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div onClick={() => handleCardClick('npatrol')} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" src={npatrol} className="card-img" />
                            <Card.Body>
                                <Card.Title className="card-title">Npatrol</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div onClick={() => handleCardClick('ncard')} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" src={ncard} className="card-img" />
                            <Card.Body>
                                <Card.Title className="card-title">Ncard</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div onClick={() => handleCardClick('nview')} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" src={nview} className="card-img" />
                            <Card.Body>
                                <Card.Title className="card-title">Nview</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    <div onClick={() => handleCardClick('nsecur')} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" src={nsecur} className="card-img" />
                            <Card.Body>
                                <Card.Title className="card-title">Nsecur</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="dashboard-content">
                <div className="carousel-container" style={{ flex: 1 }}>
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false}>
                        <div>
                            <img className="img-carousel" src={banner_1} alt="Imagem 1" />
                        </div>
                        <div>
                            <img className="img-carousel" src={banner_2} alt="Imagem 2" />
                        </div>
                        <div>
                            <img className="img-carousel" src={banner_3} alt="Imagem 3" />
                        </div>
                        <div>
                            <img className="img-carousel" src={banner_4} alt="Imagem 4" />
                        </div>
                        <div>
                            <img className="img-carousel" src={banner_5} alt="Imagem 5" />
                        </div>
                        <div>
                            <img className="img-carousel" src={banner_6} alt="Imagem 6" />
                        </div>
                        <div>
                            <img className="img-carousel" src={banner_7} alt="Imagem 7" />
                        </div>
                        <div>
                            <img className="img-carousel" src={banner_8} alt="Imagem 8" />
                        </div>
                        <div>
                            <img className="img-carousel" src={banner_9} alt="Imagem 9" />
                        </div>
                    </Carousel>
                </div>
                <div className="calendar-container">
                    <div className="dashboard-calendar" style={{ flex: 1 }}>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '100%' }}
                            messages={messages}
                            culture="pt"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
