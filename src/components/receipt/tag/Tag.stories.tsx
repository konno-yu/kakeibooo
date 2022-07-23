import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Tag } from './Tag';

export default { component: Tag } as ComponentMeta<typeof Tag>;

export const Pure: ComponentStoryObj<typeof Tag> = {
  args: {},
  decorators: [(story) => <div style={{ width: '25%' }}>{story()}</div>],
};

export const ClickDelete: ComponentStoryObj<typeof Tag> = {
  args: {},
  decorators: Pure.decorators,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};
