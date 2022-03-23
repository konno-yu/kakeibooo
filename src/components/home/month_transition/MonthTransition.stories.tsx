import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { dammyDataForStory } from '../month_display/MonthDisplay.stories';
import { MonthTransition } from './MonthTransition';

export default { component: MonthTransition } as ComponentMeta<typeof MonthTransition>;

export const Pure: ComponentStoryObj<typeof MonthTransition> = {
  args: {
    datas: dammyDataForStory,
  },
  decorators: [(story) => <div style={{ width: '50%', height: 500 }}>{story()}</div>],
};
