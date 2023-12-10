import UserImp from '@Interfaces/UserImp'
import BaseValidator from '@Validators/BaseValidator'
import { SafeParseReturnType, ZodObject, ZodRawShape } from 'zod'

export interface UserValidatorImp {
  validate(
    schema: ZodObject<ZodRawShape>,
    data: object,
  ): SafeParseReturnType<UserImp, UserImp>
}

export class UserValidator
  extends BaseValidator<UserImp>
  implements UserValidatorImp {}
