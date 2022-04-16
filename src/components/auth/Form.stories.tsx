import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import { Form } from './Form';

export default { component: Form } as ComponentMeta<typeof Form>;

export const Pure: ComponentStoryObj<typeof Form> = {
  args: {},
  decorators: [
    (story) => (
      <Provider store={store}>
        <BrowserRouter>{story()}</BrowserRouter>
      </Provider>
    ),
  ],
};
