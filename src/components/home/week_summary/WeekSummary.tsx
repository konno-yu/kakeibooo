import { css, Theme, useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { IoCloudyOutline, IoPartlySunnyOutline, IoSunnyOutline, IoUmbrellaOutline } from 'react-icons/io5';

interface Props {
  /** 1週間における日ごとの食費を指定します */
  dailyCost: [number, number, number, number, number, number, number];
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
  const getIcon = (cost: number): JSX.Element => {
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
    <div css={container(theme)}>
      {DAY_OF_WEEK_LABEL.map((label, index) => (
        <div css={dayStyle(theme)}>
          <div>
            <span css={labelStyle(theme)}>{label}</span>
          </div>
          {getIcon(dailyCost[index])}
        </div>
      ))}
    </div>
  );
};

const container = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: ${theme.colors.white};
  border-radius: ${theme.units.px4};
  padding: ${theme.units.px8};
  border: 1px solid ${theme.colors.gray_200};
`;

const dayStyle = (theme: Theme) => css`
  width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  gap: ${theme.units.px8};
`;

const labelStyle = (theme: Theme) => css`
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.pt10};
  color: ${theme.colors.black_300};
`;
