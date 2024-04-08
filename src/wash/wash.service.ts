import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from 'src/exceptions/business-logic.exception';
import { ExceptionCodeEnum } from 'src/exceptions/exception-code-enum';
import { Wash } from './entities/wash.entity';

@Injectable()
export class WashService {

  constructor(
    @InjectRepository(Wash) private readonly washbd: Repository<Wash>,
  ) {}

  async create(createWash: any) {

    let verifywash = await this.washbd.findOne({
      where: {
        user: createWash.user,
        deleted: false
      }
    });

    console.log('linea 24');
    console.log(verifywash);

    if (verifywash) {
        if (!verifywash.deleted) {
            if (verifywash.user == createWash.user) {
                throw new BusinessLogicException(ExceptionCodeEnum.WASH_ALREADY_EXIST);
            }
        }
    }

    console.log('Si llego aca pase la validacion');

    let nw = this.washbd.create(verifywash);

    return await this.washbd.save(nw);
  }

  async findAll(page: any = 1, limit: any = 10) {
    let [washeds, total] = await this.washbd.findAndCount({
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
    let ws = await this.washbd.findOneBy({ id, deleted: false });

    if (!ws) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
    }

    console.log('revalidop por las dudas');
    if (ws) {
        if (ws.deleted) {
            throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
        }
    }

    console.log('Si llego aca pase la validacion');

    return ws;
  }

  async update(id: any, updateUserDto: any) {

    let wsh = await this.washbd.findOneBy({ id });

    if (!wsh) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
    }

    return await this.washbd.update(id, updateUserDto);

  }

  async remove(id: number) {
    let wsh = await this.washbd.findOneBy({ id });

    if (!wsh) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
    }

    wsh.deleted = true;
    wsh.deletedAt = new Date();

    return await this.washbd.save(wsh);
  }
}
