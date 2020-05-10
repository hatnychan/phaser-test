import StrParam from '../../domain/models/StrParam'
import { groupBy } from '../../../common/commonFunction'
import { SerializeStrParam } from '../../domain/types/ParamData'

export class StrParamSerializer {
    serialize(data: StrParam[]): SerializeStrParam {
        // const result = groupBy(data, param => param.paramCd).map(([group, groupData]) => {
        //     const ret: SerializeStrParam = {
        //         paramCd: group,
        //         value: {}
        //     }
        //     groupData.forEach(param => (ret['value'][param.key] = param.value))
        //     return ret
        // })
        const result = {
            ASSETS_IMAGE: {
                FRAME: 'frame.png',
                LOGO: 'logo.png',
                OPTIONS: 'options_button.png',
                PLAY: 'play_button.png',
                TITLE: 'title_bg.jpg'
            },
            ASSETS_MAP: {
                TILE: 'map_tile.png',
                NPC: 'npc.png'
            },
            ASSETS_AUDIO: { OPENING: 'PerituneMaterial_Splash.mp3' }
        }
        return result
    }
}
