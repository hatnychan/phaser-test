import User from '../../../domain/models/User'
import IUserRepository from '../../../application/repositories/IUserRepository'
import { Repository, getRepository } from 'typeorm'
import UserEntity from '../../../infrastructure/database/entities/User'

export class UserRepository extends IUserRepository {
    private repository!: Repository<User>

    private setRepository(): void {
        if (!this.repository) this.repository = getRepository(UserEntity)
    }

    async findOne(cond: { userId: string }): Promise<User | undefined> {
        this.setRepository()
        const result: User | undefined = await this.repository.findOne({
            where: cond
            // cache: true
        })
        return result
    }

    async insert(user: User): Promise<void> {
        this.setRepository()
        this.repository.insert(user)
    }

    async update(cond: { userId: string }, updateProp: { [x: string]: string }): Promise<void> {
        this.setRepository()
        this.repository.update(cond, updateProp)
    }
}
export default UserRepository
