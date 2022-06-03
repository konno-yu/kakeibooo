import { css, Theme, useTheme } from '@emotion/react';
import { getDate, getDay, getMonth, getWeekOfMonth, getYear } from 'date-fns';
import React, { useEffect } from 'react';
import { HiPlusSm } from 'react-icons/hi';
import { postDailyExpenses, Receipt as ReceiptDef, updateDailyExpenses } from '../../reducer/householdBookSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { extractTargetDayReceipt } from '../../view/HouseholdBookView';
import { Button } from '../common/button/Button';
import { Divider } from '../common/divider/Divider';
import { Snackbar, SnackbarProps } from '../common/snackbar/Snackbar';
import { Typography } from '../common/typography/Typography';
import { Tag } from './tag/Tag';

export interface ReceiptProps {
  receipts: ReceiptDef[] | [] | null;
}

// TODO カスタムフック切り出し
export const Receipt = ({ receipts }: ReceiptProps) => {
  const [dayReceipts, setDayReceipts] = React.useState<ReceiptDef[] | [] | null>(receipts);
  const expenses = useAppSelector((state) => state.householdBook.expenses);
  const targetDate = useAppSelector((state) => state.householdBook.targetDate);
  const [snackbarStatus, setSnackbarStatus] = React.useState<SnackbarProps>({ open: false, type: 'success', text: '' });
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    setDayReceipts(extractTargetDayReceipt(expenses, targetDate));
  }, [expenses, targetDate]);

  /**
   * レシートを追加する
   */
  const handleClickAdd = () => {
    if (dayReceipts === null) {
      setDayReceipts([{ index: 0, storeName: '', cost: null }]);
    }
    setDayReceipts([...dayReceipts, { index: dayReceipts.length, storeName: '', cost: null }]);
  };

  /**
   * レシートの店舗名を更新する
   * @param index 対象となるレシート
   * @param storeName 更新後の店舗名
   */
  const handleChangeStoreName = (index: number, storeName: string) => {
    setDayReceipts(dayReceipts.map((receipt) => (receipt.index === index ? { ...receipt, storeName } : receipt)));
  };

  /**
   * レシートの金額を更新する
   * @oaram index 対象となるレシート
   * @param cost 更新後の金額
   */
  const handleChangeCost = (index: number, cost: number) => {
    setDayReceipts(dayReceipts.map((receipt) => (receipt.index === index ? { ...receipt, cost } : receipt)));
  };

  /**
   * レシートを削除する
   * @param index 対象となるレシート
   */
  const handleClickDelete = (index: number) => {
    const remainReceipts = (dayReceipts as ReceiptDef[]).filter((receipt) => receipt.index !== index);
    // indexを振り直してステートを更新する
    setDayReceipts(remainReceipts.map((receipt, i) => ({ ...receipt, index: i })));
  };

  /**
   * 選択中の日付における合計金額を計算する
   * @returns 合計金額に￥マークをつけつつカンマ区切りにして返す
   */
  const calcDailySummartion = () => {
    if (dayReceipts) {
      const totalCost: number =
        dayReceipts?.length === 0
          ? 0
          : dayReceipts?.map((receipt) => receipt.cost).reduce((pre, current) => pre + current, 0);
      return `¥${totalCost.toLocaleString()}`;
    }
    return '¥0';
  };

  /**
   * 処理が成功した時のスナックバーを表示する
   */
  const showSuccessSnackbar = (text: string, subText?: string) => {
    setSnackbarStatus({ open: true, type: 'success', text, subText });
    setTimeout(() => setSnackbarStatus((current) => ({ ...current, open: false })), 2000);
  };

  /**
   * 処理が失敗した時のスナックバーを表示する
   */
  const showErrorSnackbar = (text: string, subText?: string) => {
    setSnackbarStatus({ open: true, type: 'error', text, subText });
    setTimeout(() => setSnackbarStatus((current) => ({ ...current, open: false })), 2000);
  };

  /**
   * レシートをDBに登録する前の入力バリデーションを行う
   * @returns バリデーションの成否
   */
  const validate = () => {
    if (dayReceipts?.filter((receipt) => receipt.cost === null).length > 0) {
      showErrorSnackbar('登録に失敗しました', '金額が未入力のレシートがあるようです');
      return false;
    }
    if (dayReceipts?.filter((receipt) => receipt.storeName === '').length > 0) {
      showErrorSnackbar('登録に失敗しました', '店舗名が未入力のレシートがあるようです');
      return false;
    }
    if (dayReceipts.filter((receipt) => Number.isNaN(receipt.cost)).length > 0) {
      showErrorSnackbar('登録に失敗しました', '金額が数値ではないレシートがあるようです');
      return false;
    }
    const storeNames = dayReceipts?.map((receipt) => receipt.storeName);
    if ([...new Set(storeNames)].length !== storeNames.length) {
      showErrorSnackbar('登録に失敗しました', '同じ店舗のレシートが複数あるようです');
      return false;
    }
    return true;
  };

  /**
   * [食費を登録]ボタンが押された場合の動作 <br/>
   * 編集日のデータが登録済みかに応じてPOST/PUTを投げ分ける
   *
   */
  const handleClickRegist = async () => {
    if (!validate()) {
      return;
    }
    const isPost = expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts === null;
    if (isPost) {
      await dispatch(postDailyExpenses(dayReceipts));
      showSuccessSnackbar('登録が完了しました');
    } else {
      await dispatch(updateDailyExpenses(dayReceipts));
      showSuccessSnackbar('登録が完了しました');
    }
  };

  /**
   * [Noマネーデイとして登録]が押された場合の動作 <br/>
   * 編集日のデータが登録済みかに応じてPOST/PUTを投げ分ける
   */
  const handleClickNoMoney = async () => {
    const isPost = expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts === null;
    if (isPost) {
      await dispatch(postDailyExpenses([]));
      showSuccessSnackbar('登録が完了しました');
    } else {
      await dispatch(updateDailyExpenses([]));
      showSuccessSnackbar('登録が完了しました');
    }
  };

  return (
    <div css={container}>
      <div css={header}>
        <Typography type="header" variant="normal">
          Kakeibooo
        </Typography>
        <Typography type="subHeader" variant="accent">
          {`${getYear(targetDate)}/${(getMonth(targetDate) + 1).toString().padStart(2, '0')}/${getDate(targetDate)
            .toString()
            .padStart(2, '0')}`}
        </Typography>
      </div>
      <Divider width={2} type="dashed" color={theme.colors.gray} />
      <div css={body}>
        <div css={tag}>
          {dayReceipts &&
            dayReceipts.map((tag) => (
              <Tag
                index={tag.index}
                storeName={tag.storeName}
                cost={tag.cost}
                onChangeStoreName={handleChangeStoreName}
                onChangeCost={handleChangeCost}
                onDelete={handleClickDelete}
              />
            ))}
          <Button
            disabled={dayReceipts && dayReceipts.length >= 4}
            onClick={handleClickAdd}
            width="80%"
            variant="outlined"
            color="normal"
            label="レシートを追加"
            icon={<HiPlusSm />}
          />
        </div>
        <div css={summartion}>
          <Typography type="subHeader" variant="normal">
            合計
          </Typography>
          <Typography type="header" variant="normal">
            {calcDailySummartion()}
          </Typography>
        </div>
      </div>
      <Divider width={2} type="dashed" color={theme.colors.gray} />
      <div css={footer}>
        <Button
          disabled={!dayReceipts || dayReceipts.length === 0}
          onClick={handleClickRegist}
          width="80%"
          variant="filled"
          color="normal"
          label="食費を登録"
        />
        <Button
          onClick={handleClickNoMoney}
          width="80%"
          variant="filled"
          color="accent"
          label="Noマネーディとして登録"
          disabled={dayReceipts && dayReceipts.length > 0}
        />
      </div>
      <Snackbar
        open={snackbarStatus.open}
        type={snackbarStatus.type}
        text={snackbarStatus.text}
        subText={snackbarStatus.subText}
      />
    </div>
  );
};

const container = (theme: Theme) => css`
  height: calc(100vh - 24px);
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const header = css`
  height: 10%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const body = css`
  height: 70%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const tag = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const summartion = css`
  width: calc(100% - 16px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const footer = css`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
