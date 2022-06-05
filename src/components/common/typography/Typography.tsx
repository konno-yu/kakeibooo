import { css, SerializedStyles, Theme, useTheme } from '@emotion/react';

interface Props {
  type: 'header' | 'subHeader';
  variant: 'normal' | 'accent' | 'helper';
  children: string;
}

export const Typography = ({ type = 'header', variant = 'normal', children }: Props) => {
  const theme = useTheme();
  const typoStyle: SerializedStyles[] = [typoBase(type)];
  switch (variant) {
    case 'normal':
      typoStyle.push(normal(theme));
      break;
    case 'accent':
      typoStyle.push(accent(theme));
      break;
    case 'helper':
      typoStyle.push(helper(theme));
      break;
    default:
      break;
  }
  return <div css={typoStyle}>{children}</div>;
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

const helper = (theme: Theme) => css`
  color: ${theme.colors.vividGray};
`;
