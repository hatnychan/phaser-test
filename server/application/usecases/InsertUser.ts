import User from '../../domain/models/User'
import IUserRepository from '../repositories/IUserRepository'

export class InsertUser {
    private UserRepository: IUserRepository

    constructor(UserRepository: IUserRepository) {
        this.UserRepository = UserRepository
    }

    async execute(user: User): Promise<void> {
        await this.UserRepository.insert(user)
    }
}
export default InsertUser
