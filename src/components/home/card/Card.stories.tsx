import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react";
import { FaCalculator } from "react-icons/fa";
import { Card } from "./Card";

export default { component: Card } as ComponentMeta<typeof Card>;

export const Pure: ComponentStoryObj<typeof Card> = {
    args: {
        title: 'サンプル',
        icon: <FaCalculator color="#FFFFFF" size={22} />,
        color: '#546E7A'
    },
    decorators: [story => <div style={{ width: '30%' }}>{story()}</div>]
};