import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MonthTransition } from "../../components/home/MonthTransition";

export default {
    title: 'Home/MonthTransition',
    component: MonthTransition
} as ComponentMeta<typeof MonthTransition>;

const Template: ComponentStory<typeof MonthTransition> = (args) => {
    return (
        <div style={{ width: '50%', height: 500 }}>
            <MonthTransition {...args} />
        </div>
    )
}

export const Pure = Template.bind({});
Pure.args = {
    datas: [
        {date: new Date(2022, 0, 1), totalCost: 0},
        {date: new Date(2022, 0, 2), totalCost: 300},
        {date: new Date(2022, 0, 3), totalCost: 600},
        {date: new Date(2022, 0, 4), totalCost: 900},
        {date: new Date(2022, 0, 5), totalCost: 1200},
        {date: new Date(2022, 0, 6), totalCost: 1500},
        {date: new Date(2022, 0, 7), totalCost: 1800},
        {date: new Date(2022, 0, 8), totalCost: 2100},
        {date: new Date(2022, 0, 9), totalCost: 2400},
        {date: new Date(2022, 0, 10), totalCost: 2700},
        {date: new Date(2022, 0, 11), totalCost: 3000},
        {date: new Date(2022, 0, 12), totalCost: 2700},
        {date: new Date(2022, 0, 13), totalCost: 2400},
        {date: new Date(2022, 0, 14), totalCost: 2100},
        {date: new Date(2022, 0, 15), totalCost: 1800},
        {date: new Date(2022, 0, 16), totalCost: 1500},
        {date: new Date(2022, 0, 17), totalCost: 1200},
        {date: new Date(2022, 0, 18), totalCost: 900},
        {date: new Date(2022, 0, 19), totalCost: 600},
        {date: new Date(2022, 0, 20), totalCost: 300},
        {date: new Date(2022, 0, 21), totalCost: 0},
        {date: new Date(2022, 0, 22), totalCost: 300},
        {date: new Date(2022, 0, 23), totalCost: 600},
        {date: new Date(2022, 0, 24), totalCost: 900},
        {date: new Date(2022, 0, 25), totalCost: 1200},
        {date: new Date(2022, 0, 26), totalCost: 1500},
        {date: new Date(2022, 0, 27), totalCost: 1800},
        {date: new Date(2022, 0, 28), totalCost: 2100},
        {date: new Date(2022, 0, 29), totalCost: 2400},
        {date: new Date(2022, 0, 30), totalCost: 2700},
        {date: new Date(2022, 0, 31), totalCost: 3000},
    ]
};