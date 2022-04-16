import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Form } from './Form';

export default { component: Form } as ComponentMeta<typeof Form>;

export const Pure: ComponentStoryObj<typeof Form> = {
  args: {},
};
