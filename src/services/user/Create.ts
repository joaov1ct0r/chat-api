import { CreateUserRepositoryImp } from '@Database/repositories/user/Create'
import { FindUserByEmailRepositoryImp } from '@Database/repositories/user/FindByEmail'
import { UserImp } from '@Interfaces/UserImp'
import { BaseService } from '@Services/BaseService'
import bcrypt from 'bcrypt'

export interface CreateUserServiceImp {
  execute(user: UserImp): Promise<UserImp>
}

export class CreateUserService
  extends BaseService
  implements CreateUserServiceImp
{
  private readonly _createUserRepository: CreateUserRepositoryImp
  private readonly _findUserByEmailRepository: FindUserByEmailRepositoryImp

  constructor(
    createUserRepository: CreateUserRepositoryImp,
    findUserByEmailRepository: FindUserByEmailRepositoryImp,
  ) {
    super()
    this._createUserRepository = createUserRepository
    this._findUserByEmailRepository = findUserByEmailRepository
  }

  public async execute(user: UserImp): Promise<UserImp> {
    const userAlreadyRegistered = await this._findUserByEmailRepository.execute(
      user.email,
    )

    if (userAlreadyRegistered) {
      throw this.badRequest('Usúario já cadastrado!')
    }

    const salts = 12
    user.password = bcrypt.hashSync(user.password, salts)

    const createdUser = await this._createUserRepository.execute(user)
    return createdUser
  }
}
