import { css } from '@emotion/react';
import { ReactElement } from 'react';

interface Props {
  /** flexレイアウト内の子要素を指定します */
  children: ReactElement;
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
}

export const FlexBox = ({
  children,
  direction,
  wrap = 'no-wrap',
  justifyContent = 'normal',
  alignItems = 'normal',
  alignContent = 'normal',
}: Props) => <div css={flexBox({ direction, wrap, justifyContent, alignItems, alignContent })}>{children}</div>;

const flexBox = (styles: Omit<Props, 'children'>) => css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-direction: ${styles.direction};
  flex-wrap: ${styles.wrap};
  justify-content: ${styles.justifyContent};
  align-items: ${styles.alignItems};
  align-content: ${styles.alignContent};
`;
