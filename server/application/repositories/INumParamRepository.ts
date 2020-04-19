import NumParam from '../../domain/models/NumParam'

export abstract class INumParamRepository {
    abstract async findAll(): Promise<NumParam[]>
}
export default INumParamRepository
