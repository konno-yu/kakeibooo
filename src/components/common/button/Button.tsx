/* eslint-disable no-nested-ternary -- ButtonのスタイルがLint違反しているが良いアイデアがないので一旦無効化 */
import { css, SerializedStyles, Theme, useTheme } from '@emotion/react';

type ButtonType = 'filled' | 'outlined' | 'text';
type ColorPattern = 'normal' | 'primary' | 'secondary';

export interface Props {
  /** ボタンの見た目を指定します */
  variant: ButtonType;
  /** ボタンに表示するテキストを指定します */
  label: string;
  /** ボタンの色を指定します */
  color: ColorPattern;
  /** 活性/非活性を指定します */
  disabled?: boolean;
  /** ボタン内に表示するアイコンを指定します */
  icon?: JSX.Element;
  /** ボタンの幅を指定します */
  width?: string | number;
  /** ボタンをクリックしたときの動作を指定します */
  onClick: () => void;
}

export const Button = ({ variant, label, color, disabled, icon, width = '100%', onClick }: Props) => {
  const theme = useTheme();
  if (disabled) {
    return (
      <button css={[base(width, theme), disable(theme)]} type="button">
        {icon}
        {label}
      </button>
    );
  }
  const buttonStyle: SerializedStyles[] = [base(width, theme)];
  switch (variant) {
    case 'filled':
      buttonStyle.push(filled(color, theme));
      break;
    case 'outlined':
      buttonStyle.push(outlined(color, theme));
      break;
    case 'text':
      buttonStyle.push(text(color, theme));
      break;
    default:
      break;
  }
  return (
    <button css={buttonStyle} onClick={onClick} type="button">
      {icon}
      {label}
    </button>
  );
};

const base = (width: string | number, theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: ${width};
  padding: ${theme.units.px8} ${theme.units.px12};
  border-radius: 100px;
  font-weight: ${theme.fontWeights.semiBold};
  cursor: pointer;
  display: flex;
  gap: ${theme.units.px4};
  align-items: center;
  justify-content: center;
`;

const disable = (theme: Theme) => css`
  background: ${theme.colors.gray};
  border: 1px solid ${theme.colors.vividGray};
  color: ${theme.colors.vividGray};
  cursor: auto;
`;

// TODO もっとよい書き方ありそう...
const text = (color: ColorPattern, theme: Theme) => css`
  border-radius: ${theme.units.px8};
  border: none;
  background: none;
  ${color === 'primary'
    ? css`
        color: ${theme.colors.primary};
        &:hover {
          color: ${theme.colors.palePrimary};
        }
        ,
        &:active {
          color: ${theme.colors.primary};
        }
      `
    : color === 'secondary'
    ? css`
        color: ${theme.colors.secondary};
        &:hover {
          color: ${theme.colors.paleSecondary};
        }
        ,
        &:active {
          color: ${theme.colors.secondary};
        }
      `
    : css`
        color: ${theme.colors.font};
        &:hover {
          color: ${theme.colors.paleFont};
        }
        ,
        &:active {
          color: ${theme.colors.font};
        }
      `}
`;

const filled = (color: ColorPattern, theme: Theme) => css`
  color: ${theme.colors.white};
  ${color === 'primary'
    ? css`
        background: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover {
          background: ${theme.colors.palePrimary};
          border: 1px solid ${theme.colors.palePrimary};
        }
        ,
        &:active {
          background: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
        }
      `
    : color === 'secondary'
    ? css`
        background: ${theme.colors.secondary};
        border: 1px solid ${theme.colors.secondary};
        &:hover {
          background: ${theme.colors.paleSecondary};
          border: 1px solid ${theme.colors.paleSecondary};
        }
        ,
        &:active {
          background: ${theme.colors.secondary};
          border: 1px solid ${theme.colors.secondary};
        }
      `
    : css`
        background: ${theme.colors.font};
        border: 1px solid ${theme.colors.font};
        &:hover {
          background: ${theme.colors.paleFont};
          border: 1px solid ${theme.colors.paleFont};
        }
        ,
        &:active {
          background: ${theme.colors.font};
          border: 1px solid ${theme.colors.font};
        }
      `}
`;

const outlined = (color: ColorPattern, theme: Theme) => css`
  background: ${theme.colors.white};
  ${color === 'primary'
    ? css`
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover {
          background: ${theme.colors.paleGray};
          border: 1px solid ${theme.colors.palePrimary};
        }
        ,
        &:active {
          background: ${theme.colors.white};
          border: 1px solid ${theme.colors.primary};
        }
      `
    : color === 'secondary'
    ? css`
        color: ${theme.colors.secondary};
        border: 1px solid ${theme.colors.secondary};
        &:hover {
          background: ${theme.colors.paleGray};
          border: 1px solid ${theme.colors.paleSecondary};
        }
        ,
        &:active {
          background: ${theme.colors.white};
          border: 1px solid ${theme.colors.secondary};
        }
      `
    : css`
        color: ${theme.colors.font};
        border: 1px solid ${theme.colors.font};
        &:hover {
          background: ${theme.colors.paleGray};
          border: 1px solid ${theme.colors.paleFont};
        }
        ,
        &:active {
          background: ${theme.colors.white};
          border: 1px solid ${theme.colors.font};
        }
      `}
`;
