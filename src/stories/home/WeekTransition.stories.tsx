import { ComponentMeta, ComponentStory } from "@storybook/react";
import { WeekTransition } from "../../components/home/WeekTransition";

export default {
    title: 'Home/WeekTransition',
    component: WeekTransition
} as ComponentMeta<typeof WeekTransition>;

const Template: ComponentStory<typeof WeekTransition> = (args) => {
    return <div style={{width: '30%'}}>
        <WeekTransition {...args} />
    </div>
};

export const Pure = Template.bind({});
Pure.args = {
    dates: [1, 2, 3, 4, 5, 6, 7],
    types: ['zero', 'low', 'normal', 'high', 'normal', 'low', 'zero']
};