import { cloneElement, ReactNode } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

interface Props {
  /** カードのタイトルを指定します */
  title: string;
  /** タイトルの横に表示するアイコンを指定します */
  icon: JSX.Element;
  /** カード全体の色合いを指定します */
  color: 'primary' | 'secondary';
  children: ReactNode;
}
export const Card = ({ icon, title, color, children }: Props) => {
  const theme = useTheme();
  const styledIcon = cloneElement(icon, { size: theme.units.px16, color: theme.colors.white });
  return (
    <div css={container(theme)}>
      <div css={header(theme)}>
        <div css={iconPart(color, theme)}>{styledIcon}</div>
        <span css={titlePart(color, theme)}>{title}</span>
      </div>
      <div css={body}>{children}</div>
    </div>
  );
};

const container = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: 100%;
  height: auto;
  background: ${theme.colors.white};
  border-radius: ${theme.units.px8};
  padding: ${theme.units.px20} ${theme.units.px16};
  border: ${theme.units.px2} solid ${theme.colors.gray_100};
  display: flex;
  gap: ${theme.units.px8};
  flex-direction: column;
`;

const header = (theme: Theme) => css`
  height: 20%;
  display: flex;
  align-items: center;
  gap: ${theme.units.px12};
  margin-bottom: ${theme.units.px8};
`;

const iconPart = (color: 'primary' | 'secondary', theme: Theme) => css`
  width: 40px;
  height: 40px;
  border-radius: ${theme.units.px24};
  display: flex;
  justify-content: center;
  align-items: center;
  ${color === 'primary'
    ? css`
        background: ${theme.colors.primary_400};
      `
    : css`
        background: ${theme.colors.secondary_400};
      `}
`;

const titlePart = (color: 'primary' | 'secondary', theme: Theme) => css`
  font-weight: ${theme.fontWeights.extraBold};
  font-size: ${theme.fontSizes.pt18};
  ${color === 'primary'
    ? css`
        color: ${theme.colors.primary_400};
      `
    : css`
        color: ${theme.colors.secondary_400};
      `}
`;

const body = css`
  height: 80%;
  width: 100%;
`;
