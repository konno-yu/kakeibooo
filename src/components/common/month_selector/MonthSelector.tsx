import { css, Theme, useTheme } from '@emotion/react';
import { getMonth, getYear } from 'date-fns';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { IconButton } from '../icon_button/IconButton';

interface Props {
  targetDate: Date;
  locale?: 'ja' | 'en';
  onPrev: () => void;
  onNext: () => void;
}

export const MonthSelector: React.FC<Props> = ({ targetDate, locale = 'ja', onPrev, onNext }: Props) => {
  const theme = useTheme();
  const displayFormat =
    locale === 'ja'
      ? `${getYear(targetDate)}年 ${getMonth(targetDate) + 1}月`
      : `${targetDate.toLocaleDateString('en-US', { month: 'long' })} ${getYear(targetDate)}`;

  return (
    <div css={container}>
      <span>{displayFormat}</span>
      <div css={monthTransition}>
        <IconButton onClick={onPrev}>
          <HiArrowCircleLeft size={28} color={theme.colors.font} />
        </IconButton>
        <IconButton onClick={onNext}>
          <HiArrowCircleRight size={28} color={theme.colors.font} />
        </IconButton>
      </div>
    </div>
  );
};

const container = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: ${theme.fontSizes.pt24};
  color: ${theme.colors.font};
  font-weight: ${theme.fontWeights.extraBold};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const monthTransition = css`
  display: flex;
`;
