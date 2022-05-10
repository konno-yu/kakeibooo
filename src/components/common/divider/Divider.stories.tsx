import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Divider } from './Divider';

export default { component: Divider } as ComponentMeta<typeof Divider>;

export const Pure: ComponentStoryObj<typeof Divider> = {
  args: {},
};
