import { afterAll, describe, expect, it, jest } from '@jest/globals'
import { CreateUserTokenService } from '@Services/user/CreateToken'
import jwt from 'jsonwebtoken'

describe('create token service [unit]', () => {
  const sut = new CreateUserTokenService()
  const jwtSpy = jest.spyOn(jwt, 'sign')

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should be able to create token', () => {
    jwtSpy.mockImplementationOnce(() => {
      return 'token'
    })

    const token = sut.execute({
      createdAt: new Date(),
      dateBirth: new Date(),
      email: 'any_email@mail.com',
      id: 'any_id',
      name: 'any_name',
      updatedAt: null,
    })

    expect(token).toEqual('token')
  })
})
