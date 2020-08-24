import User from '../../domain/models/User'
import IUserRepository from '../../application/repositories/IUserRepository'
import FindUser from '../../application/usecases/FindUser'
import CreateUser from '../../application/usecases/CreateUser'

export class UserController {
    private UserRepository: IUserRepository

    constructor(UserRepository: IUserRepository) {
        this.UserRepository = UserRepository
    }

    async findUser(cond: { [x: string]: string }): Promise<User[]> {
        const findUser: FindUser = new FindUser(this.UserRepository)
        const ret: User[] = await findUser.execute(cond)
        return ret
    }

    async createUser(user: User): Promise<void> {
        const createUser: CreateUser = new CreateUser(this.UserRepository)
        await createUser.execute(user)
    }
}
export default UserController
