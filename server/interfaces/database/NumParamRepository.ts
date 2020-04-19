import NumParam from '../../domain/models/NumParam'
import INumParamRepository from '../../application/repositories/INumParamRepository'

export class NumParamRepository extends INumParamRepository {
    async findAll(): Promise<NumParam[]> {
        // const results: NumParam[] = await NumParam.find({ cache: true })
        //cacheがtrueだとエラー発生。。。なんで！？
        const results: NumParam[] = await NumParam.find({ cache: true })
        return results
    }
}
export default NumParamRepository
