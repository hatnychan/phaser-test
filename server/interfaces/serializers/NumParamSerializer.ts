import NumParam from '../../domain/models/NumParam'
import { groupBy } from '../../../common/commonFunction'
import { SerializeNumParam } from '../../domain/types/SerializeNumParam'

export class NumParamSerializer {
    serialize(data: NumParam[]): SerializeNumParam[] {
        const result = groupBy(data, param => param.paramCd).map(([group, groupData]) => {
            const ret: SerializeNumParam = {
                paramCd: group,
                value: {}
            }
            groupData.forEach(param => (ret['value'][param.key] = param.value))
            return ret
        })
        return result
    }
}
