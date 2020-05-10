// import NumParam from '../../domain/models/NumParam'
// import StrParam from '../../domain/models/StrParam'
// import GetAllNumParam from '../../application/usecases/GetAllNumParam'
// import GetAllStrParam from '../../application/usecases/GetAllStrParam'
// import INumParamRepository from '../../application/repositories/INumParamRepository'
// import IStrParamRepository from '../../application/repositories/IStrParamRepository'
// import { NumParamSerializer } from '../serializers/NumParamSerializer'
// import { StrParamSerializer } from '../serializers/StrParamSerializer'
// import { SerializeNumParam } from '../../domain/types/SerializeNumParam'
// import { SerializeStrParam } from '../../domain/types/SerializeStrParam'

// export class ParamController {
//     private numParamSerializer: NumParamSerializer
//     private strParamSerializer: StrParamSerializer
//     private numParamRepository: INumParamRepository
//     private strParamRepository: IStrParamRepository

//     constructor(numParamRepository: INumParamRepository, strParamRepository: IStrParamRepository) {
//         this.numParamSerializer = new NumParamSerializer()
//         this.strParamSerializer = new StrParamSerializer()
//         this.numParamRepository = numParamRepository
//         this.strParamRepository = strParamRepository
//     }

//     async findAllParam(): Promise<[SerializeNumParam[], SerializeStrParam[]]> {
//         const useCaseNumParam: GetAllNumParam = new GetAllNumParam(this.numParamRepository)
//         const useCaseStrParam: GetAllStrParam = new GetAllStrParam(this.strParamRepository)

//         const results: [NumParam[], StrParam[]] = await Promise.all([
//             useCaseNumParam.execute(),
//             useCaseStrParam.execute()
//         ])

//         const numParams: SerializeNumParam[] = this.numParamSerializer.serialize(results[0])
//         const strParams: SerializeStrParam[] = this.strParamSerializer.serialize(results[1])
//         const ret: [SerializeNumParam[], SerializeStrParam[]] = [numParams, strParams]
//         return ret
//     }
// }
// export default ParamController
