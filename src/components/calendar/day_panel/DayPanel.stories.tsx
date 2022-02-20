import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { DayPanel } from "./DayPanel";

export default { component: DayPanel } as ComponentMeta<typeof DayPanel>;

export const Pure: ComponentStoryObj<typeof DayPanel> = {
    args: {
        dayIndex: 1,
        children: 1000,
        type: 'normal'
    },
    decorators: [story => <div style={{ width: '75%', background: '#ECEFF1' }}>{story()}</div>]
};

export const Low: ComponentStoryObj<typeof DayPanel> = {
    args: {
        dayIndex: 5,
        children: 200,
        type: 'low'
    },
    decorators: [story => <div style={{ width: '75%', background: '#ECEFF1' }}>{story()}</div>]
};

export const High: ComponentStoryObj<typeof DayPanel> = {
    args: {
        dayIndex: 10,
        children: 10000,
        type: 'high'
    },
    decorators: [story => <div style={{ width: '75%', background: '#ECEFF1' }}>{story()}</div>]
};

export const Zero: ComponentStoryObj<typeof DayPanel> = {
    args: {
        dayIndex: 15,
        children: 0,
        type: 'zero'
    },
    decorators: [story => <div style={{ width: '75%', background: '#ECEFF1' }}>{story()}</div>]
};

export const Blank: ComponentStoryObj<typeof DayPanel> = {
    args: {
        dayIndex: null,
    },
    decorators: [story => <div style={{ width: '75%', background: '#ECEFF1' }}>{story()}</div>]
};

export const Today: ComponentStoryObj<typeof DayPanel> = {
    args: {
        dayIndex: 20,
        children: 1980,
        type: 'normal',
        isToday: true
    },
    decorators: [story => <div style={{ width: '75%', background: '#ECEFF1' }}>{story()}</div>]
};

export const Selected: ComponentStoryObj<typeof DayPanel> = {
    args: {
        dayIndex: 25,
        children: 900,
        type: 'low',
        isSelected: true
    },
    decorators: [story => <div style={{ width: '75%', background: '#ECEFF1' }}>{story()}</div>]
};