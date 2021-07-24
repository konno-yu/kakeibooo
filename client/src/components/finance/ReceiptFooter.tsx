import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { receiptContext } from './ReceiptContext';

const ReceiptFooter: React.FC = () => {
    const context = useContext(receiptContext);
    const isRegisterButtonDisabled = context.dailyReceipt.getCount() === 0;
    const isNMDayButtonDisabled = context.dailyReceipt.getCount() > 0;

    const registerDailyReceipt = () => {
        console.log(context.dailyReceipt);
    }
    return (
        <div className="root--footer">
            <Button className={isRegisterButtonDisabled ? "button--register disabled" : "button--register"} disabled={isRegisterButtonDisabled} fullWidth onClick={registerDailyReceipt}>食費を確定</Button>
            <Button className={isNMDayButtonDisabled ? "button--nomoney disabled" : "button--nomoney"} disabled={isNMDayButtonDisabled} fullWidth>NOマネーデイとして登録</Button>
        </div>
    )
}

export default ReceiptFooter;