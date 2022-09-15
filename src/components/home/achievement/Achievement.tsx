import { css, Theme, useTheme } from '@emotion/react';
import { FlexBox } from '../../common/flex_box/FlexBox';
import { Reward } from './reward/Reward';

export type Reward = {
  title: string;
  text: string;
  rank: 'gold' | 'silver' | 'bronze';
  isAchieve: boolean;
};

export interface Props {
  rewards: Reward[];
}

export const Achievement = ({ rewards }: Props) => {
  const theme = useTheme();
  const achieveRate = (rewards.filter((r) => r.isAchieve).length / rewards.length) * 100;

  return (
    <FlexBox direction="column" justifyContent="space-between" css={container(theme)}>
      <FlexBox direction="row" justifyContent="center" alignItems="center" css={chart}>
        <FlexBox direction="row" justifyContent="center" alignItems="center" css={pie(theme, achieveRate)}>
          <span>
            {rewards.filter((r) => r.isAchieve).length}/{rewards.length}
          </span>
        </FlexBox>
      </FlexBox>
      <FlexBox direction="column" gap={8} css={rewardPart(theme)}>
        {rewards.map((reward) => reward.isAchieve && <Reward {...reward} />)}
      </FlexBox>
    </FlexBox>
  );
};

const container = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: calc(100vh - 24px);
  background: ${theme.colors.white};
  border: 2px solid transparent;
  border-radius: ${theme.units.px8};
`;

const chart = css`
  height: 30%;
  width: 100%;
`;

const pie = (theme: Theme, achieveRate: number) => css`
  height: 75%;
  width: 50%;
  font-size: ${theme.fontSizes.pt18};
  color: ${theme.colors.black_400};
  font-weight: ${theme.fontWeights.bold};
  background-image: radial-gradient(${theme.colors.white} 55%, transparent 0%),
    conic-gradient(${theme.colors.primary_400} ${achieveRate}%, ${theme.colors.gray_100} 0%);
  border-radius: 50%;
`;

const rewardPart = (theme: Theme) => css`
  height: 70%;
  padding: ${theme.units.px8};
  overflow: auto;
`;
