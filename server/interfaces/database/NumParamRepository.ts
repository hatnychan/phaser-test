import NumParam from '../../domain/models/NumParam'
import INumParamRepository from '../../application/repositories/INumParamRepository'

export class NumParamRepository extends INumParamRepository {
    async findAll(): Promise<NumParam[]> {
        //TODO キャッシュの情報はquery-result-cacheテーブルに保存される。でもポスグレに保存されるのはちょっと微妙かも。後で調査する
        const results: NumParam[] = await NumParam.find({ cache: true })
        return results
    }
}
export default NumParamRepository
