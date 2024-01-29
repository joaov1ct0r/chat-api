import bcrypt from 'bcrypt'
import { UserImp } from '@Entities/User'
import { UserMap } from '@Mappers/UserMap'
import { BaseService } from '@Services/BaseService'
import { CreateUserRepositoryImp } from '@Repositories/user/Create'
import { FindUserByEmailRepositoryImp } from '@Repositories/user/FindByEmail'

export interface CreateUserServiceImp {
  execute(
    user: Omit<UserImp, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Omit<UserImp, 'password'>>
}

export class CreateUserService
  extends BaseService
  implements CreateUserServiceImp
{
  readonly #hashSalts: number
  readonly #createUserRepository: CreateUserRepositoryImp
  readonly #findUserByEmailRepository: FindUserByEmailRepositoryImp

  constructor(
    createUserRepository: CreateUserRepositoryImp,
    findUserByEmailRepository: FindUserByEmailRepositoryImp,
  ) {
    super()
    this.#createUserRepository = createUserRepository
    this.#findUserByEmailRepository = findUserByEmailRepository
    this.#hashSalts = 12
  }

  public async execute(
    user: Omit<UserImp, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Omit<UserImp, 'password'>> {
    const emailAlreadyRegistered =
      await this.#findUserByEmailRepository.execute(user.email)

    const emailInUseByOtherUser = emailAlreadyRegistered !== null

    if (emailInUseByOtherUser) {
      throw this.badRequest('Email não disponivel')
    }

    user.password = bcrypt.hashSync(user.password, this.#hashSalts)

    const createdUser = await this.#createUserRepository.execute(user)

    return UserMap.toDTO(createdUser)
  }
}
