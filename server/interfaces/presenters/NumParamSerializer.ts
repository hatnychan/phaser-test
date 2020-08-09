import NumParam from '../../domain/models/NumParam'
import { groupBy } from '../../../common/commonFunction'
import { SerializedNumParam } from '../../../common/types'

export class NumParamSerializer {
    serialize(data: NumParam[]): SerializedNumParam {
        const ret: SerializedNumParam = {}
        groupBy(data, param => param.paramCd).forEach(([group, groupData]) => {
            ret[group] = {}
            groupData.forEach(param => {
                ret[group][param.key] = param.value
            })
        })
        return ret
    }
}
