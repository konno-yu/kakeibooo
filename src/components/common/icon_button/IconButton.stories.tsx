import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent } from '@storybook/testing-library';
import { within } from '@testing-library/react';
import { FaSmile } from 'react-icons/fa';
import { IconButton } from './IconButton';

export default { component: IconButton } as ComponentMeta<typeof IconButton>;

export const Pure: ComponentStoryObj<typeof IconButton> = {
  args: {
    children: <FaSmile color="#009688" size={30} />,
  },
};

export const ClickPure: ComponentStoryObj<typeof IconButton> = {
  args: Pure.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};

export const Disabled: ComponentStoryObj<typeof IconButton> = {
  args: {
    ...Pure.args,
    disabled: true,
  },
};

export const ClickDisabled: ComponentStoryObj<typeof IconButton> = {
  args: Disabled.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};
