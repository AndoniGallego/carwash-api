import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashServicesController } from './wash-services.controller';
import { WashServices } from './entities/wash-services.entity';
import { WashServicesService } from './wash-services.service';

@Module({
  imports: [TypeOrmModule.forFeature([WashServices])],
  controllers: [WashServicesController],
  providers: [WashServicesService],
})
export class WashServicesModule {}
