import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Typography } from './Typography';

export default { component: Typography } as ComponentMeta<typeof Typography>;

export const Normal: ComponentStoryObj<typeof Typography> = {
  args: {
    children: 'サンプル',
  },
};

export const Sub: ComponentStoryObj<typeof Typography> = {
  args: {
    ...Normal.args,
    type: 'subHeader',
  },
};

export const Accent: ComponentStoryObj<typeof Typography> = {
  args: {
    ...Normal.args,
    variant: 'accent',
  },
};

export const Helper: ComponentStoryObj<typeof Typography> = {
  args: {
    ...Normal.args,
    variant: 'helper',
  },
};
