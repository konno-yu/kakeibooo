import { createContext, useCallback, useState } from "react";
import DailyReceiptModel from "./model/DailyReceiptModel";

interface ReceiptContext {
    dailyReceipt: DailyReceiptModel;
    setDailyReceipt: (dailyReceipt: DailyReceiptModel) => void;
}

const defaultReceiptContext: ReceiptContext = {
    dailyReceipt: new DailyReceiptModel([]),
    setDailyReceipt: () => { }
}

export const receiptContext = createContext<ReceiptContext>(defaultReceiptContext);
export const useReceipt = (): ReceiptContext => {
    const [dailyReceipt, _setDailyReceipt] = useState<DailyReceiptModel>(new DailyReceiptModel([]));
    const setDailyReceipt = useCallback((current: DailyReceiptModel) => _setDailyReceipt(current), []);
    return {
        dailyReceipt,
        setDailyReceipt,
    }
}