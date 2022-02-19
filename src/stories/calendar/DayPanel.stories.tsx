import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DayPanel } from "../../components/calendar/DayPanel";

export default {
    title: 'Calendar/DayPanel',
    component: DayPanel
} as ComponentMeta<typeof DayPanel>;

const Template: ComponentStory<typeof DayPanel> = (args) => {
    return <div style={{width: '75%', background: '#ECEFF1'}}><DayPanel {...args} /></div>
};

export const Pure = Template.bind({});
Pure.args = {
    dayIndex: 1,
    children: 1000,
    type: 'normal'
};

export const Low = Template.bind({});
Low.args = {
    dayIndex: 5,
    children: 200,
    type: 'low'
};

export const High = Template.bind({});
High.args = {
    dayIndex: 10,
    children: 10000,
    type: 'high'
};

export const Zero = Template.bind({});
Zero.args = {
    dayIndex: 15,
    children: 0,
    type: 'zero'
};

export const Blank = Template.bind({});
Blank.args = {
    dayIndex: null
}

export const Today = Template.bind({});
Today.args = {
    dayIndex: 20,
    children: 1980,
    type: 'normal',
    isToday: true
}

export const Selected = Template.bind({});
Selected.args = {
    dayIndex: 25,
    children: 900,
    type: 'low',
    isSelected: true
}