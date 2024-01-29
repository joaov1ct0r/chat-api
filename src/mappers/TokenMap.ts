import { Token, TokenImp } from '@Entities/Token'

export class TokenMap {
  public static toDomain(raw: TokenImp): Token {
    const token = new Token({ id: raw.id, name: raw.name, email: raw.email })

    return token
  }

  public static toPersistance(token: Token): Omit<TokenImp, 'id'> {
    return {
      name: token.name,
      email: token.email,
    }
  }

  public static toDTO(token: Token): TokenImp {
    return {
      id: token.id,
      email: token.email,
      name: token.name,
    }
  }
}
