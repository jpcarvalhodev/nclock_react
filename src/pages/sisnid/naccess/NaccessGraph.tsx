import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { useEffect, useState } from "react";
import { Bar , PolarArea } from "react-chartjs-2";

import * as apiService from "../../../api/apiService";
import { Footer } from '../../../components/Footer';
import { KioskTransactionCard, KioskTransactionMB } from "../../../types/Types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Tooltip, Legend);

export const NaccessGraph = () => {
    
    const [payTerminal, setPayTerminal] = useState<KioskTransactionMB[]>([]);
    const [payCoins, setPayCoins] = useState<KioskTransactionMB[]>([]);
    const [moveCard, setMoveCard] = useState<KioskTransactionCard[]>([]);
    const [moveKiosk, setMoveKiosk] = useState<KioskTransactionCard[]>([]);
    const [moveVP, setMoveVP] = useState<KioskTransactionCard[]>([]);
    const [totalMovements, setTotalMovements] = useState<KioskTransactionCard[]>([]);
    const deviceSN = 'AGB7234900595';
    const eventDoorId2 = '2';
    const eventDoorId3 = '3';
    const eventDoorId4 = '4';

    /* // Função para buscar os dados para os gráficos
    const fetchAllData = async () => {
        try {
            const mbData = await apiService.fetchKioskTransactionsByMBAndDeviceSN();
            const coinData = await apiService.fetchKioskTransactionsByPayCoins(eventDoorId2, deviceSN);
            const cardData = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId3, deviceSN);
            const kioskData = await apiService.fetchKioskTransactionsByCardAndDeviceSN(eventDoorId4, deviceSN);
            const vpData = await apiService.fetchKioskTransactionsVideoPorteiro(eventDoorId3, deviceSN);
            setPayTerminal(mbData);
            setPayCoins(coinData);
            setMoveCard(cardData);
            setMoveKiosk(kioskData);
            setMoveVP(vpData);

            const totalMove = cardData.concat(kioskData);

            setTotalMovements(totalMove);
        } catch (error) {
            console.error(error);
        }
    };

    // UseEffect para buscar os dados
    useEffect(() => {
        fetchAllData();
    }, []); */

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
                console.warn(`Campo ${String(dateField)} inválido ou não é string no item ${index}`, item);
            }
        });

        return months;
    };

    // Dados para o gráfico PolarArea
    const polarData = {
        labels: ['A', 'B', 'C', 'D', 'E'],
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
                label: 'Total',
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
            
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Gráficos de Acessos</span>
            </div>
            <div className="dashboard-content">
                <div className="chart-container">
                    <div className="employee-pie-chart" style={{ flex: 1 }}>
                        <h2 className="employee-pie-chart-text">Total: { }</h2>
                        <PolarArea className="employee-pie-chart-pie" data={polarData} />
                    </div>
                </div>
                <div className="chart-container">
                    <div className="departments-groups-chart" style={{ flex: 1 }}>
                        <h2 className="departments-groups-chart-text">Total: { }</h2>
                        <Bar className="departments-groups-chart-data" data={barData} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}