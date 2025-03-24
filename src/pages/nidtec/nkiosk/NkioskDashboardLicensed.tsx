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
  isToday,
  format,
  getDay,
  getMonth,
  parse,
  parseISO,
  startOfWeek,
} from "date-fns";
import { pt } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Line, Bar } from "react-chartjs-2";
import { Carousel } from "react-responsive-carousel";

import { useNavigate } from "react-router-dom";
import banner_nkiosk from "../../../assets/img/carousel/banner_nkiosk.jpg";

import { useKiosk } from "../../../context/KioskContext";

import { KioskTransactionCard, KioskTransactionMB } from "../../../types/Types";

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

export const NkioskDashboardLicensed = () => {
  const currentYear = new Date().getFullYear();
  const {
    payCoinsNoPagination,
    payTerminalNoPagination,
    moveCardNoPagination,
    moveKioskNoPagination,
    totalMovementsNoPagination,
    totalPaymentsNoPagination,
  } = useKiosk();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [payLineChartData, setPayLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [moveLineChartData, setMoveLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [todayCardLineChartData, setTodayCardLineChartData] =
    useState<ChartData>({ labels: [], datasets: [] });
  const [todayKioskLineChartData, setTodayKioskLineChartData] =
    useState<ChartData>({ labels: [], datasets: [] });
  const [todayMbLineChartData, setTodayMbLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [todayCoinLineChartData, setTodayCoinLineChartData] =
    useState<ChartData>({ labels: [], datasets: [] });
  const [todayTotalMb, setTodayTotalMb] = useState<KioskTransactionMB[]>([]);
  const [todayTotalCoin, setTodayTotalCoin] = useState<KioskTransactionMB[]>(
    []
  );
  const [todayTotalCard, setTodayTotalCard] = useState<KioskTransactionCard[]>(
    []
  );
  const [todayTotalKiosk, setTodayTotalKiosk] = useState<
    KioskTransactionCard[]
  >([]);
  const navigate = useNavigate();

  // Função para buscar os dados para os gráficos
  const fetchAllData = async () => {
    try {
      if (
        !Array.isArray(payCoinsNoPagination) ||
        !Array.isArray(payTerminalNoPagination) ||
        !Array.isArray(moveCardNoPagination) ||
        !Array.isArray(moveKioskNoPagination) ||
        !Array.isArray(totalMovementsNoPagination)
      ) {
        return;
      }
      const todayMb = payTerminalNoPagination.filter((item) =>
        isToday(
          item.timestamp instanceof Date
            ? item.timestamp
            : parseISO(item.timestamp)
        )
      );
      const todayCoin = payCoinsNoPagination.filter((item) =>
        isToday(
          item.timestamp instanceof Date
            ? item.timestamp
            : parseISO(item.timestamp)
        )
      );
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

      setTodayTotalMb(todayMb);
      setTodayTotalCoin(todayCoin);
      setTodayTotalCard(todayCard);
      setTodayTotalKiosk(todayKiosk);

      const eventSet = new Set();
      const newEvents = totalMovementsNoPagination.reduce(
        (acc: CalendarEvent[], item: KioskTransactionCard) => {
          const eventDate = new Date(item.eventTime);
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
  }, [
    payTerminalNoPagination,
    payCoinsNoPagination,
    moveCardNoPagination,
    moveKioskNoPagination,
    totalMovementsNoPagination,
  ]);

  // Função para renderizar os eventos no calendário
  const MyEvent = ({ event }: MyEventProps) => {
    return <div className="calendar-event">{event.title}</div>;
  };

  // Calcula a quantidade todal de pagamentos por mês
  const calculatePayMonthlyCounts = (transactions: KioskTransactionMB[]) => {
    if (!transactions || !Array.isArray(transactions)) {
      return Array(12).fill(0);
    }
    const currentYear = new Date().getFullYear();
    const monthlyCounts = Array(12).fill(0);

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.timestamp);
      return transactionDate.getFullYear() === currentYear;
    });

    filteredTransactions.forEach((transaction) => {
      if (transaction.timestamp) {
        const date = new Date(transaction.timestamp);
        const month = date.getMonth();
        monthlyCounts[month] += 1;
      }
    });

    return monthlyCounts;
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

  // Atualiza os dados do gráfico com base nos pagamentos anuais
  useEffect(() => {
    const monthlyPayTotals = calculatePayMonthlyCounts(
      totalPaymentsNoPagination
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
          label: "Total de Pagamentos por Mês",
          data: monthlyPayTotals,
          fill: false,
          borderColor: "#009739",
          tension: 0.1,
        },
      ],
    };
    setPayLineChartData(newLineData);
  }, [totalPaymentsNoPagination]);

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
          borderColor: "#009739",
          tension: 0.1,
        },
      ],
    };
    setMoveLineChartData(newLineData);
  }, [totalMovementsNoPagination]);

  // Define os dados do gráfico de linha para os multibancos de hoje
  useEffect(() => {
    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Multibanco Hoje",
          data: [todayTotalMb.flat().length],
          backgroundColor: "#009739",
        },
      ],
    };
    setTodayMbLineChartData(chartData);
  }, [todayTotalMb]);

  // Define os dados do gráfico de linha para os moedeiro de hoje
  useEffect(() => {
    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Moedas Hoje",
          data: [todayTotalCoin.length],
          backgroundColor: "#009739",
        },
      ],
    };
    setTodayCoinLineChartData(chartData);
  }, [todayTotalCoin]);

  // Define os dados do gráfico de linha para os torniquetes de hoje
  useEffect(() => {
    const chartData = {
      labels: ["Hoje"],
      datasets: [
        {
          label: "Torniquete Hoje",
          data: [todayTotalCard.length],
          backgroundColor: "#009739",
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
          backgroundColor: "#009739",
        },
      ],
    };
    setTodayKioskLineChartData(chartData);
  }, [todayTotalKiosk]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div
          className="dashboard-carousel-container-pages-no-title"
          style={{ marginTop: 5 }}
        >
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
                src={banner_nkiosk}
                alt="Nkiosk"
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
                Total de Pagamentos em {currentYear}: {}
              </h2>
              <Line
                className="departments-groups-chart-data"
                data={payLineChartData}
                onClick={() => navigate("/nkiosk/nkiosklistpayments")}
                style={{ cursor: "pointer" }}
              />
            </div>
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
                onClick={() => navigate("/nkiosk/nkiosklistmovements")}
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
              Multibanco Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={todayMbLineChartData}
              onClick={() => navigate("/nkiosk/nkioskpayterminal")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "15rem" }}>
            <h2 className="departments-groups-chart-text">
              Moedeiro Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={todayCoinLineChartData}
              onClick={() => navigate("/nkiosk/nkioskpaycoins")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "15rem" }}>
            <h2 className="departments-groups-chart-text">
              Torniquete Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={todayCardLineChartData}
              onClick={() => navigate("/nkiosk/nkioskmovecard")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="carousel-chart-container-graphs" id="carousel-chart">
          <div className="departments-groups-chart" style={{ height: "15rem" }}>
            <h2 className="departments-groups-chart-text">
              Quiosque Hoje: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={todayKioskLineChartData}
              onClick={() => navigate("/nkiosk/nkioskmovekiosk")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
