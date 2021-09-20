import DailyReceiptModel from "./DailyReceiptModel";
import ReceiptModel from "./ReceiptModel";
import { getDay, getWeekOfMonth, endOfMonth, isEqual, getDate } from 'date-fns';
import { GetResponse } from "../../../rest/financeRest";

export type WeekIndex = 1 | 2 | 3 | 4 | 5 | 6;
type MonthlyReceipt = {
    [key in WeekIndex]: [DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null];
}

export default class MonthlyReceiptModel {
    private _monthlyReceipt: MonthlyReceipt;

    constructor(year: number, month: number, data?: GetResponse[]) {
        this.initialize();
        this.setMonthlyReceipt(year, month, data);
    }

    get monthlyReceipt() {
        return this._monthlyReceipt;
    }

    set monthlyReceipt(monthlyReceipt: MonthlyReceipt) {
        this._monthlyReceipt = monthlyReceipt;
    }

    private initialize() {
        this._monthlyReceipt = {
            1: [null, null, null, null, null, null, null],
            2: [null, null, null, null, null, null, null],
            3: [null, null, null, null, null, null, null],
            4: [null, null, null, null, null, null, null],
            5: [null, null, null, null, null, null, null],
            6: [null, null, null, null, null, null, null]
        }
    }

    private setMonthlyReceipt(year: number, month: number, receipts?: GetResponse[]) {
        const endDate = getDate(endOfMonth(new Date(year, month, 1)));  // 指定された年・月の最終日を取得
        for (let date = 1; date <= endDate; date++) {
            const targetDate = new Date(year, month, date);
            const correspondingReceipt = receipts ? receipts.find(r => isEqual(new Date(r.purchaseDate), targetDate)) : null;
            const weekIndex = getWeekOfMonth(targetDate) as WeekIndex;
            if (correspondingReceipt) {
                const dailyReceiptModel: Array<ReceiptModel> = (correspondingReceipt.dailyCost.length > 0) ?
                    correspondingReceipt.dailyCost.map(receipt => new ReceiptModel(receipt.storeName, receipt.cost)) : [new ReceiptModel('', 0)];
                this._monthlyReceipt[weekIndex][getDay(targetDate)] = new DailyReceiptModel(targetDate, dailyReceiptModel);
            } else {
                this._monthlyReceipt[weekIndex][getDay(targetDate)] = new DailyReceiptModel(targetDate, [new ReceiptModel('', null)]);
            }
        }
    }
}