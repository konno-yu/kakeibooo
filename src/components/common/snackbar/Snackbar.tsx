import { css, Theme, useTheme } from '@emotion/react';
import ReactDOM from 'react-dom';
import { RiEmotionSadFill, RiEmotionFill } from 'react-icons/ri';
import { FlexBox } from '../flex_box/FlexBox';

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

export const Snackbar = ({ open, type, text, subText }: SnackbarProps) => {
  const theme = useTheme();
  const COLOR_SET: { [key in 'success' | 'error']: string } = {
    success: theme.colors.black_400,
    error: theme.colors.primary_400,
  };
  return ReactDOM.createPortal(
    <FlexBox direction="row" alignItems="center" gap={8} css={open ? snackbarBase(COLOR_SET[type], theme) : none}>
      {type === 'error' && <RiEmotionSadFill color={theme.colors.white} size={24} />}
      {type === 'success' && <RiEmotionFill color={theme.colors.white} size={24} />}
      <FlexBox direction="column">
        <span css={textStyle}>{text}</span>
        <span css={subTextStyle}>{subText}</span>
      </FlexBox>
    </FlexBox>,
    document.getElementById('root')
  );
};

const snackbarBase = (color: string, theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: 280px;
  height: 45px;
  background: ${color};
  padding: ${theme.units.px0} ${theme.units.px8};
  border-radius: ${theme.units.px4};
  position: absolute;
  box-shadow: 3px 3px 3px #9e9e9e;
  bottom: ${theme.units.px8};
  right: ${theme.units.px16};
  animation: fadein 1s forwards;
  @keyframes fadein {
    0% {
      transform: translateY(300px);
    }

    100% {
      transform: translateY(0px);
    }
  }
`;

const none = css`
  display: none;
`;

const textStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.pt12};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.white};
`;

const subTextStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.pt08};
  color: ${theme.colors.white};
`;
