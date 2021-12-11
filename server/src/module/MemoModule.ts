import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemoController } from "src/controller/MemoController";
import { MemoEntity } from "src/entity/MemoEntity";
import { MemoService } from "src/service/MemoService";

@Module({
    imports: [TypeOrmModule.forFeature([MemoEntity])],
    controllers: [MemoController],
    providers: [MemoService]
})
export class MemoModule { };