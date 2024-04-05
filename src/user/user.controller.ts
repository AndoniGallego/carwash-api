import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll( page?: any, limit?: any) {
    return await this.userService.findAll( page, limit );
  }

  @Get(':id')
  async f1(@Param('id') id: string) {
    return await this.userService.findOne(+id)
  }

  @Public()
  @Post()
  async crt(@Body() createUserDto: any) {
    return await this.userService.create(createUserDto)
  }

  @Put(':id')
  async upd(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async rmv(@Param('id') id: any) {
    return await this.userService.remove(+id)
  }
}
