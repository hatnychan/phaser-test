import NumParam from '../../domain/models/NumParam'
import INumParamRepository from '../../application/repositories/INumParamRepository'

export class NumParamRepository extends INumParamRepository {
    async findAll(): Promise<NumParam[]> {
        //キャッシュの情報はquery-result-cacheテーブルに保存される。でもDBに保存されるのはちょっと微妙かも
        const results: NumParam[] = await NumParam.find({ cache: true })
        return results
    }
}
export default NumParamRepository
