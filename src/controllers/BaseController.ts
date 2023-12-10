import { z } from 'zod'
import { BadRequest } from '@Errors/BadRequest'
import { Internal } from '@Errors/Internal'
import { Forbidden } from '@Errors/Forbidden'
import { Unauthorized } from '@Errors/Unauthorized'

export abstract class BaseController {
  protected readonly _zod: typeof z

  constructor() {
    this._zod = z
  }

  protected badRequest(message: string): BadRequest {
    return new BadRequest(message)
  }

  protected internal(message: string): Internal {
    return new Internal(message)
  }

  protected forbidden(message: string): Forbidden {
    return new Forbidden(message)
  }

  protected unauthorized(message: string): Unauthorized {
    return new Unauthorized(message)
  }
}
