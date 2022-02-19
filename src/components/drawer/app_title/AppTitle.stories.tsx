import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { AppTitle } from "./AppTitle";

export default { component: AppTitle } as ComponentMeta<typeof AppTitle>;

export const Pure: ComponentStoryObj<typeof AppTitle> = {
    args: {}
};