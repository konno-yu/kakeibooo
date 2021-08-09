import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ReceiptDto } from "src/dto/ReceiptDto";
import { ReceiptService } from "src/service/ReceiptService";

@Controller('receipts')
export class ReceiptController {
    constructor(private receiptService: ReceiptService) { }

    @Get()
    get() {
        return this.receiptService.get();
    }

    @Get(':year/:month')
    getByMonth(@Param('year') year: number, @Param('month') month: number) {
        return this.receiptService.getByMonth(year, month);
    }

    @Post()
    post(@Body() body: Partial<ReceiptDto>) {
        return this.receiptService.post(body)
    }

    @Put()
    update(@Body() body: Partial<ReceiptDto>) {
        return this.receiptService.update(body);
    }
}