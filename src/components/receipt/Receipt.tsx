import { css, Theme, useTheme } from '@emotion/react';
import { getDate, getMonth, getYear } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { HiPlusSm } from 'react-icons/hi';
import { Receipt as ReceiptDef } from '../../reducer/householdBookSlice';
import { Button } from '../common/button/Button';
import { Divider } from '../common/divider/Divider';
import { FlexBox } from '../common/flex_box/FlexBox';
import { Snackbar } from '../common/snackbar/Snackbar';
import { useSnackbar } from '../common/snackbar/useSnackbar';
import { Typography } from '../common/typography/Typography';
import { Tag } from './tag/Tag';
import { useReceipt } from './useReceipt';

interface ReceiptProps {
  /** 選択した日付のレシート */
  receipts: ReceiptDef[] | [] | null;
  /** 編集対象の日付 */
  targetDate: Date;
  /** 「食費を登録」をクリックしたときの動作 */
  onClickRegist: (receipts: ReceiptDef[] | [] | null) => void;
  /** 「Noマネーデイとして登録」をクリックしたときの動作 */
  onClickNoMoney: () => void;
}

export const Receipt = ({ receipts, targetDate, onClickRegist, onClickNoMoney }: ReceiptProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
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
  } = useReceipt(receipts);
  const { isOpen, type, text, subText, showSnackbar, setSnackbarDetails } = useSnackbar();

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
   * [食費を登録]ボタンが押された場合の動作 <br/>
   * 編集日のデータが登録済みかに応じてPOST/PUTを投げ分ける
   *
   */
  const handleClickRegist = () => {
    const validateResult = validate();
    if (!validateResult.isOk) {
      setSnackbarDetails('error', validateResult.text, validateResult.subText);
      showSnackbar();
      return;
    }
    onClickRegist(dailyReceipt);
    setSnackbarDetails('success', validateResult.text, validateResult.subText);
    showSnackbar();
  };

  /**
   * [Noマネーデイとして登録]が押された場合の動作 <br/>
   * 編集日のデータが登録済みかに応じてPOST/PUTを投げ分ける
   */
  const handleClickNoMoney = () => {
    // TODO テストできればこれ要らないか？
    onClickNoMoney();
    setSnackbarDetails('success', t('calendar.registration_complete'), '');
    showSnackbar();
  };

  return (
    <FlexBox direction="column" justifyContent="center" css={container(theme)}>
      <FlexBox direction="column" justifyContent="center" css={header(theme)}>
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
      </FlexBox>
      <Divider width={2} type="dashed" color={theme.colors.gray_200} />
      <FlexBox direction="column" justifyContent="center" alignItems="center" css={body(theme)}>
        <FlexBox direction="column" alignItems="center" gap={8} css={tag}>
          {dailyReceipt &&
            dailyReceipt.map((tag) => (
              <Tag
                key={tag.index}
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
            data-testid="btn-add"
          />
        </FlexBox>
        <FlexBox direction="row" justifyContent="space-between" alignItems="center" css={summartion}>
          <Typography type="subHeader" variant="normal">
            {t('calendar.summartion')}
          </Typography>
          <Typography type="header" variant="normal">
            {calcSummartion()}
          </Typography>
        </FlexBox>
      </FlexBox>
      <Divider width={2} type="dashed" color={theme.colors.gray_200} />
      <FlexBox direction="column" justifyContent="space-evenly" alignItems="center" css={footer}>
        <Button
          disabled={cannotRegistReceipt}
          onClick={handleClickRegist}
          width="80%"
          variant="filled"
          color="normal"
          label={t('calendar.register_expense')}
          data-testid="btn-regist"
        />
        <Button
          onClick={handleClickNoMoney}
          width="80%"
          variant="filled"
          color="primary"
          label={t('calendar.register_for_no_money_day')}
          disabled={cannotRegistNoMoney}
          data-testid="btn-no-money"
        />
      </FlexBox>
      {isOpen && <Snackbar open={isOpen} type={type} text={text} subText={subText} />}
    </FlexBox>
  );
};

const container = (theme: Theme) => css`
  height: calc(100vh - 24px);
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.gray_200};
  border-radius: ${theme.units.px8};
`;

const header = (theme: Theme) => css`
  height: 10%;
  padding: ${theme.units.px8};
  text-align: center;
`;

const body = (theme: Theme) => css`
  height: 70%;
  padding: ${theme.units.px8};
`;

const tag = css`
  height: 100%;
  width: 100%;
`;

const summartion = css`
  width: calc(100% - 16px);
`;

const footer = css`
  height: 20%;
  width: 100%;
`;
