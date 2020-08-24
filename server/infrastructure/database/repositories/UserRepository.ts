import User from '../../../domain/models/User'
import IUserRepository from '../../../application/repositories/IUserRepository'
import { Repository, getRepository } from 'typeorm'
import UserEntity from '../../../infrastructure/database/entities/User'

export class UserRepository extends IUserRepository {
    private repository!: Repository<User>

    private setRepository(): void {
        if (this.repository === undefined) this.repository = getRepository(UserEntity)
    }

    async find(cond: { [x: string]: string }): Promise<User[]> {
        this.setRepository()
        const results: User[] = await this.repository.find({
            where: cond,
            cache: true
        })
        return results
    }

    async create(user: User): Promise<void> {
        this.setRepository()
        this.repository.save(user)
    }
}
export default UserRepository
