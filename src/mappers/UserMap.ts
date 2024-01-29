import { User, UserImp } from '@Entities/User'

export class UserMap {
  public static toDomain(raw: UserImp): User {
    const user = new User({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      name: raw.name,
      dateBirth: raw.dateBirth,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })

    return user
  }

  public static toPersistance(user: User): Omit<UserImp, 'id' | 'createdAt'> {
    return {
      email: user.email,
      password: user.password,
      name: user.name,
      dateBirth: user.dateBirth,
      updatedAt: user.updatedAt,
    }
  }

  public static toDTO(user: User): Omit<UserImp, 'password'> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      dateBirth: user.dateBirth,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
