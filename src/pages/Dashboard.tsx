import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Department, Employee, Group } from "../helpers/Types";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { toast } from "react-toastify";
import { format, parse, startOfWeek, getDay, setYear } from 'date-fns';
import { ptBR, se } from 'date-fns/locale';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, PieController, Tooltip, Legend, BarElement, BarController, CategoryScale, LinearScale } from 'chart.js';
import { Carousel } from 'react-responsive-carousel';
import { Bar } from "react-chartjs-2";
import carousel1 from '../assets/img/carousel1.jpg';
import carousel2 from '../assets/img/carousel2.jpg';
import carousel3 from '../assets/img/carousel3.jpg';
import '../css/DashboardAlert.css';
import { CSSTransition } from "react-transition-group";

ChartJS.register(PieController, ArcElement, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

const locales = {
    'pt': ptBR,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
}

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

export const Dashboard = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [totalEmployees, setTotalEmployees] = useState<number>(0);
    const [totalDepartments, setTotalDepartments] = useState<number>(0);
    const [totalGroups, setTotalGroups] = useState<number>(0);
    const [showWelcome, setShowWelcome] = useState<boolean>(false);
    const [userName, setUserName] = useState<string | null>('username');

    useEffect(() => {
        const user = localStorage.getItem('username');
        setUserName(user);

        const hasLoggedIn = localStorage.getItem('loggedIn') === 'true';

        if (!hasLoggedIn) {
            localStorage.setItem('loggedIn', 'true');
            setShowWelcome(true);

            setTimeout(() => {
                setShowWelcome(false);
            }, 5000);
        }
    }, []);

    const fetchEvents = async (): Promise<CalendarEvent[]> => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Employees/GetAllEmployees', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) toast.error('Erro ao buscar eventos');
            const employees: Employee[] = await response.json();
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

    const fetchDepartments = async (): Promise<void> => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Departaments', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) toast.error('Erro ao buscar departamentos');
            const departments: Department[] = await response.json();
            setTotalDepartments(departments.length);
        } catch (error) {
            console.error('Erro ao buscar departamentos:', error);
        }
    };

    const fetchGroups = async (): Promise<void> => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Groups', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) toast.error('Erro ao buscar grupos');
            const groups: Group[] = await response.json();
            setTotalGroups(groups.length);
        } catch (error) {
            console.error('Erro ao buscar grupos:', error);
        }
    };

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

    useEffect(() => {
        loadData();
    }, []);

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

    return (
        <div className="dashboard-container">
            <NavBar />
            <CSSTransition
                in={showWelcome}
                timeout={500}
                classNames="alert"
                unmountOnExit
            >
                <div className="alert alert-success text-center" role="alert" style={{ margin: '20px' }}>
                    <h4 className="alert-heading">Olá {userName}!</h4>
                    <p>Seja bem vindo ao Nclock!</p>
                </div>
            </CSSTransition>
            <div className="dashboard-content">
                <div className="carousel-container" style={{ flex: 1 }}>
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false}>
                        <div>
                            <img className="img-carousel" src={carousel1} alt="Imagem 1" />
                        </div>
                        <div>
                            <img className="img-carousel" src={carousel2} alt="Imagem 2" />
                        </div>
                        <div>
                            <img className="img-carousel" src={carousel3} alt="Imagem 3" />
                        </div>
                    </Carousel>
                </div>
                <div className="calendar-container">
                    <div className="dashboard-calendar" style={{ flex: 2 }}>
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
            <div className="dashboard-content">
                <div className="chart-container">
                    <div className="employee-pie-chart" style={{ flex: 1 }}>
                        <h2 className="employee-pie-chart-text">Total de Funcionários: {totalEmployees}</h2>
                        <Pie data={chartData} />
                    </div>
                </div>
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Departamentos e Grupos</h2>
                        <Bar data={chartDataDepartmentsGroups} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};