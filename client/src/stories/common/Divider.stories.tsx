import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Divider } from "../../components/common/Divider";

export default {
    title: 'Common/Divider',
    component: Divider
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => <Divider {...args} />;

export const Pure = Template.bind({});
Pure.args = {};