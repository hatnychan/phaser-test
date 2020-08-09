import StrParam from '../../../domain/models/StrParam'
import IStrParamRepository from '../../../application/repositories/IStrParamRepository'
import { Repository, getRepository } from 'typeorm'
import StrParamEntity from '../../../infrastructure/database/entities/StrParam'

export class StrParamRepository extends IStrParamRepository {
    private repository!: Repository<StrParam>

    private setRepository(): void {
        if (this.repository === undefined) this.repository = getRepository(StrParamEntity)
    }

    async findAll(): Promise<StrParam[]> {
        this.setRepository()
        const results: StrParam[] = await this.repository.find({ cache: true })
        return results
    }
}
export default StrParamRepository
