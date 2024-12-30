import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext, useEffect, useState } from "react";
import { PolarArea , Bar } from "react-chartjs-2";

import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { useNavbar } from "../../../context/NavbarContext";
import { TerminalsContext, DeviceContextType } from "../../../context/TerminalsContext";
import * as apiService from "../../../helpers/apiService";
import { KioskTransactionCard, KioskTransactionMB } from "../../../helpers/Types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend);

export const NkioskGraph = () => {
    const { navbarColor, footerColor } = useNavbar();
    const { devices } = useContext(TerminalsContext) as DeviceContextType;
    const [payTerminal, setPayTerminal] = useState<KioskTransactionMB[]>([]);
    const [payCoins, setPayCoins] = useState<KioskTransactionMB[]>([]);
    const [moveCard, setMoveCard] = useState<KioskTransactionCard[]>([]);
    const [moveKiosk, setMoveKiosk] = useState<KioskTransactionCard[]>([]);
    const [moveVP, setMoveVP] = useState<KioskTransactionCard[]>([]);
    const [totalMovements, setTotalMovements] = useState<KioskTransactionCard[]>([]);
    const eventDoorId2 = '2';
    const eventDoorId3 = '3';
    const eventDoorId4 = '4';

    // Função para buscar os dados para os gráficos
    const fetchAllData = async () => {
        try {
            if (devices.length === 0) {
                console.error('Não há dispositivos para buscar dados');
                return;
            }

            const mbPromises = devices.map(device =>
                apiService.fetchKioskTransactionsByMBAndDeviceSN()
            );
            const cardPromises = devices.map(device =>
                apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId3, device.serialNumber)
            );
            const coinPromises = devices.map(device =>
                apiService.fetchKioskTransactionsByPayCoins(eventDoorId2, device.serialNumber)
            );
            const vpPromises = devices.map(device =>
                apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId3, device.serialNumber)
            );
            const kioskPromises = devices.map(device =>
                apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId4, device.serialNumber)
            );

            const [mbResults, cardResults, coinResults, vpResults, kioskResults] = await Promise.all([
                Promise.all(mbPromises),
                Promise.all(cardPromises),
                Promise.all(coinPromises),
                Promise.all(vpPromises),
                Promise.all(kioskPromises)
            ]);

            const combinedMBData = mbResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedCardData = cardResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedCoinData = coinResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedVPData = vpResults.filter(data => Array.isArray(data) && data.length > 0).flat();
            const combinedKioskData = kioskResults.filter(data => Array.isArray(data) && data.length > 0).flat();

            setPayTerminal(combinedMBData);
            setPayCoins(combinedCoinData);
            setMoveCard(combinedCardData);
            setMoveVP(combinedVPData);
            setMoveKiosk(combinedKioskData);

            const totalMove = combinedCardData.concat(combinedKioskData);
            setTotalMovements(totalMove);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            setPayTerminal([]);
            setPayCoins([]);
            setMoveCard([]);
            setMoveKiosk([]);
            setMoveVP([]);
            setTotalMovements([]);
        }
    };

    // UseEffect para buscar os dados
    useEffect(() => {
        fetchAllData();
    }, [devices]);

    // Função para agrupar os dados por mês com base no campo correto
    const groupByMonth = <T extends KioskTransactionMB | KioskTransactionCard>(
        data: T[],
        dateField: keyof T
    ): number[] => {
        const months = Array(12).fill(0);

        data.forEach((item, index) => {
            const dateValue = item[dateField];
            let parsedDate: Date | null = null;

            if (typeof dateValue === 'string') {
                if (dateField === 'eventTime') {
                    try {
                        const formattedDate = dateValue.replace(' ', 'T');
                        parsedDate = new Date(formattedDate);

                        if (isNaN(parsedDate.getTime())) {
                            console.warn(`Data inválida encontrada no campo 'eventTime' no item ${index}: ${dateValue}`);
                            return;
                        }
                    } catch (error) {
                        console.error(`Erro ao converter 'eventTime' no item ${index}: ${dateValue}`, error);
                        return;
                    }
                } else {
                    parsedDate = new Date(dateValue);

                    if (isNaN(parsedDate.getTime())) {
                        console.warn(`Data inválida encontrada no campo 'timestamp' no item ${index}: ${dateValue}`);
                        return;
                    }
                }

                if (parsedDate) {
                    const monthIndex = parsedDate.getMonth();

                    if ('cardNo' in item) {
                        months[monthIndex] += 1;
                    } else if ('amount' in item) {
                        months[monthIndex] += parseFloat(item.amount.replace(',', '.'));
                    }
                }
            } else {
                console.error(`Campo ${String(dateField)} inválido ou não é string no item ${index}`, item);
            }
        });

        return months;
    };

    // Dados para o gráfico PolarArea
    const polarData = {
        labels: ['Multibanco', 'Moedeiro', 'Torniquete', 'Quiosque', 'Video Porteiro'],
        datasets: [
            {
                label: 'Total',
                data: [payTerminal.length, payCoins.length, moveCard.length, moveKiosk.length, moveVP.length],
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

    // Dados para o gráfico Bar
    const barData = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
            {
                label: 'Total de Movimentos',
                data: groupByMonth(totalMovements, 'eventTime'),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Gráficos de Pagamentos e Movimentos</span>
            </div>
            <div className="dashboard-content">
                <div className="chart-container">
                    <div className="employee-pie-chart" style={{ flex: 1 }}>
                        <h2 className="employee-pie-chart-text">Total de Pagamentos e Movimentos: { }</h2>
                        <PolarArea className="employee-pie-chart-pie" data={polarData} />
                    </div>
                </div>
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Total de Movimentos: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barData} />
                    </div>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}