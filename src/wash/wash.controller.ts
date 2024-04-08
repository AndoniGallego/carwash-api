import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { WashService } from './wash.service';

@UseGuards(JwtAuthGuard)
@Controller('washeds')
export class WashController {
  constructor(private readonly wservice: WashService) {}

  @Get()
  async findAll( page?: number, limit?: number) {
    return await this.wservice.findAll( page, limit );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.wservice.findOne(+id);
  }

  @Post()
  async create(@Body() createWashedDto: any) {
    return await this.wservice.create(createWashedDto);
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() updateWashedDto: any) {
    return await this.wservice.update(+id, updateWashedDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.wservice.remove(+id);
  }
}
