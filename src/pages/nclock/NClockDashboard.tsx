import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { toast } from "react-toastify";
import { format, parse, startOfWeek, getDay, setYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, PieController, Tooltip, Legend, BarElement, BarController, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { fetchWithAuth } from "../../components/FetchWithAuth";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { Employee, Department, Group } from "../../helpers/Types";

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

export const NClockDashboard = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [totalEmployees, setTotalEmployees] = useState<number>(0);
    const [totalDepartments, setTotalDepartments] = useState<number>(0);
    const [totalGroups, setTotalGroups] = useState<number>(0);

    const fetchEvents = async (): Promise<CalendarEvent[]> => {
        try {
            const response = await fetchWithAuth('Employees/GetAllEmployees', {
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
            const response = await fetchWithAuth('Departaments', {
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
            const response = await fetchWithAuth('Groups', {
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
            <div className="datatable-title-text-dashboard">
                <span>Nclock dashboard</span>
            </div>
            <div>
                <div className="calendar-container">
                    <div className="dashboard-calendar" style={{ width: 1800 }}>
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