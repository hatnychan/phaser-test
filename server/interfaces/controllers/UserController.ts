import User from '../../domain/models/User'
import IUserRepository from '../../application/repositories/IUserRepository'
import FindOneUser from '../../application/usecases/FindOneUser'
import InsertUser from '../../application/usecases/InsertUser'
import UpdateUser from '../../application/usecases/UpdateUser'

export class UserController {
    private UserRepository: IUserRepository

    constructor(UserRepository: IUserRepository) {
        this.UserRepository = UserRepository
    }

    async findOneUser(cond: { userId: string }): Promise<User | undefined> {
        const findOneUser: FindOneUser = new FindOneUser(this.UserRepository)
        const ret: User | undefined = await findOneUser.execute(cond)
        return ret
    }

    async insertUser(user: User): Promise<void> {
        const insertUser: InsertUser = new InsertUser(this.UserRepository)
        await insertUser.execute(user)
    }

    async updateUser(cond: { userId: string }, updateProp: { [x: string]: string }): Promise<void> {
        const updateUser: UpdateUser = new UpdateUser(this.UserRepository)
        await updateUser.execute(cond, updateProp)
    }
}
export default UserController
