import NumCharacterAttribute from '../../domain/models/NumCharacterAttribute'

export abstract class INumCharacterAttributeRepository {
    abstract async findAll(): Promise<NumCharacterAttribute[]>
}
export default INumCharacterAttributeRepository
