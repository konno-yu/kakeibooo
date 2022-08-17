import { Theme } from '@emotion/react';
import { ChartOptions } from 'chart.js';
import { TFunction } from 'react-i18next';

const createBalance = (expenses: number[], budget: number) => {
  const balance: number[] = [];
  let remaining = budget;
  expenses.forEach((exp) => {
    balance.push(remaining - exp);
    remaining -= exp;
  });
  return balance;
};

const getBarColor = (expenses: number[], theme: Theme) => {
  const borders: string[] = [];
  const backgrounds: string[] = [];
  expenses.forEach((exp) => {
    if (exp === 0) {
      borders.push(theme.colors.white);
      backgrounds.push(theme.colors.white);
    }
    if (exp <= 1000) {
      borders.push(theme.colors.secondary_200);
      backgrounds.push(theme.colors.secondary_100);
    }
    if (exp <= 2500) {
      borders.push(theme.colors.black_200);
      backgrounds.push(theme.colors.black_100);
    }
    borders.push(theme.colors.primary_200);
    backgrounds.push(theme.colors.primary_100);
  });
  return [borders, backgrounds];
};

export const createChartData = (
  datasets: { label: string; value: number }[],
  budget: number,
  theme: Theme,
  t: TFunction<'ns1', undefined>
) => {
  const labels = datasets.map((d) => d.label);
  const expenses = datasets.map((d) => d.value);
  const [borderColor, backgroundColor] = getBarColor(expenses, theme);
  const balances = createBalance(expenses, budget);

  return {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: t('home.balance'),
        data: balances,
        backgroundColor: theme.colors.black_100,
        borderColor: theme.colors.black_100,
        yAxisID: 'balance',
      },
      {
        type: 'bar' as const,
        label: t('home.expense'),
        data: expenses,
        borderWidth: 2,
        backgroundColor,
        borderColor,
        yAxisID: 'expenses',
      },
    ],
  };
};

export const createChartOption = (theme: Theme, t: TFunction<'ns1', undefined>): ChartOptions => {
  const commonGridOptions = {
    display: false,
    borderColor: 'transparent',
  };
  const commonFontSetting = {
    family: "'M PLUS Rounded 1c', sans-serif",
    size: 10, // 定数で置く or 未指定
    weight: String(theme.fontWeights.semiBold),
  };
  const commonTickOptions = {
    color: theme.colors.black_200,
    font: commonFontSetting,
  };

  return {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(this, tooltimItem) {
            return `¥${tooltimItem.formattedValue}`;
          },
        },
        backgroundColor: theme.colors.white,
        boxPadding: 4,
        titleAlign: 'center',
        borderColor: theme.colors.gray_200,
        borderWidth: 2,
        bodyColor: theme.colors.black_300,
        titleColor: theme.colors.black_300,
        cornerRadius: 4,
        titleFont: {
          family: "'M PLUS Rounded 1c', sans-serif",
        },
        bodyFont: {
          family: "'M PLUS Rounded 1c', sans-serif",
          weight: '700',
        },
      },
    },
    scales: {
      x: {
        grid: commonGridOptions,
        ticks: commonTickOptions,
      },
      expenses: {
        ticks: {
          ...commonTickOptions,
          callback: (v) => `¥${v.toLocaleString()}`,
        },
        type: 'linear',
        position: 'left',
        title: {
          text: t('home.expenses_per_day'),
          font: commonFontSetting,
          display: true,
        },
        grid: commonGridOptions,
      },
      balance: {
        ticks: { ...commonTickOptions, callback: (v) => `¥${v.toLocaleString()}` },
        type: 'linear',
        position: 'right',
        title: {
          text: t('home.balance_this_month'),
          font: commonFontSetting,
          display: true,
        },
        grid: commonGridOptions,
      },
    },
  };
};
