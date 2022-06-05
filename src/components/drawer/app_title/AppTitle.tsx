import { css, Theme } from '@emotion/react';
import Logo from '../../../images/icon.svg';

export const AppTitle = () => (
  <div css={container}>
    <img src={Logo} width={30} alt="logo" />
    <div css={title}>Kakeibooo</div>
  </div>
);

const container = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const title = (theme: Theme) => css`
  color: ${theme.colors.font};
  font-weight: ${theme.fontWeights.extraBold};
  font-size: ${theme.fontSizes.pt12};
`;
