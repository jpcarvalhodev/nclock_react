import { ArcElement, BarController, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, PieController, Tooltip } from 'chart.js';
import { format, getDay, parse, setYear, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Carousel } from "react-responsive-carousel";

import banner_nclock from "../../../assets/img/carousel/banner_nclock.jpg";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { useNavbar } from "../../../context/NavbarContext";
import * as apiService from "../../../helpers/apiService";
import { Department, Employee, Group } from "../../../helpers/Types";


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
    const { navbarColor, footerColor } = useNavbar();
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
            <div className="dashboard-content">
                <div className="dashboard-carousel-container-pages-no-title">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel-licensed" src={banner_nclock} alt="Nclock" />
                        </div>
                    </Carousel>
                </div>
                <div className="calendar-container" style={{ marginTop: 70 }}>
                    <div className="dashboard-calendar" style={{ height: 495 }}>
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
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
};