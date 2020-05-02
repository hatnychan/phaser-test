import StrCharacterAttribute from '../../domain/models/StrCharacterAttribute'
import IStrCharacterAttributeRepository from '../../application/repositories/IStrCharacterAttributeRepository'

export class StrCharacterAttributeRepository extends IStrCharacterAttributeRepository {
    async findAll(): Promise<StrCharacterAttribute[]> {
        //TODO キャッシュの情報はquery-result-cacheテーブルに保存される。でもポスグレに保存されるのはちょっと微妙かも。後で調査する
        const results: StrCharacterAttribute[] = await StrCharacterAttribute.find({ cache: true })
        return results
    }
}
export default StrCharacterAttributeRepository
