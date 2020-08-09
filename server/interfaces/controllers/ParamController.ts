import NumParam from '../../domain/models/NumParam'
import StrParam from '../../domain/models/StrParam'
import FindAllNumParam from '../../application/usecases/FindAllNumParam'
import FindAllStrParam from '../../application/usecases/FindAllStrParam'
import INumParamRepository from '../../application/repositories/INumParamRepository'
import IStrParamRepository from '../../application/repositories/IStrParamRepository'
import { NumParamSerializer } from '../presenters/NumParamSerializer'
import { StrParamSerializer } from '../presenters/StrParamSerializer'
import { ParamData, SerializedNumParam, SerializedStrParam } from '../../../common/types'

export class ParamController {
    private numParamSerializer: NumParamSerializer
    private strParamSerializer: StrParamSerializer
    private numParamRepository: INumParamRepository
    private strParamRepository: IStrParamRepository

    constructor(numParamRepository: INumParamRepository, strParamRepository: IStrParamRepository) {
        this.numParamSerializer = new NumParamSerializer()
        this.strParamSerializer = new StrParamSerializer()
        this.numParamRepository = numParamRepository
        this.strParamRepository = strParamRepository
    }

    async findAllParam(): Promise<ParamData> {
        const useCaseNumParam: FindAllNumParam = new FindAllNumParam(this.numParamRepository)
        const useCaseStrParam: FindAllStrParam = new FindAllStrParam(this.strParamRepository)

        const results: [NumParam[], StrParam[]] = await Promise.all([
            useCaseNumParam.execute(),
            useCaseStrParam.execute()
        ])

        const serializedNumParam: SerializedNumParam = this.numParamSerializer.serialize(results[0])
        const serializedStrParam: SerializedStrParam = this.strParamSerializer.serialize(results[1])
        const ret: ParamData = [serializedNumParam, serializedStrParam]
        return ret
    }
}
export default ParamController
