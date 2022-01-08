import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Typography } from "../../components/common/Typography";

export default {
    title: 'Common/Typography',
    component: Typography
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    children: 'サンプル'
};

export const Sub = Template.bind({});
Sub.args = {
    children: 'サンプル',
    type: 'subHeader'
};

export const Accent = Template.bind({});
Accent.args = {
    children: 'サンプル',
    variant: 'accent'
};

export const Helper = Template.bind({});
Helper.args = {
    children: 'サンプル',
    variant: 'helper'
};