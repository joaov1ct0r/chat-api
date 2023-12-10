import { UserImp } from '@Interfaces/UserImp'
import { BaseUserRepository } from '../BaseUserRepository'

export interface CreateUserRepositoryImp {
  execute(user: UserImp): Promise<UserImp>
}

export class CreateUserRepository
  extends BaseUserRepository
  implements CreateUserRepositoryImp
{
  public async execute(user: UserImp): Promise<UserImp> {
    const createdUser: UserImp = await this._userRepository.save(user)
    return createdUser
  }
}
