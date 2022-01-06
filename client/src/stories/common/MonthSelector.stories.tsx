import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MonthSelector } from "../../components/common/MonthSelector";

export default {
    title: 'Common/MonthSelector',
    component: MonthSelector
} as ComponentMeta<typeof MonthSelector>;

const Template: ComponentStory<typeof MonthSelector> = (args) => <MonthSelector {...args} />;

export const Pure = Template.bind({});
Pure.args = {};