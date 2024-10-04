import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import banner_nkiosk from "../../../assets/img/carousel/banner_nkiosk.jpg";
import { useColor } from "../../../context/ColorContext";
import { PolarArea } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,RadialLinearScale,ArcElement,Tooltip,Legend);

export const NkioskDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    // Dados para o gráfico PolarArea
    const polarData = {
        labels: ['Reduzir Custos', 'Edição Automatizada', 'Ambiente Moderno', 'Interação Eficiente', 'Automação'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Dados para o gráfico Line
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Visitas ao Quiosque',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    // Dados para o gráfico Bar
    const barData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Número de Interações',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Nkiosk Dashboard</span>
            </div>
            <div className="dashboard-content">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel-licensed" src={banner_nkiosk} alt="Nkiosk" />
                        </div>
                    </Carousel>
                </div>
                <div className="chart-container">
                    <div className="employee-pie-chart" style={{ flex: 1 }}>
                        <h2 className="employee-pie-chart-text">Total de Funcionários: {}</h2>
                        <PolarArea className="employee-pie-chart-pie" data={polarData} />
                    </div>
                </div>
            </div>
            <div className="dashboard-content">
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Total de Pagamentos: {}</h2>
                        <Line className="departments-groups-chart-data" data={lineData} style={{ marginLeft: 50 }} />
                    </div>
                </div>
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Total de Funcionários: {}</h2>
                        <Bar className="departments-groups-chart-data" data={barData} />
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}