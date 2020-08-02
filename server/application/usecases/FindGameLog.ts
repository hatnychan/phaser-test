import GameLog from '../../domain/models/GameLog'
import IGameLogRepository from '../repositories/IGameLogRepository'

export class FindGameLog {
    private GameLogRepository: IGameLogRepository

    constructor(GameLogRepository: IGameLogRepository) {
        this.GameLogRepository = GameLogRepository
    }

    async execute(cond: { [x: string]: string }): Promise<GameLog[]> {
        const results: GameLog[] = await this.GameLogRepository.find(cond)
        return results
    }
}
export default FindGameLog
