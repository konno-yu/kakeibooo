import { css } from '@emotion/react';
import IconPath from '../../../images/avatar.svg';

interface Props {
  iconOnly?: boolean;
  username: string;
  userId: string;
}

export const Account = ({ iconOnly = false, username, userId }: Props) => (
  <div css={container}>
    <img css={image} src={IconPath} alt="account" />
    {iconOnly === false && (
      <>
        <div css={usernameText}>{username}</div>
        <div css={userIdText}>@{userId}</div>
      </>
    )}
  </div>
);

const container = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const image = css`
  height: 70px;
  width: 70px;
  border: 3px solid #cfd8dc;
  border-radius: 100px;
`;

const usernameText = css`
  font-size: 16px;
  margin-top: 4px;
  font-weight: 600;
  color: #546e7a;
`;

const userIdText = css`
  font-size: 14px;
  font-weight: 600;
  color: #90a4ae;
`;
