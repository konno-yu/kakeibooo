import { css, SerializedStyles, Theme, useTheme } from '@emotion/react';
import { FaUserEdit } from 'react-icons/fa';
import ImgPath from '../../../images/medal.svg';

interface Props {
  /** 日付を指定します */
  dayIndex: number | null;
  /** 食費を指定します */
  children?: number | null;
  /** 今日かどうかを指定します */
  isToday?: boolean;
  /** 選択中（= 編集対象）の日付かを指定します */
  isSelected?: boolean;
  /** 食費の額に応じた表示状態を指定します */
  type: 'zero' | 'low' | 'normal' | 'high';
  /** クリック時の挙動を指定します */
  onClick?: (dayIndex: number) => void;
}

export const DayPanel = ({ dayIndex, children, isToday = false, isSelected = false, type, onClick }: Props) => {
  const theme = useTheme();
  const panelStyle: SerializedStyles[] = [panelBase(theme)];
  if (dayIndex === null) {
    return <div css={[...panelStyle, blank(theme)]} />;
  }

  const handleOnClick = () => {
    onClick(dayIndex);
  };

  const PanelBody = (
    <>
      <div css={dayLabel} key={dayIndex}>
        {String(dayIndex).padStart(2, '0')}
        {isToday && !isSelected && <span css={todayLabel}>今日</span>}
        {isSelected && <FaUserEdit size={24} />}
      </div>
      <div css={dayValueText}>{children === null ? '' : `¥${children.toLocaleString()}`}</div>
    </>
  );

  switch (type) {
    case 'zero':
      panelStyle.push(zero);
      break;
    case 'low':
      panelStyle.push(low(theme));
      break;
    case 'normal':
      panelStyle.push(normal(theme));
      break;
    case 'high':
      panelStyle.push(high(theme));
      break;
    default:
      break;
  }

  return (
    <button css={panelStyle} onClick={handleOnClick} onKeyUp={() => ''} type="button">
      {PanelBody}
    </button>
  );
};

const panelBase = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: calc(100% / 7);
  height: 100%;
  min-height: 80px;
  border-radius: 8px;
  color: ${theme.colors.font};
  font-weight: 700;
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0px;
`;

const blank = (theme: Theme) => css`
  background: ${theme.colors.white};
`;

const normal = (theme: Theme) => css`
  cursor: pointer;
  color: ${theme.colors.font};
  background: ${theme.colors.white};
`;

const low = (theme: Theme) => css`
  cursor: pointer;
  color: ${theme.colors.secondary};
  background: ${theme.colors.white};
`;

const high = (theme: Theme) => css`
  cursor: pointer;
  color: ${theme.colors.primary};
  background: ${theme.colors.white};
`;

const zero = (theme: Theme) => css`
  cursor: pointer;
  background: ${theme.colors.white};
  background-image: url(${ImgPath});
  background-size: 50% auto;
  background-position: center center;
  background-repeat: no-repeat;
`;

const dayLabel = (theme: Theme) => css`
  width: calc(100% - 16px);
  padding: 4px 8px 0 8px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
  font-size: 16px;
  color: ${theme.colors.paleFont};
`;

const dayValueText = css`
  width: 100%;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const todayLabel = (theme: Theme) => css`
  color: ${theme.colors.primary};
`;
