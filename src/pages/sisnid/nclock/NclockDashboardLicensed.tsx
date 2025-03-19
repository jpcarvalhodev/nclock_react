import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PieController,
  Tooltip,
} from "chart.js";
import { format, getDay, parse, setYear, startOfWeek } from "date-fns";
import { pt, ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Line, Bar } from "react-chartjs-2";
import { Carousel } from "react-responsive-carousel";

import * as apiService from "../../../api/apiService";
import banner_nclock from "../../../assets/img/carousel/banner_nclock.jpg";

import { Employee } from "../../../types/Types";
import { usePersons } from "../../../context/PersonsContext";
import { useAttendance } from "../../../context/MovementContext";

// Registra os elementos do ChartJS
ChartJS.register(
  PieController,
  ArcElement,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

// Define a linguagem do calendário
const locales = {
  pt: ptBR,
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
  allDay: "Todo o dia",
  previous: "<",
  next: ">",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Não há eventos neste intervalo",
  showMore: (total: number) => `+ Ver mais (${total})`,
};

// Define a página principal
export const NclockDashboardLicensed = () => {
  const currentYear = new Date().getFullYear();
  const { employeesNoPagination } = usePersons();
  const { attendance } = useAttendance();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [presenceBarChartData, setPresenceBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [noPresenceBarChartData, setNoPresenceBarChartData] =
    useState<ChartData>({
      labels: [],
      datasets: [],
    });
  const [lineChartData, setLineChartData] = useState({
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Exemplo de Dados 1",
        data: [0],
        fill: true,
        borderColor: "#0050a0",
        tension: 0.1,
      },
    ],
  });
  const [barChartData, setBarChartData] = useState({
    labels: ["Hoje"],
    datasets: [
      {
        label: "Exemplo de Dados 3",
        data: [0],
        backgroundColor: ["#0050a0"],
        borderWidth: 1,
      },
    ],
  });

  // Função para buscar os eventos dos funcionários
  const fetchEvents = async (): Promise<CalendarEvent[]> => {
    try {
      return employeesNoPagination.map((employee) => {
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
      console.error("Erro ao buscar eventos:", error);
      return [];
    }
  };

  // Carrega os dados
  useEffect(() => {
    (async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    })();
  }, [employeesNoPagination]);

  // Função para renderizar os eventos no calendário
  const MyEvent = ({ event }: MyEventProps) => {
    return <div className="calendar-event">{event.title}</div>;
  };

  // Define os dados do gráfico de linha para as presenças de hoje
  useEffect(() => {
    const today = format(new Date(), "dd/MM/yyyy", { locale: pt });

    const todayAccesses = attendance.filter((item) => {
      if (!item.attendanceTime) return false;
      const eventDate = format(new Date(item.attendanceTime), "dd/MM/yyyy", {
        locale: pt,
      });
      return eventDate === today;
    });

    const uniqueEmployees = new Set(
      todayAccesses.map((item) => item.employeeId)
    );

    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Presenças Hoje",
          data: [uniqueEmployees.size],
          backgroundColor: "#0050a0",
        },
      ],
    };
    setPresenceBarChartData(chartData);
  }, [attendance]);

  // Define os dados do gráfico de linha para as ausências de hoje
  useEffect(() => {
    const today = format(new Date(), "dd/MM/yyyy", { locale: pt });

    const todayAccesses = attendance.filter((item) => {
      if (!item.attendanceTime) return false;
      const eventDate = format(new Date(item.attendanceTime), "dd/MM/yyyy", {
        locale: pt,
      });
      return eventDate === today;
    });

    const uniqueEmployeesWhoAccessed = new Set(
      todayAccesses.map((item) => item.employeeId)
    );

    const totalEmployees = employeesNoPagination.length;
    const noPresenceCount = totalEmployees - uniqueEmployeesWhoAccessed.size;

    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Ausências Hoje",
          data: [noPresenceCount],
          backgroundColor: "#0050a0",
        },
      ],
    };

    setNoPresenceBarChartData(chartData);
  }, [attendance, employeesNoPagination]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-carousel-container-pages-no-title">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            emulateTouch={true}
          >
            <div>
              <img
                className="img-carousel-licensed"
                src={banner_nclock}
                alt="Nclock"
              />
            </div>
          </Carousel>
        </div>
        <div
          className="carousel-chart-container"
          id="carousel-chart"
          style={{ marginTop: 5 }}
        >
          <Carousel
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            emulateTouch={true}
          >
            <div style={{ height: "26rem", maxWidth: "56rem", margin: "auto" }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                messages={messages}
                culture="pt"
                components={{
                  event: MyEvent,
                }}
              />
            </div>
          </Carousel>
        </div>
      </div>
      <div className="dashboard-content" style={{ marginTop: 5 }}>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "16rem" }}>
            <h2 className="departments-groups-chart-text">Presenças Hoje: {}</h2>
            <Bar
              className="departments-groups-chart-data"
              data={presenceBarChartData}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "16rem" }}>
            <h2 className="departments-groups-chart-text">Ausências Hoje: {}</h2>
            <Bar
              className="departments-groups-chart-data"
              data={noPresenceBarChartData}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "16rem" }}>
            <h2 className="departments-groups-chart-text">Exemplo 5: {}</h2>
            <Bar
              className="departments-groups-chart-data"
              data={barChartData}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "16rem" }}>
            <h2 className="departments-groups-chart-text">Exemplo 6: {}</h2>
            <Bar
              className="departments-groups-chart-data"
              data={barChartData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
