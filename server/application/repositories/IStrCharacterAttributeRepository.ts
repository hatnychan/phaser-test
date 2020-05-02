import StrCharacterAttribute from '../../domain/models/StrCharacterAttribute'

export abstract class IStrCharacterAttributeRepository {
    abstract async findAll(): Promise<StrCharacterAttribute[]>
}
export default IStrCharacterAttributeRepository
