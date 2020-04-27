import NumParam from '../../domain/models/StrParam'

export abstract class IStrParamRepository {
    abstract async findAll(): Promise<NumParam[]>
}
export default IStrParamRepository
