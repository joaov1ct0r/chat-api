import User from '@Database/entities/User'
import { Repository } from 'typeorm'
import databaseClient from '@Database/config/data-source'

export abstract class BaseUserRepository {
  protected readonly _userRepository: Repository<User>

  constructor() {
    this._userRepository = databaseClient.getRepository(User)
  }
}
