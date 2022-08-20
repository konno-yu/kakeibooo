import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { SimpleIndicator } from './SimpleIndicator';

export default { component: SimpleIndicator } as ComponentMeta<typeof SimpleIndicator>;

export const Pure: ComponentStoryObj<typeof SimpleIndicator> = {
  args: {
    value: 2,
    range: [0, 10],
    color: 'primary',
  },
  decorators: [(story) => <div style={{ width: '30%' }}>{story()}</div>],
};

export const Just: ComponentStoryObj<typeof SimpleIndicator> = {
  args: { ...Pure.args, value: 10 },
  decorators: Pure.decorators,
};

export const LimitOver: ComponentStoryObj<typeof SimpleIndicator> = {
  args: {
    value: 100,
    range: [0, 50],
    color: 'secondary',
  },
  decorators: Pure.decorators,
};
