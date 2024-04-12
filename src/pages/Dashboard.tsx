import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt';
import { Employee } from "../helpers/Types";
import { fetchWithAuth } from "../components/FetchWithAuth";
import { toast } from "react-toastify";

moment.locale('pt');

const localizer = momentLocalizer(moment);

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

    const fetchEvents = async (): Promise<CalendarEvent[]> => {
        try {
            const response = await fetchWithAuth('https://localhost:7129/api/Employees/GetAllEmployees', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) toast.error('Erro ao buscar eventos');
            const employees: Employee[] = await response.json();
            const currentYear = new Date().getFullYear();
            return employees.map(employee => {
                const birthdayThisYear = moment(employee.birthday).set('year', currentYear).toDate();
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

    const loadData = async () => {
        try {
            const employeeEvents = await fetchEvents();
            setEvents(employeeEvents);
        } catch (error) {
            console.error("Erro ao carregar dados: ", error);
        }
    };

    useEffect(() => {
        loadData();
    },);

    return (
        <div className="dashboard-container">
            <NavBar />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="dashboard-calendar" style={{ flex: 3 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        messages={messages}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};