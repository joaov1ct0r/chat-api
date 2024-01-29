/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt'
import { User } from '@Entities/User'
import { MockInstance } from 'jest-mock'
import { BadRequest } from '@Errors/BadRequest'
import { Unauthorized } from '@Errors/Unauthorized'
import { beforeAll, describe, expect, it, jest } from '@jest/globals'
import { AuthenticateUserService } from '@Services/user/Authenticate'
import { FindUserByEmailRepository } from '@Repositories/user/FindByEmail'

const makeSut = () => {
  const findUserByEmailRepository = new FindUserByEmailRepository()
  const sut = new AuthenticateUserService(findUserByEmailRepository)

  return { sut }
}

describe('authenticate user service [unit]', () => {
  let findUserByEmailRepositorySpy: MockInstance<
    (email: string) => Promise<User | null>
  >
  let bcryptSpy: MockInstance<(data: string, hash: string) => boolean>

  beforeAll(() => {
    findUserByEmailRepositorySpy = jest.spyOn(
      FindUserByEmailRepository.prototype,
      'execute',
    )

    bcryptSpy = jest.spyOn(bcrypt, 'compareSync')
  })

  it('should throw bad request exception when user isnt found', async () => {
    const { sut } = makeSut()
    findUserByEmailRepositorySpy.mockResolvedValueOnce(null)

    await expect(() =>
      sut.execute('any_email@mail.com', 'any_password'),
    ).rejects.toThrow(BadRequest)
  })

  it('should throw bad request exception when passwords isnt equal', async () => {
    const { sut } = makeSut()
    findUserByEmailRepositorySpy.mockResolvedValueOnce({
      createdAt: new Date(),
      dateBirth: new Date(),
      password: 'flakdsjflksjfldk',
      email: 'any_email@mail.com',
      id: '5793845794387',
      name: 'any_name',
      updatedAt: null,
    })
    bcryptSpy.mockReturnValueOnce(false)

    await expect(() =>
      sut.execute('any_email@mail.com', 'any_password'),
    ).rejects.toThrow(Unauthorized)
  })

  it('should be able to authenticate user', async () => {
    const { sut } = makeSut()
    findUserByEmailRepositorySpy.mockResolvedValueOnce({
      createdAt: new Date(),
      dateBirth: new Date(),
      password: 'any_password',
      email: 'any_email@mail.com',
      id: '5793845794387',
      name: 'any_name',
      updatedAt: null,
    })
    bcryptSpy.mockReturnValueOnce(true)

    const user = await sut.execute('any_email@mail.com', 'any_password')

    expect(user).not.toHaveProperty('password')
  })
})
