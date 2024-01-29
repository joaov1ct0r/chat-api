export interface UserImp {
  id: string
  email: string
  name: string
  dateBirth: Date
  password: string
  createdAt: Date
  updatedAt: Date | null
}

export class User implements UserImp {
  readonly id: string
  readonly email: string
  readonly password: string
  readonly name: string
  readonly dateBirth: Date
  readonly createdAt: Date
  readonly updatedAt: Date | null

  constructor({
    id,
    email,
    name,
    dateBirth,
    password,
    createdAt,
    updatedAt,
  }: UserImp) {
    this.id = id
    this.email = email
    this.name = name
    this.dateBirth = dateBirth
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
