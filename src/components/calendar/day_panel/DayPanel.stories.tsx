import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { DayPanel } from './DayPanel';

export default { component: DayPanel } as ComponentMeta<typeof DayPanel>;

const decoratorBase = css`
  width: 75%;
  background: #f6f6f6;
`;

export const Pure: ComponentStoryObj<typeof DayPanel> = {
  args: {
    dayIndex: 1,
    children: 1000,
    type: 'normal',
  },
  decorators: [(story) => <div css={decoratorBase}>{story()}</div>],
};

export const Low: ComponentStoryObj<typeof DayPanel> = {
  args: {
    dayIndex: 5,
    children: 200,
    type: 'low',
  },
  decorators: Pure.decorators,
};

export const High: ComponentStoryObj<typeof DayPanel> = {
  args: {
    dayIndex: 10,
    children: 10000,
    type: 'high',
  },
  decorators: Pure.decorators,
};

export const Zero: ComponentStoryObj<typeof DayPanel> = {
  args: {
    dayIndex: 15,
    children: 0,
    type: 'zero',
  },
  decorators: Pure.decorators,
};

export const Blank: ComponentStoryObj<typeof DayPanel> = {
  args: {
    dayIndex: null,
  },
  decorators: Pure.decorators,
};

export const Today: ComponentStoryObj<typeof DayPanel> = {
  args: {
    dayIndex: 20,
    children: 1980,
    type: 'normal',
    isToday: true,
  },
  decorators: Pure.decorators,
};

export const Selected: ComponentStoryObj<typeof DayPanel> = {
  args: {
    dayIndex: 25,
    children: 900,
    type: 'low',
    isSelected: true,
  },
  decorators: Pure.decorators,
};
