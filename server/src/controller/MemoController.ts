import { Controller, Get, Post, Body, Query, Param, Put, Delete } from "@nestjs/common";
import { MemoDto } from "src/dto/MemoDto";
import { MemoService } from "src/service/MemoService";

@Controller('memo')
export class MemoController {
    constructor(private memoService: MemoService) { }

    @Get()
    get() {
        return this.memoService.get();
    }

    @Get(':year')
    getByYear(@Param('year') year: number) {
        return this.memoService.getByYear(year);
    }

    @Get('/duration')
    getByDuration(@Query('from') from: Date, @Query('to') to: Date) {
        return this.memoService.getByDuration(from, to);
    }

    @Post()
    post(@Body() body: Partial<MemoDto>) {
        return this.memoService.post(body);
    }

    @Put()
    update(@Body() body: Partial<MemoDto>) {
        return this.memoService.update(body);
    }

    @Delete(':date')
    deleteMemo(@Param('date') from: string) {
        return this.memoService.deleteMemo(from);
    }
}