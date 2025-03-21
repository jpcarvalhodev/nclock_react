import { useEffect, useState } from "react";

import { Accesses } from "../../../types/Types";
import "../../../css/PagesStyles.css";

import { format, getDay, parse, startOfWeek, endOfDay } from "date-fns";
import { pt } from "date-fns/locale";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Bar, Line } from "react-chartjs-2";
import { Carousel } from "react-responsive-carousel";
import banner_naccess from "../../../assets/img/carousel/banner_naccess.jpg";
import { ChartData } from "chart.js";
import { useAttendance } from "../../../context/MovementContext";
import { useKiosk } from "../../../context/KioskContext";
import { usePersons } from "../../../context/PersonsContext";
import { useNavigate } from "react-router-dom";

// Define a linguagem do calendário
const locales = {
  pt,
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
export const NaccessDashboardLicensed = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const { accessForGraph = [] } = useAttendance();
  const { manualOpenDoor = [] } = useKiosk();
  const { employeesNoPagination = [] } = usePersons();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [accessLineChartData, setAccessLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [presenceBarChartData, setPresenceBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [visitorBarChartData, setVisitorBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [noPresenceBarChartData, setNoPresenceBarChartData] =
    useState<ChartData>({
      labels: [],
      datasets: [],
    });
  const [manualDoorBarChartData, setManualDoorBarChartData] =
    useState<ChartData>({
      labels: [],
      datasets: [],
    });

  // Função para definir os eventos do calendário
  useEffect(() => {
    if (!accessForGraph || accessForGraph.length === 0) {
      setEvents([]);
      return;
    }

    const groupedMap = new Map<string, { date: Date; doorName: string }>();

    for (const item of accessForGraph) {
      if (!item.eventTime) continue;
      const date = parse(item.eventTime, "dd/MM/yyyy HH:mm:ss", new Date(), {
        locale: pt,
      });
      const day = format(date, "yyyy-MM-dd");

      const key = `${day}::${item.eventDoorName}`;

      if (!groupedMap.has(key)) {
        groupedMap.set(key, {
          date,
          doorName: item.eventDoorName,
        });
      }
    }

    const newEvents: CalendarEvent[] = [];
    for (const [key, value] of groupedMap.entries()) {
      const startOfDay = parse(
        format(value.date, "yyyy-MM-dd"),
        "yyyy-MM-dd",
        new Date()
      );
      const endOfDayDate = endOfDay(startOfDay);

      newEvents.push({
        id: key,
        title: value.doorName,
        start: startOfDay,
        end: endOfDayDate,
        allDay: true,
      });
    }

    setEvents(newEvents);
  }, [accessForGraph]);

  // Função para renderizar os eventos no calendário
  const MyEvent = ({ event }: MyEventProps) => {
    return <div className="calendar-event">{event.title}</div>;
  };

  // Função para agrupar os eventos por mês
  function groupByMonth(data: Accesses[]) {
    const grouped = data.reduce((acc, item) => {
      if (!item.eventTime) return acc;
      const date = parse(item.eventTime, "dd/MM/yyyy HH:mm:ss", new Date(), {
        locale: pt,
      });

      const yearMonth = format(date, "yyyy-MM");

      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(item);

      return acc;
    }, {} as Record<string, Accesses[]>);
    return Object.keys(grouped).map((key) => ({
      month: key,
      events: grouped[key],
    }));
  }

  // Atualiza os dados do gráfico com base nos acessos anuais
  useEffect(() => {
    const groupedAccess = groupByMonth(accessForGraph);

    const dataPerMonth = new Array(12).fill(0);

    groupedAccess.forEach((group) => {
      const [year, month] = group.month.split("-");
      const numericYear = Number(year);
      const numericMonth = Number(month);

      if (numericYear === currentYear) {
        dataPerMonth[numericMonth - 1] = group.events.length;
      }
    });

    const newLineData = {
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      datasets: [
        {
          label: "Total de Acessos",
          data: dataPerMonth,
          fill: false,
          borderColor: "#0050a0",
          tension: 0.1,
        },
      ],
    };

    setAccessLineChartData(newLineData);
  }, [accessForGraph]);

  // Define os dados do gráfico de linha para as presenças de hoje
  useEffect(() => {
    const today = format(new Date(), "dd/MM/yyyy", { locale: pt });

    const todayAccesses = accessForGraph.filter((item) => {
      if (!item.eventTime) return false;
      const eventDate = format(
        parse(item.eventTime, "dd/MM/yyyy HH:mm:ss", new Date()),
        "dd/MM/yyyy",
        { locale: pt }
      );
      return eventDate === today;
    });

    const uniqueEmployees = new Set(todayAccesses.map((item) => item.id));

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
  }, [accessForGraph]);

  // Define os dados do gráfico de linha para as ausências de hoje
  useEffect(() => {
    const today = format(new Date(), "dd/MM/yyyy", { locale: pt });

    const todayAccesses = accessForGraph.filter((item) => {
      if (!item.eventTime) return false;
      const eventDate = format(
        parse(item.eventTime, "dd/MM/yyyy HH:mm:ss", new Date()),
        "dd/MM/yyyy",
        { locale: pt }
      );
      return eventDate === today;
    });

    const uniqueEmployeesWhoAccessed = new Set(
      todayAccesses.map((item) => item.id)
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
  }, [accessForGraph, employeesNoPagination]);

  // Define os dados do gráfico de linha para os visitantes de hoje
  useEffect(() => {
    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Visitantes Hoje",
          data: [0],
          backgroundColor: "#0050a0",
        },
      ],
    };
    setVisitorBarChartData(chartData);
  }, []);

  // Define os dados do gráfico de linha para as aberturas manuais de hoje
  useEffect(() => {
    const today = format(new Date(), "dd/MM/yyyy", { locale: pt });

    const todayManualDoor = manualOpenDoor.filter((item) => {
      if (!item.eventTime) return false;
      const eventDate = format(
        parse(item.eventTime, "dd/MM/yyyy HH:mm:ss", new Date()),
        "dd/MM/yyyy",
        { locale: pt }
      );
      return eventDate === today;
    });

    const uniqueManualDoor = new Set(todayManualDoor.map((item) => item.id));

    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Aberturas Manuais Hoje",
          data: [uniqueManualDoor.size],
          backgroundColor: "#0050a0",
        },
      ],
    };
    setManualDoorBarChartData(chartData);
  }, [manualOpenDoor]);

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
                src={banner_naccess}
                alt="Naccess"
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
            <div
              className="departments-groups-chart"
              style={{ height: "26rem" }}
            >
              <h2 className="departments-groups-chart-text">
                Total de Acessos em {currentYear}: {}
              </h2>
              <Line
                className="departments-groups-chart-data"
                data={accessLineChartData}
                onClick={() => navigate('/naccess/naccessaccesses')}
                style={{ cursor: "pointer" }}
              />
            </div>
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
            <h2 className="departments-groups-chart-text">
              Presenças Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={presenceBarChartData}
              onClick={() => navigate('/naccess/naccesspresence')}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "16rem" }}>
            <h2 className="departments-groups-chart-text">
              Ausências Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={noPresenceBarChartData}
              onClick={() => navigate('/naccess/naccesspresence')}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "16rem" }}>
            <h2 className="departments-groups-chart-text">
              Visitantes Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={visitorBarChartData}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "16rem" }}>
            <h2 className="departments-groups-chart-text">
              Aberturas Manuais Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={manualDoorBarChartData}
              onClick={() => navigate('/naccess/naccessdooropen')}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
