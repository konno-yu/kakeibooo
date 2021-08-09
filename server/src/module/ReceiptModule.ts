import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReceiptController } from "src/controller/ReceiptController";
import { ReceiptEntity } from "src/entity/ReceiptEntity";
import { ReceiptService } from "src/service/ReceiptService";


@Module({
    imports: [TypeOrmModule.forFeature([ReceiptEntity])],
    controllers: [ReceiptController],
    providers: [ReceiptService]
})
export class ReceiptModule { }