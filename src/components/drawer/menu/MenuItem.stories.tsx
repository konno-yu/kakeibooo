import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { GiFlatfish } from 'react-icons/gi';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store';
import { MenuItem } from './MenuItem';

export default { component: MenuItem } as ComponentMeta<typeof MenuItem>;

export const Pure: ComponentStoryObj<typeof MenuItem> = {
  args: {
    children: 'サンプル',
  },
  decorators: [
    (story) => (
      <Provider store={store}>
        <BrowserRouter>{story()}</BrowserRouter>
      </Provider>
    ),
  ],
};

export const Selected: ComponentStoryObj<typeof MenuItem> = {
  args: {
    children: 'サンプル',
    selected: true,
  },
  decorators: [
    (story) => (
      <Provider store={store}>
        <BrowserRouter>{story()}</BrowserRouter>
      </Provider>
    ),
  ],
};

export const Icon: ComponentStoryObj<typeof MenuItem> = {
  args: {
    children: 'さかな',
    selected: true,
    icon: <GiFlatfish size={24} />,
  },
  decorators: [
    (story) => (
      <Provider store={store}>
        <BrowserRouter>{story()}</BrowserRouter>
      </Provider>
    ),
  ],
};
