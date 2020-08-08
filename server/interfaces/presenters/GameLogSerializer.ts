import GameLog from '../../domain/models/GameLog'
import { groupBy } from '../../../common/commonFunction'
import { SerializeGameLog } from '../../../common/types'

export class GameLogSerializer {
    serialize(data: GameLog[]): SerializeGameLog {
        const ret: SerializeGameLog = {}
        groupBy(data, gameLog => gameLog.gameLogCd).forEach(([group, groupData]) => {
            ret[group] = {}
            groupData.forEach(gameLog => {
                ret[group][gameLog.key] = gameLog.value
            })
        })
        return ret
    }
}
