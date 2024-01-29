import ms from 'ms'
import jwt from 'jsonwebtoken'
import { UserImp } from '@Entities/User'

export interface CreateUserTokenServiceImp {
  execute(user: Omit<UserImp, 'password'>): string
}

export class CreateUserTokenService implements CreateUserTokenServiceImp {
  private readonly TOKEN_EXPIRES_IN

  constructor() {
    const TEN_MINUTES = 10 * 60 * 1000
    this.TOKEN_EXPIRES_IN = ms(TEN_MINUTES)
  }

  public execute(user: Omit<UserImp, 'password'>): string {
    const token: string = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
        username: user.name,
      },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: this.TOKEN_EXPIRES_IN },
    )

    return token
  }
}
