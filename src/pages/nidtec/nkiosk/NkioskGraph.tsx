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
import { PolarArea } from "react-chartjs-2";

import { useKiosk } from "../../../context/KioskContext";
import { KioskTransactionCard, KioskTransactionMB } from "../../../types/Types";
import { Carousel } from "react-responsive-carousel";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { format } from "date-fns";

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

export const NkioskGraph = () => {
  const currentYear = new Date().getFullYear() - 1;
  const {
    payTerminalNoPagination = [],
    payCoinsNoPagination = [],
    moveCardNoPagination = [],
    moveKioskNoPagination = [],
    moveVP = [],
    totalMovementsNoPagination = [],
    totalPaymentsNoPagination = [],
  } = useKiosk();
  const [payBarChartData, setPayBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [moveBarChartData, setMoveBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  // Função para agrupar os eventos de pagamentos por mês
  function groupPayByMonth(data: KioskTransactionMB[]) {
    const grouped = data.reduce((acc, item) => {
      if (!item.timestamp) return acc;
      const date = new Date(item.timestamp);

      const yearMonth = format(date, "yyyy-MM");

      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(item);

      return acc;
    }, {} as Record<string, KioskTransactionMB[]>);
    return Object.keys(grouped).map((key) => ({
      month: key,
      events: grouped[key],
    }));
  }

  // Função para agrupar os eventos de movimentos por mês
  function groupMoveByMonth(data: KioskTransactionCard[]) {
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

  // Dados para o gráfico de pagamentos
  useEffect(() => {
    const groupedAccess = groupPayByMonth(totalPaymentsNoPagination);

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
          label: "Total de Pagamentos",
          data: dataPerMonth,
          backgroundColor: "rgba(82, 206, 0, 0.2)",
          tension: 0.1,
        },
      ],
    };

    setPayBarChartData(newLineData);
  }, [totalPaymentsNoPagination]);

  // Dados para o gráfico de movimento
  useEffect(() => {
    const groupedAccess = groupMoveByMonth(totalMovementsNoPagination);

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
          backgroundColor: "rgba(82, 206, 0, 0.2)",
          tension: 0.1,
        },
      ],
    };

    setMoveBarChartData(newLineData);
  }, [totalMovementsNoPagination]);

  // Dados para o gráfico PolarArea
  const polarData = {
    labels: [
      "Multibanco",
      "Moedeiro",
      "Torniquete",
      "Quiosque",
      "Video Porteiro",
    ],
    datasets: [
      {
        label: "Total",
        data: [
          payTerminalNoPagination.length,
          payCoinsNoPagination.length,
          moveCardNoPagination.length,
          moveKioskNoPagination.length,
          moveVP.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-title-text">
        <span>Gráficos de Quiosques</span>
      </div>
      <div className="dashboard-content">
        <div className="chart-container">
          <div className="employee-pie-chart" style={{ flex: 1 }}>
            <h2 className="employee-pie-chart-text">
              Total de Pagamentos e Movimentos: {}
            </h2>
            <PolarArea className="employee-pie-chart-pie" data={polarData} />
          </div>
        </div>
        <div className="chart-container" id="carousel-chart">
          <Carousel
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            emulateTouch={true}
          >
            <div className="departments-groups-chart">
              <h2 className="departments-groups-chart-text">
                Total de Pagamentos em {currentYear}: {}
              </h2>
              <Bar
                className="departments-groups-chart-data"
                data={payBarChartData}
              />
            </div>
            <div className="departments-groups-chart">
              <h2 className="departments-groups-chart-text">
                Total de Movimentos em {currentYear}: {}
              </h2>
              <Bar
                className="departments-groups-chart-data"
                data={moveBarChartData}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
