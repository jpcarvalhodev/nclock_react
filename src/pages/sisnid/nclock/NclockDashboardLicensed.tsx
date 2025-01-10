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
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';


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

// Define a interface dos eventos
interface MyEventProps {
    event: CalendarEvent;
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
    const currentYear = new Date().getFullYear();
    const { navbarColor, footerColor } = useNavbar();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [lineChartData, setLineChartData] = useState({
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
            {
                label: 'Exemplo de Dados 1',
                data: [0],
                fill: true,
                borderColor: '#0050a0',
                tension: 0.1
            },
        ]
    });
    const [barChartData, setBarChartData] = useState({
        labels: ['Hoje'],
        datasets: [
            {
                label: 'Exemplo de Dados 3',
                data: [0],
                backgroundColor: [
                    '#0050a0',
                ],
                borderWidth: 1
            }
        ]
    });

    // Função para buscar os eventos dos funcionários
    const fetchEvents = async (): Promise<CalendarEvent[]> => {
        try {
            const employees: Employee[] = await apiService.fetchAllEmployees();
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

    // Carrega os dados
    useEffect(() => {
        fetchEvents();
    }, []);

    // Função para renderizar os eventos no calendário
    const MyEvent = ({ event }: MyEventProps) => {
        return (
            <div className="calendar-event">
                {event.title}
            </div>
        );
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
                <div className="carousel-chart-container" id="carousel-chart" style={{ marginTop: 5 }}>
                    <Carousel infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div className="departments-groups-chart" style={{ height: '28rem' }}>
                            <h2 className="departments-groups-chart-text">Exemplo {currentYear}: { }</h2>
                            <Line className="departments-groups-chart-data" data={lineChartData} />
                        </div>
                        <div className="departments-groups-chart" style={{ height: '28rem' }}>
                            <h2 className="departments-groups-chart-text">Exemplo 2 {currentYear}: { }</h2>
                            <Line className="departments-groups-chart-data" data={lineChartData} />
                        </div>
                        <div style={{ height: '28rem', maxWidth: '56rem', margin: 'auto' }}>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                defaultView="month"
                                messages={messages}
                                culture="pt"
                                components={{
                                    event: MyEvent
                                }}
                            />
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className="dashboard-content" style={{ marginTop: 5 }}>
                <div className="carousel-chart-container-graphs" id="carousel-chart">
                    <div className="departments-groups-chart" style={{ height: '14rem' }}>
                        <h2 className="departments-groups-chart-text">Exemplo 3: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barChartData} />
                    </div>
                </div>
                <div className="carousel-chart-container-graphs" id="carousel-chart">
                    <div className="departments-groups-chart" style={{ height: '14rem' }}>
                        <h2 className="departments-groups-chart-text">Exemplo 4: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barChartData} />
                    </div>
                </div>
                <div className="carousel-chart-container-graphs" id="carousel-chart">
                    <div className="departments-groups-chart" style={{ height: '14rem' }}>
                        <h2 className="departments-groups-chart-text">Exemplo 5: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barChartData} />
                    </div>
                </div>
                <div className="carousel-chart-container-graphs" id="carousel-chart">
                    <div className="departments-groups-chart" style={{ height: '14rem' }}>
                        <h2 className="departments-groups-chart-text">Exemplo 6: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barChartData} />
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
};