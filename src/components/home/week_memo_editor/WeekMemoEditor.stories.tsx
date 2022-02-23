import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { WeekMemoEditor } from "./WeekMemoEditor";

export default { component: WeekMemoEditor } as ComponentMeta<typeof WeekMemoEditor>;

export const Pure: ComponentStoryObj<typeof WeekMemoEditor> = {
    args: {},
    decorators: [story => <div style={{ width: '30%' }}>{story()}</div>]
};