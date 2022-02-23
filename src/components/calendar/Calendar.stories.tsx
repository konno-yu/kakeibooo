import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Calendar } from './Calendar';

export default { component: Calendar } as ComponentMeta<typeof Calendar>;

export const Pure: ComponentStoryObj<typeof Calendar> = {
  args: {
    today: new Date(2022, 0, 1),
    datas: {
      1: [null, null, null, null, null, null, { date: new Date(2022, 0, 1), totalCost: 0 }],
      2: [
        { date: new Date(2022, 0, 2), totalCost: 300 },
        { date: new Date(2022, 0, 3), totalCost: 600 },
        { date: new Date(2022, 0, 4), totalCost: 900 },
        { date: new Date(2022, 0, 5), totalCost: 1200 },
        { date: new Date(2022, 0, 6), totalCost: 1500 },
        { date: new Date(2022, 0, 7), totalCost: 1800 },
        { date: new Date(2022, 0, 8), totalCost: 2100 },
      ],
      3: [
        { date: new Date(2022, 0, 9), totalCost: 2400 },
        { date: new Date(2022, 0, 10), totalCost: 2700 },
        { date: new Date(2022, 0, 11), totalCost: 3000 },
        { date: new Date(2022, 0, 12), totalCost: 2700 },
        { date: new Date(2022, 0, 13), totalCost: 2400 },
        { date: new Date(2022, 0, 14), totalCost: 2100 },
        { date: new Date(2022, 0, 15), totalCost: 1800 },
      ],
      4: [
        { date: new Date(2022, 0, 16), totalCost: 1500 },
        { date: new Date(2022, 0, 17), totalCost: 1200 },
        { date: new Date(2022, 0, 18), totalCost: 900 },
        { date: new Date(2022, 0, 19), totalCost: 600 },
        { date: new Date(2022, 0, 20), totalCost: 300 },
        { date: new Date(2022, 0, 21), totalCost: 0 },
        { date: new Date(2022, 0, 22), totalCost: 300 },
      ],
      5: [
        { date: new Date(2022, 0, 23), totalCost: 600 },
        { date: new Date(2022, 0, 24), totalCost: 900 },
        { date: new Date(2022, 0, 25), totalCost: 1200 },
        { date: new Date(2022, 0, 26), totalCost: 1500 },
        { date: new Date(2022, 0, 27), totalCost: 1800 },
        { date: new Date(2022, 0, 28), totalCost: 2100 },
        { date: new Date(2022, 0, 29), totalCost: 2400 },
      ],
      6: [
        { date: new Date(2022, 0, 30), totalCost: 2700 },
        { date: new Date(2022, 0, 31), totalCost: 3000 },
        null,
        null,
        null,
        null,
        null,
      ],
    },
  },
  decorators: [
    (story) => (
      <Provider store={store}>
        <div style={{ padding: 8, width: '75%', background: '#ECEFF1' }}>{story()}</div>
      </Provider>
    ),
  ],
};
