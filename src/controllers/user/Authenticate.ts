import { BaseController } from '@Controllers/BaseController'
import { BaseRequest } from '@Interfaces/BaseRequest'
import { BaseResponse } from '@Interfaces/BaseResponse'
import { UserImp } from '@Interfaces/UserImp'
import { UserValidatorImp } from '@Validators/UserValidator'
import { AuthenticateUserServiceImp } from '@Services/user/Authenticate'
import { CreateUserTokenServiceImp } from '@Services/user/CreateToken'

export class AuthenticateUserController extends BaseController {
  private readonly MAX_COOKIE_AGE
  private readonly _validator: UserValidatorImp
  private readonly _authenticateUserService: AuthenticateUserServiceImp
  private readonly _createUserTokenService: CreateUserTokenServiceImp

  constructor(
    validator: UserValidatorImp,
    authenticateUserService: AuthenticateUserServiceImp,
    createUserTokenService: CreateUserTokenServiceImp,
  ) {
    super()

    const MS = 1000
    const SECONDS = 60
    const TEN_MINUTES = 10 * SECONDS * MS
    this.MAX_COOKIE_AGE = TEN_MINUTES

    this._validator = validator
    this._authenticateUserService = authenticateUserService
    this._createUserTokenService = createUserTokenService
  }

  public async handle(
    req: BaseRequest<UserImp>,
    res: BaseResponse<UserImp>,
  ): Promise<BaseResponse<UserImp>> {
    const schema = this._zod.object({
      email: this._zod.string({ required_error: 'EMAIL É OBRIGATORIO' }),
      password: this._zod.string({ required_error: 'SENHA É OBRIGATORIO' }),
    })

    const data = this._validator.validate(schema, req.body)

    if (!data.success) {
      throw this.badRequest(data.error.issues[0].message)
    }

    const { data: user } = data

    const authenticatedUser: UserImp =
      await this._authenticateUserService.execute(user.email, user.password)

    const token = this._createUserTokenService.execute(authenticatedUser)

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
