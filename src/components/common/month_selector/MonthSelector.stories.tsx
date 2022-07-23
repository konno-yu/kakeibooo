import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { MonthSelector } from './MonthSelector';

export default { component: MonthSelector } as ComponentMeta<typeof MonthSelector>;

export const Pure: ComponentStoryObj<typeof MonthSelector> = {
  args: {
    targetDate: new Date(2022, 0, 1),
  },
};

export const TypePrev: ComponentStoryObj<typeof MonthSelector> = {
  args: Pure.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('button-prev'));
  },
};

export const TypeNext: ComponentStoryObj<typeof MonthSelector> = {
  args: Pure.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('button-next'));
  },
};

export const Locale: ComponentStoryObj<typeof MonthSelector> = {
  args: {
    ...Pure.args,
    locale: 'en',
  },
};
