import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { WeekSummary } from './WeekSummary';

export default { component: WeekSummary } as ComponentMeta<typeof WeekSummary>;

export const Pure: ComponentStoryObj<typeof WeekSummary> = {
  args: {},
  decorators: [(story) => <div style={{ width: '25%' }}>{story()}</div>],
};
