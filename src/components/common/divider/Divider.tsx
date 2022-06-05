import { css, useTheme } from '@emotion/react';

interface Props {
  /** 仕切り線の種類を指定します */
  type: 'solid' | 'dashed' | 'double' | 'dotted';
  /** 仕切り線の太さを指定します */
  width: number;
  /** 仕切り線の色を指定します */
  color: string;
}

export const Divider = ({ type = 'solid', width = 1, color }: Props) => {
  const theme = useTheme();
  if (!color) {
    // eslint-disable-next-line no-param-reassign -- TODO あとでちゃんと書く
    color = theme.colors.vividGray;
  }
  return <div css={divider(width, type, color)} />;
};

const divider = (width: number, type: string, color: string) => css`
  border-top: ${width}px ${type} ${color};
`;
