import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Account } from "./Account";

export default { component: Account } as ComponentMeta<typeof Account>;

export const Pure: ComponentStoryObj<typeof Account> = {
    args: {
        username: "かけい坊",
        userId: "kakeiboy"
    }
};

export const IconOnly: ComponentStoryObj<typeof Account> = {
    args: {
        iconOnly: true
    }
};