import bcrypt from 'bcrypt'
import { UserImp } from '@Entities/User'
import { UserMap } from '@Mappers/UserMap'
import { BaseService } from '@Services/BaseService'
import { FindUserByEmailRepositoryImp } from '@Repositories/user/FindByEmail'

export interface AuthenticateUserServiceImp {
  execute(email: string, password: string): Promise<Omit<UserImp, 'password'>>
}

export class AuthenticateUserService
  extends BaseService
  implements AuthenticateUserServiceImp
{
  private readonly _findUserByEmailRepository: FindUserByEmailRepositoryImp

  constructor(findUserByEmailRepository: FindUserByEmailRepositoryImp) {
    super()
    this._findUserByEmailRepository = findUserByEmailRepository
  }

  public async execute(
    email: string,
    password: string,
  ): Promise<Omit<UserImp, 'password'>> {
    const isUserAlreadyRegistered =
      await this._findUserByEmailRepository.execute(email)

    const userWasntFound = isUserAlreadyRegistered === null

    if (userWasntFound) {
      throw this.badRequest('Falha na autenticação!')
    }

    const isUserPasswordCorrectly = bcrypt.compareSync(
      password,
      isUserAlreadyRegistered.password,
    )

    const passwordIsntEqual = isUserPasswordCorrectly === false

    if (passwordIsntEqual) {
      throw this.Unauthorized('Falha autenticação!')
    }

    return UserMap.toDTO(isUserAlreadyRegistered)
  }
}
