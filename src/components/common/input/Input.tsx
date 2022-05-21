import { css } from '@emotion/react';

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
  if (disabled) {
    return <input css={base(width)} type="text" placeholder={placeholder} maxLength={maxLength} disabled />;
  }
  return (
    <div css={container}>
      {icon}
      <input
        css={[base(width), normal]}
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

const base = (width: number) => css`
  width: ${width}px;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 16px;
  height: 1.5rem;
  font-weight: 700;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  ::placeholder {
    font-weight: 400;
    color: #b0bec5;
    font-size: 12px;
  }
`;

const normal = css`
  color: #546e7a;
  background: transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid #546e7a;
  }
`;
