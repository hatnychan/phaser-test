import StrParam from '../../domain/models/StrParam'
import IStrParamRepository from '../repositories/IStrParamRepository'

export class GetAllStrParam {
    private strParamRepository: IStrParamRepository

    constructor(strParamRepository: IStrParamRepository) {
        this.strParamRepository = strParamRepository
    }

    async execute(): Promise<StrParam[]> {
        const results: StrParam[] = await this.strParamRepository.findAll()
        return results
    }
}
export default GetAllStrParam
