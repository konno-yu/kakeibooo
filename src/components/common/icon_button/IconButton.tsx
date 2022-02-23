import { cloneElement, ReactElement } from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

export const IconButton: React.FC<Props> = ({ disabled = false, children, onClick }) => {
  if (disabled) {
    const disabledChildren = cloneElement(children as ReactElement, {
      style: { color: '#BDBDBD' },
    });
    return <Styled.Disabled>{disabledChildren}</Styled.Disabled>;
  }
  return <Styled.Normal onClick={onClick}>{children}</Styled.Normal>;
};

const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
`;

const Styled = {
  Disabled: styled.button`
    ${baseStyle};
  `,
  Normal: styled.button`
    ${baseStyle};
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    &:active {
      opacity: 1;
    }
  `,
};
