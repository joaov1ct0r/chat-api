import jwt from 'jsonwebtoken'
import { TokenImp } from '@Entities/Token'
import { Forbidden } from '@Errors/Forbidden'
import { BadRequest } from '@Errors/BadRequest'
import { Unauthorized } from '@Errors/Unauthorized'
import { NextFunction, Request, Response } from 'express'

export class Authorization {
  execute(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.cookies.authorization) {
        throw new BadRequest('Cookie "authorization" não encontrado!')
      }

      if (!req.cookies.user) {
        throw new BadRequest('Cookie "user" não encontrado!')
      }

      const token: string = req.cookies.authorization.split(' ')[1]
      let user = req.cookies.user
      user = JSON.parse(user)

      jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET as string,
        {
          ignoreNotBefore: true,
        },
        (err, result) => {
          if (err && err.name === 'TokenExpiredError') {
            throw new Forbidden('Token expirado, faça login novamente!')
          }
          if (err && err.name === 'JsonWebTokenError') {
            throw new Unauthorized(err.message)
          }
          if (
            err &&
            err.name !== 'JsonWebTokenError' &&
            err.name !== 'TokenExpiredError'
          ) {
            throw new Unauthorized('Erro na autenticação do token')
          }

          req.token = result as TokenImp
          req.user = user
          next()
        },
      )
    } catch (error: any) {
      if (error && error.statusCode && error.message) {
        return res
          .status(error.statusCode)
          .json({ status: error.statusCode, message: error.message })
      }

      return res.status(500).json({ message: 'Erro interno', status: 500 })
    }
  }
}
