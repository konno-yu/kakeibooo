import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { FaSmile } from "react-icons/fa";
import { IconButton } from "./IconButton";

export default { component: IconButton } as ComponentMeta<typeof IconButton>;

export const Pure: ComponentStoryObj<typeof IconButton> = {
    args: {
        children: <FaSmile color="#009688" size={30} />
    }
};

export const Disabled: ComponentStoryObj<typeof IconButton> = {
    args: {
        children: <FaSmile color="#009688" size={30} />,
        disabled: true
    }
};