import { css } from '@emotion/react';

type ButtonType = 'filled' | 'outlined';
// TODO これ以上増やす場合はスタイルの場合分けが必要
type ColorPattern = 'normal' | 'accent';

export interface Props {
  /** ボタンの見た目を指定します */
  variant: ButtonType;
  /** ボタンに表示するテキストを指定します */
  label: string;
  /** ボタンの色を指定します */
  color?: ColorPattern;
  /** 活性/非活性を指定します */
  disabled?: boolean;
  /** ボタン内に表示するアイコンを指定します */
  icon?: JSX.Element;
  /** ボタンの幅を指定します */
  width: string | number;
  /** ボタンをクリックしたときの動作を指定します */
  onClick: () => void;
}

export const Button = ({ variant, label, color, disabled, icon, width = '100%', onClick }: Props) => {
  if (disabled) {
    return (
      <button css={[base(width), disable]} type="button">
        {icon}
        {label}
      </button>
    );
  }
  if (variant === 'filled') {
    return (
      <button css={[base(width), filled(color)]} onClick={onClick} type="button">
        {icon}
        {label}
      </button>
    );
  }
  return (
    <button css={[base(width), outlined(color)]} onClick={onClick} type="button">
      {icon}
      {label}
    </button>
  );
};

const base = (width: string | number) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: ${width};
  padding: 8px 12px;
  border-radius: 100px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const disable = css`
  background: #e0e0e0;
  border: 1px solid #bdbdbd;
  color: #bdbdbd;
  cursor: auto;
`;

const filled = (color: ColorPattern) => css`
  color: #ffffff;
  ${color === 'normal'
    ? css`
        background: #607d8b;
        border: 1px solid #607d8b;
        &:hover {
          background: #90a4ae;
          border: 1px solid #90a4ae;
        }
        ,
        &:active {
          background: #607d8b;
          border: 1px solid #607d8b;
        }
      `
    : css`
        background: #f44336;
        border: 1px solid #f44336;
        &:hover {
          background: #e57373;
          border: 1px solid #e57373;
        }
        ,
        &:active {
          background: #f44336;
          border: 1px solid #f44336;
        }
      `}
`;

const outlined = (color: ColorPattern) => css`
  background: #ffffff;
  ${color === 'normal'
    ? css`
        color: #607d8b;
        border: 1px solid #607d8b;
        background: #ffffff;
        &:hover {
          background: #eceff1;
        }
        ,
        &:active {
          background: #ffffff;
        }
      `
    : css`
        color: #f44336;
        border: 1px solid #f44336;
        &:hover {
          background: #ffebee;
        }
        ,
        &:active {
          background: #ffffff;
        }
      `}
`;
