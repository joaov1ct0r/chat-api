export interface TokenImp {
  id: string
  name: string
  email: string
}

export class Token implements TokenImp {
  readonly id: string
  readonly name: string
  readonly email: string

  constructor({ id, name, email }: TokenImp) {
    this.id = id
    this.name = name
    this.email = email
  }
}
