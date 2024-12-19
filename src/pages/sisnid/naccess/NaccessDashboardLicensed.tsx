import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { useEffect, useState } from "react";
import { EmployeeAttendanceTimes } from "../../../helpers/Types";
import '../../../css/PagesStyles.css';
import * as apiService from "../../../helpers/apiService";
import { Carousel } from "react-responsive-carousel";
import banner_naccess from "../../../assets/img/carousel/banner_naccess.jpg";
import { useNavbar } from "../../../context/NavbarContext";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, setYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
export const NaccessDashboardLicensed = () => {
    const { navbarColor, footerColor } = useNavbar();
    const [totalEmployees, setTotalEmployees] = useState<number>(0);
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    // Função para buscar os departamentos
    const fetchAssiduityEmployees = async (): Promise<void> => {
        try {
            const employees: EmployeeAttendanceTimes[] = await apiService.fetchAllAttendances();
            setTotalEmployees(employees.length);
        } catch (error) {
            console.error('Erro ao buscar departamentos:', error);
        }
    };

    // Define os dados do gráfico de barras
    const chartDataEmployees = {
        labels: ['Funcionários'],
        datasets: [{
            label: 'Presença de Funcionários',
            data: [totalEmployees],
            backgroundColor: ['#0050a0'],
            borderColor: ['#0080ff'],
            borderWidth: 1
        }]
    };

    // Carrega os dados
    useEffect(() => {
        loadData();
    }, []);

    // Função para carregar os dados
    const loadData = async () => {
        try {
            await fetchAssiduityEmployees();
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
                            <img className="img-carousel-licensed" src={banner_naccess} alt="NAccess" />
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
}