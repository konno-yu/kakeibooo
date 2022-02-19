import { ComponentMeta, ComponentStory } from "@storybook/react";
import { WeekMemoEditor } from "../../components/home/WeekMemoEditor";

export default {
    title: 'Home/WeekMemoEditor',
    component: WeekMemoEditor
} as ComponentMeta<typeof WeekMemoEditor>;

const Template: ComponentStory<typeof WeekMemoEditor> = (args) => {
    return <div style={{width: '30%'}}>
        <WeekMemoEditor {...args} />
    </div>
};

export const Pure = Template.bind({});
Pure.args = {};