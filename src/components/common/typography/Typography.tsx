import { css, Theme, useTheme } from '@emotion/react';

interface Props {
  type: 'header' | 'subHeader';
  variant: 'normal' | 'accent' | 'helper';
  children: string;
}

export const Typography = ({ type = 'header', variant = 'normal', children }: Props) => {
  const theme = useTheme();
  switch (variant) {
    case 'normal':
      return <div css={[typoBase(type), normal(theme)]}>{children}</div>;
    case 'accent':
      return <div css={[typoBase(type), accent(theme)]}>{children}</div>;
    case 'helper':
      return <div css={[typoBase(type), helper]}>{children}</div>;
    default:
      return <div />;
  }
};

// TODO Propsの型と連動させたい
const typoBase = (type: 'header' | 'subHeader') => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 900;
  ${type === 'header'
    ? css`
        font-size: 24px;
      `
    : css`
        font-size: 18px;
      `}
`;

const normal = (theme: Theme) => css`
  color: ${theme.colors.font};
`;

const accent = (theme: Theme) => css`
  color: ${theme.colors.primary};
`;

const helper = css`
  color: #cecece;
`;
