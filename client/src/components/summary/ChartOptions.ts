import { ChartOptions } from "chart.js";

const color = '#546E7A';
const getFontObj = (size: number, weight: string = '700') => {
    return {
        family: "'M PLUS Rounded 1c', sans-serif",
        size,
        weight
    }
}

export const chartOptions: ChartOptions = {
    scales: {
        'x': {
            ticks: {
                color,
                font: getFontObj(10),
            }
        },
        'cost': {
            ticks: {
                callback: (v) => `¥${v.toLocaleString()}`,
                color,
                font: getFontObj(10)
            },
            type: 'linear',
            position: 'left',
            title: {
                text: '1日の食費 [円] ',
                color,
                font: getFontObj(12),
                display: true
            }
        },
        'balance': {
            ticks: {
                callback: (v) => `¥${v.toLocaleString()}`,
                color,
                font: getFontObj(10)
            },
            type: 'linear',
            position: 'right',
            title: {
                text: '残金 [円] ',
                color,
                font: getFontObj(12),
                display: true
            }
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
}