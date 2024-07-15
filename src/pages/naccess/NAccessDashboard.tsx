import { Bar } from "react-chartjs-2";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { useEffect, useState } from "react";
import { EmployeeAttendanceTimes } from "../../helpers/Types";
import '../../css/PagesStyles.css';
import * as apiService from "../../helpers/apiService";

// Define a página principal
export const NaccessDashboard = () => {
    const [totalEmployees, setTotalEmployees] = useState<number>(0);

    // Função para buscar os departamentos
    const fetchAssiduityEmployees = async (): Promise<void> => {
        try {
            const employees: EmployeeAttendanceTimes[] = await apiService.fetchAllAttendances();
            setTotalEmployees(employees.length);
        } catch (error) {
            console.error('Erro ao buscar departamentos:', error);
        }
    };

    // Define os dados do gráfico de barras
    const chartDataEmployees = {
        labels: ['Funcionários'],
        datasets: [{
            label: 'Presença de Funcionários',
            data: [totalEmployees],
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
            await fetchAssiduityEmployees();
        } catch (error) {
            console.error("Erro ao carregar dados: ", error);
        }
    };

    return (
        <div className="dashboard-container">
            <NavBar />
            <div className="datatable-title-text-dashboard">
                <span>Naccess dashboard</span>
            </div>
            <div className='content-wrapper'>
                <div className="dashboard-content">
                    <div className="chart-container">
                        <div className="departments-groups-chart" style={{ flex: 1 }}>
                            <h2 className="departments-groups-chart-text">Presença de Funcionários</h2>
                            <Bar data={chartDataEmployees} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}