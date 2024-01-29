import { CreateUserController } from '@Controllers/user/Create'
import { CreateUserTokenService } from '@Services/user/CreateToken'
import { AuthenticateUserController } from '@Controllers/user/Authenticate'
import {
  ZodBodyValidator,
  ZodBodyValidatorImp,
} from '@Validators/ZodBodyValidator'
import {
  UserServiceFactory,
  UserServiceFactoryImp,
} from '@Factories/UserServiceFactory'

export interface UserControllerFactoryImp {
  create(): CreateUserController
  authenticate(): AuthenticateUserController
}

export class UserControllerFactory implements UserControllerFactoryImp {
  readonly #userServiceFactory: UserServiceFactoryImp
  readonly #zodBodyValidator: ZodBodyValidatorImp

  constructor() {
    this.#userServiceFactory = new UserServiceFactory()
    this.#zodBodyValidator = new ZodBodyValidator()
  }

  create(): CreateUserController {
    return new CreateUserController(
      this.#zodBodyValidator,
      this.#userServiceFactory.create(),
    )
  }

  authenticate(): AuthenticateUserController {
    return new AuthenticateUserController(
      new ZodBodyValidator(),
      this.#userServiceFactory.authenticate(),
      new CreateUserTokenService(),
    )
  }
}
