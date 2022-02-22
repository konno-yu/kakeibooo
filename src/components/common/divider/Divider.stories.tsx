import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react";
import { Divider } from "./Divider";

export default { component: Divider } as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => <Divider {...args} />;

export const Pure: ComponentStoryObj<typeof Divider> = {
    args: {}
};