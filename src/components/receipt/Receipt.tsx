import { css, Theme, useTheme } from '@emotion/react';
import { getDate, getDay, getMonth, getWeekOfMonth, getYear } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { HiPlusSm } from 'react-icons/hi';
import { postDailyExpenses, Receipt as ReceiptDef, updateDailyExpenses } from '../../reducer/householdBookSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { Button } from '../common/button/Button';
import { Divider } from '../common/divider/Divider';
import { Snackbar } from '../common/snackbar/Snackbar';
import { Typography } from '../common/typography/Typography';
import { Tag } from './tag/Tag';
import { useReceipt } from './useReceipt';

export interface ReceiptProps {
  receipts: ReceiptDef[] | [] | null;
}

export const Receipt = ({ receipts }: ReceiptProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation();

  const expenses = useAppSelector((state) => state.householdBook.expenses);
  const targetDate = useAppSelector((state) => state.householdBook.targetDate);

  const {
    dailyReceipt,
    snackbarStatus,
    calcSummartion,
    onReceiptAdd,
    onChangeStoreName,
    onChangeCost,
    onReceiptDelete,
    showSnackbar,
    cannotAddReceipt,
    cannotRegistReceipt,
    cannotRegistNoMoney,
    validate,
  } = useReceipt(receipts);

  // useEffect(() => {
  //   const weeklyReceipts = expenses[getWeekOfMonth(targetDate)].filter((r) => r);
  //   setDailyReceipt(weeklyReceipts.filter((wr) => wr.date && isEqual(wr.date, targetDate))[0].receipts);
  // }, [setDailyReceipt, expenses, targetDate]);

  const isPost = expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts == null;
  /**
   * レシートを追加する
   */
  const handleClickAdd = () => {
    onReceiptAdd();
  };

  /**
   * レシートの店舗名を更新する
   * @param index 対象となるレシート
   * @param storeName 更新後の店舗名
   */
  const handleChangeStoreName = (index: number, storeName: string) => {
    onChangeStoreName(index, storeName);
  };

  /**
   * レシートの金額を更新する
   * @oaram index 対象となるレシート
   * @param cost 更新後の金額
   */
  const handleChangeCost = (index: number, cost: number) => {
    onChangeCost(index, cost);
  };

  /**
   * レシートを削除する
   * @param index 対象となるレシート
   */
  const handleClickDelete = (index: number) => {
    onReceiptDelete(index);
  };

  /**
   * 処理が成功した時のスナックバーを表示する
   */
  const showSuccessSnackbar = (text: string, subText?: string) => {
    showSnackbar({ open: true, type: 'success', text, subText });
  };

  /**
   * 処理が失敗した時のスナックバーを表示する
   */
  const showErrorSnackbar = (text: string, subText?: string) => {
    showSnackbar({ open: true, type: 'error', text, subText });
  };

  /**
   * [食費を登録]ボタンが押された場合の動作 <br/>
   * 編集日のデータが登録済みかに応じてPOST/PUTを投げ分ける
   *
   */
  const handleClickRegist = async () => {
    if (!validate().isOk) {
      showErrorSnackbar(validate().text, validate().subText);
      return;
    }
    if (isPost) {
      await dispatch(postDailyExpenses(dailyReceipt));
      showSuccessSnackbar(t('calendar.registration_complete'));
    } else {
      await dispatch(updateDailyExpenses(dailyReceipt));
      showSuccessSnackbar(t('calendar.registration_complete'));
    }
  };

  /**
   * [Noマネーデイとして登録]が押された場合の動作 <br/>
   * 編集日のデータが登録済みかに応じてPOST/PUTを投げ分ける
   */
  const handleClickNoMoney = async () => {
    if (isPost) {
      await dispatch(postDailyExpenses([]));
      showSuccessSnackbar(t('calendar.registration_complete'));
    } else {
      await dispatch(updateDailyExpenses([]));
      showSuccessSnackbar(t('calendar.registration_complete'));
    }
  };

  return (
    <div css={container}>
      <div css={header}>
        <Typography type="header" variant="normal">
          {t('common.application_title')}
        </Typography>
        <Typography type="subHeader" variant="accent">
          {t('common.format_year_month_day', {
            year: getYear(targetDate).toString(),
            month: (getMonth(targetDate) + 1).toString().padStart(2, '0'),
            day: getDate(targetDate).toString().padStart(2, '0'),
          })}
        </Typography>
      </div>
      <Divider width={2} type="dashed" color={theme.colors.gray_200} />
      <div css={body}>
        <div css={tag}>
          {dailyReceipt &&
            dailyReceipt.map((tag) => (
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
            disabled={cannotAddReceipt}
            onClick={handleClickAdd}
            width="80%"
            variant="text"
            color="primary"
            label={t('calendar.add_receipts')}
            icon={<HiPlusSm />}
          />
        </div>
        <div css={summartion}>
          <Typography type="subHeader" variant="normal">
            {t('calendar.summartion')}
          </Typography>
          <Typography type="header" variant="normal">
            {calcSummartion()}
          </Typography>
        </div>
      </div>
      <Divider width={2} type="dashed" color={theme.colors.gray_200} />
      <div css={footer}>
        <Button
          disabled={cannotRegistReceipt}
          onClick={handleClickRegist}
          width="80%"
          variant="filled"
          color="normal"
          label={t('calendar.register_expense')}
        />
        <Button
          onClick={handleClickNoMoney}
          width="80%"
          variant="filled"
          color="primary"
          label={t('calendar.register_for_no_money_day')}
          disabled={cannotRegistNoMoney}
        />
      </div>
      <Snackbar {...snackbarStatus} />
    </div>
  );
};

const container = (theme: Theme) => css`
  height: calc(100vh - 24px);
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray_200};
  border-radius: ${theme.units.px8};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const header = (theme: Theme) => css`
  height: 10%;
  padding: ${theme.units.px8};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const body = (theme: Theme) => css`
  height: 70%;
  padding: ${theme.units.px8};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const tag = (theme: Theme) => css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.units.px8};
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
