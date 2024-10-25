import { Bar } from "react-chartjs-2";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { useEffect, useState } from "react";
import { EmployeeAttendanceTimes } from "../../../helpers/Types";
import '../../../css/PagesStyles.css';
import * as apiService from "../../../helpers/apiService";
import { Carousel } from "react-responsive-carousel";
import banner_naccess from "../../../assets/img/carousel/banner_naccess.jpg";
import { useColor } from "../../../context/ColorContext";

// Define a página principal
export const NaccessDashboardLicensed = () => {
    const { navbarColor, footerColor } = useColor();
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
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-content">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel-licensed" src={banner_naccess} alt="NAccess" />
                        </div>
                    </Carousel>
                </div>
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Presença de Funcionários</h2>
                        <Bar className="departments-groups-chart-data" data={chartDataEmployees} />
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}