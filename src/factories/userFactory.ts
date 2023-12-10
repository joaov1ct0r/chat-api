import {AuthenticateUserController} from '@Controllers/user/Authenticate'
import {CreateUserController} from '@Controllers/user/Create'
import { UserValidator } from '@Validators/UserValidator'
import {AuthenticateUserService} from '@Services/user/Authenticate'
import { CreateUserService } from '@Services/user/Create'
import { CreateUserRepository } from '@Database/repositories/user/Create'
import { FindUserByEmailRepository } from '@Database/repositories/user/FindByEmail'
import databaseClient from '@Database/config/data-source'
import User from '@Database/entities/User'
import { CreateUserTokenService } from '@Services/user/CreateToken'

export class UserFactory {
  create(name: string) {
    switch (name) {
      case 'create':
        return new CreateUserController(
          new UserValidator(),
          new CreateUserService(new CreateUserRepository(databaseClient.getRepository(User)), new FindUserByEmailRepository(databaseClient.getRepository(User))),
        )
      case 'authenticate':
        return new AuthenticateUserController(
          new UserValidator(),
          new AuthenticateUserService(new FindUserByEmailRepository(databaseClient.getRepository(User))),
          new CreateUserTokenService()
        )
      default:
        return new CreateUserController(
          new UserValidator(),
          new CreateUserService(new CreateUserRepository(databaseClient.getRepository(User)), new FindUserByEmailRepository(databaseClient.getRepository(User))),
        )
    }
  }
}
