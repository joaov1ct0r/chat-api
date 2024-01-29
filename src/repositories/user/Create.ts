import { UserMap } from '@Mappers/UserMap'
import { User, UserImp } from '@Entities/User'
import { BaseUserRepository } from '../BaseUserRepository'
import { randomUUID } from 'node:crypto'

export interface CreateUserRepositoryImp {
  execute(user: Omit<UserImp, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
}

export class CreateUserRepository
  extends BaseUserRepository
  implements CreateUserRepositoryImp
{
  public async execute(
    user: Omit<UserImp, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const persistanceUser = await this._userRepository.save({
      id: randomUUID(),
      email: user.email,
      password: user.password,
      name: user.name,
      dateBirth: user.dateBirth,
      createdAt: new Date(),
      updatedAt: null,
    })

    return UserMap.toDomain(persistanceUser)
  }
}
