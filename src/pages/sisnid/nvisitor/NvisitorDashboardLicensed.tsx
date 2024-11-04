import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import banner_nvisitor from "../../../assets/img/carousel/banner_nvisitor.jpg";
import { useColor } from "../../../context/ColorContext";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { KioskTransactionCard, KioskTransactionMB } from "../../../helpers/Types";

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

export const NvisitorDashboardLicensed = () => {
    const { navbarColor, footerColor } = useColor();
    const [totalMovements, setTotalMovements] = useState<KioskTransactionCard[]>([]);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const deviceSN = 'AGB7234900595';
    const eventDoorId3 = '3';
    const eventDoorId4 = '4';

    // Função para buscar os dados para os gráficos
    const fetchAllData = async () => {
        try {
            const cardData = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId3, deviceSN);
            const kioskData = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId4, deviceSN);

            const totalMove = cardData.concat(kioskData);

            setTotalMovements(totalMove);

            const eventSet = new Set();
            const newEvents = totalMove.reduce((acc: CalendarEvent[], item: KioskTransactionCard) => {
                const eventDate = new Date(item.eventTime);
                const dateKey = eventDate.toISOString().split('T')[0];
                const eventKey = dateKey + '|' + item.eventName + '|' + item.eventDoorId;
    
                if (!eventSet.has(eventKey)) {
                    eventSet.add(eventKey);
                    acc.push({
                        id: item.eventTime + item.eventName,
                        title: item.eventDoorId === 3 ? 'Torniquete' : 'Quiosque',
                        start: eventDate,
                        end: eventDate,
                        allDay: true,
                        uniqueId: item.eventTime + item.eventName
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

    // Dados para o gráfico Bar
    const barData = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                label: 'Total de Movimentos',
                data: groupByMonth(totalMovements, 'eventTime'),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }
        ]
    };

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
                            <img className="img-carousel-licensed" src={banner_nvisitor} alt="Nvisitor" />
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
                            components={{
                                event: MyEvent
                            }}
                        />
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}