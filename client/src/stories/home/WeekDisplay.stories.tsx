import { ComponentMeta, ComponentStory } from "@storybook/react";
import { WeekDisplay } from "../../components/home/WeekDisplay";

export default {
    title: 'Home/WeekDisplay',
    component: WeekDisplay
} as ComponentMeta<typeof WeekDisplay>;

const Template: ComponentStory<typeof WeekDisplay> = (args) => {
    return (
        <div style={{ width: '30%' }}>
            <WeekDisplay {...args} />
        </div>
    );
};

export const Pure = Template.bind({});
Pure.args = {};