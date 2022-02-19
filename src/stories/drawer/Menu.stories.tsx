import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GiPig, GiCow, GiChicken } from "react-icons/gi";
import { Menu } from "../../components/drawer/Menu";
import { MenuItem } from "../../components/drawer/MenuItem";

export default {
    title: 'Drawer/Menu',
    component: Menu
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Pure = Template.bind({});
Pure.args = {
    children:
        <>
            <MenuItem selected>ひとつめ</MenuItem>
            <MenuItem>ふたつめ</MenuItem>
            <MenuItem>みっつめ</MenuItem>
        </>
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    children:
        <>
            <MenuItem selected icon={<GiPig size={24} />}>ぶた</MenuItem>
            <MenuItem icon={<GiCow size={24} />}>うし</MenuItem>
            <MenuItem icon={<GiChicken size={24} />}>とり</MenuItem>
        </>
}