import { css, Theme } from '@emotion/react';
import { Form } from '../components/auth/Form';
import { useAppSelector } from '../store';

export const LoginView = () => {
  const error = useAppSelector((state) => state.auth.error);
  return (
    <div css={loginContainer}>
      <Form error={error} />
    </div>
  );
};
const loginContainer = (theme: Theme) => css`
  height: calc(100vh - 24px);
  width: calc(100% - 24px);
  padding: ${theme.units.px12};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(to top, ${theme.colors.primary}, ${theme.colors.palePrimary});
`;
