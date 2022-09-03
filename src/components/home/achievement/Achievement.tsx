import { css, Theme, useTheme } from '@emotion/react';
import { Reward } from './reward/Reward';

export interface Props {
  // TODO 型に切り出したい
  rewards: { title: string; text: string; rank: 'gold' | 'silver' | 'bronze'; isAchieve: boolean }[];
}

export const Achievement = ({ rewards }: Props) => {
  const theme = useTheme();
  const achieveRate = (rewards.filter((r) => r.isAchieve).length / rewards.length) * 100;

  return (
    <div css={container(theme)}>
      <div css={chart}>
        <div css={pie(theme, achieveRate)}>
          {rewards.filter((r) => r.isAchieve).length}/{rewards.length}
        </div>
      </div>
      <div css={rewardPart(theme)}>
        {rewards.map((reward) => (
          <Reward {...reward} />
        ))}
      </div>
    </div>
  );
};

const container = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: calc(100vh - 24px);
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray_200};
  border-radius: ${theme.units.px8};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const chart = css`
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const pie = (theme: Theme, achieveRate: number) => css`
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  gap: ${theme.units.px8};
`;
