import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from "../../components/calendar/Header";

export default {
    title: 'Calendar/Header',
    component: Header
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Pure = Template.bind({});
Pure.args = {};