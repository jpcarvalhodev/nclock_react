import { ArcElement, BarElement, CategoryScale, ChartData, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { format, getDay, parse, parseISO, set, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useContext, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Line, Bar } from "react-chartjs-2";
import { Carousel } from "react-responsive-carousel";

import banner_nkiosk from "../../../assets/img/carousel/banner_nkiosk.jpg";
import * as apiService from "../../../helpers/apiService";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { useNavbar } from "../../../context/NavbarContext";
import { DeviceContextType, TerminalsContext } from "../../../context/TerminalsContext";
import { KioskTransactionCard, KioskTransactionMB } from "../../../helpers/Types";
import { useKiosk } from '../../../context/KioskContext';

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

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T00:00`;
}

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
    return `${date.toISOString().substring(0, 10)}T23:59`;
}

export const NkioskDashboardLicensed = () => {
    const currentDate = new Date();
    const [startDate, setStartDate] = useState(formatDateToStartOfDay(currentDate));
    const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
    const { navbarColor, footerColor } = useNavbar();
    const { devices, fetchAllDevices } = useContext(TerminalsContext) as DeviceContextType;
    const { totalPayments, setTotalPayments, totalMovements, setTotalMovements } = useKiosk();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [lineChartData, setLineChartData] = useState<ChartData>({ labels: [], datasets: [] });
    const [todayPaymentsTotal, setTodayPaymentsTotal] = useState<KioskTransactionMB[]>([]);
    const [todayMovementsTotal, setTodayMovementsTotal] = useState<KioskTransactionCard[]>([]);
    const [todayMoveLineChartData, setTodayMoveLineChartData] = useState<ChartData>({ labels: [], datasets: [] });
    const [todayPayLineChartData, setTodayPayLineChartData] = useState<ChartData>({ labels: [], datasets: [] });
    const [todayMovementsEvents, setTodayMovementsEvents] = useState<CalendarEvent[]>([]);
    const eventDoorId2 = '2';
    const eventDoorId3 = '3';
    const eventDoorId4 = '4';

    // Define a data atual
    useEffect(() => {
        const currentDate = new Date();
        setStartDate(formatDateToStartOfDay(currentDate));
        setEndDate(formatDateToEndOfDay(currentDate));
    }, []);

    // Função para buscar os dados para os gráficos
    const fetchAllData = async () => {
        try {
            if (devices.length === 0) {
                console.error('Não há dispositivos para buscar dados');
                return;
            }

            const mbPromises = apiService.fetchKioskTransactionsByMBAndDeviceSN(startDate, endDate)

            const coinPromises = devices.map(device =>
                apiService.fetchKioskTransactionsByPayCoins(eventDoorId2, device.serialNumber, startDate, endDate)
            );

            const cardPromises = devices.map(device => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId3, device.serialNumber, startDate, endDate);
            });

            const kioskPromises = devices.map(device => {
                return apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId4, device.serialNumber, startDate, endDate);
            });

            const [mbResults, coinResults, cardResults, kioskResults] = await Promise.all([
                Promise.all([mbPromises]),
                Promise.all(coinPromises),
                Promise.all(cardPromises),
                Promise.all(kioskPromises)
            ]);

            const combinedMBData = mbResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedCoinData = coinResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedCardData = cardResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedKioskData = kioskResults.filter(data => Array.isArray(data) && data.length > 0).flat();

            const totalPayment = combinedMBData.concat(combinedCoinData);
            setTodayPaymentsTotal(totalPayment)

            const totalMovement = combinedCardData.concat(combinedKioskData);
            setTodayMovementsTotal(totalMovement);

            const eventSet = new Set();
            const newEvents = totalMovements.reduce((acc: CalendarEvent[], item: KioskTransactionCard) => {
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
            console.error('Erro ao buscar os dados:', error);
            setTotalPayments([]);
            setTotalMovements([]);
        }
    };

    // Função para atualizar os eventos do dia atual
    const updateTodayMovementsEvents = () => {
        const currentDateFormatted = format(new Date(), 'yyyy-MM-dd');
        const eventSet = new Set();
        const todayMovementsEvents = totalMovements
            .filter(movement => format(new Date(movement.eventTime), 'yyyy-MM-dd') === currentDateFormatted)
            .reduce((acc: CalendarEvent[], item: KioskTransactionCard) => {
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
            }, []);

        setTodayMovementsEvents(todayMovementsEvents);
    };

    // Busca os dispositivos ao carregar a página
    useEffect(() => {
        fetchAllDevices();
    }, []);

    // Busca os dados ao carregar a página
    useEffect(() => {
        if (devices.length > 0) {
            fetchAllData();
            updateTodayMovementsEvents();
        }
    }, [devices, totalMovements]);

    // Função para renderizar os eventos no calendário
    const MyEvent = ({ event }: MyEventProps) => {
        return (
            <div className="calendar-event">
                {event.title}
            </div>
        );
    };

    // Calcula o montante total de pagamentos por mês
    const calculateMonthlyTotals = (transactions: KioskTransactionMB[]) => {
        const monthlyTotals = Array(12).fill(0);
        transactions.forEach(transaction => {
            if (transaction.timestamp && transaction.amount) {
                const date = new Date(transaction.timestamp);
                const month = date.getMonth();
                const amount = parseFloat(transaction.amount.replace(',', '.'));
                if (!isNaN(amount)) {
                    monthlyTotals[month] += amount;
                }
            }
        });
        return monthlyTotals;
    };

    // Atualiza os dados do gráfico com base nos pagamentos filtrados
    useEffect(() => {
        const monthlyTotals = calculateMonthlyTotals(totalPayments);
        const newLineData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'Total de Pagamentos por Mês',
                    data: monthlyTotals,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        };
        setLineChartData(newLineData);
    }, [totalPayments]);

    // Define os dados do gráfico de linha para os pagamentos de hoje
    useEffect(() => {
        const totalPaymentsToday = todayPaymentsTotal.length;

        const chartData = {
            labels: ["Hoje"],
            datasets: [
                {
                    label: 'Total de Pagamentos Hoje',
                    data: [totalPaymentsToday],
                    backgroundColor: 'rgb(75, 192, 192)',
                }
            ]
        };
        setTodayPayLineChartData(chartData);
    }, [todayPaymentsTotal]);

    // Define os dados do gráfico de linha para os movimentos de hoje
    useEffect(() => {
        const totalMovementsToday = todayMovementsTotal.length;

        const chartData = {
            labels: ["Hoje"],
            datasets: [
                {
                    label: 'Total de Movimentos Hoje',
                    data: [totalMovementsToday],
                    backgroundColor: 'rgb(75, 192, 192)',
                }
            ]
        };
        setTodayMoveLineChartData(chartData);
    }, [todayMovementsTotal]);

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
                <div className="carousel-chart-container" id="carousel-chart" style={{ marginTop: 70 }}>
                    <Carousel infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div className="departments-groups-chart" style={{ height: '495px' }}>
                            <h2 className="departments-groups-chart-text">Total de Pagamentos: { }</h2>
                            <Line className="departments-groups-chart-data" data={lineChartData} />
                        </div>
                        <div style={{ height: '495px' }}>
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
                    </Carousel>
                </div>
            </div>
            <div className="dashboard-content">
                <div className="carousel-chart-container" id="carousel-chart">
                    <div style={{ height: '250px' }}>
                        <Calendar
                            localizer={localizer}
                            events={todayMovementsEvents}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView="week"
                            messages={messages}
                            culture="pt"
                            components={{
                                event: MyEvent
                            }}
                        />
                    </div>
                </div>
                <div className="carousel-chart-container" id="carousel-chart">
                    <div style={{ height: '250px' }}>
                        <Calendar
                            localizer={localizer}
                            events={todayMovementsEvents}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView="day"
                            messages={messages}
                            culture="pt"
                            components={{
                                event: MyEvent
                            }}
                        />
                    </div>
                </div>
                <div className="carousel-chart-container" id="carousel-chart">
                    <div className="departments-groups-chart" style={{ height: '250px' }}>
                        <h2 className="departments-groups-chart-text">Total de Pagamentos Hoje: { }</h2>
                        <Bar className="departments-groups-chart-data" data={todayPayLineChartData} />
                    </div>
                </div>
                <div className="carousel-chart-container" id="carousel-chart">
                    <div className="departments-groups-chart" style={{ height: '250px' }}>
                        <h2 className="departments-groups-chart-text">Total de Movimentos Hoje: { }</h2>
                        <Bar className="departments-groups-chart-data" data={todayMoveLineChartData} />
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}