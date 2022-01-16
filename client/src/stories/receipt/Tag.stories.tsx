import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tag } from "../../components/receipt/Tag";

export default {
    title: 'Receipt/Tag',
    component: Tag
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => {
    return (
        <div style={{ width: '25%' }}>
            <Tag {...args} />
        </div>
    );
};

export const Pure = Template.bind({});
Pure.args = {};