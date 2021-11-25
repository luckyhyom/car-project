import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const SQLiteConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '../../../../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: true,
    keepConnectionAlive: true,
}