import { css, Theme } from '@emotion/react';
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

const image = (theme: Theme) => css`
  height: 70px;
  width: 70px;
  border: 3px solid ${theme.colors.pGray};
  border-radius: 100px;
`;

const usernameText = (theme: Theme) => css`
  font-size: 16px;
  margin-top: 4px;
  font-weight: 600;
  color: ${theme.colors.font};
`;

const userIdText = (theme: Theme) => css`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.vGray};
`;
