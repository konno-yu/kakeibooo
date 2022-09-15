import { cloneElement, ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';
import { FlexBox } from '../flex_box/FlexBox';

interface Props {
  /** 活性/非活性を指定します */
  disabled?: boolean;
  /** クリック時の動作を指定します */
  onClick: () => void;
  /** ボタンとして利用するアイコンを指定します */
  children: ReactElement;
}

export const IconButton = ({ disabled = false, children, onClick, ...props }: Props) => {
  const theme = useTheme();
  if (disabled) {
    const disabledChildren = cloneElement(children, {
      style: { color: theme.colors.gray_300 },
    });
    return (
      <button css={base} type="button" {...props}>
        <FlexBox direction="row" alignItems="center" justifyContent="center">
          {disabledChildren}
        </FlexBox>
      </button>
    );
  }
  return (
    <button css={[base, normal]} onClick={onClick} type="button" {...props}>
      <FlexBox direction="row" alignItems="center" justifyContent="center">
        {children}
      </FlexBox>
    </button>
  );
};

const base = css`
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
