import { useEffect, useState } from "react";
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

// Define a página principal
export const NclockDashboardLicensed = () => {
    const { navbarColor, footerColor } = useColor();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [totalEmployees, setTotalEmployees] = useState<number>(0);
    const [totalDepartments, setTotalDepartments] = useState<number>(0);
    const [totalGroups, setTotalGroups] = useState<number>(0);

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

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Nclock dashboard</span>
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