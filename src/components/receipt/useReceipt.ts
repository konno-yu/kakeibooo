import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Receipt } from '../../reducer/householdBookSlice';

export const useReceipt = (initReceipts: Receipt[] | [] | null): UseReceiptReturnType => {
  const { t } = useTranslation();
  const [dailyReceipt, setDailyReceipt] = useState<Receipt[] | [] | null>(initReceipts);

  useEffect(() => {
    // useStateの初期値にpropsを指定しても初回描画時しか効かないのでuseEffectで変更させる
    setDailyReceipt(initReceipts);
  }, [initReceipts, setDailyReceipt]);

  const onReceiptAdd = useCallback(() => {
    setDailyReceipt((prev) =>
      prev === null
        ? [{ index: 0, storeName: '', cost: 0 }]
        : [...prev, { index: dailyReceipt.length, storeName: '', cost: 0 }]
    );
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

  /** レシートを追加できない条件 = レシートが4枚ある */
  const cannotAddReceipt = dailyReceipt && dailyReceipt.length === 4;
  /** レシートをDBに登録できない条件 = レシートが0枚ある */
  const cannotRegistReceipt = dailyReceipt === null || dailyReceipt?.length === 0;
  /** ノーマネーデーで登録できない条件 = レシートが存在する */
  const cannotRegistNoMoney = dailyReceipt && dailyReceipt.length > 0;

  /**
   * レシートをDBに登録する前の入力バリデーションを行う
   * @returns バリデーションの成否
   */
  const validate = () => {
    const invalidTemplate = {
      isOk: false,
      text: t('calendar.registration_imcomplete'),
    };
    if (dailyReceipt?.filter((r) => r.cost === null).length > 0) {
      return { ...invalidTemplate, subText: t('calendar.expense_is_not_entered') };
    }
    if (dailyReceipt?.filter((r) => r.storeName === '').length > 0) {
      return { ...invalidTemplate, subText: t('calendar.store_name_is_not_entered') };
    }
    if (dailyReceipt.filter((receipt) => Number.isNaN(receipt.cost)).length > 0) {
      return { ...invalidTemplate, subText: t('calendar.expense_is_not_number') };
    }
    const storeNames = dailyReceipt?.map((receipt) => receipt.storeName);
    if ([...new Set(storeNames)].length !== storeNames.length) {
      return { ...invalidTemplate, subText: t('calendar.exists_duplicate_receipts') };
    }
    return { isOk: true, text: t('calendar.registration_complete'), subText: '' };
  };

  return {
    dailyReceipt,
    calcSummartion,
    onReceiptAdd,
    onChangeStoreName,
    onChangeCost,
    onReceiptDelete,
    cannotAddReceipt,
    cannotRegistReceipt,
    cannotRegistNoMoney,
    validate,
  };
};

export type UseReceiptReturnType = {
  dailyReceipt: Receipt[] | [];
  calcSummartion: () => string;
  onReceiptAdd: () => void;
  onChangeStoreName: (index: number, storeName: string) => void;
  onChangeCost: (index: number, cost: number) => void;
  onReceiptDelete: (ordinary: number) => void;
  cannotAddReceipt: boolean;
  cannotRegistReceipt: boolean;
  cannotRegistNoMoney: boolean;
  validate: () => { isOk: boolean; text: string; subText: string };
};
