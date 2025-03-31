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
import { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";

import { Accesses } from "../../../types/Types";
import { format, parse } from "date-fns";
import { pt } from "date-fns/locale";
import { useAttendance } from "../../../context/AttendanceContext";
import { usePersons } from "../../../context/PersonsContext";
import { useKiosk } from "../../../context/KioskContext";
import { Bar } from "react-chartjs-2";

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

export const NaccessGraph = () => {
  const currentYear = new Date().getFullYear() - 1;
  const { accessForGraph = [] } = useAttendance();
  const { employeeVisitor = [] } = usePersons();
  const { manualOpenDoor = [] } = useKiosk();
  const [accessLineChartData, setAccessLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

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

  // Dados para o gráfico PolarArea
  const polarData = {
    labels: ["Acessos", "Visitantes", "Aberturas Manuais"],
    datasets: [
      {
        label: "Total",
        data: [
          accessForGraph.length,
          employeeVisitor.length,
          manualOpenDoor.length,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
          backgroundColor: "rgba(0, 19, 190, 0.4)",
          tension: 0.1,
        },
      ],
    };

    setAccessLineChartData(newLineData);
  }, [accessForGraph]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-title-text">
        <span>Gráficos de Acessos</span>
      </div>
      <div className="dashboard-content">
        <div className="chart-container">
          <div className="employee-pie-chart" style={{ flex: 1 }}>
            <h2 className="employee-pie-chart-text">Total Geral: {}</h2>
            <PolarArea className="employee-pie-chart-pie" data={polarData} />
          </div>
        </div>
        <div className="chart-container">
          <div className="departments-groups-chart">
            <h2 className="departments-groups-chart-text">
              Total de Acessos em {currentYear}: {}
            </h2>
            <Bar
              className="departments-groups-chart-data"
              data={accessLineChartData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
