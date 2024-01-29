import { z } from 'zod'
import { BadRequest } from '@Errors/BadRequest'
import { beforeAll, describe, expect, it } from '@jest/globals'
import {
  ZodBodyValidator,
  ZodBodyValidatorImp,
} from '@Validators/ZodBodyValidator'

const userSchema = z.object({ user: z.string() })
type User = z.infer<typeof userSchema>

describe('zod validator body [unit]', () => {
  let sut: ZodBodyValidatorImp

  beforeAll(() => {
    sut = new ZodBodyValidator()
  })

  it('should throw bad request error if validation fails', () => {
    expect(() => sut.execute<User>(userSchema, {})).toThrowError(BadRequest)
  })

  it('should return object if validation succeeds', () => {
    const user: User = { user: 'john doe' }

    const validatedBody = sut.execute<User>(userSchema, user)

    expect(validatedBody).not.toBeNull()
    expect(validatedBody).toEqual(user)
  })
})
