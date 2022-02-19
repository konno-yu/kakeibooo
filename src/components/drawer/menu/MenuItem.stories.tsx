import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { GiFlatfish } from "react-icons/gi";
import { MenuItem } from "./MenuItem";



export default { component: MenuItem } as ComponentMeta<typeof MenuItem>;

export const Pure: ComponentStoryObj<typeof MenuItem> = {
    args: {
        children: 'サンプル'
    }
}

export const Selected: ComponentStoryObj<typeof MenuItem> = {
    args: {
        children: 'サンプル',
        selected: true
    }
}

export const Icon: ComponentStoryObj<typeof MenuItem> = {
    args: {
        children: 'さかな',
        selected: true,
        icon: <GiFlatfish size={24}/>
    }
}