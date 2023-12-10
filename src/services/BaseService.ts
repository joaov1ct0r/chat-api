import { BadRequest } from '@Errors/BadRequest'
import { Forbidden } from '@Errors/Forbidden'
import { Internal } from '@Errors/Internal'
import { Unauthorized } from '@Errors/Unauthorized'

export abstract class BaseService {
  protected badRequest(message: string): BadRequest {
    return new BadRequest(message)
  }

  protected Forbidden(message: string): Forbidden {
    return new Forbidden(message)
  }

  protected Internal(message: string): Internal {
    return new Internal(message)
  }

  protected Unauthorized(message: string): Unauthorized {
    return new Unauthorized(message)
  }
}
