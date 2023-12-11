import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';
import { CacheModule as CacheModuleNest } from '../cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), CacheModuleNest],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
