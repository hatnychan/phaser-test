import NumParam from '../../../domain/models/NumParam'
import INumParamRepository from '../../../application/repositories/INumParamRepository'
import { Repository, getRepository } from 'typeorm'
import NumParamEntity from '../../../infrastructure/database/entities/NumParam'

export class NumParamRepository extends INumParamRepository {
    private repository!: Repository<NumParam>

    private setRepository(): void {
        if (this.repository === undefined) this.repository = getRepository(NumParamEntity)
    }

    async findAll(): Promise<NumParam[]> {
        this.setRepository()
        const results: NumParam[] = await this.repository.find({ cache: true })
        return results
    }
}
export default NumParamRepository
