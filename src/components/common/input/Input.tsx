import { css, Theme, useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

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
  placeholder,
  type = 'text',
  maxLength = 100,
  icon,
  disabled,
  value,
  onChange,
}: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  if (!placeholder) {
    // eslint-disable-next-line no-param-reassign -- あとで解決
    placeholder = t('INPUT_PLACEHOLDER');
  }
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

const container = (theme: Theme) => css`
  display: flex;
  gap: ${theme.units.px4};
  align-items: center;
`;

const base = (theme: Theme, width: number) => css`
  width: ${width}px;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: ${theme.fontSizes.pt12};
  height: 1.5rem;
  font-weight: ${theme.fontWeights.bold};
  border: none;
  border-bottom: 1px solid ${theme.colors.gray_400};
  ::placeholder {
    font-weight: ${theme.fontWeights.thin};
    color: ${theme.colors.gray_400};
    font-size: ${theme.fontSizes.pt10};
  }
`;

const normal = (theme: Theme) => css`
  color: ${theme.colors.black_400};
  background: transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${theme.colors.black_400};
  }
`;
