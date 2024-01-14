import { describe, expect, it } from '@jest/globals'
import { sum } from '@Services/user/sum'

describe('create user service', () => {
  it('should sum', () => {
    const result = sum(1, 1)
    expect(result).toEqual(2)
  })
})
