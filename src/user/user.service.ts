import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException } from 'src/exceptions/business-logic.exception';
import { ExceptionCodeEnum } from 'src/exceptions/exception-code-enum';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<any>,
  ) {}

  async create(createUserDto: any) {

    let vu = await this.userRepository.findOne({
      where: {
        phone: createUserDto.phone,
        patent: createUserDto.patent,
        deleted: false
      }
    })

    if (vu) {
      throw new BusinessLogicException(ExceptionCodeEnum.USER_PHONE_OR_PATENT_ALREADY_EXISTS)
    }

    let u = this.userRepository.create(createUserDto);

    u.password = await u.hashPassword(createUserDto.password);

    return await this.userRepository.save(u);
  }

  async findAll(page: number = 1, limit: number = 10) {
    let [users, total] = await this.userRepository.findAndCount({
      where: {
        deleted: false
      },
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      users,
      total
    }

  }

  async findOne(id: number) {
    let user = await this.userRepository.findOneBy({ id, deleted: false });

    if (!user) {
      throw new BusinessLogicException(ExceptionCodeEnum.USER_NOT_FOUND);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    let user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BusinessLogicException(ExceptionCodeEnum.USER_NOT_FOUND);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await user.hashPassword(updateUserDto.password);
    }

    return await this.userRepository.update(id, updateUserDto);

  }

  async remove(id: number) {
    let user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BusinessLogicException(ExceptionCodeEnum.USER_NOT_FOUND);
    }

    user.deleted = true;
    user.deletedAt = new Date();

    return await this.userRepository.save(user);
  }
}
