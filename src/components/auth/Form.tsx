import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
import { HiMail, HiKey } from 'react-icons/hi';
import { Button } from '../common/button/Button';
import { Input } from '../common/input/Input';
import ImagePath from '../../images/white_icon.svg';

export const Form = () => {
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <div css={loginForm}>
      <div css={icon}>
        <div css={circle}>
          <img
            src={ImagePath}
            alt="icon_circle"
            css={css`
              width: 60%;
              height: 60%;
            `}
          />
        </div>
      </div>
      <div css={title}>Welcome Back!</div>
      <div css={input}>
        <Input
          width={250}
          icon={<HiMail color="#546e7a" />}
          value={address}
          onChange={handleOnChangeAddress}
          placeholder="メールアドレス"
        />
        <Input
          width={250}
          type="password"
          icon={<HiKey color="#546e7a" />}
          value={password}
          onChange={handleOnChangePassword}
          placeholder="パスワード"
        />
      </div>
      <div css={btn}>
        <Button width="80%" variant="filled" color="normal" onClick={() => alert('')} label="Log In" />
      </div>
    </div>
  );
};

const loginForm = css`
  height: 500px;
  width: 350px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
`;

const icon = css`
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const title = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: 10%;
  font-weight: 800;
  font-size: 24pt;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333333;
`;

const input = css`
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const btn = css`
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const circle = css`
  background: #80cbc4;
  width: 90px;
  height: 90px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;