import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { Employee } from '../types/Types';

export const Dashboard = () => {
    const [chartData, setChartData] = useState<{ [key: string]: { xAxis: { data: string[] }[], series: { data: number[] }[] } }>({});

    const fetchChartData = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Employees', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((data: Employee[]) => {
                const yearlyCounts: { [year: string]: { [month: string]: number } } = {};

                data.forEach(employee => {
                    const admissionDate = new Date(employee.admissionDate);
                    const month = `${admissionDate.getMonth() + 1}`;
                    const year = `${admissionDate.getFullYear()}`;

                    if (!yearlyCounts[year]) {
                        yearlyCounts[year] = Array.from({ length: 12 }, (_, i) => `${i + 1}`).reduce((obj, month) => ({ ...obj, [month]: 0 }), {});
                    }

                    yearlyCounts[year][month]++;
                });

                const chartData: { [key: string]: { xAxis: { data: string[] }[], series: { data: number[] }[] } } = {};

                for (const year in yearlyCounts) {
                    const monthlyCounts = yearlyCounts[year];
                    const xAxisData: string[] = Object.keys(monthlyCounts).sort();
                    const seriesData: number[] = Array.from({ length: 12 }, (_, i) => monthlyCounts[i] || 0);

                    chartData[year] = {
                        xAxis: [{ data: xAxisData }],
                        series: [{ data: seriesData }],
                    };
                }

                setChartData(chartData);
            })
            .catch(error => console.error('Error fetching chart data', error));
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    return (
        <div>
            <NavBar />
            <div className='charts-css'>
                {Object.keys(chartData).map(year => (
                    <div key={year}>
                        <h2>{year}</h2>
                        <LineChart
                            xAxis={chartData[year].xAxis}
                            series={chartData[year].series}
                            width={500}
                            height={300}
                        />
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}