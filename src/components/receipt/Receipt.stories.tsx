import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { store } from "../../store";
import { Receipt } from "./Receipt";
import { Provider } from 'react-redux';

export default { component: Receipt } as ComponentMeta<typeof Receipt>;

export const Pure: ComponentStoryObj<typeof Receipt> = {
    args: {},
    decorators: [story => <Provider store={store}>{story()}</Provider>]
}