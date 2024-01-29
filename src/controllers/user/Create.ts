import { z } from 'zod'
import { Request } from 'express'
import { UserImp } from '@Entities/User'
import { BaseResponse } from '@Interfaces/BaseResponse'
import { CreateUserServiceImp } from '@Services/user/Create'
import { ZodBodyValidatorImp } from '@Validators/ZodBodyValidator'

const createUserRequestSchema = z.object({
  email: z
    .string({ required_error: 'EMAIL É OBRIGATÓRIO' })
    .min(1, { message: 'EMAIL DEVE CONTER NO MÍNIMO 1 LETRA' }),
  name: z
    .string({ required_error: 'NOME É OBRIGATÓRIO' })
    .min(1, { message: 'NOME DEVE CONTER NO MÍNIMO 1 LETRA' }),
  dateBirth: z.date({ required_error: 'DATA DE NASCIMENTO É OBRIGATORIO' }),
  password: z
    .string({ required_error: 'SENHA É OBRIGATÓRIA' })
    .min(1, { message: 'SENHA DEVE CONTER NO MÍNIMO 1 LETRA' }),
})

type CreateUserDTO = z.infer<typeof createUserRequestSchema>

export class CreateUserController {
  readonly #validator: ZodBodyValidatorImp
  readonly #createUserService: CreateUserServiceImp

  constructor(
    userValidator: ZodBodyValidatorImp,
    createUserService: CreateUserServiceImp,
  ) {
    this.#validator = userValidator
    this.#createUserService = createUserService
  }

  public async handle(
    req: Request,
    res: BaseResponse<Omit<UserImp, 'password'>>,
  ): Promise<BaseResponse<Omit<UserImp, 'password'>>> {
    const user = this.#validator.execute<CreateUserDTO>(
      createUserRequestSchema,
      req.body,
    )

    const createdUser = await this.#createUserService.execute(user)

    return res.status(201).json({
      resource: createdUser,
      status: 201,
      message: 'Usuário criado com sucesso!',
    })
  }
}
