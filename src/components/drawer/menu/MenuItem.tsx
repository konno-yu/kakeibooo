import { css, Theme, useTheme } from '@emotion/react';
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
  const theme = useTheme();
  const handleOnChange = () => {
    if (onChange) {
      return onChange(id);
    }
    return {};
  };

  return (
    <Link css={link} to={`/${id}`}>
      <button type="button" css={menuItem(theme, selected)} id={id} onClick={handleOnChange}>
        {icon}
        {children}
      </button>
    </Link>
  );
};

const link = css`
  text-decoration: none;
`;

const menuItem = (theme: Theme, selected: boolean) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: 40px;
  width: 160px;
  display: flex;
  padding: 0 12px 0 12px;
  align-items: center;
  gap: 8px;
  font-size: ${theme.fontSizes.pt10};
  font-weight: ${theme.fontWeights.semiBold};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  ${selected
    ? css`
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        &:hover {
          background: ${theme.colors.palePrimary};
        }
        &:active {
          background: ${theme.colors.primary};
        }
      `
    : css`
        background: none;
        color: ${theme.colors.font};
        &:hover {
          background: ${theme.colors.paleGray};
        }
        &:active {
          background: none;
        }
      `}
`;
