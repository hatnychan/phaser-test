import GameLog from '../../../domain/models/GameLog'
import IGameLogRepository from '../../../application/repositories/IGameLogRepository'
import { Repository, getRepository } from 'typeorm'
import GameLogEntity from '../../../infrastructure/database/entities/GameLog'

export class GameLogRepository extends IGameLogRepository {
    private repository!: Repository<GameLog>

    private setRepository(): void {
        if (this.repository === undefined) this.repository = getRepository(GameLogEntity)
    }

    async find(cond: { [x: string]: string }): Promise<GameLog[]> {
        this.setRepository()
        // TODO キャッシュの情報はquery-result-cacheテーブルに保存される。でもポスグレに保存されるのはちょっと微妙かも。後で調査する
        const results: GameLog[] = await this.repository.find({
            where: cond,
            cache: true
        })
        return results
    }
}
export default GameLogRepository
