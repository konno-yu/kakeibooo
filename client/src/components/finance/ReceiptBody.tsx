import { Button } from '@material-ui/core';
import { useContext } from 'react';
import DailyReceiptModel from './model/DailyReceiptModel';
import ReceiptModel from './model/ReceiptModel';
import { receiptContext } from './ReceiptContext';
import ReceiptTag from './ReceiptTag';

const ReceiptBody: React.FC = () => {
    const context = useContext(receiptContext);
    const isAddButtonDisabled = context.dailyReceipt.isReachDailyMax();

    const addReceiptTag = () => {
        const current = context.dailyReceipt;
        current.add(new ReceiptModel("", 0));
        context.setDailyReceipt(new DailyReceiptModel(current.receipts));
    }

    return (
        <div className="root--body">
            <div className="sample">
                {
                    (context.dailyReceipt.receipts).map((receipt, ordinary) => <ReceiptTag model={receipt} ordinary={ordinary}></ReceiptTag>)
                }
                <Button className={isAddButtonDisabled ? "btn--add-receipt disabled" : "btn--add-receipt"} fullWidth variant="outlined" onClick={addReceiptTag} disabled={isAddButtonDisabled}>+ レシートを追加</Button>
            </div>
            <div　className="sum">
                <div>合計</div>
                <div>￥{context.dailyReceipt.getDailyTotalCost().toLocaleString()}</div>
            </div>
        </div>
    )
}

export default ReceiptBody;