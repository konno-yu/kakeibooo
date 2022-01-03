import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FaSmileWink } from "react-icons/fa";
import { Input } from "../../components/common/Input";

export default {
    title: 'Common/Input',
    component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Pure = Template.bind({});
Pure.args = {};

export const Icon = Template.bind({});
Icon.args = {
    icon: <FaSmileWink color="#009688"/>
}

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true
}