import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import { Drawer } from './Drawer';

export default { component: Drawer } as ComponentMeta<typeof Drawer>;

export const Pure: ComponentStoryObj<typeof Drawer> = {
  args: {},
  decorators: [
    (story) => (
      <Provider store={store}>
        <BrowserRouter>
          <div css={decorator}>{story()}</div>
        </BrowserRouter>
      </Provider>
    ),
  ],
};

const decorator = css`
  width: 20%;
  height: 100%;
  border-right: 1px solid #eeeeee;
`;
