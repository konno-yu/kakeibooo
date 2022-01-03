import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppTitle } from "../../components/drawer/AppTitle";

export default {
    title: 'Drawer/AppTitle',
    component: AppTitle
} as ComponentMeta<typeof AppTitle>;

const Template: ComponentStory<typeof AppTitle> = (args) => <AppTitle {...args} />;

export const Pure = Template.bind({});
Pure.args = {};