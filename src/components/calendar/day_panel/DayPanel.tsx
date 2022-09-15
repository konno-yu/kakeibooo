import { css, SerializedStyles, Theme, useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { FaUserEdit } from 'react-icons/fa';
import ImgPath from '../../../images/medal.svg';
import { FlexBox } from '../../common/flex_box/FlexBox';

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
  const { t } = useTranslation();
  const panelStyle: SerializedStyles[] = [panelBase(theme)];
  if (dayIndex === null) {
    return <FlexBox direction="column" css={[...panelStyle, blank(theme)]} />;
  }

  const handleOnClick = () => {
    onClick(dayIndex);
  };

  const PanelBody = (
    <>
      <FlexBox
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={10}
        css={dayLabel}
        key={dayIndex}
      >
        <span>{String(dayIndex).padStart(2, '0')}</span>
        {isToday && !isSelected && <span css={todayLabel}>{t('calendar.today')}</span>}
        {isSelected && <FaUserEdit size={24} />}
      </FlexBox>
      <FlexBox direction="row" justifyContent="center" alignItems="center" css={dayValueText}>
        {children === null ? <span /> : <span>{t('common.yen', { money: children.toLocaleString() })}</span>}
      </FlexBox>
    </>
  );

  switch (type) {
    case 'zero':
      panelStyle.push(zero(theme));
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
  border-radius: ${theme.units.px8};
  color: ${theme.colors.black_400};
  font-weight: ${theme.fontWeights.bold};
  // TODO これをFlexBoxで代用するとスタイルが崩れるので要調査
  display: flex;
  flex-direction: column;
  border: none;
  padding: ${theme.units.px0};
`;

const blank = (theme: Theme) => css`
  background: ${theme.colors.white};
`;

const normal = (theme: Theme) => css`
  cursor: pointer;
  color: ${theme.colors.black_400};
  background: ${theme.colors.white};
`;

const low = (theme: Theme) => css`
  cursor: pointer;
  color: ${theme.colors.secondary_400};
  background: ${theme.colors.secondary_100};
`;

const high = (theme: Theme) => css`
  cursor: pointer;
  color: ${theme.colors.primary_400};
  background: ${theme.colors.primary_100};
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
  padding: ${theme.units.px4} ${theme.units.px8} ${theme.units.px0} ${theme.units.px8};
  font-size: ${theme.fontSizes.pt12};
  color: ${theme.colors.black_200};
`;

const dayValueText = (theme: Theme) => css`
  width: 100%;
  font-size: ${theme.fontSizes.pt16};
  font-weight: ${theme.fontWeights.extraBold};
  flex-grow: 1;
`;

const todayLabel = (theme: Theme) => css`
  color: ${theme.colors.primary_400};
`;
