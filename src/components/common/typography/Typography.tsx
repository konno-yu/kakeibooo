import { css } from '@emotion/react';

interface Props {
  type: 'header' | 'subHeader';
  variant: 'normal' | 'accent' | 'helper';
  children: string;
}

export const Typography = ({ type = 'header', variant = 'normal', children }: Props) => {
  switch (variant) {
    case 'normal':
      return <div css={[typoBase(type), normal]}>{children}</div>;
    case 'accent':
      return <div css={[typoBase(type), accent]}>{children}</div>;
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

const normal = css`
  color: #546e7a;
`;

const accent = css`
  color: #4db6ac;
`;

const helper = css`
  color: #cecece;
`;
