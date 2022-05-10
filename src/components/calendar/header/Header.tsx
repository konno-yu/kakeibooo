import { css } from '@emotion/react';

const DAY_OF_WEEK_LABEL: { [key in 'ja' | 'en']: string[] } = {
  ja: ['日', '月', '火', '水', '木', '金', '土'],
  en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
};

interface Props {
  /**
   * 表示言語を指定します。 <br/>
   * 省略した場合は「日本語」になります。
   */
  locale?: 'ja' | 'en';
}
export const Header = ({ locale = 'ja' }: Props) => (
  <div css={header}>
    {DAY_OF_WEEK_LABEL[locale].map((elm) => (
      <div css={element}>{elm}</div>
    ))}
  </div>
);

const header = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  display: flex;
  align-items: flex-end;
`;

const element = css`
  width: calc(100% / 7);
  padding-bottom: 2px;
  font-size: 14px;
  font-weight: 800;
  color: #546e7a;
  border-bottom: 1.5px solid #546e7a;
  text-align: center;
`;
