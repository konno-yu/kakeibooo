import { cloneElement, ReactElement, ReactNode } from 'react';
import { css, useTheme } from '@emotion/react';

interface Props {
  /** 活性/非活性を指定します */
  disabled?: boolean;
  /** クリック時の動作を指定します */
  onClick: () => void;
  /** ボタンとして利用するアイコンを指定します */
  children: ReactNode;
}

export const IconButton = ({ disabled = false, children, onClick, ...props }: Props) => {
  const theme = useTheme();
  if (disabled) {
    const disabledChildren = cloneElement(children as ReactElement, {
      style: { color: theme.colors.gray_300 },
    });
    return (
      <button css={base} type="button" {...props}>
        {disabledChildren}
      </button>
    );
  }
  return (
    <button css={[base, normal]} onClick={onClick} type="button" {...props}>
      {children}
    </button>
  );
};

const base = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
`;

const normal = css`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  &:active {
    opacity: 1;
  }
`;
