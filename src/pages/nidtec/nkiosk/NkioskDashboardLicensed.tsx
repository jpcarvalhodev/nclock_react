import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import banner_nkiosk from "../../../assets/img/carousel/banner_nkiosk.jpg";
import { useColor } from "../../../context/ColorContext";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

export const NkioskDashboardLicensed = () => {
    const { navbarColor, footerColor } = useColor();
    const [payTerminal, setPayTerminal] = useState<KioskTransactionMB[]>([]);
    const [payCoins, setPayCoins] = useState<KioskTransactionMB[]>([]);
    const [moveCard, setMoveCard] = useState<KioskTransactionCard[]>([]);
    const [moveKiosk, setMoveKiosk] = useState<KioskTransactionCard[]>([]);
    const [moveVP, setMoveVP] = useState<KioskTransactionCard[]>([]);
    const [totalMovements, setTotalMovements] = useState<KioskTransactionCard[]>([]);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const deviceSN = 'AGB7234900595';
    const eventDoorId2 = '2';
    const eventDoorId3 = '3';
    const eventDoorId4 = '4';

    // Função para buscar os dados para os gráficos
    const fetchAllData = async () => {
        try {
            const mbData = await apiService.fetchKioskTransactionsByMBAndDeviceSN();
            const coinData = await apiService.fetchKioskTransactionsByPayCoins(eventDoorId2, deviceSN);
            const cardData = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId3, deviceSN);
            const kioskData = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId4, deviceSN);
            const vpData = await apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId3, deviceSN);
            setPayTerminal(mbData);
            setPayCoins(coinData);
            setMoveCard(cardData);
            setMoveKiosk(kioskData);
            setMoveVP(vpData);

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
                            <img className="img-carousel-licensed" src={banner_nkiosk} alt="Nkiosk" />
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