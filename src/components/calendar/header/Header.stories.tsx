import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Header } from './Header';

export default { component: Header } as ComponentMeta<typeof Header>;

export const Pure: ComponentStoryObj<typeof Header> = {
  args: {},
};

export const Locale: ComponentStoryObj<typeof Header> = {
  args: {
    locale: 'en',
  },
};
