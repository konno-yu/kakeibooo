import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Drawer } from './Drawer';

export default { component: Drawer } as ComponentMeta<typeof Drawer>;

export const Pure: ComponentStoryObj<typeof Drawer> = {
  args: {},
  decorators: [(story) => <div css={decorator}>{story()}</div>],
};

const decorator = css`
  width: 20%;
  height: 100%;
  border-right: 1px solid #eeeeee;
`;
