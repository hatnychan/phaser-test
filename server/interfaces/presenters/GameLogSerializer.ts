import GameLog from '../../domain/models/GameLog'
import { groupBy } from '../../../common/commonFunction'
import { SerializedGameLog } from '../../../common/types'

export class GameLogSerializer {
    serialize(data: GameLog[]): SerializedGameLog {
        const ret: SerializedGameLog = {}
        groupBy(data, gameLog => gameLog.gameLogCd).forEach(([group, groupData]) => {
            ret[group] = {}
            groupData.forEach(gameLog => {
                ret[group][gameLog.key] = gameLog.value
            })
        })
        return ret
    }
}
