import { css, Theme, useTheme } from '@emotion/react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { createChartData, createChartOption } from './chartUtils';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

interface Props {
  // グラフに利用するデータを指定します
  datasets: {
    label: string;
    value: number; // TODO 未指定かノーマネーか区別できないがまぁよい
  }[];
  // 月の食費予算を指定します
  budget: number;
}

export const MonthlyChart = ({ datasets, budget }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const data = createChartData(datasets, budget, theme);
  const options = createChartOption(theme, t);
  return (
    <div css={container}>
      <Chart options={options} data={data} type="bar" />
    </div>
  );
};

const container = (theme: Theme) => css`
  height: 100%;
  border: 1px solid ${theme.colors.gray_100};
  border-radius: ${theme.units.px8};
  background: ${theme.colors.white};
  padding: ${theme.units.px16};
`;
