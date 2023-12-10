import {UserImp} from "@Interfaces/UserImp"
import { BaseUserRepository } from "../BaseUserRepository"

export interface FindUserByEmailRepositoryImp{
  execute(email: string): Promise<UserImp | null>
}
  
export class FindUserByEmailRepository extends BaseUserRepository implements FindUserByEmailRepositoryImp {
  public async execute(email: string): Promise<UserImp | null> {
    const user = await this._userRepository.findOneBy({
      email
    })

    return user
  }
}