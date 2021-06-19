export default class ReceiptModel {
    private _storeName: string;
    private _cost: number;
    private _ordinary: number;

    constructor(storeName: string, cost: number) {
        this._storeName = storeName;
        this._cost = cost;
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
}