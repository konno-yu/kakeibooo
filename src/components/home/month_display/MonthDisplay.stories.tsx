import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { dammyDataForStory } from './DummyDataForStory';
import { MonthDisplay } from './MonthDisplay';

export default { component: MonthDisplay } as ComponentMeta<typeof MonthDisplay>;

export const Pure: ComponentStoryObj<typeof MonthDisplay> = {
  args: {
    targetDate: new Date(2022, 0, 1),
    datas: dammyDataForStory,
  },
  decorators: [(story) => <div style={{ width: '50%' }}>{story()}</div>],
};
