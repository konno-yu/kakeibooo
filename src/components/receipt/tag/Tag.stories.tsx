import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Tag } from './Tag';

export default { component: Tag } as ComponentMeta<typeof Tag>;

export const Pure: ComponentStoryObj<typeof Tag> = {
  args: {},
  decorators: [(story) => <div style={{ width: '25%' }}>{story()}</div>],
};
