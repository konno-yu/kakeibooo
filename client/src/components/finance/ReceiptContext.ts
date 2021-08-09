import { createContext, useCallback, useState } from "react";
import DailyReceiptModel from "./model/DailyReceiptModel";
import { ErrorType } from "./ReceiptErrorDialog";

interface ReceiptContext {
    dailyReceipt: DailyReceiptModel;
    errorStatus: { isError: boolean, type?: ErrorType };
    setDailyReceipt: (dailyReceipt: DailyReceiptModel) => void;
    setErrorStatus: (errorStatus: { isError: boolean, type?: ErrorType }) => void;
}

const defaultReceiptContext: ReceiptContext = {
    dailyReceipt: new DailyReceiptModel([]),
    setDailyReceipt: () => { },
    errorStatus: { isError: false },
    setErrorStatus: () => { }
}

export const receiptContext = createContext<ReceiptContext>(defaultReceiptContext);
export const useReceipt = (): ReceiptContext => {
    const [dailyReceipt, _setDailyReceipt] = useState<DailyReceiptModel>(new DailyReceiptModel([]));
    const setDailyReceipt = useCallback((current: DailyReceiptModel) => _setDailyReceipt(current), []);
    const [errorStatus, _setErrorStatus] = useState<{ isError: boolean, type?: ErrorType }>({ isError: false });
    const setErrorStatus = useCallback((current: { isError: boolean, type?: ErrorType }) => _setErrorStatus(current), []);
    return {
        dailyReceipt,
        setDailyReceipt,
        errorStatus,
        setErrorStatus
    }
}