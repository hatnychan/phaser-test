import NumParam from '../../domain/models/NumParam'
import StrParam from '../../domain/models/StrParam'
import FindAllNumParam from '../../application/usecases/FindAllNumParam'
import FindAllStrParam from '../../application/usecases/FindAllStrParam'
import INumParamRepository from '../../application/repositories/INumParamRepository'
import IStrParamRepository from '../../application/repositories/IStrParamRepository'
import { SerializedNumParam } from '../presenters/SerializedNumParam'
import { SerializedStrParam } from '../presenters/SerializedStrParam'
import { ParamData } from '../presenters/types'

export class ParamController {
    private numParamRepository: INumParamRepository
    private strParamRepository: IStrParamRepository

    constructor(numParamRepository: INumParamRepository, strParamRepository: IStrParamRepository) {
        this.numParamRepository = numParamRepository
        this.strParamRepository = strParamRepository
    }

    async findAllParam(): Promise<ParamData> {
        const findAllNumParam: FindAllNumParam = new FindAllNumParam(this.numParamRepository)
        const findAllStrParam: FindAllStrParam = new FindAllStrParam(this.strParamRepository)

        const results: [NumParam[], StrParam[]] = await Promise.all([
            findAllNumParam.execute(),
            findAllStrParam.execute()
        ])

        const serializedNumParam: SerializedNumParam = new SerializedNumParam(results[0])
        const serializedStrParam: SerializedStrParam = new SerializedStrParam(results[1])
        const ret: ParamData = [serializedNumParam, serializedStrParam]
        return ret
    }
}
export default ParamController
