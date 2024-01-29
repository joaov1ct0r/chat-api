import { CreateUserRepository } from '@Repositories/user/Create'
import { FindUserByEmailRepository } from '@Repositories/user/FindByEmail'

export interface UserRepositoryFactoryImp {
  create(): CreateUserRepository
  findByEmail(): FindUserByEmailRepository
}

export class UserRepositoryFactory implements UserRepositoryFactoryImp {
  create(): CreateUserRepository {
    return new CreateUserRepository()
  }

  findByEmail(): FindUserByEmailRepository {
    return new FindUserByEmailRepository()
  }
}
