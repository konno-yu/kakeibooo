import { css, Theme, useTheme } from '@emotion/react';

interface Props {
  /** バーがとる値の範囲を[最小値, 最大値]で指定します */
  range: [number, number];
  /** バーに表示する値を指定します */
  value: number;
  /** バーの色を指定します */
  color: 'primary' | 'secondary';
  /** バーの高さを指定します */
  height?: number;
}

export const SimpleIndicator = ({ range, value, color, height = 10 }: Props) => {
  const theme = useTheme();
  const barWidth = (value / range[1]) * 100;
  return (
    <div css={indicatorBar(height, theme)}>
      {barWidth > 100 ? <div css={limitOver(theme, color)} /> : <div css={bar(barWidth, theme, color)} />}
    </div>
  );
};

const indicatorBar = (height: number, theme: Theme) => css`
  width: 100%;
  height: ${height}px;
  background: ${theme.colors.gray_200};
  border-radius: ${theme.units.px16};
  display: flex;
`;

// TODO primary だったら primary_400 使う みたいなマッピングを楽にやりたい
const limitOver = (theme: Theme, color: 'primary' | 'secondary') => css`
  height: 100%;
  width: 100%;
  border-radius: ${theme.units.px16};
  ${color === 'primary'
    ? css`
        background: repeating-linear-gradient(
          -45deg,
          ${theme.colors.primary_400},
          ${theme.colors.primary_400} ${theme.units.px2},
          ${theme.colors.primary_200} ${theme.units.px2},
          ${theme.colors.primary_200} ${theme.units.px4}
        );
      `
    : css`
        background: repeating-linear-gradient(
          -45deg,
          ${theme.colors.secondary_400},
          ${theme.colors.secondary_400} ${theme.units.px2},
          ${theme.colors.secondary_200} ${theme.units.px2},
          ${theme.colors.secondary_200} ${theme.units.px4}
        );
      `}
`;

const bar = (width: number, theme: Theme, color: 'primary' | 'secondary') => css`
  width: ${width}%;
  height: 100%;
  border-radius: ${theme.units.px16};
  ${color === 'primary'
    ? css`
        background: ${theme.colors.primary_400};
      `
    : css`
        background: ${theme.colors.secondary_400};
      `}
`;
