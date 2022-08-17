import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { MonthlyChart } from './MonthlyChart';

export default { component: MonthlyChart } as ComponentMeta<typeof MonthlyChart>;

export const Pure: ComponentStoryObj<typeof MonthlyChart> = {
  args: {
    budget: 40000,
    datasets: [
      { label: '08/01', value: 1000 },
      { label: '08/02', value: 1200 },
      { label: '08/03', value: 1400 },
      { label: '08/04', value: 800 },
      { label: '08/05', value: 0 },
      { label: '08/06', value: 2500 },
      { label: '08/07', value: 500 },
      { label: '08/08', value: 900 },
      { label: '08/09', value: 0 },
      { label: '08/10', value: 1200 },
      { label: '08/11', value: 1500 },
      { label: '08/12', value: 2100 },
      { label: '08/13', value: 2500 },
      { label: '08/14', value: 1800 },
      { label: '08/15', value: 1200 },
      { label: '08/16', value: 700 },
      { label: '08/17', value: 600 },
      { label: '08/18', value: 0 },
      { label: '08/19', value: 900 },
      { label: '08/20', value: 1200 },
      { label: '08/21', value: 1100 },
      { label: '08/22', value: 1800 },
      { label: '08/23', value: 800 },
      { label: '08/24', value: 1600 },
      { label: '08/25', value: 0 },
      { label: '08/26', value: 0 },
      { label: '08/27', value: 2100 },
      { label: '08/28', value: 3000 },
      { label: '08/29', value: 4500 },
      { label: '08/30', value: 1200 },
      { label: '08/31', value: 400 },
    ],
  },
  decorators: [(story) => <div style={{ width: '60%' }}>{story()}</div>],
};
