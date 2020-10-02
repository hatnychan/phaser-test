import User from '../../domain/models/User'
import IUserRepository from '../repositories/IUserRepository'

export class FindOneUser {
    private UserRepository: IUserRepository

    constructor(UserRepository: IUserRepository) {
        this.UserRepository = UserRepository
    }

    async execute(cond: { userId: string }): Promise<User | undefined> {
        const result: User | undefined = await this.UserRepository.findOne(cond)
        return result
    }
}
export default FindOneUser
