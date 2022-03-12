import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Receipt } from './Receipt';

export default { component: Receipt } as ComponentMeta<typeof Receipt>;

export const Pure: ComponentStoryObj<typeof Receipt> = {
  args: {
    tags: [
      { index: 0, storeName: 'サンプル1', cost: 1000 },
      { index: 1, storeName: 'サンプル2', cost: 2000 },
    ],
  },
  decorators: [
    (story) => (
      <Provider store={store}>
        <div
          css={css`
            width: 25%;
          `}
        >
          {story()}
        </div>
      </Provider>
    ),
  ],
};
