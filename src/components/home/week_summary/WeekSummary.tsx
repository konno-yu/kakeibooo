import { css } from '@emotion/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GiPayMoney } from 'react-icons/gi';

export const WeekSummary = () => (
  <div css={card}>
    <div css={header}>
      <div css={headerTitle}>
        <AiOutlineCheckCircle />
        Kakeibooo
      </div>
      <GiPayMoney size={28} />
    </div>
    <div css={body}>
      <span css={bodyLabel}>
        <u>PAY THIS WEEK</u>（SHIHARAI）
      </span>
      <div css={bodyValueText}>￥10,000</div>
      <span css={bodyLabel}>
        <u>DURATION</u>
      </span>
      <span>2021/11/11 - 2021/11/18</span>
    </div>
  </div>
);

const card = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  border: 2px solid #eceff1;
  border-radius: 8px;
  background: #333333;
  width: 100%;
  font-weight: 700;
  padding: 12px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const header = css`
  display: flex;
  font-size: 24px;
  justify-content: space-between;
  align-items: center;
`;

const headerTitle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const body = css`
  display: flex;
  flex-direction: column;
`;

const bodyLabel = css`
  color: #e0e0e0;
`;

const bodyValueText = css`
  font-size: 28px; // TODO Typographyで吸収したい
`;
