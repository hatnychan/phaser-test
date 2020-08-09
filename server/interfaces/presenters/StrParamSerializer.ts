import StrParam from '../../domain/models/StrParam'
import { groupBy } from '../../../common/commonFunction'
import { SerializedStrParam } from '../../../common/types'

export class StrParamSerializer {
    serialize(data: StrParam[]): SerializedStrParam {
        const ret: SerializedStrParam = {}
        groupBy(data, param => param.paramCd).forEach(([group, groupData]) => {
            ret[group] = {}
            groupData.forEach(param => {
                ret[group][param.key] = param.value
            })
        })
        return ret
    }
}
