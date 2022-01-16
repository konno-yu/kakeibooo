import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GiFlatfish } from "react-icons/gi";
import { MenuItem } from "../../components/drawer/MenuItem";

export default {
    title: 'Drawer/MenuItem',
    component: MenuItem
} as ComponentMeta<typeof MenuItem>;

const Template: ComponentStory<typeof MenuItem> = (args) => <MenuItem {...args} />;

export const Pure = Template.bind({});
Pure.args = {
    children: 'サンプル'
};

export const Selected = Template.bind({});
Selected.args = {
    children: 'サンプル',
    selected: true
}

export const WithIcon = Template.bind({});
WithIcon.args = {
    children: 'さかな',
    selected: true,
    icon: <GiFlatfish size={24} />
}