import { FindUserByEmailRepositoryImp } from "@Database/repositories/user/FindByEmail";
import {UserImp} from "@Interfaces/UserImp";
import { BaseService } from "@Services/BaseService";
import bcrypt from "bcrypt"

export interface AuthenticateUserServiceImp {
    execute(email: string, password: string): Promise<UserImp>
}

export class AuthenticateUserService extends BaseService implements AuthenticateUserServiceImp {
    private readonly _findUserByEmailRepository: FindUserByEmailRepositoryImp

    constructor(findUserByEmailRepository: FindUserByEmailRepositoryImp) {
        super()
        this._findUserByEmailRepository = findUserByEmailRepository
    }

    public async execute(email: string, password: string): Promise<UserImp> {
        const isUserAlreadyRegistered = await this._findUserByEmailRepository.execute(email)
        
        if (!isUserAlreadyRegistered) {
            throw this.badRequest('Falha na autenticação!')
        }

        const isUserPasswordCorrectly = bcrypt.compareSync(password, isUserAlreadyRegistered.password)

        if (!isUserPasswordCorrectly) {
            throw this.Unauthorized('Falha autenticação!')
        }

        return isUserAlreadyRegistered
    }

}