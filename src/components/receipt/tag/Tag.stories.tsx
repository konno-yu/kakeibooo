import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { Tag } from "./Tag";

export default { component: Tag } as ComponentMeta<typeof Tag>;

export const Pure: ComponentStoryObj<typeof Tag> = {
    args: {},
    decorators: [story => <Provider store={store}><div style={{ width: '25%' }}>{story()}</div></Provider>]
};