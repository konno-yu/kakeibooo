import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Receipt } from "../../components/receipt/Receipt";

export default {
    title: 'Receipt/Receipt',
    component: Receipt
} as ComponentMeta<typeof Receipt>;

const Template: ComponentStory<typeof Receipt> = (args) => <Receipt {...args} />;

export const Pure = Template.bind({});
Pure.args = {};