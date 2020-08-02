import NumParam from '../../domain/models/NumParam'
import { groupBy } from '../../../common/commonFunction'
import { SerializeNumParam } from '../../../common/types'

export class NumParamSerializer {
    serialize(data: NumParam[]): SerializeNumParam {
        const ret: SerializeNumParam = {}
        groupBy(data, param => param.paramCd).forEach(([group, groupData]) => {
            ret[group] = {}
            groupData.forEach(param => {
                ret[group][param.key] = param.value
            })
        })
        return ret
    }
}
