import GameLog from '../../domain/models/GameLog'
import FindGameLog from '../../application/usecases/FindGameLog'
import IGameLogRepository from '../../application/repositories/IGameLogRepository'
import { GameLogSerializer } from '../serializers/GameLogSerializer'
import { SerializeGameLog } from '../../../common/types'

export class GameLogController {
    private gameLogSerializer: GameLogSerializer
    private gameLogRepository: IGameLogRepository

    constructor(gameLogRepository: IGameLogRepository) {
        this.gameLogSerializer = new GameLogSerializer()
        this.gameLogRepository = gameLogRepository
    }

    async findGameLog(cond: { [x: string]: string }): Promise<SerializeGameLog> {
        const useCaseGameLog: FindGameLog = new FindGameLog(this.gameLogRepository)
        const results: GameLog[] = await useCaseGameLog.execute(cond)
        const ret: SerializeGameLog = this.gameLogSerializer.serialize(results)
        return ret
    }
}
export default GameLogController
