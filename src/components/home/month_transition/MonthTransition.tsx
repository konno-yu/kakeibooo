import { ChartData } from 'chart.js';
import { getDate, getMonth } from 'date-fns';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { chartOptions } from '../../../settings/chartOptions';

interface Props {
  datas: { date: Date; totalCost: number }[];
}
export const MonthTransition: React.FC<Props> = ({ datas }: Props) => {
  const getColor = (totalCost: number) => {
    if (totalCost === 0) return '#FFF176';
    if (totalCost <= 1000) return '#4DB6AC';
    if (totalCost <= 2500) return '#E0E0E0';
    return '#E57373';
  };

  const calculateBalance = () => {
    const budget = 40000;
    const balance: number[] = [];
    datas.reduce((acc: number, curr: { date: Date; totalCost: number }) => {
      balance.push(budget - acc);
      return acc + curr.totalCost;
    }, 0);
    return balance;
  };

  const formatData = (): ChartData => {
    const labels: string[] = [];
    const data: number[] = [];
    const color: string[] = [];

    datas.forEach((d) => {
      labels.push(`${String(getMonth(d.date) + 1).padStart(2, '0')}/${String(getDate(d.date)).padStart(2, '0')}`);
      data.push(d.totalCost);
      color.push(getColor(d.totalCost));
    });

    return {
      labels,
      datasets: [
        {
          label: '残金',
          data: calculateBalance(),
          type: 'line',
          yAxisID: 'balance',
          borderColor: '#546E7A',
          backgroundColor: '#546E7A',
          order: 1,
        },
        {
          label: '食費',
          data,
          borderColor: color,
          backgroundColor: color,
          borderWidth: 1,
          yAxisID: 'cost',
          order: 2,
        },
      ],
    };
  };

  return (
    <Container>
      <Bar data={formatData} options={chartOptions} height={120} />
    </Container>
  );
};

const Container = styled.div`
  background: transparent;
  padding: 12px;
`;
