import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { useColor } from "../../../context/ColorContext";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import * as apiService from "../../../helpers/apiService";
import { Pie } from "react-chartjs-2";
import { format, parse, startOfWeek, getDay, setYear } from 'date-fns';
import { Department, Employee, Group } from "../../../helpers/Types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend);

export const NclockGraph = () => {
    const { navbarColor, footerColor } = useColor();
    const [totalEmployees, setTotalEmployees] = useState<number>(0);
    const [totalDepartments, setTotalDepartments] = useState<number>(0);
    const [totalGroups, setTotalGroups] = useState<number>(0);

    // Função para buscar os departamentos
    const fetchDepartments = async (): Promise<void> => {
        try {
            const departments: Department[] = await apiService.fetchAllDepartments();
            setTotalDepartments(departments.length);
        } catch (error) {
            console.error('Erro ao buscar departamentos:', error);
        }
    };

    // Função para buscar os grupos
    const fetchGroups = async (): Promise<void> => {
        try {
            const groups: Group[] = await apiService.fetchAllGroups();
            setTotalGroups(groups.length);
        } catch (error) {
            console.error('Erro ao buscar grupos:', error);
        }
    };

    // Define os dados do gráfico circular
    const chartData = {
        labels: ['Total de Funcionários'],
        datasets: [{
            label: 'Contagem de Funcionários',
            data: [totalEmployees],
            backgroundColor: [
                '#0050a0'
            ],
            borderColor: [
                '#0080ff'
            ],
            borderWidth: 1
        }]
    };

    // Define os dados do gráfico de barras
    const chartDataDepartmentsGroups = {
        labels: ['Departamentos', 'Grupos'],
        datasets: [{
            label: 'Contagem de Departamentos e Grupos',
            data: [totalDepartments, totalGroups],
            backgroundColor: ['#0050a0'],
            borderColor: ['#0080ff'],
            borderWidth: 1
        }]
    };

    // Carrega os dados
    useEffect(() => {
        loadData();
    }, []);

    // Função para carregar os dados
    const loadData = async () => {
        try {
            const employees: Employee[] = await apiService.fetchAllEmployees();
            setTotalEmployees(employees.length);
            await fetchDepartments();
            await fetchGroups();
        } catch (error) {
            console.error("Erro ao carregar dados: ", error);
        }
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Gráficos de Assiduidade</span>
            </div>
            <div className="dashboard-content">
                <div className="chart-container">
                    <div className="employee-pie-chart" style={{ flex: 1 }}>
                        <h2 className="employee-pie-chart-text">Total de Funcionários: {totalEmployees}</h2>
                        <Pie className="employee-pie-chart-pie" data={chartData} />
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