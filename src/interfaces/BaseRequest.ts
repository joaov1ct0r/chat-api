import { Request } from 'express'

export interface BaseRequest<T> extends Request {
  body: T
}
