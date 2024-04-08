import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './wash.controller';
import { Wash } from './entities/wash.entity';
import { WashService } from './wash.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wash])],
  controllers: [UserController],
  providers: [WashService],
})
export class WashModule {}
