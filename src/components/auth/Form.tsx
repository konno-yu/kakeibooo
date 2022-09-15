import { css, Theme, useTheme } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
import { HiMail, HiKey } from 'react-icons/hi';
import { ApiError } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/button/Button';
import { Input } from '../common/input/Input';
import ImagePath from '../../images/white_icon.svg';
import { useAppDispatch } from '../../store';
import { signIn } from '../../reducer/authSlice';
import { FlexBox } from '../common/flex_box/FlexBox';

interface FormProps {
  error: ApiError | null | undefined;
}

export const Form = ({ error }: FormProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleOnChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleLogin = async () => {
    await dispatch(signIn({ email: address, password })).then((res) => {
      if (res.payload) {
        navigate('/home');
      }
    });
  };

  return (
    <FlexBox direction="column" alignItems="center" css={loginForm}>
      <FlexBox direction="column" justifyContent="center" alignItems="center" css={icon}>
        <FlexBox direction="column" justifyContent="center" alignItems="center" css={circle}>
          <img
            src={ImagePath}
            alt="icon_circle"
            css={css`
              width: 60%;
              height: 60%;
            `}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox direction="column" justifyContent="center" alignItems="center" css={title}>
        <span>{t('login.welcome_banner')}</span>
      </FlexBox>
      <FlexBox direction="column" justifyContent="space-evenly" alignItems="center" css={input}>
        <Input
          width={280}
          icon={<HiMail color={theme.colors.black_400} />}
          value={address}
          onChange={handleOnChangeAddress}
          placeholder={t('login.mail_address')}
        />
        <Input
          width={280}
          type="password"
          icon={<HiKey color={theme.colors.black_400} />}
          value={password}
          onChange={handleOnChangePassword}
          placeholder={t('login.password')}
        />
        <div css={message}>{error && <span>{t('login.login_failure')}</span>}</div>
      </FlexBox>
      <FlexBox direction="column" alignItems="center" justifyContent="space-evenly" css={btn}>
        <Button width="80%" variant="filled" color="normal" onClick={handleLogin} label={t('login.log_in')} />
      </FlexBox>
    </FlexBox>
  );
};

const loginForm = (theme: Theme) => css`
  height: 500px;
  width: 350px;
  border: 1px solid ${theme.colors.gray_200};
  border-radius: ${theme.units.px8};
  padding: ${theme.units.px16};
  background: ${theme.colors.white};
`;

const icon = css`
  height: 30%;
`;

const title = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: 10%;
  font-weight: ${theme.fontWeights.extraBold};
  font-size: ${theme.fontSizes.pt24};
  color: ${theme.colors.black_400};
`;

const input = css`
  height: 30%;
`;

const message = (theme: Theme) => css`
  height: 10%;
  width: 100%;
  font-size: ${theme.fontSizes.pt10};
  text-align: center;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary_400};
`;

const btn = css`
  height: 20%;
  width: 100%;
`;

const circle = (theme: Theme) => css`
  background: ${theme.colors.primary_400};
  width: 90px;
  height: 90px;
  border-radius: 100px;
`;
