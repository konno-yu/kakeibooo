import { css } from '@emotion/react';
import { FaRegFrown, FaRegGrinSquint, FaRegMeh, FaRegSmile } from 'react-icons/fa';

interface Props {
  dates: number[];
  types: ('zero' | 'low' | 'normal' | 'high')[];
}

const ICONS: { [key in 'zero' | 'low' | 'normal' | 'high']: JSX.Element } = {
  zero: <FaRegGrinSquint color="#FFF59D" size={20} />,
  low: <FaRegSmile color="#80CBC4" size={20} />,
  normal: <FaRegMeh color="#E0E0E0" size={20} />,
  high: <FaRegFrown color="#EF9A9A" size={20} />,
};
const LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const WeekTransition = ({ dates, types }: Props) => (
  <div css={container}>
    {types.map((type, i) => (
      <div css={day}>
        <div css={header}>
          <span css={dayValueText}>{dates[i]}</span>
          <span css={dayOfWeekLabel}>{LABELS[i]}</span>
        </div>
        {ICONS[type]}
      </div>
    ))}
  </div>
);

const container = css`
  height: 10%;
  display: flex;
  justify-content: center;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const day = css`
  width: calc(100% / 7);
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const header = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const dayOfWeekLabel = css`
  color: #546e7a;
  font-weight: 700;
  font-size: 12px;
`;

const dayValueText = css`
  color: #546e7a;
  font-weight: 700;
  font-size: 16px;
`;
