import { ComponentMeta, ComponentStory } from "@storybook/react";
import { WeekSummary } from "../../components/home/WeekSummary";

export default {
    title: 'Home/WeekSummary',
    component: WeekSummary
} as ComponentMeta<typeof WeekSummary>;

const Template: ComponentStory<typeof WeekSummary> = (args) => {
    return <div style={{width: '25%'}}>
        <WeekSummary {...args} />
    </div>
};

export const Pure = Template.bind({});
Pure.args = {};