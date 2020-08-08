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
        //TODO キャッシュの情報はquery-result-cacheテーブルに保存される。でもポスグレに保存されるのはちょっと微妙かも。後で調査する
        const results: NumParam[] = await this.repository.find({ cache: true })
        return results
    }
}
export default NumParamRepository
