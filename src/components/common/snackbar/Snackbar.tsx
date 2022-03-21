import { css } from '@emotion/react';
import ReactDOM from 'react-dom';
import { RiEmotionSadFill, RiEmotionFill } from 'react-icons/ri';

export interface SnackbarProps {
  /**
   * `Snackbar`の表示状態を指定します
   */
  open: boolean;
  /**
   * `Snackbar`の種別を指定します
   */
  type: 'success' | 'error';
  /**
   * 表示する文字列を指定します
   */
  text: string;
  /**
   * `text`の内容を補足するような文字列を指定します
   */
  subText?: string;
}

const COLOR_SET: { [key in 'success' | 'error']: string } = {
  success: '#80cbc4',
  error: '#EF9A9A',
};

export const Snackbar = ({ open, type, text, subText }: SnackbarProps) =>
  ReactDOM.createPortal(
    <div css={open ? snackbarBase(COLOR_SET[type]) : none}>
      {type === 'error' && <RiEmotionSadFill color="#FFFFFF" size={24} />}
      {type === 'success' && <RiEmotionFill color="#FFFFFF" size={24} />}
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <span css={textStyle}>{text}</span>
        <span css={subTextStyle}>{subText}</span>
      </div>
    </div>,
    document.getElementById('root')
  );

const snackbarBase = (color: string) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: 280px;
  height: 45px;
  background: ${color};
  padding: 0 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  position: absolute;
  box-shadow: 3px 3px 3px #9e9e9e;
  top: 8px;
  right: 16px;
  animation: fadein 1s forwards;
  @keyframes fadein {
    0% {
      transform: translateX(300px);
    }

    100% {
      transform: translateX(0px);
    }
  }
`;

const none = css`
  display: none;
`;

const textStyle = css`
  font-size: 11pt;
  font-weight: 700;
  color: #ffffff;
`;

const subTextStyle = css`
  font-size: 9pt;
  color: #ffffff;
`;