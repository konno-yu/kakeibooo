import { css, SerializedStyles, Theme, useTheme } from '@emotion/react';

interface Props {
  type: 'header' | 'subHeader';
  variant: 'normal' | 'accent' | 'helper';
  children: string;
}

export const Typography = ({ type = 'header', variant = 'normal', children }: Props) => {
  const theme = useTheme();
  const typoStyle: SerializedStyles[] = [typoBase(type, theme)];
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
const typoBase = (type: 'header' | 'subHeader', theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: ${theme.fontWeights.extraBold};
  ${type === 'header'
    ? css`
        font-size: ${theme.fontSizes.pt18};
      `
    : css`
        font-size: ${theme.fontSizes.pt12};
      `}
`;

const normal = (theme: Theme) => css`
  color: ${theme.colors.black_400};
`;

const accent = (theme: Theme) => css`
  color: ${theme.colors.primary_400};
`;

const helper = (theme: Theme) => css`
  color: ${theme.colors.gray_400};
`;
