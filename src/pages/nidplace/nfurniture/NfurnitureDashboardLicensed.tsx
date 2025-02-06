import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Bar , Line } from "react-chartjs-2";
import { Carousel } from "react-responsive-carousel";

import banner_nfurniture from "../../../assets/img/carousel/banner_nfurniture.jpg";




ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend);

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

export const NfurnitureDashboardLicensed = () => {
    const currentYear = new Date().getFullYear();
    
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [lineChartData, setLineChartData] = useState({
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
            {
                label: 'Exemplo de Dados 1',
                data: [0],
                fill: true,
                borderColor: '#FEC629',
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
                    '#FEC629',
                ],
                borderWidth: 1
            }
        ]
    });

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
            
            <div className="dashboard-content">
                <div className="dashboard-carousel-container-pages-no-title">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel-licensed" src={banner_nfurniture} alt="Nfurniture" />
                        </div>
                    </Carousel>
                </div>
                <div className="carousel-chart-container" id="carousel-chart" style={{ marginTop: 5 }}>
                    <Carousel infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div className="departments-groups-chart" style={{ height: '26rem' }}>
                            <h2 className="departments-groups-chart-text">Exemplo {currentYear}: { }</h2>
                            <Line className="departments-groups-chart-data" data={lineChartData} />
                        </div>
                        <div className="departments-groups-chart" style={{ height: '28rem' }}>
                            <h2 className="departments-groups-chart-text">Exemplo 2 {currentYear}: { }</h2>
                            <Line className="departments-groups-chart-data" data={lineChartData} />
                        </div>
                        <div style={{ height: '26rem', maxWidth: '56rem', margin: 'auto' }}>
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
                    <div className="departments-groups-chart" style={{ height: '16rem' }}>
                        <h2 className="departments-groups-chart-text">Exemplo 3: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barChartData} />
                    </div>
                </div>
                <div className="carousel-chart-container-graphs" id="carousel-chart">
                    <div className="departments-groups-chart" style={{ height: '16rem' }}>
                        <h2 className="departments-groups-chart-text">Exemplo 4: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barChartData} />
                    </div>
                </div>
                <div className="carousel-chart-container-graphs" id="carousel-chart">
                    <div className="departments-groups-chart" style={{ height: '16rem' }}>
                        <h2 className="departments-groups-chart-text">Exemplo 5: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barChartData} />
                    </div>
                </div>
                <div className="carousel-chart-container-graphs" id="carousel-chart">
                    <div className="departments-groups-chart" style={{ height: '16rem' }}>
                        <h2 className="departments-groups-chart-text">Exemplo 6: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barChartData} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}