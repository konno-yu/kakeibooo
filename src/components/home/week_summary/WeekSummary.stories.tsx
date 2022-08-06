import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { WeekSummary } from './WeekSummary';

export default { component: WeekSummary } as ComponentMeta<typeof WeekSummary>;

export const Pure: ComponentStoryObj<typeof WeekSummary> = {
  args: {
    dailyCost: [0, 500, 1000, 1500, 2000, 2500, 3000],
  },
  decorators: [(story) => <div style={{ width: '35%' }}>{story()}</div>],
};
