import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface AProps {
  selected?: boolean;
  icon?: JSX.Element;
  id: string;
  onChange?: (selected: string) => void;
  children: ReactNode;
}
export const MenuItem = ({ selected = false, icon, id, children, onChange }: AProps) => {
  const handleOnChange = () => {
    if (onChange) {
      return onChange(id);
    }
    return {};
  };

  return (
    <Link css={link} to={`/${id}`}>
      <button type="button" css={menuItem(selected)} id={id} onClick={handleOnChange}>
        {icon}
        {children}
      </button>
    </Link>
  );
};

const link = css`
  text-decoration: none;
`;

const menuItem = (selected: boolean) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: 40px;
  width: 160px;
  display: flex;
  padding: 0 12px 0 12px;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  ${selected
    ? css`
        background: #80cbc4;
        color: #ffffff;
        &:hover {
          background: #b2dfdb;
        }
        &:active {
          background: #80cbc4;
        }
      `
    : css`
        background: none;
        color: #546e7a;
        &:hover {
          background: #eeeeee;
        }
        &:active {
          background: none;
        }
      `}
`;
