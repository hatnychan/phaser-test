import StrParam from '../../domain/models/StrParam'
import IStrParamRepository from '../../application/repositories/IStrParamRepository'

export class StrParamRepository extends IStrParamRepository {
    async findAll(): Promise<StrParam[]> {
        //TODO キャッシュの情報はquery-result-cacheテーブルに保存される。でもポスグレに保存されるのはちょっと微妙かも。後で調査する
        const results: StrParam[] = await StrParam.find({ cache: true })
        return results
    }
}
export default StrParamRepository
