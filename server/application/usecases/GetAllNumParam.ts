import NumParam from '../../domain/models/NumParam'
import INumParamRepository from '../repositories/INumParamRepository'

export class GetAllNumParam {
    private numParamRepository: INumParamRepository

    constructor(numParamRepository: INumParamRepository) {
        this.numParamRepository = numParamRepository
    }

    async execute(): Promise<NumParam[]> {
        const results: NumParam[] = await this.numParamRepository.findAll()
        return results
    }
}
export default GetAllNumParam
