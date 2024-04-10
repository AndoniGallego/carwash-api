import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WashServicesService } from './wash-services.service';

@UseGuards(JwtAuthGuard)
@Controller('washeds')
export class WashServicesController {
  constructor(private readonly washServicesService: WashServicesService) {}

  @Get()
  async findAll( page?: number, limit?: number) {
    return await this.washServicesService.findAll( page, limit );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.washServicesService.findOne(+id);
  }

  @Post()
  async create(@Body() createWashedDto: any) {
    return await this.washServicesService.create(createWashedDto);
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() updateWashedDto: any) {
    return await this.washServicesService.update(+id, updateWashedDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.washServicesService.remove(+id);
  }
}
