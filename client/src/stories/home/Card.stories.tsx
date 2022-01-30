import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FaCalculator } from "react-icons/fa";
import { Card } from "../../components/home/Card";

export default {
    title: 'Home/Card',
    component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => {
    return (
        <div style={{ width: '30%' }}>
            <Card {...args} />
        </div>
    );
};

export const Pure = Template.bind({});
Pure.args = {
    title: "サンプル",
    icon: <FaCalculator color="#FFFFFF" size={22} />,
    color: "#546E7A"
};