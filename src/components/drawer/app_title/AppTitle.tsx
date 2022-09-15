import { css, Theme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import Logo from '../../../images/icon.svg';
import { FlexBox } from '../../common/flex_box/FlexBox';

export const AppTitle = () => {
  const { t } = useTranslation();
  return (
    <FlexBox direction="row" justifyContent="center" alignItems="center" gap={8} css={container}>
      <img src={Logo} width={30} alt="logo" />
      <div css={title}>{t('common.application_title')}</div>
    </FlexBox>
  );
};

const container = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const title = (theme: Theme) => css`
  color: ${theme.colors.black_400};
  font-weight: ${theme.fontWeights.extraBold};
  font-size: ${theme.fontSizes.pt12};
`;
