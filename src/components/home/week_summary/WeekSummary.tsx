import { css, Theme, useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { HiOutlineMinus } from 'react-icons/hi';
import { IoCloudyOutline, IoPartlySunnyOutline, IoSunnyOutline, IoUmbrellaOutline } from 'react-icons/io5';
import { FlexBox } from '../../common/flex_box/FlexBox';

interface Props {
  /** 1週間における日ごとの食費を指定します */
  dailyCost: (number | null)[];
}

export const WeekSummary = ({ dailyCost }: Props) => {
  const theme = useTheme();
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

  // TODO 食費がかかったかの判定ロジックはUtility的に切り出すべき
  const getIcon = (cost: number | null): JSX.Element => {
    if (cost === null) {
      return <HiOutlineMinus size={28} color={theme.colors.gray_300} />;
    }
    if (cost === 0) {
      // TODO ゴールド直置きはよくない
      return <IoSunnyOutline size={28} color="gold" />;
    }
    if (cost <= 1000) {
      return <IoPartlySunnyOutline size={28} color={theme.colors.secondary_400} />;
    }
    if (cost <= 2500) {
      return <IoCloudyOutline size={28} color={theme.colors.gray_300} />;
    }
    return <IoUmbrellaOutline size={28} color={theme.colors.primary_400} />;
  };

  return (
    <FlexBox direction="row" justifyContent="center" css={container(theme)}>
      {DAY_OF_WEEK_LABEL.map((label, index) => (
        <FlexBox direction="column" justifyContent="space-evenly" alignItems="center" gap={8} css={dayStyle}>
          <div>
            <span css={labelStyle(theme)}>{label}</span>
          </div>
          {getIcon(dailyCost[index])}
        </FlexBox>
      ))}
    </FlexBox>
  );
};

const container = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  background: ${theme.colors.white};
  border-radius: ${theme.units.px8};
  padding: ${theme.units.px8};
  border: 1px solid ${theme.colors.gray_100};
`;

const dayStyle = css`
  width: calc(100% / 7);
`;

const labelStyle = (theme: Theme) => css`
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.pt10};
  color: ${theme.colors.black_300};
`;
