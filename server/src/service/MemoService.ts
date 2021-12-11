import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MemoDto } from "src/dto/MemoDto";
import { MemoEntity } from "src/entity/MemoEntity";
import { getConnection, Repository } from "typeorm";

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(MemoEntity)
        private memoRepository: Repository<MemoEntity>
    ) { }

    async get() {
        return await this.memoRepository.find({
            order: {
                fromDate: 'ASC'
            }
        });
    }

    async getByYear(year: number) {
        const sqlString = 'EXTRACT(YEAR FROM from_date) = :target_year';
        const condition = { target_year: year };
        return await getConnection().createQueryBuilder(MemoEntity, "memo").where(sqlString, condition).getMany();
    }

    async getByDuration(from: Date, to: Date) {
        return await this.memoRepository.find({
            where: {
                fromDate: from
            }
        })
    }

    async post(body: Partial<MemoDto>) {
        const memo = this.memoRepository.create(body);
        await getConnection().createQueryBuilder().insert().into(MemoEntity).values(memo).execute();
        return memo;
    }

    async update(body: Partial<MemoDto>) {
        await getConnection().createQueryBuilder().update(MemoEntity).set({ memoText: body.memoText }).where({ fromDate: new Date(body.fromDate) }).execute();
        return body;
    }

    async deleteMemo(from: string) {
        await this.memoRepository.delete({ fromDate: from });
        return await this.memoRepository.count({ where: { fromDate: from } });
    }
}