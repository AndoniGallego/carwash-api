import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from 'src/exceptions/business-logic.exception';
import { ExceptionCodeEnum } from 'src/exceptions/exception-code-enum';
import { WashServices } from './entities/wash-services.entity';
// import { CreateWashDto } from './dto/create-wash.dto';
// import { UpdateWashDto } from './dto/update-wash.dto';

@Injectable()
export class WashServicesService {

  constructor(
    @InjectRepository(WashServices) private readonly washServicesRepository: Repository<WashServices>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    let [washeds, total] = await this.washServicesRepository.findAndCount({
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

  async findOne(id: any) {
    let washExist = await this.washServicesRepository.findOneBy({ id, deleted: false });

    if (!washExist) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
    }

    console.log('Re valido por las dudas');
    if (washExist.id !== id) {
        if (washExist.deleted === true) {
            throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
        }
    }
    console.log('Pase la validacion');

    console.log('Retorno lo que encontre');
    return washExist;
  }

  async create(createWashService: any) {

    let verifywash = await this.washServicesRepository.findOne({
      where: {
        title: createWashService.title,
        description: createWashService.description,
        deleted: false
      }
    });

    if (verifywash) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_ALREADY_EXISTS);
    }

    console.log('Escribo validacion');
    if (verifywash.title === createWashService.title) {
        if (verifywash.description === createWashService.description) {
            if (verifywash.deleted === false) {
                throw new BusinessLogicException(ExceptionCodeEnum.WASH_ALREADY_EXISTS);
            }
        }
    }
    console.log('Paso la validacion');

    let newWashService = new WashServices();
    newWashService.title = createWashService.title;
    newWashService.description = createWashService.description;

    return await this.washServicesRepository.save(newWashService);
  }

  async update(id: any, updateWashServiceDto: any) {

    let washExist = await this.washServicesRepository.findOneBy({ id });

    if (!washExist) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
    }

    return await this.washServicesRepository.update(id, updateWashServiceDto);

  }

  async remove(id: any) {
    let washServiceExist = await this.washServicesRepository.findOneBy({ id });

    if (!washServiceExist) {
      throw new BusinessLogicException(ExceptionCodeEnum.WASH_NOT_FOUND);
    }

    washServiceExist.deleted = true;
    washServiceExist.deletedAt = new Date();

    return await this.washServicesRepository.save(washServiceExist);
  }
}
