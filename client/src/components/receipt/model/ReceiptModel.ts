export default class ReceiptModel {
    private _date: Date;
    private _storeName: string;
    private _cost: number;

    constructor(date: Date, storeName: string, cost: number) {
        this._date = date;
        this._storeName = storeName;
        this._cost = cost;
    }

    get date() {
        return this._date;
    }

    set date(date: Date) {
        this._date = date;
    }

    get storeName() {
        return this._storeName;
    }

    set storeName(storeName: string) {
        this._storeName = storeName;
    }

    get cost() {
        return this._cost;
    }

    set cost(cost: number) {
        this._cost = cost;
    }

    public getDailyCost() {
        return { storeName: this._storeName, cost: this._cost };
    }
}