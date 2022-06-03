import { css, Theme } from '@emotion/react';
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
  if (dayIndex === null) {
    return <div css={[panelBase, blank]} />;
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
      return (
        <button css={[panelBase, zero]} onClick={handleOnClick} onKeyUp={() => ''} type="button">
          {PanelBody}
        </button>
      );
    case 'low':
      return (
        <button css={[panelBase, low]} onClick={handleOnClick} onKeyUp={() => ''} type="button">
          {PanelBody}
        </button>
      );
    case 'normal':
      return (
        <button css={[panelBase, normal]} onClick={handleOnClick} onKeyUp={() => ''} type="button">
          {PanelBody}
        </button>
      );
    case 'high':
      return (
        <button css={[panelBase, high]} onClick={handleOnClick} onKeyUp={() => ''} type="button">
          {PanelBody}
        </button>
      );
    default:
      return <div />;
  }
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
  background: ${theme.colors.pGray};
  &:hover {
    background: #f5f5f5;
  }
  &:active {
    background: #ffffff;
  }
`;

const low = css`
  cursor: pointer;
  background: #b2dfdb;
  &:hover {
    background: #e0f2f1;
  }
  &:active {
    background: #b2dfdb;
  }
`;

const high = css`
  cursor: pointer;
  background: #ffcdd2;
  &:hover {
    background: #ffebee;
  }
  &:active {
    background: #ffcdd2;
  }
`;

const zero = css`
  cursor: pointer;
  background: #fff9c4;
  background-image: url(${ImgPath});
  background-size: 50% auto;
  background-position: center center;
  background-repeat: no-repeat;
  &:hover {
    background: #fffde7;
  }
  &:active {
    background: #fff9c4;
  }
`;

const dayLabel = css`
  width: calc(100% - 16px);
  padding: 4px 8px 0 8px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
  font-size: 16px;
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
