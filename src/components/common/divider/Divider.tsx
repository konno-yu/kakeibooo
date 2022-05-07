import { css } from '@emotion/react';

interface Props {
  type: 'solid' | 'dashed' | 'double' | 'dotted';
  width: number;
  color: string;
}
export const Divider = ({ type = 'solid', width = 1, color = '#BDBDBD' }: Props) => (
  <div css={divider(width, type, color)} />
);

const divider = (width: number, type: string, color: string) => css`
  border-top: ${width}px ${type} ${color};
`;
