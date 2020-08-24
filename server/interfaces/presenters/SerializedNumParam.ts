import NumParam from '../../domain/models/NumParam'
import { groupBy } from '../../../common/commonFunction'

export class SerializedNumParam {
    [cd: string]: {
        [key: string]: number
    }

    constructor(numParamArray: NumParam[]) {
        groupBy(numParamArray, numParam => numParam.paramCd).forEach(([group, groupData]) => {
            this[group] = {}
            groupData.forEach(numParam => {
                this[group][numParam.key] = numParam.value
            })
        })
    }
}

// NumParam[]を下記のような構造に変える。
// SCREEN_SIZE(メンバ変数) = {
//     WIDTH: 800,
//     HEIGHT: 600
// }
// DISPLAY_TILE_MAP_SIZE(メンバ変数) = {
//     VALUE: 40
// }
