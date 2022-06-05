import { css, Theme, useTheme } from '@emotion/react';

interface Props {
  /** 入力欄の幅を指定します */
  width?: number;
  /** プレースホルダーとして表示するテキストを表示します */
  placeholder?: string;
  /** inputの種類を指定します（HTML準拠） */
  type?: string;
  /** 入力可能な最大文字数を指定します */
  maxLength?: number;
  /** 入力欄の先頭に表示するアイコンを指定します */
  icon?: JSX.Element;
  /** 活性/非活性を指定します */
  disabled?: boolean;
  /** 入力欄に入力された値を指定します */
  value: string | number;
  /** 入力された時の動作を指定します */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  width = 200,
  placeholder = '文字を入力してください',
  type = 'text',
  maxLength = 100,
  icon,
  disabled,
  value,
  onChange,
}: Props) => {
  const theme = useTheme();
  if (disabled) {
    return <input css={base(theme, width)} type="text" placeholder={placeholder} maxLength={maxLength} disabled />;
  }
  return (
    <div css={container}>
      {icon}
      <input
        css={[base(theme, width), normal(theme)]}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const container = css`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const base = (theme: Theme, width: number) => css`
  width: ${width}px;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: ${theme.fontSizes.pt12};
  height: 1.5rem;
  font-weight: ${theme.fontWeights.bold};
  border: none;
  border-bottom: 1px solid ${theme.colors.vividGray};
  ::placeholder {
    font-weight: ${theme.fontWeights.thin};
    color: ${theme.colors.vividGray};
    font-size: ${theme.fontSizes.pt10};
  }
`;

const normal = (theme: Theme) => css`
  color: ${theme.colors.font};
  background: transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${theme.colors.font};
  }
`;
