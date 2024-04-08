import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { WashService } from './wash.service';

@UseGuards(JwtAuthGuard)
@Controller('washeds')
export class UserController {
  constructor(private readonly wservice: WashService) {}

  @Get()
  async findAll( page?: any, limit?: any) {
    return await this.wservice.findAll( page, limit );
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    return await this.wservice.findOne(+id);
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: any) {
    return await this.wservice.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() updateUserDto: any) {
    return await this.wservice.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: any) {
    return await this.wservice.remove(+id);
  }
}
