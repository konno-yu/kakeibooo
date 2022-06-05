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
  border: 3px solid ${theme.colors.paleGray};
  border-radius: 100px;
`;

const usernameText = (theme: Theme) => css`
  font-size: ${theme.fontSizes.pt12};
  margin-top: ${theme.units.px4};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.colors.font};
`;

const userIdText = (theme: Theme) => css`
  font-size: ${theme.fontSizes.pt10};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.colors.vividGray};
`;
