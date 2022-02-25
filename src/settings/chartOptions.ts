import { ChartOptions } from 'chart.js';

const color = '#546E7A';
const getFontObj = (size: number, weight = '700') => ({
  family: "'M PLUS Rounded 1c', sans-serif",
  size,
  weight,
});

// TODO gridを指定したら警告が出るようになってしまった
// TODO 実行には影響しないが直しておきたいところ

export const chartOptions: ChartOptions = {
  scales: {
    x: {
      ticks: {
        color,
        font: getFontObj(10),
      },
      grid: {
        display: false,
        borderColor: 'transparent',
      },
    },
    cost: {
      ticks: {
        callback: (v) => `¥${v.toLocaleString()}`,
        color,
        font: getFontObj(10),
      },
      type: 'linear',
      position: 'left',
      grid: {
        display: false,
        borderColor: 'transparent',
      },
      title: {
        text: '1日の食費 [円] ',
        color,
        font: getFontObj(12),
        display: true,
      },
    },
    balance: {
      ticks: {
        callback: (v) => `¥${v.toLocaleString()}`,
        color,
        font: getFontObj(10),
      },
      type: 'linear',
      position: 'right',
      grid: {
        display: false,
        borderColor: 'transparent',
      },
      title: {
        text: '残金 [円] ',
        color,
        font: getFontObj(12),
        display: true,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
