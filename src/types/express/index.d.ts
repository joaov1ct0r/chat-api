import { User } from '@Entities/User'
import { Token } from '@Entities/Token'

declare global {
  namespace Express {
    interface Request {
      token: Token
      user: User
    }
  }
}
