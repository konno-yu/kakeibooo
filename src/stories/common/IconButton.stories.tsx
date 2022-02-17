import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FaSmile } from "react-icons/fa";
import { IconButton } from "../../components/common/IconButton";

export default {
    title: 'Common/IconButton',
    component: IconButton
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Pure = Template.bind({});
Pure.args = {
    children: <FaSmile color="#009688" size={24} />
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: <FaSmile color="#009688" size={24} />,
    disabled: true
}