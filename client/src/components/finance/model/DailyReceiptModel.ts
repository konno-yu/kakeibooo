import ReceiptModel from "./ReceiptModel";

export default class DailyReceiptModel {
    private static DAILY_MAX_RECEIPT = 4;

    private _receipts: ReceiptModel[] = [];

    constructor(receipts: ReceiptModel[]) {
        this._receipts = receipts;
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
        return this._receipts.reduce((accumulator: number, receipt: ReceiptModel): number => {
            return accumulator + receipt.cost;
        }, 0);
    }

    public getDate = () => {
        return this._receipts[0].date.getDate();
    }
}