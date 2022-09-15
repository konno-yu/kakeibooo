import { css, Theme } from '@emotion/react';
import { Form } from '../components/auth/Form';
import { FlexBox } from '../components/common/flex_box/FlexBox';
import { useAppSelector } from '../store';

export const LoginView = () => {
  const error = useAppSelector((state) => state.auth.error);
  return (
    <FlexBox direction="column" justifyContent="center" alignItems="center" css={loginContainer}>
      <Form error={error} />
    </FlexBox>
  );
};
const loginContainer = (theme: Theme) => css`
  height: calc(100vh - 24px);
  width: calc(100% - 24px);
  padding: ${theme.units.px12};
  background-image: linear-gradient(
    to top,
    ${theme.colors.primary_400},
    ${theme.colors.primary_300},
    ${theme.colors.primary_200},
    ${theme.colors.primary_100}
  );
`;
