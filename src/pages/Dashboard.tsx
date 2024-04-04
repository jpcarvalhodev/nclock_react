import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Employee } from "../helpers/Types";

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
}

const localizer = momentLocalizer(moment);

export const Dashboard = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const fetchEvents = async (): Promise<CalendarEvent[]> => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://localhost:7129/api/Employees', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Erro ao buscar eventos');
            const employees: Employee[] = await response.json();
            const currentYear = new Date().getFullYear(); // Pega o ano atual
            return employees.map(employee => {
                const birthdayThisYear = moment(employee.birthday).set('year', currentYear).toDate(); // Define o ano do aniversário para o ano atual
                return {
                    id: employee.id,
                    title: `Aniversário de ${employee.name}`,
                    start: birthdayThisYear,
                    end: birthdayThisYear,
                    allDay: true,
                };
            });
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    };

    const loadData = async () => {
        try {
            const employeeEvents = await fetchEvents();
            setEvents(employeeEvents);
        } catch (error) {
            console.error("Error loading data: ", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <NavBar />
            <div style={{ height: '500px', width: '1000px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                />
            </div>
            <Footer />
        </div>
    );
};