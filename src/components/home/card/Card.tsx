import { ReactNode } from 'react';
import { css } from '@emotion/react';

interface Props {
  icon: JSX.Element;
  title: string;
  color: string;
  children: ReactNode;
}
export const Card = ({ icon, title, color, children }: Props) => (
  <div css={card}>
    <div css={header}>
      <div css={iconPart(color)}>{icon}</div>
      <div css={titlePart(color)}>{title}</div>
    </div>
    <div css={body}>{children}</div>
  </div>
);

const card = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: 100%;
  height: 200px;
  background: #ffffff;
  border-radius: 8px;
  padding: 12px;
  border: 2px solid #eceff1;
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const header = css`
  height: 20%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const iconPart = (color: string) => css`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${color};
`;

const titlePart = (color: string) => css`
  font-weight: 800;
  font-size: 22px;
  color: ${color};
`;

const body = css`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: space-around;
`;
