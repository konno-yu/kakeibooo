import { css, SerializedStyles, Theme, useTheme } from '@emotion/react';
import { getMonth, getYear } from 'date-fns';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const displayFormat =
    locale === 'ja'
      ? t('common.format_year_month', { year: getYear(targetDate), month: getMonth(targetDate) + 1 })
      : `${targetDate.toLocaleDateString('en-US', { month: 'long' })} ${getYear(targetDate)}`;

  return (
    <div css={container(theme)}>
      <span>{displayFormat}</span>
      <div css={monthTransition}>
        <IconButton data-testid="button-prev" onClick={onPrev}>
          <HiArrowCircleLeft size={28} color={theme.colors.black_400} />
        </IconButton>
        <IconButton data-testid="button-next" onClick={onNext}>
          <HiArrowCircleRight size={28} color={theme.colors.black_400} />
        </IconButton>
      </div>
    </div>
  );
};

const container = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: ${theme.fontSizes.pt24};
  color: ${theme.colors.black_400};
  font-weight: ${theme.fontWeights.extraBold};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const monthTransition = css`
  display: flex;
`;
