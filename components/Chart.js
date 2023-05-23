import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useState } from 'react';


const Chart = ({ size, chart, color }) => {
    const [series, setSeries] = useState([
        {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41],
            stroke: '#000'

        }
    ]);
    const [options] = useState({
        chart: {
            height: size,
            type: chart,
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
            selection: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            colors: [`${color}`],
            width: 3,
            shadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00.000Z',
                '2018-09-19T01:30:00.000Z',
                '2018-09-19T02:30:00.000Z',
                '2018-09-19T03:30:00.000Z',
                '2018-09-19T04:30:00.000Z',
                '2018-09-19T05:30:00.000Z',
                '2018-09-19T06:30:00.000Z'
            ],
            labels: {
                show: false
            },
            show: false
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        },
        grid: {
            show: false
        },
        fill: {
            colors: [`${color}`],
        },
        css: {
            filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5))'
        },
        theme: {
            monochrome: {
                enabled: true,
                color: `${color}`,
            }
        }
    });


    return (
        <div id="chart">
            <ApexCharts options={options} series={series} type={chart} height={size} />
        </div>
    );
};

export default Chart;
