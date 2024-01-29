import { z } from 'zod'
import { Request } from 'express'
import { UserImp } from '@Entities/User'
import { BaseResponse } from '@Interfaces/BaseResponse'
import { ZodBodyValidatorImp } from '@Validators/ZodBodyValidator'
import { CreateUserTokenServiceImp } from '@Services/user/CreateToken'
import { AuthenticateUserServiceImp } from '@Services/user/Authenticate'

const authenticateUserRequestSchema = z.object({
  email: z.string({ required_error: 'EMAIL É OBRIGATORIO' }),
  password: z.string({ required_error: 'SENHA É OBRIGATORIO' }),
})

type AuthenticateUserDTO = z.infer<typeof authenticateUserRequestSchema>

export class AuthenticateUserController {
  private readonly MAX_COOKIE_AGE
  readonly #validator: ZodBodyValidatorImp
  readonly #authenticateUserService: AuthenticateUserServiceImp
  readonly #createUserTokenService: CreateUserTokenServiceImp

  constructor(
    validator: ZodBodyValidatorImp,
    authenticateUserService: AuthenticateUserServiceImp,
    createUserTokenService: CreateUserTokenServiceImp,
  ) {
    const MS = 1000
    const SECONDS = 60
    const TEN_MINUTES = 10 * SECONDS * MS
    this.MAX_COOKIE_AGE = TEN_MINUTES

    this.#validator = validator
    this.#authenticateUserService = authenticateUserService
    this.#createUserTokenService = createUserTokenService
  }

  public async handle(
    req: Request,
    res: BaseResponse<Omit<UserImp, 'password'>>,
  ): Promise<BaseResponse<UserImp>> {
    const user = this.#validator.execute<AuthenticateUserDTO>(
      authenticateUserRequestSchema,
      req.body,
    )

    const authenticatedUser = await this.#authenticateUserService.execute(
      user.email,
      user.password,
    )

    const token = this.#createUserTokenService.execute(authenticatedUser)

    res.cookie('authorization', `Bearer ${token}`, {
      maxAge: this.MAX_COOKIE_AGE,
    })

    res.cookie('user', authenticatedUser, {
      maxAge: this.MAX_COOKIE_AGE,
    })

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      status: 200,
      resource: authenticatedUser,
    })
  }
}
