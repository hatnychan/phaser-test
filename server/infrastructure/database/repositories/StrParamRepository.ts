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
        //TODO キャッシュの情報はquery-result-cacheテーブルに保存される。でもポスグレに保存されるのはちょっと微妙かも。後で調査する
        const results: StrParam[] = await this.repository.find({ cache: true })
        return results
    }
}
export default StrParamRepository
