import { css } from '@emotion/react';
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
  const displayFormat =
    locale === 'ja'
      ? `${getYear(targetDate)}年 ${getMonth(targetDate) + 1}月`
      : `${targetDate.toLocaleDateString('en-US', { month: 'long' })} ${getYear(targetDate)}`;

  return (
    <div css={container}>
      <span>{displayFormat}</span>
      <div css={monthTransition}>
        <IconButton onClick={onPrev}>
          <HiArrowCircleLeft size={28} color="#546E7A" />
        </IconButton>
        <IconButton onClick={onNext}>
          <HiArrowCircleRight size={28} color="#546E7A" />
        </IconButton>
      </div>
    </div>
  );
};

const container = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 24px;
  color: #546e7a;
  font-weight: 900;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const monthTransition = css`
  display: flex;
`;
