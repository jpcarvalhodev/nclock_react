import { useEffect, useState } from "react";

import { Accesses, EmployeeAttendanceTimes } from "../../../types/Types";
import "../../../css/PagesStyles.css";

import { format, getDay, parse, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Bar, Line } from "react-chartjs-2";
import { Carousel } from "react-responsive-carousel";
import * as apiService from "../../../api/apiService";
import banner_naccess from "../../../assets/img/carousel/banner_naccess.jpg";
import { ChartData } from "chart.js";
import { useAttendance } from "../../../context/MovementContext";
import { useKiosk } from "../../../context/KioskContext";

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

// Formata a data para o início do dia às 00:00
const formatDateToStartOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T00:00`;
};

// Formata a data para o final do dia às 23:59
const formatDateToEndOfDay = (date: Date): string => {
  return `${date.toISOString().substring(0, 10)}T23:59`;
};

// Define a página principal
export const NaccessDashboardLicensed = () => {
  const currentDate = new Date();
  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState(
    formatDateToStartOfDay(currentDate)
  );
  const [endDate, setEndDate] = useState(formatDateToEndOfDay(currentDate));
  const { access, fetchAllAccessesbyDevice } = useAttendance();
  const { manualOpenDoor } = useKiosk();
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
  const [vpBarChartData, setVpBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [manualDoorBarChartData, setManualDoorBarChartData] =
    useState<ChartData>({
      labels: [],
      datasets: [],
    });

  // Define a data atual
  useEffect(() => {
    fetchAllAccessesbyDevice();
    const currentDate = new Date();
    setStartDate(formatDateToStartOfDay(currentDate));
    setEndDate(formatDateToEndOfDay(currentDate));
  }, []);

  // Função para verificar se a resposta tem uma mensagem de erro
  const checkForErrorMessage = (response: string | any[]) => {
    return response.length === 0 || (response[0] && response[0].message);
  };

  // Função para renderizar os eventos no calendário
  const MyEvent = ({ event }: MyEventProps) => {
    return <div className="calendar-event">{event.title}</div>;
  };

  // Função para agrupar os eventos por mês
  function groupByMonth(data: Accesses[]) {
    const grouped = data.reduce((acc, item) => {
      const date = parse(item.eventTime, "dd/MM/yyyy HH:mm:ss", new Date(), {
        locale: ptBR,
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
    const groupedAccess = groupByMonth(access);

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
          label: "Total de acessos",
          data: dataPerMonth,
          fill: false,
          borderColor: "#0050a0",
          tension: 0.1,
        },
      ],
    };

    setAccessLineChartData(newLineData);
  }, [access]);

  // Define os dados do gráfico de linha para as presenças de hoje
  useEffect(() => {
    const today = format(new Date(), "dd/MM/yyyy", { locale: ptBR });

    const todayAccesses = access.filter((item) => {
      const eventDate = format(
        parse(item.eventTime, "dd/MM/yyyy HH:mm:ss", new Date()),
        "dd/MM/yyyy",
        { locale: ptBR }
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
  }, [access]);

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

  // Define os dados do gráfico de linha para o video porteiro de hoje
  useEffect(() => {
    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Video Porteiro Hoje",
          data: [0],
          backgroundColor: "#0050a0",
        },
      ],
    };
    setVpBarChartData(chartData);
  }, []);

  // Define os dados do gráfico de linha para as aberturas manuais de hoje
  useEffect(() => {
    const today = format(new Date(), "dd/MM/yyyy", { locale: ptBR });

    const todayManualDoor = manualOpenDoor.filter((item) => {
      const eventDate = format(
        parse(item.eventTime, "dd/MM/yyyy HH:mm:ss", new Date()),
        "dd/MM/yyyy",
        { locale: ptBR }
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
                Total de acessos em {currentYear}: {}
              </h2>
              <Line
                className="departments-groups-chart-data"
                data={accessLineChartData}
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
              Presenças hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={presenceBarChartData}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "16rem" }}>
            <h2 className="departments-groups-chart-text">
              Visitantes hoje: {}
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
              Video porteiro hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={vpBarChartData}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "16rem" }}>
            <h2 className="departments-groups-chart-text">
              Abertura manual hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={manualDoorBarChartData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
