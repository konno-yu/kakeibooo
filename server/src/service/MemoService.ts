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
}