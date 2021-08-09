import { Button } from '@material-ui/core';
import { useContext } from 'react';
import * as ReceiptRest from '../../rest/financeRest';
import { receiptContext } from './ReceiptContext';
import { financeContext } from './FinanceContext';
import ReceiptErrorDialog from './ReceiptErrorDialog';
import { useState } from 'react';
import ReceiptSnackbar from './ReceiptSnackbar';
import { getDay, getWeekOfMonth } from 'date-fns';
import { WeekIndex } from './model/MonthlyReceiptModel';

const ReceiptFooter: React.FC = () => {
    const rContext = useContext(receiptContext);
    const fContext = useContext(financeContext);
    const isRegisterButtonDisabled = rContext.dailyReceipt.getCount() === 0;
    const isNMDayButtonDisabled = rContext.dailyReceipt.getCount() > 0;
    const [isShowSnackbar, setIsShowSnackbar] = useState<boolean>(false);

    const validate = (dailyCost: Array<{ storeName: string, cost: number }>) => {
        const existEmptyStoreName = dailyCost.filter(dCost => dCost.storeName === '').length > 0;
        const existZeroCost = dailyCost.filter(dCost => dCost.cost === 0 || dCost.cost === null).length > 0;
        const existInvalidReceipt = dailyCost.filter(dCost => isNaN(dCost.cost)).length > 0;
        const existSameStoreReceipt = dailyCost.filter((dCost, index, self) => self.findIndex(e => e.storeName === dCost.storeName) === index).length !== dailyCost.length;
        const existSameReceipt = dailyCost.filter((dCost, index, self) => self.findIndex(e => e.cost === dCost.cost && e.storeName === dCost.storeName) === index).length !== dailyCost.length;
        if (existEmptyStoreName) {
            rContext.setErrorStatus({ isError: true, type: 'exists_empty_store_name' });
            return false;
        }
        if (existZeroCost) {
            rContext.setErrorStatus({ isError: true, type: 'exists_zero_receipt' });
            return false;
        }
        if (existInvalidReceipt) {
            rContext.setErrorStatus({ isError: true, type: 'exists_invalid_receipt' });
            return false;
        }
        if (existSameReceipt) {
            rContext.setErrorStatus({ isError: true, type: 'exists_duplicate_receipt' });
            return false;
        }
        if (existSameStoreReceipt) {
            rContext.setErrorStatus({ isError: true, type: 'exists_same_store_receipt' });
            return false;
        }
        return true;
    }

    const registerDailyReceipt = () => {
        const purchaseDate = fContext.targetDate;
        const dailyCost: Array<{ storeName: string, cost: number }> = [...rContext.dailyReceipt.receipts.map(receipt => receipt.getDailyCost())];
        if (!validate(dailyCost)) {
            return;
        }
        const isPost = !!fContext.monthlyReceipt.monthlyReceipt[getWeekOfMonth(purchaseDate) as WeekIndex][getDay(purchaseDate)]
        console.log(isPost);
        if (isPost) {
            ReceiptRest.post({ purchaseDate, dailyCost }).then(res => {
                if (res.status === 201) {
                    setIsShowSnackbar(true);
                    setTimeout(() => setIsShowSnackbar(false), 1500);
                } else {
                    alert("追加時に予期しないエラーが発生しました");
                }
            });
        } else {
            ReceiptRest.update({ purchaseDate, dailyCost }).then(res => {
                if (res.status === 201) {
                    setIsShowSnackbar(true);
                    setTimeout(() => setIsShowSnackbar(false), 1500);
                } else {
                    alert('更新時に予期しないエラーが発生しました')
                }
            })
        }
    }

    const registerNoMoneyDay = () => {
        const purchaseDate = fContext.targetDate;
        const dailyCost: Array<{ storeName: string, cost: number }> = [];
        ReceiptRest.post({ purchaseDate, dailyCost }).then((res) => {
            if (res.status === 201) {
                setIsShowSnackbar(true);
                setTimeout(() => setIsShowSnackbar(false), 2000);
            } else {
                alert("予期しないエラーが発生しました");
            }
        });
    }
    return (
        <div className="root--footer">
            {
                rContext.errorStatus.isError &&  <ReceiptErrorDialog isOpen={rContext.errorStatus.isError} type={rContext.errorStatus.type}/>
            }
            {
                isShowSnackbar && <ReceiptSnackbar message="登録が完了しました" />
            }
            <Button className={isRegisterButtonDisabled ? "button--register disabled" : "button--register"} disabled={isRegisterButtonDisabled} fullWidth onClick={registerDailyReceipt}>食費を確定</Button>
            <Button className={isNMDayButtonDisabled ? "button--nomoney disabled" : "button--nomoney"} disabled={isNMDayButtonDisabled} fullWidth onClick={registerNoMoneyDay}>NOマネーデイとして登録</Button>
        </div>
    )
}

export default ReceiptFooter;