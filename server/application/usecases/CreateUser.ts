import User from '../../domain/models/User'
import IUserRepository from '../repositories/IUserRepository'

export class CreateUser {
    private UserRepository: IUserRepository

    constructor(UserRepository: IUserRepository) {
        this.UserRepository = UserRepository
    }

    async execute(user: User): Promise<void> {
        await this.UserRepository.create(user)
    }
}
export default CreateUser
