import { SafeParseReturnType, ZodObject, ZodRawShape } from 'zod'

export interface BaseValidatorImp<T> {
  validate(
    schema: ZodObject<ZodRawShape>,
    data: object,
  ): SafeParseReturnType<T, T>
}

export default abstract class BaseValidator<T> implements BaseValidatorImp<T> {
  validate(
    schema: ZodObject<ZodRawShape>,
    data: object,
  ): SafeParseReturnType<T, T> {
    const result = schema.safeParse(data)

    return result as SafeParseReturnType<T, T>
  }
}
