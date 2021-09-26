import { Column, CreateDateColumn, Entity } from "typeorm";

export type DailyCost = {
    storeName: string,
    cost: number
};

@Entity('receipts')
export class ReceiptEntity {
    @CreateDateColumn({ primary: true, nullable: false })
    purchaseDate: Date;
    @Column({type: 'jsonb', nullable: true, default: () => "'[]'" })
    dailyCost?: Array<DailyCost>;
}