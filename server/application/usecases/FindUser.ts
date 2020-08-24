import User from '../../domain/models/User'
import IUserRepository from '../repositories/IUserRepository'

export class FindUser {
    private UserRepository: IUserRepository

    constructor(UserRepository: IUserRepository) {
        this.UserRepository = UserRepository
    }

    async execute(cond: { [x: string]: string }): Promise<User[]> {
        const results: User[] = await this.UserRepository.find(cond)
        return results
    }
}
export default FindUser
