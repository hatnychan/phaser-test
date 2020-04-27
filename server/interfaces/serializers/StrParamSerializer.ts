import StrParam from '../../domain/models/StrParam'
import { groupBy } from '../../../common/function/commonFunction'
import { SerializeStrParam } from '../../../common/types/SerializeStrParam'

export class StrParamSerializer {
    serialize(data: StrParam[]): SerializeStrParam[] {
        const result = groupBy(data, param => param.paramCd).map(([group, groupData]) => {
            const ret: SerializeStrParam = {
                paramCd: group,
                value: {}
            }
            groupData.forEach(param => (ret['value'][param.key] = param.value))
            return ret
        })
        return result
    }
}
