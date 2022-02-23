import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { MonthSelector } from "./MonthSelector";

export default { component: MonthSelector } as ComponentMeta<typeof MonthSelector>;

export const Pure: ComponentStoryObj<typeof MonthSelector> = {
    args: {
        targetDate: new Date(2022, 0, 1)
    }
};

export const Locale: ComponentStoryObj<typeof MonthSelector> = {
    args: {
        targetDate: new Date(2022, 0, 1),
        locale: 'en'
    }
};