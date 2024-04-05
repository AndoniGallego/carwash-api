import { InternalServerErrorException } from '@nestjs/common';
import { ExceptionCodeEnum } from './exception-code-enum';
export class BusinessLogicException extends InternalServerErrorException {

    messageCode: ExceptionCodeEnum

    constructor(messageCode?: ExceptionCodeEnum, message?: string) {
        super();

        this.messageCode = messageCode ? messageCode : ExceptionCodeEnum.UNHANDLE_ERROR;
        this.message = message;
    }
}