import { css, Theme, useTheme } from '@emotion/react';
import { cloneElement } from 'react';

interface Props {
  /** ボタン上に表示するテキストを指定します */
  label: string;
  /** ボタン色を指定します */
  color: 'primary' | 'secondary';
  /** ボタン上に表示するアイコンを指定します */
  icon: JSX.Element;
  /** ボタンの1辺の長さを指定します。px指定のみでデフォルト値は150px */
  lengthOfSide?: number;
  /** ボタンをクリックしたときの動作を指定します */
  onClick: () => void;
}

export const ButtonPanel = ({ label, color, icon, lengthOfSide = 150, onClick }: Props) => {
  const theme = useTheme();
  const iconColor = color === 'primary' ? theme.colors.primary_400 : theme.colors.secondary_400;
  // アイコンのサイズと色をコンポーネント外で気にしなくて済むように内部で解決する
  const styledIcon = cloneElement(icon, { size: '40%', color: iconColor });
  return (
    <button css={buttonStyle(theme, color, lengthOfSide)} type="button" onClick={onClick}>
      <div css={circle(theme)}>{styledIcon}</div>
      <div style={{ color: theme.colors.white, fontWeight: 700 }}>{label}</div>
    </button>
  );
};

const buttonStyle = (theme: Theme, color: 'primary' | 'secondary', lengthOfSide: number) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: ${lengthOfSide}px;
  width: ${lengthOfSide}px;
  border-radius: 16px;
  border: none;
  padding: ${theme.units.px8};
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  ${color === 'primary'
    ? css`
        background: ${theme.colors.primary_400};
      `
    : css`
        background: ${theme.colors.secondary_400};
      `}
`;

const circle = (theme: Theme) => css`
  height: 50%;
  width: 50%;
  background: ${theme.colors.white};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
