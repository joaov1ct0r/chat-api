import { User } from '@Entities/User'
import { BaseUserRepository } from '../BaseUserRepository'
import { UserMap } from '@Mappers/UserMap'

export interface FindUserByEmailRepositoryImp {
  execute(email: string): Promise<User | null>
}

export class FindUserByEmailRepository
  extends BaseUserRepository
  implements FindUserByEmailRepositoryImp
{
  public async execute(email: string): Promise<User | null> {
    const user = await this._userRepository.findOneBy({
      email,
    })

    const userWasntFound = user === null

    if (userWasntFound) return null

    return UserMap.toDomain(user)
  }
}
