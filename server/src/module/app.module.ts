import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'src/ormConfig';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { MemoModule } from './MemoModule';
import { ReceiptModule } from './ReceiptModule';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), ReceiptModule, MemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
