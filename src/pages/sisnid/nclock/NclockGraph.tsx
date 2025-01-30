import { ArcElement, BarElement, CategoryScale, ChartData, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Pie } from "react-chartjs-2";

import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { useNavbar } from "../../../context/NavbarContext";
import { usePersons } from '../../../context/PersonsContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend);

export const NclockGraph = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { employees, departments, groups } = usePersons();
    const [chartDataEmployees, setChartDataEmployees] = useState<ChartData>({ labels: [], datasets: [] });
    const [chartDataDepartmentsGroups, setChartDataDepartmentsGroups] = useState<ChartData>({ labels: [], datasets: [] });

    // Atualiza os gráficos de acordo com a quantidade de funcionários
    useEffect(() => {
        setChartDataEmployees({
            labels: ['Total de Funcionários'],
            datasets: [{
                label: 'Contagem de Funcionários',
                data: [employees.length],
                backgroundColor: ['#0050a0'],
                borderColor: ['#0080ff'],
                borderWidth: 1,
            }]
        });
    }, [employees]);

    // Atualiza os gráficos de acordo com a quantidade de departamentos e grupos
    useEffect(() => {
        setChartDataDepartmentsGroups({
            labels: ['Departamentos', 'Grupos'],
            datasets: [{
                label: 'Contagem de Departamentos e Grupos',
                data: [departments.length, groups.length],
                backgroundColor: ['#0050a0'],
                borderColor: ['#0080ff'],
                borderWidth: 1
            }]
        });
    }, [departments, groups]);

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Gráficos de Assiduidade</span>
            </div>
            <div className="dashboard-content">
                <div className="chart-container">
                    <div className="employee-pie-chart" style={{ flex: 1 }}>
                        <h2 className="employee-pie-chart-text">Total de Funcionários: { }</h2>
                        <Pie className="employee-pie-chart-pie" data={chartDataEmployees} />
                    </div>
                </div>
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Departamentos e Grupos</h2>
                        <Bar className="departments-groups-chart-data" data={chartDataDepartmentsGroups} />
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}