import User from '../../domain/models/User'

export abstract class IUserRepository {
    abstract async find(cond: { [x: string]: string }): Promise<User[]>
    abstract async create(user: User): Promise<void>
}
export default IUserRepository
