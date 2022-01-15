import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Indicator } from "../../components/common/Indicator";

export default {
    title: 'Home/Indicator',
    component: Indicator
} as ComponentMeta<typeof Indicator>;

const Template: ComponentStory<typeof Indicator> = (args) => {
    return (
        <div style={{width: '40%'}}>
            <Indicator {...args} />
        </div>
    );
}

export const Single = Template.bind({});
Single.args = {
    value: { '#EF9A9A': 4 },
    range: [0, 10],
    showLabel: true,
    unit: { type: 'prefix', name: '¥'}
}

export const Basic = Template.bind({});
Basic.args = {
    value: { '#FE9A9A': 1, '#FFF59D': 1, '#80CBC4': 1 },
    range: [0, 5],
    showLabel: true,
    unit: { type: 'suffix', name: 'ユーロ'}
};

export const NoLabel = Template.bind({});
NoLabel.args = {
    value: { '#FE9A9A': 1, '#FFF59D': 2, '#80CBC4': 3, '#607D8B': 4 },
    range: [0, 15]
};


export const Full = Template.bind({});
Full.args = {
    value: { '#FE9A9A': 5, '#FFF59D': 5, '#80CBC4': 5 },
    range: [0, 15],
    showLabel: true,
    unit: { type: 'suffix', name: '元'}
};

export const LimitOver = Template.bind({});
LimitOver.args = {
    value: { '#FE9A9A': 1, '#80CBC4': 3, 'FFF59D': 5 },
    range: [0, 5],
    showLabel: true,
    unit: { type: 'prefix', name: '$'}
};