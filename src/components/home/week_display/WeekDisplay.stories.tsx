import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react";
import { WeekDisplay } from "./WeekDisplay";

export default { component: WeekDisplay } as ComponentMeta<typeof WeekDisplay>;

export const Pure: ComponentStoryObj<typeof WeekDisplay> = {
    args: {},
    decorators: [story => <div style={{ width: '30%' }}>{story()}</div>]
};