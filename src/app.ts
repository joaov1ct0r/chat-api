import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors, { CorsOptions } from 'cors'
import userRouter from './routes/userRoutes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'
import { BaseResponse } from '@Interfaces/BaseResponse'

export default class App {
  public readonly server: express.Application

  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    const corsOptions: CorsOptions = {
      credentials: true,
      exposedHeaders: ['set-cookie'],
    }
    this.server.use(cors(corsOptions))
    this.server.use(cookieParser())
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
  }

  private routes(): void {
    this.server.use('/api/user', userRouter)
    this.server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.server.use((error: any, req: Request, res: BaseResponse<any>) => {
      if (error && error.statusCode && error.message) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
          error: error
        })
      }

      return res.status(500).json({
        message: 'Internal Server error',
        status: 500,
        error: error
      })
    })
  }
}
