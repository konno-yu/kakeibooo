import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { FlexBox } from './FlexBox';

export default { component: FlexBox } as ComponentMeta<typeof FlexBox>;
export const VerticalFlex: ComponentStoryObj<typeof FlexBox> = {
  args: {
    direction: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    children: (
      <>
        <div style={{ background: 'red', width: 100, height: '100%' }} />
        <div style={{ background: 'orange', width: 100, height: '100%' }} />
        <div style={{ background: 'yellow', width: 100, height: '100%' }} />
      </>
    ),
  },
  decorators: [
    (story) => (
      <div
        css={css`
          width: 50%;
          height: 30%;
          background: #efefef;
        `}
      >
        {story()}
      </div>
    ),
  ],
};
export const HorizontalFlex: ComponentStoryObj<typeof FlexBox> = {
  args: { ...VerticalFlex.args, direction: 'column' },
  decorators: VerticalFlex.decorators,
};
