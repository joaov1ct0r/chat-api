import { Response } from "express"

export interface BaseJSONBody<T> {
    message: string
    status: number
    resource?: T
    error?: Error
  }
  
  export interface BaseResponse<T> extends Response {
    json(body: BaseJSONBody<T>): any
  }