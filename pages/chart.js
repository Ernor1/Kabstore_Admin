import React from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useState } from 'react';


const Chart = () => {
    const [series, setSeries] = useState([
        {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ]);
    const [options] = useState({
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
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
            }
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
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    });

    return (
        <div id="chart">
            <ApexCharts options={options} series={series} type="area" height={350} />
        </div>
    );
};

export default Chart;
