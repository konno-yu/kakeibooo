import { css, Theme, useTheme } from '@emotion/react';
import { AiFillTrophy } from 'react-icons/ai';

interface Props {
  /** リワードのタイトルを指定します */
  title: string;
  /** リワードの説明を指定します */
  text: string;
  /** リワードの難易度を指定します */
  rank: 'gold' | 'silver' | 'bronze';
  /** リワードの達成状態を指定します */
  isAchieve: boolean;
}

export const Reward = ({ title, text, rank, isAchieve }: Props) => {
  const theme = useTheme();

  const getColor = () => {
    if (!isAchieve) {
      return theme.colors.black_100;
    }
    switch (rank) {
      case 'gold':
        return theme.colors.gold;
      case 'silver':
        return theme.colors.silver;
      case 'bronze':
        return theme.colors.bronze;
      default:
        return theme.colors.black_100;
    }
  };

  return (
    <div css={card(theme)}>
      <AiFillTrophy size={32} color={getColor()} />
      <div css={container(theme)}>
        <span css={titlePart(theme)}>{title}</span>
        <span css={textPart(theme)}>{text}</span>
      </div>
    </div>
  );
};

const card = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  border: 1px solid ${theme.colors.gray_100};
  background: ${theme.colors.gray_100};
  border-radius: ${theme.units.px4};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${theme.units.px8} ${theme.units.px8};
`;

const container = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  margin-left: ${theme.units.px8};
`;

const titlePart = (theme: Theme) => css`
  font-size: ${theme.fontSizes.pt12};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.black_400};
`;

const textPart = (theme: Theme) => css`
  font-size: ${theme.fontSizes.pt08};
  color: ${theme.colors.gray_400};
`;
