import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { AddressModule } from './address/address.module';
import { CityModule } from './city/city.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    CityModule,
    UserModule,
    StateModule,
    AddressModule,
    CacheModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
