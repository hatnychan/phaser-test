import NumParam from '../../domain/models/NumParam'
import { groupBy } from '../../../common/commonFunction'
import { SerializeNumParam } from '../../domain/types/ParamData'

export class NumParamSerializer {
    serialize(data: NumParam[]): SerializeNumParam {
        // const result = groupBy(data, param => param.paramCd).map(([group, groupData]) => {
        //     const ret: SerializeNumParam = {
        //         paramCd: group,
        //         value: {}
        //     }
        //     groupData.forEach(param => (ret['value'][param.key] = param.value))
        //     return ret
        // })

        const result = {
            SCREEN_SIZE: { WIDTH: 800, HEIGHT: 600 },
            DISPLAY_SIZE: { WIDTH: 40, HEIGHT: 40 }
        }
        return result
    }
}
