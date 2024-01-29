import { ZodError, ZodSchema } from 'zod'
import { BadRequest } from '@Errors/BadRequest'
import { fromZodError } from 'zod-validation-error'

export interface ZodBodyValidatorImp {
  execute<T>(schema: ZodSchema<T>, body: unknown): T
}

export class ZodBodyValidator implements ZodBodyValidatorImp {
  execute<T>(schema: ZodSchema<T>, body: unknown): T {
    try {
      const result = schema.parse(body)
      return result
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequest(
          JSON.stringify({
            message: 'Falha na validação dos dados',
            statusCode: 400,
            errors: fromZodError(error),
          }),
        )
      }

      throw new BadRequest('Falha na validação dos dados', 400)
    }
  }
}
