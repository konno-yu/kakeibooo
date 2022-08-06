import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { ButtonPanel } from './ButtonPanel';

export default { component: ButtonPanel } as ComponentMeta<typeof ButtonPanel>;

export const Pure: ComponentStoryObj<typeof ButtonPanel> = {
  args: {
    label: 'サンプル',
    color: 'primary',
    icon: <BsFillCalendarEventFill />,
    lengthOfSide: 150,
  },
};

export const Clicked: ComponentStoryObj<typeof ButtonPanel> = {
  args: Pure.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};
