import { DailyCost } from "src/entity/ReceiptEntity";

export interface ReceiptDto {
    purchaseDate: Date;
    dailyCost?: Array<DailyCost>;
}