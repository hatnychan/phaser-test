import GameLog from '../../domain/models/GameLog'

export abstract class IGameLogRepository {
    abstract async find(cond: { [x: string]: string }): Promise<GameLog[]>
}
export default IGameLogRepository
