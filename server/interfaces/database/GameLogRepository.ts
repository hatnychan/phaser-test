import GameLog from '../../domain/models/GameLog'
import IGameLogRepository from '../../application/repositories/IGameLogRepository'

export class GameLogRepository extends IGameLogRepository {
    async find(cond: { [x: string]: string }): Promise<GameLog[]> {
        //TODO キャッシュの情報はquery-result-cacheテーブルに保存される。でもポスグレに保存されるのはちょっと微妙かも。後で調査する
        const results: GameLog[] = await GameLog.find({
            where: cond,
            cache: true
        })
        return results
    }
}
export default GameLogRepository
