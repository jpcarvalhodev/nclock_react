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

import { EmployeeAttendanceTimes } from "../../../types/Types";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useAttendance } from "../../../context/MovementContext";
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

export const NclockGraph = () => {
  const currentYear = new Date().getFullYear() - 1;
  const { accessForGraph = [], attendance = [] } = useAttendance();
  const [accessLineChartData, setAccessLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  // Função para agrupar os eventos por mês
  function groupByMonth(data: EmployeeAttendanceTimes[]) {
    const grouped = data.reduce((acc, item) => {
      if (!item.attendanceTime) return acc;
      const date = new Date(item.attendanceTime);
      const yearMonth = format(date, "yyyy-MM", { locale: pt });
      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(item);
      return acc;
    }, {} as Record<string, EmployeeAttendanceTimes[]>);

    return Object.keys(grouped).map((key) => ({
      month: key,
      events: grouped[key],
    }));
  }

  // Dados para o gráfico PolarArea
  const polarData = {
    labels: ["Assiduidades", "Acessos", "Ausências"],
    datasets: [
      {
        label: "Total",
        data: [attendance.length, accessForGraph.length, 0],
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
    const groupedAccess = groupByMonth(attendance);

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
          label: "Total de Assiduidades",
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
        <span>Gráficos de Assiduidades</span>
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
              Total de Assiduidades em {currentYear}: {}
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
