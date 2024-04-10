import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashController } from './wash.controller';
import { Wash } from './entities/wash.entity';
import { WashService } from './wash.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wash])],
  controllers: [WashController],
  providers: [WashService],
})
export class WashModule {}
