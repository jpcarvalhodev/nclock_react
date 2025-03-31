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
import { Bar, PolarArea } from "react-chartjs-2";

import { useKiosk } from "../../../context/KioskContext";
import { useEffect, useState } from "react";
import { Accesses, KioskTransactionCard } from "../../../types/Types";
import { format, parse } from "date-fns";
import { useAttendance } from "../../../context/AttendanceContext";
import { usePersons } from "../../../context/PersonsContext";
import { Carousel } from "react-responsive-carousel";
import { pt } from "date-fns/locale";

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

export const NvisitorGraph = () => {
  const currentYear = new Date().getFullYear() - 1;
  const {
    moveCardNoPagination = [],
    moveKioskNoPagination = [],
    totalMovementsNoPagination = [],
  } = useKiosk();
  const { accessForGraph = [] } = useAttendance();
  const { employeeVisitor = [] } = usePersons();
  const [moveBarChartData, setMoveBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [accessBarChartData, setAccessBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  // Função para agrupar os eventos de movimentos por mês
  function groupByMonth(data: KioskTransactionCard[]) {
    const grouped = data.reduce((acc, item) => {
      if (!item.eventTime) return acc;
      const date = new Date(item.eventTime);

      const yearMonth = format(date, "yyyy-MM");

      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(item);

      return acc;
    }, {} as Record<string, KioskTransactionCard[]>);
    return Object.keys(grouped).map((key) => ({
      month: key,
      events: grouped[key],
    }));
  }

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

  // Dados para o gráfico PolarArea
  const polarData = {
    labels: ["Torniquete", "Quiosque", "Acessos", "Visitantes"],
    datasets: [
      {
        label: "Total",
        data: [
          moveCardNoPagination.length,
          moveKioskNoPagination.length,
          accessForGraph.length,
          employeeVisitor.length,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dados para o gráfico de movimento
  useEffect(() => {
    const groupedAccess = groupByMonth(totalMovementsNoPagination);

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
          label: "Total de Movimentos",
          data: dataPerMonth,
          backgroundColor: "rgba(0, 19, 190, 0.4)",
          tension: 0.1,
        },
      ],
    };

    setMoveBarChartData(newLineData);
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
          backgroundColor: "rgba(0, 19, 190, 0.4)",
          tension: 0.1,
        },
      ],
    };

    setAccessBarChartData(newLineData);
  }, [accessForGraph]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-title-text">
        <span>Gráficos de Movimentos</span>
      </div>
      <div className="dashboard-content">
        <div className="chart-container">
          <div className="employee-pie-chart" style={{ flex: 1 }}>
            <h2 className="employee-pie-chart-text">Total Geral: {}</h2>
            <PolarArea className="employee-pie-chart-pie" data={polarData} />
          </div>
        </div>
        <div className="chart-container">
          <Carousel
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            emulateTouch={true}
          >
            <div className="departments-groups-chart" style={{ flex: 1 }}>
              <h2 className="departments-groups-chart-text">
                Total de Movimentos em {currentYear}: {}
              </h2>
              <Bar
                className="departments-groups-chart-data"
                data={moveBarChartData}
              />
            </div>
            <div className="departments-groups-chart" style={{ flex: 1 }}>
              <h2 className="departments-groups-chart-text">
                Total de Acessos em {currentYear}: {}
              </h2>
              <Bar
                className="departments-groups-chart-data"
                data={accessBarChartData}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
