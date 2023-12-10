import { BaseController } from '@Controllers/BaseController'
import { UserValidatorImp } from '@Validators/UserValidator'
import { CreateUserServiceImp } from '@Services/user/Create'
import { UserImp } from '@Interfaces/UserImp'
import { BaseRequest } from '@Interfaces/BaseRequest'
import { BaseResponse } from '@Interfaces/BaseResponse'

export class CreateUserController extends BaseController {
  private readonly _validator: UserValidatorImp
  private readonly _createUserService: CreateUserServiceImp

  constructor(
    userValidator: UserValidatorImp,
    createUserService: CreateUserServiceImp,
  ) {
    super()
    this._validator = userValidator
    this._createUserService = createUserService
  }

  public async handle(
    req: BaseRequest<UserImp>,
    res: BaseResponse<UserImp>,
  ): Promise<BaseResponse<UserImp>> {
    const schema = this._zod.object({
      email: this._zod
        .string({ required_error: 'EMAIL É OBRIGATÓRIO' })
        .min(1, { message: 'EMAIL DEVE CONTER NO MÍNIMO 1 LETRA' }),
      name: this._zod
        .string({ required_error: 'NOME É OBRIGATÓRIO' })
        .min(1, { message: 'NOME DEVE CONTER NO MÍNIMO 1 LETRA' }),
      dateBirth: this._zod.string({
        required_error: 'DATA DE NASCIMENTO É OBRIGATÓRIA',
      }),
      password: this._zod
        .string({ required_error: 'SENHA É OBRIGATÓRIA' })
        .min(1, { message: 'SENHA DEVE CONTER NO MÍNIMO 1 LETRA' }),
    })

    const data = this._validator.validate(schema, req.body)

    if (!data.success) {
      throw this.badRequest(data.error.issues[0].message)
    }

    const { data: user } = data

    const createdUser = await this._createUserService.execute(user)

    return res.status(201).json({
      resource: createdUser,
      status: 201,
      message: 'Usuário criado com sucesso!',
    })
  }
}
