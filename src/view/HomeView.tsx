import { css, Theme, useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { BsCalendarWeekFill } from 'react-icons/bs';
import { useEffect, useMemo, useState } from 'react';
import { lastDayOfMonth } from 'date-fns';
import { IoReceipt, IoWallet } from 'react-icons/io5';
import { SimpleIndicator } from '../components/common/simple_indicator/SimpleIndicator';
import { Drawer } from '../components/drawer/Drawer';
import { Achievement } from '../components/home/achievement/Achievement';
import { getAchievements } from '../components/home/achievement/AchievementUtils';
import { Card } from '../components/home/card/Card';
import { MonthlyChart } from '../components/home/monthly_chart/MonthlyChart';
import { WeekSummary } from '../components/home/week_summary/WeekSummary';
import { fetchMonthlyExpenses } from '../reducer/householdBookSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { drawer } from './HouseholdBookView';
import { useHome } from './useHome';
import { FlexBox } from '../components/common/flex_box/FlexBox';

export const HomeView = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const expenses = useAppSelector((state) => state.householdBook.expenses);
  const today = useMemo(() => new Date(), []);
  const {
    expWithCombineReceipt,
    totalUntilToday,
    registeredDayCount,
    weekTotal,
    expPerDay,
    remaining,
    remainingPerDay,
    registerProgress,
  } = useHome(expenses, today);
  const [achievements, setAchievements] = useState(getAchievements(today, expWithCombineReceipt));

  // グラフで食費を扱うための値
  const datesets: Array<{ label: string; value: number | null }> = expWithCombineReceipt.map((h) => ({
    label: h.date.getDate().toLocaleString(),
    value: h.total,
  }));

  useEffect(() => {
    setAchievements(getAchievements(today, expWithCombineReceipt));
  }, [today, expWithCombineReceipt]);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchMonthlyExpenses());
    };
    void fetch();
  }, [dispatch]);

  return (
    <>
      <div css={drawer}>
        <Drawer />
      </div>
      <FlexBox direction="row" justifyContent="space-between" gap={8} css={homeContainer(theme)}>
        <FlexBox direction="column" alignItems="center" gap={8} css={summaryPart}>
          <div style={{ width: '100%' }}>
            <WeekSummary dailyCost={weekTotal} />
          </div>
          <FlexBox direction="row" gap={8} css={cardContainer}>
            <FlexBox direction="row" justifyContent="space-evenly" css={card}>
              <Card title={t('home.expenses_this_month')} icon={<IoWallet />} color="primary">
                <FlexBox direction="column" alignItems="center" gap={16}>
                  <FlexBox direction="column" alignItems="center">
                    <span css={cardText(theme)}>{t('common.yen', { money: totalUntilToday.toLocaleString() })}</span>
                    <span css={cardSubText(theme)}>{t('home.per_day', { value: expPerDay.toLocaleString() })}</span>
                  </FlexBox>
                  <SimpleIndicator range={[0, 40000]} value={totalUntilToday} color="primary" />
                </FlexBox>
              </Card>
            </FlexBox>
            <FlexBox direction="row" justifyContent="space-evenly" css={card}>
              <Card title={t('home.balance_this_month')} icon={<BsCalendarWeekFill />} color="primary">
                <FlexBox direction="column" alignItems="center" gap={16}>
                  <FlexBox direction="column" alignItems="center">
                    <span css={cardText(theme)}>{t('common.yen', { money: remaining.toLocaleString() })}</span>
                    <span css={cardSubText(theme)}>
                      {t('home.per_day', {
                        value: remainingPerDay.toLocaleString(),
                      })}
                    </span>
                  </FlexBox>
                  <SimpleIndicator range={[0, 40000]} value={40000 - totalUntilToday} color="primary" />
                </FlexBox>
              </Card>
            </FlexBox>
            <FlexBox direction="row" justifyContent="space-evenly" css={card}>
              <Card title={t('home.registered_this_month')} icon={<IoReceipt />} color="secondary">
                <FlexBox direction="column" alignItems="center" gap={16}>
                  <FlexBox direction="column" alignItems="center">
                    <span css={cardText(theme)}>{t('common.days', { count: registeredDayCount })}</span>
                    <span css={cardSubText(theme)}>
                      {t('home.register_progress', { percentage: registerProgress.toFixed(0) })}
                    </span>
                  </FlexBox>
                  <SimpleIndicator
                    range={[0, lastDayOfMonth(today).getDate()]}
                    value={registeredDayCount}
                    color="secondary"
                  />
                </FlexBox>
              </Card>
            </FlexBox>
          </FlexBox>
          <FlexBox direction="column" css={graphPart}>
            <MonthlyChart budget={40000} datasets={datesets} />
          </FlexBox>
        </FlexBox>
        <div style={{ width: '25%' }}>
          <Achievement rewards={achievements} />
        </div>
      </FlexBox>
    </>
  );
};

// TODO 全タブ共通化
const homeContainer = (theme: Theme) => css`
  background: ${theme.colors.gray_100};
  height: calc(100vh - 24px);
  width: calc(85% - 24px);
  padding: ${theme.units.px12};
`;

const summaryPart = css`
  width: 75%;
  height: 100%;
  background: 'red';
`;

const cardContainer = css`
  width: 100%;
`;

const card = css`
  width: calc(100% / 3);
`;

const cardText = (theme: Theme) => css`
  font-weight: ${theme.fontWeights.extraBold};
  font-size: ${theme.fontSizes.pt24};
  color: ${theme.colors.black_300};
`;

const cardSubText = (theme: Theme) => css`
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.pt12};
  color: ${theme.colors.black_100};
`;

const graphPart = css`
  width: 100%;
  height: 100%;
`;
