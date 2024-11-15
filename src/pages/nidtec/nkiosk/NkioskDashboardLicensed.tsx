import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import banner_nkiosk from "../../../assets/img/carousel/banner_nkiosk.jpg";
import { useColor } from "../../../context/ColorContext";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { useContext, useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { KioskTransactionCard, KioskTransactionMB } from "../../../helpers/Types";
import { TerminalsContext, DeviceContextType } from "../../../context/TerminalsContext";
import { Line } from "react-chartjs-2";

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
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const [payTerminal, setPayTerminal] = useState<KioskTransactionMB[]>([]);
    const [payCoins, setPayCoins] = useState<KioskTransactionMB[]>([]);
    const [moveCard, setMoveCard] = useState<KioskTransactionCard[]>([]);
    const [moveKiosk, setMoveKiosk] = useState<KioskTransactionCard[]>([]);
    const [moveVP, setMoveVP] = useState<KioskTransactionCard[]>([]);
    const [totalMovements, setTotalMovements] = useState<KioskTransactionCard[]>([]);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [lineChartData, setLineChartData] = useState<ChartData>({ labels: [], datasets: [] });
    const [totalPayments, setTotalPayments] = useState<KioskTransactionMB[]>([]);
    const eventDoorId2 = '2';
    const eventDoorId3 = '3';
    const eventDoorId4 = '4';

    // Função para buscar os dados para os gráficos
    const fetchAllData = async () => {
        try {
            if (devices.length === 0) {
                console.error('Não há dispositivos para buscar dados');
                return;
            }

            const mbPromises = devices.map(device =>
                apiService.fetchKioskTransactionsByMBAndDeviceSN()
            );
            const cardPromises = devices.map(device =>
                apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId3, device.serialNumber)
            );
            const coinPromises = devices.map(device =>
                apiService.fetchKioskTransactionsByPayCoins(eventDoorId2, device.serialNumber)
            );
            const vpPromises = devices.map(device =>
                apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId3, device.serialNumber)
            );
            const kioskPromises = devices.map(device =>
                apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId4, device.serialNumber)
            );

            const [mbResults, cardResults, coinResults, vpResults, kioskResults] = await Promise.all([
                Promise.all(mbPromises),
                Promise.all(cardPromises),
                Promise.all(coinPromises),
                Promise.all(vpPromises),
                Promise.all(kioskPromises)
            ]);

            const combinedMBData = mbResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedCardData = cardResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedCoinData = coinResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedVPData = vpResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedKioskData = kioskResults.filter(data => Array.isArray(data) && data.length > 0).flat();

            setPayTerminal(combinedMBData);
            setPayCoins(combinedCoinData);
            setMoveCard(combinedCardData);
            setMoveVP(combinedVPData);
            setMoveKiosk(combinedKioskData);

            const totalPayments = combinedMBData.concat(combinedCoinData);
            setTotalPayments(totalPayments);

            const totalMove = combinedCardData.concat(combinedKioskData);
            setTotalMovements(totalMove);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            setPayTerminal([]);
            setPayCoins([]);
            setMoveCard([]);
            setMoveKiosk([]);
            setMoveVP([]);
            setTotalMovements([]);
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
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
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
                            <div className="departments-groups-chart" style={{ height: '495px' }}>
                                <h2 className="departments-groups-chart-text">Total de Pagamentos: { }</h2>
                                <Line className="departments-groups-chart-data" data={lineChartData} />
                            </div>
                    </Carousel>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}