import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDate, getDay, getMonth, getWeekOfMonth, getYear, isEqual } from 'date-fns';
import { SnackbarProps } from '../common/snackbar/Snackbar';
import { Receipt } from '../../reducer/householdBookSlice';
import { useAppSelector } from '../../store';

export const useReceipt = (receipts: Receipt[] | [] | null): UseReceiptReturnType => {
  // const expenses = useAppSelector((state) => state.householdBook.expenses);
  // const targetDate = useAppSelector((state) => state.householdBook.targetDate);
  const { t } = useTranslation();
  const [dailyReceipt, setDailyReceipt] = useState<Receipt[] | [] | null>(receipts);
  const [snackbarStatus, setSnackbarStatus] = useState<SnackbarProps>({
    open: false,
    type: 'success',
    text: '',
  });

  const onReceiptAdd = useCallback(() => {
    setDailyReceipt((prev) => [...prev, { index: dailyReceipt.length, storeName: '', cost: 100 }]);
  }, [dailyReceipt]);

  const onChangeStoreName = useCallback(
    (index: number, storeName: string) => {
      setDailyReceipt(dailyReceipt.map((r) => (r.index === index ? { ...r, storeName } : r)));
    },
    [dailyReceipt]
  );

  const onChangeCost = useCallback(
    (index: number, cost: number) => {
      setDailyReceipt(dailyReceipt.map((r) => (r.index === index ? { ...r, cost } : r)));
    },
    [dailyReceipt]
  );

  const onReceiptDelete = useCallback(
    (ordinary: number) => {
      const remainReceipts = (dailyReceipt as Receipt[]).filter((r) => r.index !== ordinary);
      setDailyReceipt(remainReceipts.map((receipt, index) => ({ ...receipt, index })));
    },
    [dailyReceipt]
  );

  const showSnackbar = useCallback((status: SnackbarProps) => {
    setSnackbarStatus({ ...status });
    setTimeout(() => setSnackbarStatus((current) => ({ ...current, open: false })), 2000);
  }, []);

  /**
   * 選択中の日付における合計金額を計算する
   * @returns 合計金額に￥マークをつけつつカンマ区切りにして返す
   */
  const calcSummartion = () => {
    if (dailyReceipt) {
      const total = dailyReceipt?.length === 0 ? 0 : dailyReceipt?.map((r) => r.cost).reduce((p, c) => p + c, 0);
      return `¥${total.toLocaleString()}`;
    }
    return '¥0';
  };

  /** レシートを追加できる条件 = レシートが4枚以下 */
  const canAddReceipt = dailyReceipt && dailyReceipt.length < 4;
  /** レシートをDBに登録できる条件 = レシートが1枚以上 */
  const canRegistReceipt = dailyReceipt && dailyReceipt.length >= 1;
  /** ノーマネーデーで登録できる条件 = レシートが0枚 */
  const canRegistNoMoney = dailyReceipt && dailyReceipt.length === 0;
  // const isPost = expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts === null;

  // const formattedDate = {
  //   year: getYear(targetDate).toString(),
  //   month: (getMonth(targetDate) + 1).toString().padStart(2, '0'),
  //   day: getDate(targetDate).toString().padStart(2, '0'),
  // };

  /**
   * レシートをDBに登録する前の入力バリデーションを行う
   * @returns バリデーションの成否
   */
  const validate = () => {
    const text = t('calendar.registration_imcomplete');
    if (dailyReceipt?.filter((r) => r.cost === null).length > 0) {
      return {
        isOk: false,
        text,
        subText: t('calendar.expense_is_not_entered'),
      };
    }
    if (dailyReceipt?.filter((r) => r.storeName === '').length > 0) {
      return {
        isOk: false,
        text,
        subText: t('calendar.store_name_is_not_entered'),
      };
    }
    if (dailyReceipt.filter((receipt) => Number.isNaN(receipt.cost)).length > 0) {
      return {
        isOk: false,
        text,
        subText: t('calendar.expense_is_not_number'),
      };
    }
    const storeNames = dailyReceipt?.map((receipt) => receipt.storeName);
    if ([...new Set(storeNames)].length !== storeNames.length) {
      return {
        isOk: false,
        text,
        subText: t('calendar.exists_duplicate_receipts'),
      };
    }
    return { isOk: true };
  };

  return {
    dailyReceipt,
    setDailyReceipt,
    snackbarStatus,
    calcSummartion,
    onReceiptAdd,
    onChangeStoreName,
    onChangeCost,
    onReceiptDelete,
    showSnackbar,
    canAddReceipt,
    canRegistReceipt,
    canRegistNoMoney,
    validate,
    // formattedDate,
    // isPost,
  };
};

export type UseReceiptReturnType = {
  dailyReceipt: Receipt[] | [];
  setDailyReceipt: Dispatch<SetStateAction<Receipt[] | []>>;
  snackbarStatus: SnackbarProps;
  calcSummartion: () => string;
  onReceiptAdd: () => void;
  onChangeStoreName: (index: number, storeName: string) => void;
  onChangeCost: (index: number, cost: number) => void;
  onReceiptDelete: (ordinary: number) => void;
  showSnackbar: (status: SnackbarProps) => void;
  canAddReceipt: boolean;
  canRegistReceipt: boolean;
  canRegistNoMoney: boolean;
  validate: () => { isOk: boolean; text: string; subText: string } | { isOk: boolean; text?: string; subText?: string };
  // formattedDate: { year: string; month: string; day: string };
  // isPost: boolean;
};
