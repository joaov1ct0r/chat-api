import { CreateUserService } from '@Services/user/Create'
import { CreateUserTokenService } from '@Services/user/CreateToken'
import { AuthenticateUserService } from '@Services/user/Authenticate'
import {
  UserRepositoryFactory,
  UserRepositoryFactoryImp,
} from '@Factories/UserRepositoryFactory'

export interface UserServiceFactoryImp {
  create(): CreateUserService
  authenticate(): AuthenticateUserService
  createToken(): CreateUserTokenService
}

export class UserServiceFactory implements UserServiceFactoryImp {
  readonly #userRepositoryFactory: UserRepositoryFactoryImp

  constructor() {
    this.#userRepositoryFactory = new UserRepositoryFactory()
  }

  create(): CreateUserService {
    return new CreateUserService(
      this.#userRepositoryFactory.create(),
      this.#userRepositoryFactory.findByEmail(),
    )
  }

  authenticate(): AuthenticateUserService {
    return new AuthenticateUserService(
      this.#userRepositoryFactory.findByEmail(),
    )
  }

  createToken(): CreateUserTokenService {
    return new CreateUserTokenService()
  }
}
