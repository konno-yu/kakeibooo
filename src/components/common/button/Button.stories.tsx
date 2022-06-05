import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { FaSmileWink } from 'react-icons/fa';
import { Button } from './Button';

export default { component: Button } as ComponentMeta<typeof Button>;

export const Filled: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'これはボタンです',
    variant: 'filled',
    color: 'primary',
    width: 200,
  },
};

export const Outlined: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'これはボタンです',
    variant: 'outlined',
    color: 'secondary',
    width: 200,
  },
};

export const TextOnly: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'これはボタンです',
    variant: 'text',
    color: 'normal',
    width: 300,
  },
};

export const Icon: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'これはボタンです',
    variant: 'filled',
    color: 'normal',
    icon: <FaSmileWink />,
    width: 200,
  },
};

export const Disabled: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'これはボタンです',
    disabled: true,
    width: 200,
  },
};
