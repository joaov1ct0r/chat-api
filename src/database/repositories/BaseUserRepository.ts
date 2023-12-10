import User from '@Database/entities/User'
import { Repository } from 'typeorm'

export abstract class BaseUserRepository {
  protected readonly _userRepository: Repository<User>

  constructor(userRepository: Repository<User>) {
    this._userRepository = userRepository
  }
}