import NumCharacterAttribute from '../../domain/models/NumCharacterAttribute'
import INumCharacterAttributeRepository from '../repositories/INumCharacterAttributeRepository'

export class GetAllNumCharacterAttribute {
    private numCharacterAttributeRepository: INumCharacterAttributeRepository

    constructor(numCharacterAttributeRepository: INumCharacterAttributeRepository) {
        this.numCharacterAttributeRepository = numCharacterAttributeRepository
    }

    async execute(): Promise<NumCharacterAttribute[]> {
        const results: NumCharacterAttribute[] = await this.numCharacterAttributeRepository.findAll()
        return results
    }
}
export default GetAllNumCharacterAttribute
