import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Achievement } from './Achievement';
import { initAchievements } from './AchievementUtils';

export default { component: Achievement } as ComponentMeta<typeof Achievement>;
const rewards = initAchievements.map((a) => ({ ...a, isAchieve: true }));
export const Pure: ComponentStoryObj<typeof Achievement> = {
  args: {
    rewards,
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
