import { DailyCost } from "src/entity/ReceiptEntity";

export interface ReceiptDto {
    purchase_date: Date;
    dailyCost?: Array<DailyCost>;
}