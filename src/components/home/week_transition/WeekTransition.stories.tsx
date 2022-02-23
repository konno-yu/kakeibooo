import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { WeekTransition } from './WeekTransition';

export default { component: WeekTransition } as ComponentMeta<typeof WeekTransition>;

export const Pure: ComponentStoryObj<typeof WeekTransition> = {
  args: {
    dates: [1, 2, 3, 4, 5, 6, 7],
    types: ['zero', 'low', 'normal', 'high', 'normal', 'low', 'zero'],
  },
  decorators: [(story) => <div style={{ width: '30%' }}>{story()}</div>],
};
