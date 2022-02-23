import { getDay, getWeekOfMonth, endOfMonth, isEqual, getDate, getYear, getMonth } from 'date-fns';
import createMixins from '@material-ui/core/styles/createMixins';
import DailyReceiptModel from './DailyReceiptModel';
import ReceiptModel from './ReceiptModel';
import { GetResponse } from '../../../rest/financeRest';

export type WeekIndex = 1 | 2 | 3 | 4 | 5 | 6;
type MonthlyReceipt = {
  [key in WeekIndex]: [
    DailyReceiptModel | null,
    DailyReceiptModel | null,
    DailyReceiptModel | null,
    DailyReceiptModel | null,
    DailyReceiptModel | null,
    DailyReceiptModel | null,
    DailyReceiptModel | null
  ];
};

export default class MonthlyReceiptModel {
  private _receipts: MonthlyReceipt;

  constructor(targetDate: Date, monthlyReceipt?: MonthlyReceipt, data?: GetResponse[]) {
    if (monthlyReceipt) {
      this._receipts = monthlyReceipt;
    } else {
      this.initialize();
      this.setMonthlyReceipt(targetDate, data);
    }
  }

  get receipts() {
    return this._receipts;
  }

  set receipts(receipts: MonthlyReceipt) {
    this._receipts = receipts;
  }

  private initialize() {
    this._receipts = {
      1: [null, null, null, null, null, null, null],
      2: [null, null, null, null, null, null, null],
      3: [null, null, null, null, null, null, null],
      4: [null, null, null, null, null, null, null],
      5: [null, null, null, null, null, null, null],
      6: [null, null, null, null, null, null, null],
    };
  }

  public setSpecifyDateReceipt = (date: Date, dailyRecept: ReceiptModel[]) => {
    const weekIndex = getWeekOfMonth(new Date(date)) as WeekIndex;
    const dateIndex = getDay(new Date(date));
    this._receipts[weekIndex][dateIndex] = new DailyReceiptModel(new Date(date), dailyRecept);
  };

  private setMonthlyReceipt(date: Date, receipts?: GetResponse[]) {
    const endDate = this.getLastDateOfMonth(date); // 指定された年・月の最終日を取得
    for (let d = 1; d <= endDate; d++) {
      const targetDate = new Date(getYear(date), getMonth(date), d);
      const correspondingReceipt = receipts
        ? receipts.find((r) => isEqual(new Date(r.purchaseDate), targetDate))
        : null;
      const weekIndex = getWeekOfMonth(targetDate) as WeekIndex;
      if (correspondingReceipt) {
        const dailyReceiptModel: Array<ReceiptModel> =
          correspondingReceipt.dailyCost.length > 0
            ? correspondingReceipt.dailyCost.map((receipt) => new ReceiptModel(receipt.storeName, receipt.cost))
            : [new ReceiptModel('', 0)];
        this._receipts[weekIndex][getDay(targetDate)] = new DailyReceiptModel(targetDate, dailyReceiptModel);
      } else {
        this._receipts[weekIndex][getDay(targetDate)] = new DailyReceiptModel(targetDate, [new ReceiptModel('', null)]);
      }
    }
  }

  public getFlattenMonthlyReceipt = (): DailyReceiptModel[] =>
    [].concat(...Object.values(this._receipts).map((receipt) => receipt.filter((r) => r !== null)));

  public getMonthlyTotalCost = () =>
    this.getFlattenMonthlyReceipt().reduce(
      (accumulator: number, receipt: DailyReceiptModel) => accumulator + receipt.getDailyTotalCost(),
      0
    );

  public getMonthlyAverageCost = () => {
    const dayCount = this.getFlattenMonthlyReceipt().filter((r) => r.getDailyTotalCost() !== null).length;
    return Math.ceil(this.getMonthlyTotalCost() / dayCount);
  };

  public getConsumptionDegrees = (): { [key in 'zero' | 'low' | 'normal' | 'high']: number } => {
    const degrees: { [key in 'zero' | 'low' | 'normal' | 'high']: number } = { zero: 0, low: 0, normal: 0, high: 0 };
    this.getFlattenMonthlyReceipt().forEach((r) => {
      const dailyTotalCost = r.getDailyTotalCost();
      if (dailyTotalCost === 0) degrees.zero++;
      if (dailyTotalCost > 0 && dailyTotalCost <= 1000) degrees.low++;
      if (dailyTotalCost > 1000 && dailyTotalCost <= 2500) degrees.normal++;
      if (dailyTotalCost > 2500) degrees.high++;
    });
    return degrees;
  };

  public getLastDateOfMonth = (date: Date): 30 | 31 => getDate(endOfMonth(date)) as 30 | 31;
}
