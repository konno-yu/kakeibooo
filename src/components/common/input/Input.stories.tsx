import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent } from '@storybook/testing-library';
import { within } from '@testing-library/react';
import { FaSmileWink } from 'react-icons/fa';
import { Input } from './Input';

export default { component: Input } as ComponentMeta<typeof Input>;

export const Pure: ComponentStoryObj<typeof Input> = {
  args: {},
};

export const TypePure: ComponentStoryObj<typeof Input> = {
  args: { ...Pure.args },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox'), 'sample', { delay: 700 });
  },
};

export const Icon: ComponentStoryObj<typeof Input> = {
  args: {
    icon: <FaSmileWink color="#FB836F" />,
  },
};

export const Limited: ComponentStoryObj<typeof Input> = {
  args: {
    maxLength: 5,
    placeholder: '5文字までしか入力できません',
  },
};

export const TypeLimited: ComponentStoryObj<typeof Input> = {
  args: Limited.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByTestId('input'), 'sample', { delay: 700 });
  },
};

export const Disalbed: ComponentStoryObj<typeof Input> = {
  args: {
    disabled: true,
  },
};
