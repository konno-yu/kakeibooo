import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Drawer } from "../../components/drawer/Drawer";

export default {
    title: 'Drawer/Drawer',
    component: Drawer
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => {
    return (
        <div style={{ width: '20%' }}>
            <Drawer {...args} />
        </div>
    );
};

export const Pure = Template.bind({});
Pure.args = {};