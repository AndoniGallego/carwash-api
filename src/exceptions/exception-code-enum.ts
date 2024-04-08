export enum ExceptionCodeEnum {
    UNHANDLE_ERROR = "UNHANDLE_ERROR",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    USER_PHONE_OR_PATENT_ALREADY_EXISTS = "USER_PHONE_OR_PATENT_ALREADY_EXISTS",
    USER_PHONE_IS_REQUIRED = "USER_PHONE_IS_REQUIRED",
    USER_PASSWORD_IS_REQUIRED = "USER_PASSWORD_IS_REQUIRED",
    PHONE_OR_PASSWORD_INCORRECT = "PHONE_OR_PASSWORD_INCORRECT",
    WASH_ALREADY_EXISTS = "WASH_ALREADY_EXISTS",
    WASH_NOT_FOUND = "WASH_NOT_FOUND"
}

export const ExceptionCodeDescription = new Map<string, string>([
    [ExceptionCodeEnum.UNHANDLE_ERROR, 'Unhandle error'],
    [ExceptionCodeEnum.USER_NOT_FOUND, 'User not found'],
    [ExceptionCodeEnum.USER_PHONE_OR_PATENT_ALREADY_EXISTS, 'User phone or patent already exists'],
    [ExceptionCodeEnum.USER_PHONE_IS_REQUIRED, 'User phone is required'],
    [ExceptionCodeEnum.USER_PASSWORD_IS_REQUIRED, 'User password is required'],
    [ExceptionCodeEnum.PHONE_OR_PASSWORD_INCORRECT, 'Phone or password incorrect'],
    [ExceptionCodeEnum.WASH_ALREADY_EXISTS, 'Wash already exists'],
    [ExceptionCodeEnum.WASH_NOT_FOUND, 'Wash not found']
]);