import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Indicator } from "./Indicator";

export default { component: Indicator } as ComponentMeta<typeof Indicator>;

export const Single: ComponentStoryObj<typeof Indicator> = {
    args: {
        value: { '#FF9A9A': 4 },
        range: [0, 10],
        showLabel: true,
        unit: { type: 'prefix', name: '¥' }
    },
    decorators: [story => <div style={{ width: '40%' }}>{story()}</div>]
};

export const Basic: ComponentStoryObj<typeof Indicator> = {
    args: {
        value: { '#FE9A9A': 1, '#FFF59D': 1, '#80CBC4': 1 },
        range: [0, 5],
        showLabel: true,
        unit: { type: 'suffix', name: 'ユーロ' }
    },
    decorators: Single.decorators
};

export const NoLabel: ComponentStoryObj<typeof Indicator> = {
    args: {
        value: { '#FE9A9A': 1, '#FFF59D': 2, '#80CBC4': 3, '#607D8B': 4 },
        range: [0, 15]
    },
    decorators: Single.decorators
};

export const Full: ComponentStoryObj<typeof Indicator> = {
    args: {
        value: { '#FE9A9A': 5, '#FFF59D': 5, '#80CBC4': 5 },
        range: [0, 15],
        showLabel: true,
        unit: { type: 'suffix', name: '元'}
    },
    decorators: Single.decorators
};

export const LimitOver: ComponentStoryObj<typeof Indicator> = {
    args: {
        value: { '#FE9A9A': 1, '#80CBC4': 3, 'FFF59D': 5 },
        range: [0, 5],
        showLabel: true,
        unit: { type: 'prefix', name: '$'}
    },
    decorators: Single.decorators
};