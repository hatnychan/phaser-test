import StrCharacterAttribute from '../../domain/models/StrCharacterAttribute'
import IStrCharacterAttributeRepository from '../repositories/IStrCharacterAttributeRepository'

export class GetAllStrCharacterAttribute {
    private StrCharacterAttributeRepository: IStrCharacterAttributeRepository

    constructor(StrCharacterAttributeRepository: IStrCharacterAttributeRepository) {
        this.StrCharacterAttributeRepository = StrCharacterAttributeRepository
    }

    async execute(): Promise<StrCharacterAttribute[]> {
        const results: StrCharacterAttribute[] = await this.StrCharacterAttributeRepository.findAll()
        return results
    }
}
export default GetAllStrCharacterAttribute
