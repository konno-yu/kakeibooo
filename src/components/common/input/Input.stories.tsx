import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { FaSmileWink } from 'react-icons/fa';
import { Input } from './Input';

export default { component: Input } as ComponentMeta<typeof Input>;

export const Pure: ComponentStoryObj<typeof Input> = {
  args: {},
};

export const Icon: ComponentStoryObj<typeof Input> = {
  args: {
    icon: <FaSmileWink color="#FB836F" />,
  },
};

export const Disalbed: ComponentStoryObj<typeof Input> = {
  args: {
    disabled: true,
  },
};
