import NumCharacterAttribute from '../../domain/models/NumCharacterAttribute'
import INumCharacterAttributeRepository from '../../application/repositories/INumCharacterAttributeRepository'

export class NumCharacterAttributeRepository extends INumCharacterAttributeRepository {
    async findAll(): Promise<NumCharacterAttribute[]> {
        //TODO キャッシュの情報はquery-result-cacheテーブルに保存される。でもポスグレに保存されるのはちょっと微妙かも。後で調査する
        const results: NumCharacterAttribute[] = await NumCharacterAttribute.find({ cache: true })
        return results
    }
}
export default NumCharacterAttributeRepository
