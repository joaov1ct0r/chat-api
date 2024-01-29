import { BadRequest } from '@Errors/BadRequest'
import { Forbidden } from '@Errors/Forbidden'
import { Unauthorized } from '@Errors/Unauthorized'

export abstract class BaseService {
  protected badRequest(message: string): BadRequest {
    return new BadRequest(message)
  }

  protected Forbidden(message: string): Forbidden {
    return new Forbidden(message)
  }

  protected Unauthorized(message: string): Unauthorized {
    return new Unauthorized(message)
  }
}
