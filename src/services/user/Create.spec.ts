/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt'
import { MockInstance } from 'jest-mock'
import { User, UserImp } from '@Entities/User'
import { BadRequest } from '@Errors/BadRequest'
import { CreateUserService } from '@Services/user/Create'
import { CreateUserRepository } from '@Repositories/user/Create'
import { beforeAll, describe, expect, it, jest } from '@jest/globals'
import { FindUserByEmailRepository } from '@Repositories/user/FindByEmail'

const makeSut = () => {
  const createUserRepository = new CreateUserRepository()
  const findUserByEmailRepository = new FindUserByEmailRepository()
  const sut = new CreateUserService(
    createUserRepository,
    findUserByEmailRepository,
  )

  return { sut }
}

describe('create user service', () => {
  let bcryptSpy: MockInstance<
    (password: string | Buffer, salts: string | number) => string
  >
  let findUserByEmailRepositorySpy: MockInstance<
    (email: string) => Promise<User | null>
  >
  let createUserRepositorySpy: MockInstance<
    (user: Omit<UserImp, 'id' | 'createdAt' | 'updatedAt'>) => Promise<User>
  >

  beforeAll(() => {
    bcryptSpy = jest.spyOn(bcrypt, 'hashSync')
    findUserByEmailRepositorySpy = jest.spyOn(
      FindUserByEmailRepository.prototype,
      'execute',
    )
    createUserRepositorySpy = jest.spyOn(
      CreateUserRepository.prototype,
      'execute',
    )
  })

  it('should throw bad request exception when email isnt available', async () => {
    const { sut } = makeSut()
    findUserByEmailRepositorySpy.mockResolvedValueOnce({
      createdAt: new Date(),
      dateBirth: new Date(),
      email: 'other_email@mail.com',
      id: 'any_id',
      name: 'any_name',
      password: 'any_password',
      updatedAt: null,
    })

    await expect(() =>
      sut.execute({
        dateBirth: new Date(),
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
      }),
    ).rejects.toThrow(BadRequest)
  })

  it('should be able to create new user', async () => {
    const { sut } = makeSut()
    findUserByEmailRepositorySpy.mockResolvedValueOnce(null)
    bcryptSpy.mockReturnValueOnce('password')
    createUserRepositorySpy.mockResolvedValueOnce({
      createdAt: new Date(),
      dateBirth: new Date(),
      email: 'any_email@mail.com',
      id: 'any_id',
      name: 'any_name',
      password: 'any_password',
      updatedAt: null,
    })

    const user = await sut.execute({
      dateBirth: new Date(),
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password',
    })

    expect(user).not.toHaveProperty('password')
  })
})
