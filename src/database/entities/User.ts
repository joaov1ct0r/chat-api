import { UserImp } from '@Entities/User'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
class User implements UserImp {
  @PrimaryColumn()
  id: string

  @Column()
  email: string

  @Column()
  name: string

  @Column()
  dateBirth: Date

  @Column()
  password: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date | null

  constructor({
    dateBirth,
    email,
    id,
    name,
    password,
    createdAt,
    updatedAt,
  }: UserImp) {
    this.dateBirth = dateBirth
    this.email = email
    this.id = id
    this.name = name
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

export default User
