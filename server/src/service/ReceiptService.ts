import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReceiptDto } from "src/dto/ReceiptDto";
import { ReceiptEntity } from "src/entity/ReceiptEntity";
import { Between, getConnection, Repository } from "typeorm";
import { getMonth, getYear, set, setMonth } from 'date-fns';

@Injectable()
export class ReceiptService {
    constructor(
        @InjectRepository(ReceiptEntity)
        private receiptRepository: Repository<ReceiptEntity>
    ) { }

    async get() {
        return await this.receiptRepository.find({
            order: {
                purchaseDate: 'ASC'
            }
        });
    }

    async getByMonth(year: number, month: number) {
        const thisMonth = set(1, { year, month: month - 1 });
        const nextMonth = set(1, { year: getYear(setMonth(thisMonth, getMonth(thisMonth))), month });
        return await this.receiptRepository.find({
            where: {
                purchaseDate: Between(thisMonth, nextMonth)
            },
            order: {
                purchaseDate: 'ASC'
            }
        });
    }

    async post(body: Partial<ReceiptDto>) {
        const receipt = this.receiptRepository.create(body);
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(ReceiptEntity, ['purchase_date', 'daily_cost'])
            .values(receipt)
            .execute();
        return receipt;
    }

    async update(body: Partial<ReceiptDto>) {
        await getConnection()
            .createQueryBuilder()
            .update(ReceiptEntity)
            .set({ dailyCost: body.dailyCost }).where({ purchase_date: body.purchase_date }).execute();
        return body;
    }
}