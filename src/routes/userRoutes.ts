import { Router } from 'express'
import {
  UserControllerFactory,
  UserControllerFactoryImp,
} from '@Factories/UserControllerFactory'

const userRouter: Router = Router()
const userFactory: UserControllerFactoryImp = new UserControllerFactory()
const createUser = userFactory.create()
const authenticateUser = userFactory.authenticate()

userRouter.post('/login', (req, res, next) =>
  authenticateUser.handle(req, res).catch(next),
)

userRouter.post('/register', (req, res, next) =>
  createUser.handle(req, res).catch(next),
)

export default userRouter
