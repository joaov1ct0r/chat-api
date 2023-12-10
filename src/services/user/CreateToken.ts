import { UserImp } from '@Interfaces/UserImp'
import jwt from 'jsonwebtoken'
import ms from 'ms'

export interface CreateUserTokenServiceImp {
  execute(user: UserImp): string
}

export class CreateUserTokenService implements CreateUserTokenServiceImp {
  private readonly TOKEN_EXPIRES_IN

  constructor() {
    const MS = 1000
    const SECONDS = 60
    const TEN_MINUTES = 10 * SECONDS * MS
    this.TOKEN_EXPIRES_IN = TEN_MINUTES
  }

  public execute(user: UserImp): string {
    const token: string = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
        username: user.name,
      },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: ms(this.TOKEN_EXPIRES_IN) },
    )

    return token
  }
}
