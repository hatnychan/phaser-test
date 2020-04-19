import GetNumParam from '../../application/usecases/GetNumParam'
import NumParam from '../../domain/models/NumParam'
import INumParamRepository from '../../application/repositories/INumParamRepository'

export class NumParamController {
    private numParamRepository: INumParamRepository

    constructor(numParamRepository: INumParamRepository) {
        this.numParamRepository = numParamRepository
    }

    async findAllNumParam(): Promise<NumParam[]> {
        const useCase = new GetNumParam(this.numParamRepository)
        const result = await useCase.execute()
        return result
    }
}
export default NumParamController
