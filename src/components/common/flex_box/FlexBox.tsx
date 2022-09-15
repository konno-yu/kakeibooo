import { css, SerializedStyles } from '@emotion/react';
import { ReactElement } from 'react';

interface Props {
  /** flexレイアウト内の子要素を指定します */
  children: ReactElement | ReactElement[];
  /** @link https://developer.mozilla.org/ja/docs/Web/CSS/direction */
  direction: 'row' | 'column';
  /** @link https://developer.mozilla.org/ja/docs/Web/CSS/flex-wrap */
  wrap?: 'wrap' | 'no-wrap';
  /** @link https://developer.mozilla.org/ja/docs/Web/CSS/justify-content */
  justifyContent?: 'normal' | 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  /** @link https://developer.mozilla.org/ja/docs/Web/CSS/align-items */
  alignItems?: 'normal' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** @link https://developer.mozilla.org/ja/docs/Web/CSS/align-content */
  alignContent?: 'normal' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  /** @link https://developer.mozilla.org/ja/docs/Web/CSS/gap */
  gap?: number | [number, number];
}

export const FlexBox = ({
  children,
  direction,
  wrap = 'no-wrap',
  justifyContent = 'normal',
  alignItems = 'normal',
  alignContent = 'normal',
  gap = 0,
  ...props
}: Props) => (
  <div css={[flexBox({ direction, wrap, justifyContent, alignItems, alignContent }), calcGap(gap)]} {...props}>
    {children}
  </div>
);

const flexBox = (styles: Omit<Props, 'children'>) => css`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  flex-direction: ${styles.direction};
  flex-wrap: ${styles.wrap};
  justify-content: ${styles.justifyContent};
  align-items: ${styles.alignItems};
  align-content: ${styles.alignContent};
  gap: ${styles.gap};
`;

// TODO 型が当たらない...
const calcGap = (gap: number | [number, number]): SerializedStyles => {
  if (typeof gap === 'number')
    return css`
      gap: ${gap}px;
    `;
  if (Array.isArray(gap) && gap.length === 2) {
    return css`
      gap: ${gap[0]}px ${gap[1]}px;
    `;
  }
  return css``;
};
