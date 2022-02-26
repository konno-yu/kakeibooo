import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Sample } from './sample';

export default { component: Sample } as ComponentMeta<typeof Sample>;

export const Pure: ComponentStoryObj<typeof Sample> = {
  args: {},
};
