import { css, Theme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { FlexBox } from '../../common/flex_box/FlexBox';

export const Header = () => {
  const { t } = useTranslation();
  const DAY_OF_WEEK_LABEL: string[] = [
    t('calendar.sunday'),
    t('calendar.monday'),
    t('calendar.tuesday'),
    t('calendar.wednesday'),
    t('calendar.thursday'),
    t('calendar.friday'),
    t('calendar.saturday'),
  ];
  return (
    <FlexBox direction="row" alignItems="flex-end" css={header}>
      {DAY_OF_WEEK_LABEL.map((elm) => (
        <div css={element}>{elm}</div>
      ))}
    </FlexBox>
  );
};

const header = css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const element = (theme: Theme) => css`
  width: calc(100% / 7);
  padding-bottom: 2px;
  font-size: ${theme.fontSizes.pt10};
  font-weight: ${theme.fontWeights.extraBold};
  color: ${theme.colors.black_400};
  border-bottom: 1.5px solid ${theme.colors.black_400};
  text-align: center;
`;
