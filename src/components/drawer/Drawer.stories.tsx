import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";

export default { component: Drawer } as ComponentMeta<typeof Drawer>;

export const Pure: ComponentStoryObj<typeof Drawer> = {
    args: {},
    decorators: [
        story => <div style={{ width: '20%' }}>{story()}</div>
    ]
};
