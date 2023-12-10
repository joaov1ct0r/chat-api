import { TokenImp } from '@Interfaces/TokenImp'
import UserImp from '@Interfaces/UserImp'

declare global {
  namespace Express {
    interface Request {
      token: TokenImp
      user: UserImp
    }
  }
}
