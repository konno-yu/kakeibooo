import ReceiptModel from "./ReceiptModel";

export default class DailyReceiptModel {
    private static DAILY_MAX_RECEIPT = 4;

    private _date: Date;
    private _receipts: ReceiptModel[] = [];

    constructor(date: Date, receipts: ReceiptModel[]) {
        this._date = date;
        this._receipts = receipts;
    }

    get date() {
        return this._date;
    }

    get receipts() {
        return this._receipts;
    }

    set receipts(receipts: ReceiptModel[]) {
        this._receipts = receipts;
    }

    public add = (receipt: ReceiptModel) => {
        this._receipts = [...this._receipts, receipt];
    }

    public delete = (index: number) => {
        this._receipts = this._receipts.filter((_, i) => i !== index);
    }

    public isReachDailyMax = () => {
        return this._receipts.length === DailyReceiptModel.DAILY_MAX_RECEIPT;
    }

    public getCount = () => {
        return this._receipts.length;
    }

    public getDailyTotalCost = (): number => {
        if (this._receipts.filter(receipt => receipt.cost === null).length > 0) return null;
        return this._receipts.reduce((accumulator: number, receipt: ReceiptModel): number => {
            return accumulator + receipt.cost;
        }, 0);
    }

    public isExistEmptyStore = this._receipts.filter(r => r.storeName === '').length > 0;
    public isExistZeroCost = this._receipts.filter(r => r.cost === 0 || r.cost === null).length > 0;
    public isExistNaNCost = this._receipts.filter(r => isNaN(r.cost)).length > 0;
    public isExistSameStore = this._receipts.filter((r, i, s) => s.findIndex(s => s.storeName === r.storeName) === i).length !== this.getCount();
    public isDuplicate = this._receipts.filter((r, i, s) => s.findIndex(s => s.cost === r.cost && s.storeName === r.storeName) === i).length !== this.getCount();
}