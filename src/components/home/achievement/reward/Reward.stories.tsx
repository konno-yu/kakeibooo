import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Reward } from './Reward';

export default { component: Reward } as ComponentMeta<typeof Reward>;

export const Pure: ComponentStoryObj<typeof Reward> = {
  args: {
    title: 'Kakeiboooビギナー',
    text: '食費を1日登録した',
    rank: 'gold',
    isAchieve: true,
  },
  decorators: [
    (story) => (
      <div
        css={css`
          width: 25%;
        `}
      >
        {story()}
      </div>
    ),
  ],
};
