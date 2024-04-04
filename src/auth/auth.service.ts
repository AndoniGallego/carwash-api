import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLogicException } from 'src/exceptions/business-logic.exception';
import { ExceptionCodeEnum } from 'src/exceptions/exception-code-enum';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  
  async login(phone: number, password: string) {

    if (!phone) {
      throw new BusinessLogicException(ExceptionCodeEnum.USER_PHONE_IS_REQUIRED);
    }

    if (!password) {
      throw new BusinessLogicException(ExceptionCodeEnum.USER_PASSWORD_IS_REQUIRED);
    }

    let user = await this.userRepository.findOneBy({ phone });
    if (!user || !await user.comparePassword(password)) {
      throw new BusinessLogicException(ExceptionCodeEnum.PHONE_OR_PASSWORD_INCORRECT);
    }

    let userData = this.generateJWT(user);

    return {
      token: userData.access_token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        patent: user.patent
      }
    };
  }

  generateJWT(user: User) {
    const payload = {
      userId: user.id,
      role: user.role,
      phone: user.phone,
      patent: user.patent,
      name: user.name
    };

    const expiresIn = 15552000; //aprox 6 meses

    return {
       access_token: this.jwtService.sign(payload, { expiresIn }),
       user,
    };
 }
}
