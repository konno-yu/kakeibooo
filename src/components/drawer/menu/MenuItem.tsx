import { css, Theme, useTheme } from '@emotion/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FlexBox } from '../../common/flex_box/FlexBox';

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
        <FlexBox direction="row" alignItems="center" gap={8}>
          {icon}
          <span>{children}</span>
        </FlexBox>
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
  padding: ${theme.units.px0} ${theme.units.px12};
  font-size: ${theme.fontSizes.pt10};
  font-weight: ${theme.fontWeights.semiBold};
  border-radius: ${theme.units.px4};
  border: none;
  cursor: pointer;
  ${selected
    ? css`
        background: ${theme.colors.primary_400};
        color: ${theme.colors.white};
        &:hover {
          background: ${theme.colors.primary_200};
        }
        &:active {
          background: ${theme.colors.primary_400};
        }
      `
    : css`
        background: none;
        color: ${theme.colors.black_400};
        &:hover {
          background: ${theme.colors.gray_200};
        }
        &:active {
          background: none;
        }
      `}
`;
