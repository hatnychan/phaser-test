import IUserRepository from '../repositories/IUserRepository'

export class UpdateUser {
    private UserRepository: IUserRepository

    constructor(UserRepository: IUserRepository) {
        this.UserRepository = UserRepository
    }

    async execute(cond: { userId: string }, updateProp: { [x: string]: string }): Promise<void> {
        await this.UserRepository.update(cond, updateProp)
    }
}
export default UpdateUser
