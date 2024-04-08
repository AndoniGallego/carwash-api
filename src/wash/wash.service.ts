import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from 'src/exceptions/business-logic.exception';
import { ExceptionCodeEnum } from 'src/exceptions/exception-code-enum';
import { Wash } from './entities/wash.entity';
import { CreateWashDto } from './dto/create-wash.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdateWashDto } from './dto/update-wash.dto';

@Injectable()
export class WashService {

  constructor(
    @InjectRepository(Wash) private readonly washRepository: Repository<Wash>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    let [washeds, total] = await this.washRepository.findAndCount({
      where: {
        deleted: false
      },
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      washeds,
      total
    }

  }

  async findOne(id: number) {
    let washExist = await this.washRepository.findOneBy({ id, deleted: false });

    if (!washExist) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
    }

    return washExist;
  }

  async create(createWash: CreateWashDto) {

    let verifywash = await this.washRepository.findOne({
      where: {
        'user': { id: createWash.userId },
        deleted: false
      }
    });

    if (verifywash) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_ALREADY_EXISTS);
    }

    let newWash = new Wash();
    newWash.patent = createWash.patent;
    newWash.user = await this.userRepository.findOne({ where: { id: createWash.userId } });

    return await this.washRepository.save(newWash);
  }

  async update(id: number, updateUserDto: UpdateWashDto) {

    let washExist = await this.washRepository.findOneBy({ id });

    if (!washExist) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
    }

    return await this.washRepository.update(id, updateUserDto);

  }

  async remove(id: number) {
    let washExist = await this.washRepository.findOneBy({ id });

    if (!washExist) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
    }

    washExist.deleted = true;
    washExist.deletedAt = new Date();

    return await this.washRepository.save(washExist);
  }
}
