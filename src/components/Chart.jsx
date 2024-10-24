// MyChart.js
import React from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Chart = ({ type, labels, datasets, mark, explain, posiEx }) => {
    const data = {
        labels: labels,
        datasets: datasets // รับ datasets เป็น props
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: mark,
            },
            title: {
                display: true,
                text: explain,
                position: posiEx,
            },
        },
    };

    const renderChart = () => {
        switch (type) {
            case 'bar':
                return <Bar data={data} options={options} />;
            case 'line':
                return <Line data={data} options={options} />;
            case 'pie':
                return <Pie data={data} options={options} />;
            case 'doughnut':
                return <Doughnut data={data} options={options} />;
            default:
                return <Bar data={data} options={options} />; // ค่าเริ่มต้น
        }
    };

    return (
        <div>
            {renderChart()}
        </div>
    );
};

export default Chart;
