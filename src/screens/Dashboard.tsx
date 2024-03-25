import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Employee } from '../screens/Employees';

export const Dashboard = () => {
    const [chartData, setChartData] = useState({
        xAxis: [{ data: [] }],
        series: [{ data: [] }],
    });

    const fetchChartData = () => {
        const token = localStorage.getItem('token');
        fetch('https://localhost:7129/api/Employees', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching chart data');
                }
                return response.json();
            })
            .then((data: Employee[]) => {
                const monthlyCounts: { [month: string]: number } = {};

                data.forEach(employee => {
                    const admissionDate = new Date(employee.admissionDate);
                    const month = `${admissionDate.getMonth() + 1}/${admissionDate.getFullYear()}`;

                    if (monthlyCounts[month]) {
                        monthlyCounts[month]++;
                    } else {
                        monthlyCounts[month] = 1;
                    }
                });

                const xAxisData: string[] = Object.keys(monthlyCounts).sort();
                const seriesData: number[] = xAxisData.map(month => monthlyCounts[month]);

                setChartData({
                    xAxis: [{ data: xAxisData }],
                    series: [{ data: seriesData }],
                });
            })
            .catch(error => console.error('Error fetching chart data', error));
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    return (
        <div>
            <LineChart
                xAxis={chartData.xAxis}
                series={chartData.series}
                width={500}
                height={300}
            />
        </div>
    );
};
