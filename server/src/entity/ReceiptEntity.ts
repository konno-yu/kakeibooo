import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export type DailyCost = {
    storeName: string,
    const: number
};

@Entity('receipts')
export class ReceiptEntity {
    @CreateDateColumn({ primary: true, nullable: false })
    purchaseDate: Date;
    @Column({type: "jsonb", nullable: true, array: true })
    dailyCost?: Array<DailyCost>;
}