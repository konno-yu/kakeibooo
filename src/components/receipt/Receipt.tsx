import { css } from '@emotion/react';
import { getDate, getDay, getMonth, getWeekOfMonth, getYear } from 'date-fns';
import React, { useEffect } from 'react';
import { HiPlusSm } from 'react-icons/hi';
import styled from 'styled-components';
import { Receipt as ReceiptDef } from '../../reducer/householdBookSlice';
import * as expenseRest from '../../rest/expenses';
import { useAppSelector } from '../../store';
import { extractTargetDayReceipt } from '../../view/HouseholdBookView';
import { Button } from '../common/button/Button';
import { Divider } from '../common/divider/Divider';
import { Typography } from '../common/typography/Typography';
import { Tag } from './tag/Tag';

export interface ReceiptProps {
  receipts: ReceiptDef[] | [] | null;
}

// TODO カスタムフック切り出し
export const Receipt: React.FC<ReceiptProps> = ({ receipts }) => {
  const [dayReceipts, setDayReceipts] = React.useState<ReceiptDef[] | [] | null>(receipts);
  const expenses = useAppSelector((state) => state.householdBook.expenses);
  const targetDate = useAppSelector((state) => state.householdBook.targetDate);

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
   * [食費を登録]ボタンが押された場合の動作 <br/>
   * 編集日のデータが登録済みかに応じてPOST/PUTを投げ分ける
   *
   */
  const handleClickRegist = async () => {
    const isPost = expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts === null;
    if (isPost) {
      await expenseRest.post(targetDate, dayReceipts);
    } else {
      await expenseRest.put(targetDate, dayReceipts);
    }
  };

  /**
   * [Noマネーデイとして登録]が押された場合の動作 <br/>
   * 編集日のデータが登録済みかに応じてPOST/PUTを投げ分ける
   */
  const handleClickNoMoney = async () => {
    const isPost = expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts === null;
    if (isPost) {
      await expenseRest.post(targetDate, []);
    } else {
      await expenseRest.put(targetDate, []);
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
      <Divider width={2} type="dashed" color="#CFD8DC" />
      <div css={body}>
        <Tags>
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
        </Tags>
        <div css={summartion}>
          <Typography type="subHeader" variant="normal">
            合計
          </Typography>
          <Typography type="header" variant="normal">
            {calcDailySummartion()}
          </Typography>
        </div>
      </div>
      <Divider width={2} type="dashed" color="#CFD8DC" />
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
    </div>
  );
};

const container = css`
  height: calc(100vh - 24px);
  background: #ffffff;
  border: 2px solid #eceff1;
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

const Tags = styled.div`
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
