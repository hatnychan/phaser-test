import GameLog from '../../domain/models/GameLog'
import FindGameLog from '../../application/usecases/FindGameLog'
import IGameLogRepository from '../../application/repositories/IGameLogRepository'
import { SerializedGameLog } from '../presenters/SerializedGameLog'

export class GameLogController {
    private gameLogRepository: IGameLogRepository

    constructor(gameLogRepository: IGameLogRepository) {
        this.gameLogRepository = gameLogRepository
    }

    async findGameLog(cond: { [x: string]: string }): Promise<SerializedGameLog> {
        const findGameLog: FindGameLog = new FindGameLog(this.gameLogRepository)
        const results: GameLog[] = await findGameLog.execute(cond)
        const ret: SerializedGameLog = new SerializedGameLog(results)
        return ret
    }
}
export default GameLogController
