import DailyReceiptModel from "./DailyReceiptModel";
import ReceiptModel from "./ReceiptModel";
import { getDay, getWeekOfMonth, endOfMonth } from 'date-fns';

type WeekIndex = 1 | 2 | 3 | 4 | 5 | 6;
type MonthlyReceipt = {
    [key in WeekIndex]: [DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null, DailyReceiptModel | null];
}

export default class MonthlyReceiptModel {
    private _monthlyReceipt: MonthlyReceipt;

    constructor() {
        this.initialize();
        this.setWeeklyReceipt();
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

    private setWeeklyReceipt() {
        const targetMonth = 7;
        const endDate = endOfMonth(new Date(2021, targetMonth - 1, 1)).getDate();
        for (let i = 1; i <= endDate; i++) {
            const targetDate = new Date(2021, targetMonth - 1, i);
            // TODO とりあえずのモック
            this._monthlyReceipt[getWeekOfMonth(targetDate) as WeekIndex][getDay(targetDate)]
                = new DailyReceiptModel([
                    new ReceiptModel(targetDate, "", (Math.floor(Math.random() * 1000) + Math.floor((Math.random() * 100) + 100))),
                    new ReceiptModel(targetDate, "", (Math.floor(Math.random() * 1000) + Math.floor((Math.random() * 100) + 100))),
                    new ReceiptModel(targetDate, "", (Math.floor(Math.random() * 1000) + Math.floor((Math.random() * 100) + 100)))
                ]);
        }
    }
}