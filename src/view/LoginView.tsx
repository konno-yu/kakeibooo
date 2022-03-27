import { css } from '@emotion/react';
import { Form } from '../components/auth/Form';

export const LoginView = () => (
  <div css={loginContainer}>
    <Form />
  </div>
);

const loginContainer = css`
  height: calc(100vh - 24px);
  width: calc(100% - 24px);
  padding: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(to top, #80cbc4, #8dd0ca, #9ad5d0, #a6dad5, #b2dfdb);
`;