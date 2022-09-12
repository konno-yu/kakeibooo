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
      <div css={homeContainer(theme)}>
        <div css={summaryPart(theme)}>
          <div style={{ width: '100%' }}>
            <WeekSummary dailyCost={weekTotal} />
          </div>
          <div css={cardContainer(theme)}>
            <div css={card}>
              <Card title={t('home.expenses_this_month')} icon={<IoWallet />} color="primary">
                <div css={cardBodyContainer(theme)}>
                  <div css={cardBody}>
                    <span css={cardText(theme)}>{t('common.yen', { money: totalUntilToday.toLocaleString() })}</span>
                    <span css={cardSubText(theme)}>{t('home.per_day', { value: expPerDay.toLocaleString() })}</span>
                  </div>
                  <SimpleIndicator range={[0, 40000]} value={totalUntilToday} color="primary" />
                </div>
              </Card>
            </div>
            <div css={card}>
              <Card title={t('home.balance_this_month')} icon={<BsCalendarWeekFill />} color="primary">
                <div css={cardBodyContainer(theme)}>
                  <div css={cardBody}>
                    <span css={cardText(theme)}>{t('common.yen', { money: remaining.toLocaleString() })}</span>
                    <span css={cardSubText(theme)}>
                      {t('home.per_day', {
                        value: remainingPerDay.toLocaleString(),
                      })}
                    </span>
                  </div>
                  <SimpleIndicator range={[0, 40000]} value={40000 - totalUntilToday} color="primary" />
                </div>
              </Card>
            </div>
            <div css={card}>
              <Card title={t('home.registered_this_month')} icon={<IoReceipt />} color="secondary">
                <div css={cardBodyContainer(theme)}>
                  <div css={cardBody}>
                    <span css={cardText(theme)}>{t('common.days', { count: registeredDayCount })}</span>
                    <span css={cardSubText(theme)}>
                      {t('home.register_progress', { percentage: registerProgress.toFixed(0) })}
                    </span>
                  </div>
                  <SimpleIndicator
                    range={[0, lastDayOfMonth(today).getDate()]}
                    value={registeredDayCount}
                    color="secondary"
                  />
                </div>
              </Card>
            </div>
          </div>
          <div css={graphPart}>
            <MonthlyChart budget={40000} datasets={datesets} />
          </div>
        </div>
        <div style={{ width: '25%' }}>
          <Achievement rewards={achievements} />
        </div>
      </div>
    </>
  );
};

// TODO 全タブ共通化
const homeContainer = (theme: Theme) => css`
  background: ${theme.colors.gray_100};
  height: calc(100vh - 24px);
  width: calc(85% - 24px);
  padding: ${theme.units.px12};
  display: flex;
  justify-content: space-between;
  gap: ${theme.units.px8};
`;

const summaryPart = (theme: Theme) => css`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.units.px8};
  background: 'red';
`;

const cardContainer = (theme: Theme) => css`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${theme.units.px8};
`;

const card = css`
  display: flex;
  width: calc(100% / 3);
  justify-content: space-evenly;
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

const cardBodyContainer = (theme: Theme) => css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${theme.units.px16};
`;

const cardBody = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const graphPart = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
