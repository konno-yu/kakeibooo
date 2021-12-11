import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity('memo')
export class MemoEntity {
    @CreateDateColumn({ primary: true, nullable: false })
    fromDate: Date;
    @CreateDateColumn({ primary: true, nullable: false })
    toDate: Date;
    @Column({ type: 'text', nullable: true })
    memoText: string;
}