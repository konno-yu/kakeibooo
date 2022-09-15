import { css, Theme, useTheme } from '@emotion/react';
import { AiFillTrophy } from 'react-icons/ai';
import { FlexBox } from '../../../common/flex_box/FlexBox';

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
    <FlexBox direction='row' justifyContent='flex-start' alignItems='center' css={card(theme)}>
      <AiFillTrophy size={32} color={getColor()} />
      <FlexBox direction='column' css={container(theme)}>
        <span css={titlePart(theme)}>{title}</span>
        <span css={textPart(theme)}>{text}</span>
      </div>
    </FlexBox>
  );
};

const card = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  border: 1px solid ${theme.colors.gray_100};
  background: ${theme.colors.gray_100};
  border-radius: ${theme.units.px4};
  padding: ${theme.units.px8} ${theme.units.px8};
`;

const container = (theme: Theme) => css`
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
