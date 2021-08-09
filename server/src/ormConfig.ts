import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ReceiptEntity } from './entity/ReceiptEntity';

export const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    // TODO 設定ファイルは分離したい
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost',
    database: 'kakeibooo',
    synchronize: false,
    entities: [ReceiptEntity],
    namingStrategy: new SnakeNamingStrategy()
}