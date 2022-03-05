import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Calendar } from './Calendar';

export default { component: Calendar } as ComponentMeta<typeof Calendar>;

export const Pure: ComponentStoryObj<typeof Calendar> = {
  args: {
    today: new Date(2022, 0, 1),
    datas: {
      1: [null, null, null, null, null, null, { date: new Date(2022, 0, 1), receipts: [] }],
      2: [
        { date: new Date(2022, 0, 2), receipts: [{ storeName: 'sample', cost: 300 }] },
        { date: new Date(2022, 0, 3), receipts: [{ storeName: 'sample', cost: 600 }] },
        { date: new Date(2022, 0, 4), receipts: [{ storeName: 'sample', cost: 900 }] },
        { date: new Date(2022, 0, 5), receipts: [{ storeName: 'sample', cost: 1200 }] },
        { date: new Date(2022, 0, 6), receipts: [{ storeName: 'sample', cost: 1500 }] },
        { date: new Date(2022, 0, 7), receipts: [{ storeName: 'sample', cost: 1800 }] },
        { date: new Date(2022, 0, 8), receipts: [{ storeName: 'sample', cost: 2100 }] },
      ],
      3: [
        { date: new Date(2022, 0, 9), receipts: [{ storeName: 'sample', cost: 2700 }] },
        { date: new Date(2022, 0, 10), receipts: [{ storeName: 'sample', cost: 3000 }] },
        { date: new Date(2022, 0, 11), receipts: [{ storeName: 'sample', cost: 2700 }] },
        { date: new Date(2022, 0, 12), receipts: [{ storeName: 'sample', cost: 2100 }] },
        { date: new Date(2022, 0, 13), receipts: [{ storeName: 'sample', cost: 1800 }] },
        { date: new Date(2022, 0, 14), receipts: [{ storeName: 'sample', cost: 1500 }] },
        { date: new Date(2022, 0, 15), receipts: [{ storeName: 'sample', cost: 1200 }] },
      ],
      4: [
        { date: new Date(2022, 0, 16), receipts: [{ storeName: 'sample', cost: 900 }] },
        { date: new Date(2022, 0, 17), receipts: [{ storeName: 'sample', cost: 600 }] },
        { date: new Date(2022, 0, 18), receipts: [{ storeName: 'sample', cost: 300 }] },
        { date: new Date(2022, 0, 19), receipts: [{ storeName: 'sample', cost: 600 }] },
        { date: new Date(2022, 0, 20), receipts: [{ storeName: 'sample', cost: 900 }] },
        { date: new Date(2022, 0, 21), receipts: [] },
        { date: new Date(2022, 0, 22), receipts: [{ storeName: 'sample', cost: 1200 }] },
      ],
      5: [
        { date: new Date(2022, 0, 23), receipts: [{ storeName: 'sample', cost: 1500 }] },
        { date: new Date(2022, 0, 24), receipts: [{ storeName: 'sample', cost: 1800 }] },
        { date: new Date(2022, 0, 25), receipts: [{ storeName: 'sample', cost: 2100 }] },
        { date: new Date(2022, 0, 26), receipts: [{ storeName: 'sample', cost: 2400 }] },
        { date: new Date(2022, 0, 27), receipts: [{ storeName: 'sample', cost: 2700 }] },
        { date: new Date(2022, 0, 28), receipts: [{ storeName: 'sample', cost: 3000 }] },
        { date: new Date(2022, 0, 29), receipts: null },
      ],
      6: [
        { date: new Date(2022, 0, 30), receipts: null },
        { date: new Date(2022, 0, 31), receipts: null },
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
        <div css={decorator}>{story()}</div>
      </Provider>
    ),
  ],
};

const decorator = css`
  width: 75%;
  background: ECEFF1;
  padding: 8px;
`;
