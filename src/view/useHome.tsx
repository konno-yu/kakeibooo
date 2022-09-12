import { compareAsc, getDate, getWeek, lastDayOfMonth } from 'date-fns';
import { useMemo } from 'react';
import { Expenses } from '../reducer/householdBookSlice';
// TODO フックというよりかはロジックかもしれない
export const useHome = (expenses: Expenses, today: Date) => {
  const expWithoutNull = useMemo(() => Object.values(expenses).flat().filter(Boolean), [expenses]);
  /** 1日にレシートが複数枚登録されている場合にそれらを合算した食費一覧 */
  const expWithCombineReceipt = useMemo(
    () =>
      expWithoutNull.map((exp) => {
        if (exp.receipts === null) return { date: exp.date, total: null };
        if (exp.receipts.length === 0) return { date: exp.date, total: 0 };
        const total = exp.receipts.map((r) => r.cost).reduce((p, c) => p + c, 0);
        return { date: exp.date, total };
      }),
    [expWithoutNull]
  );
  /** 閲覧日時点までの食費一覧 */
  const expUntilToday = useMemo(
    () => expWithCombineReceipt.filter((exp) => compareAsc(exp.date, today) < 1),
    [expWithCombineReceipt, today]
  );
  /** 閲覧日時点までの合計食費 */
  const totalUntilToday = useMemo(() => expUntilToday.map((t) => t.total).reduce((p, c) => p + c, 0), [expUntilToday]);
  // 食費を登録した日数
  const registeredDayCount = useMemo(
    () => expWithoutNull.filter((exp) => exp.receipts !== null).length,
    [expWithoutNull]
  );
  /** 閲覧日が含まれる週の合計食費 */
  const weekTotal = useMemo(
    () => expWithCombineReceipt.filter((exp) => getWeek(exp.date) === getWeek(today)).map((val) => val.total),
    [expWithCombineReceipt, today]
  );
  /** 1日当たりの食費 */
  const expPerDay = useMemo(() => totalUntilToday / expUntilToday.length, [totalUntilToday, expUntilToday]);
  /** 残金 */
  const remaining = useMemo(() => 40000 - totalUntilToday, [totalUntilToday]);
  /** 残金から計算した1日当たりに使える食費 */
  const remainingPerDay = useMemo(
    () => remaining / (lastDayOfMonth(today).getDate() - getDate(today)),
    [remaining, today]
  );
  /** 食費の入力率 */
  const registerProgress = useMemo(
    () => (registeredDayCount / lastDayOfMonth(today).getDate()) * 100,
    [registeredDayCount, today]
  );
  return {
    expWithCombineReceipt,
    expUntilToday,
    registeredDayCount,
    totalUntilToday,
    weekTotal,
    expPerDay,
    remaining,
    remainingPerDay,
    registerProgress,
  };
};
