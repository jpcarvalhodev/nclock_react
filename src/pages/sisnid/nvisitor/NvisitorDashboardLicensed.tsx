import {
  ArcElement,
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import {
  format,
  getDay,
  getMonth,
  isToday,
  parse,
  parseISO,
  startOfWeek,
} from "date-fns";
import { pt } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Bar, Line } from "react-chartjs-2";
import { Carousel } from "react-responsive-carousel";

import { useNavigate } from "react-router-dom";
import banner_nvisitor from "../../../assets/img/carousel/banner_nvisitor.jpg";

import { useKiosk } from "../../../context/KioskContext";
import {
  Accesses,
  EmployeeVisitor,
  KioskTransactionCard,
} from "../../../types/Types";
import { useAttendance } from "../../../context/AttendanceContext";
import { usePersons } from "../../../context/PersonsContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

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
  uniqueId?: string;
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

export const NvisitorDashboardLicensed = () => {
  const currentYear = new Date().getFullYear();
  const {
    moveCardNoPagination,
    moveKioskNoPagination,
    totalMovementsNoPagination,
  } = useKiosk();
  const { accessForGraph = [] } = useAttendance();
  const { employeeVisitor = [] } = usePersons();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [moveLineChartData, setMoveLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [accessLineChartData, setAccessLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [todayCardLineChartData, setTodayCardLineChartData] =
    useState<ChartData>({ labels: [], datasets: [] });
  const [todayKioskLineChartData, setTodayKioskLineChartData] =
    useState<ChartData>({ labels: [], datasets: [] });
  const [todayAccessLineChartData, setTodayAccessLineChartData] =
    useState<ChartData>({ labels: [], datasets: [] });
  const [todayVisitorLineChartData, setTodayVisitorLineChartData] =
    useState<ChartData>({ labels: [], datasets: [] });
  const [todayTotalCard, setTodayTotalCard] = useState<KioskTransactionCard[]>(
    []
  );
  const [todayTotalKiosk, setTodayTotalKiosk] = useState<
    KioskTransactionCard[]
  >([]);
  const [todayTotalAccess, setTodayTotalAccess] = useState<Accesses[]>([]);
  const [todayTotalVisitor, setTodayTotalVisitor] = useState<EmployeeVisitor[]>(
    []
  );
  const navigate = useNavigate();

  // Função para agrupar os movimentos por mês
  const fetchAllData = async () => {
    try {
      if (
        !Array.isArray(moveCardNoPagination) ||
        !Array.isArray(moveKioskNoPagination) ||
        !Array.isArray(totalMovementsNoPagination) ||
        !Array.isArray(accessForGraph) ||
        !Array.isArray(employeeVisitor)
      ) {
        return;
      }
      const todayCard = moveCardNoPagination.filter((item) =>
        isToday(
          item.eventTime instanceof Date
            ? item.eventTime
            : parseISO(item.eventTime)
        )
      );
      const todayKiosk = moveKioskNoPagination.filter((item) =>
        isToday(
          item.eventTime instanceof Date
            ? item.eventTime
            : parseISO(item.eventTime)
        )
      );
      const todayAccess = accessForGraph.filter((item) =>
        isToday(item.eventTime ? item.eventTime : parseISO(item.eventTime))
      );
      const todayVisitor = employeeVisitor.filter((item) =>
        isToday(
          item.eventTime instanceof Date
            ? item.eventTime
            : parseISO(item.eventTime)
        )
      );

      setTodayTotalCard(todayCard);
      setTodayTotalKiosk(todayKiosk);
      setTodayTotalAccess(todayAccess);
      setTodayTotalVisitor(todayVisitor);

      const eventSet = new Set();
      const newEvents = totalMovementsNoPagination.reduce(
        (acc: CalendarEvent[], item: KioskTransactionCard) => {
          if (!item.eventTime) return acc;

          const eventDate = new Date(item.eventTime);
          if (isNaN(eventDate.getTime())) return acc;

          const dateKey = eventDate.toISOString().split("T")[0];
          const eventKey =
            dateKey + "|" + item.eventName + "|" + item.eventDoorId;

          if (!eventSet.has(eventKey)) {
            eventSet.add(eventKey);
            acc.push({
              id: item.eventTime + item.eventName,
              title: item.eventDoorId === 3 ? "Torniquete" : "Quiosque",
              start: eventDate,
              end: eventDate,
              allDay: true,
              uniqueId: item.eventTime + item.eventName,
            });
          }
          return acc;
        },
        [] as CalendarEvent[]
      );
      setEvents(newEvents);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  // Busca os dados ao carregar a página
  useEffect(() => {
    fetchAllData();
  }, [moveCardNoPagination, moveKioskNoPagination, totalMovementsNoPagination]);

  // Função para renderizar os eventos no calendário
  const MyEvent = ({ event }: MyEventProps) => {
    return <div className="calendar-event">{event.title}</div>;
  };

  // Calcula a quantidade total de movimentos por mês
  const calculateMoveMonthlyCounts = (transactions: KioskTransactionCard[]) => {
    if (!transactions || !Array.isArray(transactions)) {
      return Array(12).fill(0);
    }
    const currentYear = new Date().getFullYear();
    const monthlyCounts = Array(12).fill(0);

    const filteredTransactions = transactions.filter((transaction) => {
      let transactionDate;
      if (transaction.eventTime.toString().includes("-")) {
        transactionDate = parseISO(transaction.eventTime.toString());
      } else {
        transactionDate = parse(
          transaction.eventTime.toString(),
          "EEE MMM dd yyyy HH:mm:ss x (zzzz)",
          new Date()
        );
      }
      return transactionDate.getFullYear() === currentYear;
    });

    filteredTransactions.forEach((transaction) => {
      const transactionDate = transaction.eventTime.toString().includes("-")
        ? parseISO(transaction.eventTime.toString())
        : parse(
            transaction.eventTime.toString(),
            "EEE MMM dd yyyy HH:mm:ss x (zzzz)",
            new Date()
          );

      const month = getMonth(transactionDate);
      monthlyCounts[month] += 1;
    });

    return monthlyCounts;
  };

  // Função para agrupar os eventos por mês
  function groupAccessByMonth(data: Accesses[]) {
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

  // Atualiza os dados do gráfico com base nos movimentos anuais
  useEffect(() => {
    const monthlyMoveTotals = calculateMoveMonthlyCounts(
      totalMovementsNoPagination
    );
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
          label: "Total de Movimentos por Mês",
          data: monthlyMoveTotals,
          fill: false,
          borderColor: "#0050a0",
          tension: 0.1,
        },
      ],
    };
    setMoveLineChartData(newLineData);
  }, [totalMovementsNoPagination]);

  // Atualiza os dados do gráfico com base nos movimentos anuais
  useEffect(() => {
    const groupedAccess = groupAccessByMonth(accessForGraph);

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

  // Define os dados do gráfico de linha para os torniquetes de hoje
  useEffect(() => {
    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Torniquete Hoje",
          data: [todayTotalCard.length],
          backgroundColor: "#0050a0",
        },
      ],
    };
    setTodayCardLineChartData(chartData);
  }, [todayTotalCard]);

  // Define os dados do gráfico de linha para os kiosks de hoje
  useEffect(() => {
    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Quiosque Hoje",
          data: [todayTotalKiosk.length],
          backgroundColor: "#0050a0",
        },
      ],
    };
    setTodayKioskLineChartData(chartData);
  }, [todayTotalKiosk]);

  // Define os dados do gráfico de linha para os acessos de hoje
  useEffect(() => {
    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Acessos Hoje",
          data: [todayTotalAccess.length],
          backgroundColor: "#0050a0",
        },
      ],
    };
    setTodayAccessLineChartData(chartData);
  }, [todayTotalAccess]);

  // Define os dados do gráfico de linha para os acessos de hoje
  useEffect(() => {
    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Visitantes Hoje",
          data: [todayTotalVisitor.length],
          backgroundColor: "#0050a0",
        },
      ],
    };
    setTodayVisitorLineChartData(chartData);
  }, [todayTotalVisitor]);

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
                src={banner_nvisitor}
                alt="Nvisitor"
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
                Total de Movimentos em {currentYear}: {}
              </h2>
              <Line
                className="departments-groups-chart-data"
                data={moveLineChartData}
                onClick={() => navigate("/nvisitor/nvisitorlistmovements")}
                style={{ cursor: "pointer" }}
              />
            </div>
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
                onClick={() => navigate("/nvisitor/nvisitoraccess")}
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
          <div className="departments-groups-chart" style={{ height: "15rem" }}>
            <h2 className="departments-groups-chart-text">
              Torniquete Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={todayCardLineChartData}
              onClick={() => navigate("/nvisitor/nvisitormovecard")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "15rem" }}>
            <h2 className="departments-groups-chart-text">Quiosque Hoje: {}</h2>
            <Bar
              className="departments-groups-chart-data"
              data={todayKioskLineChartData}
              onClick={() => navigate("/nvisitor/nvisitormovekiosk")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "15rem" }}>
            <h2 className="departments-groups-chart-text">Acessos Hoje: {}</h2>
            <Bar
              className="departments-groups-chart-data"
              data={todayAccessLineChartData}
              onClick={() => navigate("/nvisitor/nvisitoraccess")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "15rem" }}>
            <h2 className="departments-groups-chart-text">
              Visitantes Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={todayVisitorLineChartData}
              onClick={() => navigate("/nvisitor/nvisitorvisitors")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
