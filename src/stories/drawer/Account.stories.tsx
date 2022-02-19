import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Account } from "../../components/drawer/Account";

export default {
    title: 'Drawer/Account',
    component: Account
} as ComponentMeta<typeof Account>;

const Template: ComponentStory<typeof Account> = (args) => <Account {...args} />;

export const Pure = Template.bind({});
Pure.args = {};

export const IconOnly = Template.bind({});
IconOnly.args = {
    iconOnly: true
};