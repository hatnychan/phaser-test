import User from '../../domain/models/User'

export abstract class IUserRepository {
    abstract async findOne(cond: { userId: string }): Promise<User | undefined>
    abstract async insert(user: User): Promise<void>
    abstract async update(cond: { userId: string }, updateProp: { [x: string]: string }): Promise<void>
}
export default IUserRepository
