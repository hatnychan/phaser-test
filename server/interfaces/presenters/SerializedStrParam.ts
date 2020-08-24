import StrParam from '../../domain/models/StrParam'
import { groupBy } from '../../../common/commonFunction'

export class SerializedStrParam {
    [cd: string]: {
        [key: string]: string
    }

    constructor(numParamArray: StrParam[]) {
        groupBy(numParamArray, strParam => strParam.paramCd).forEach(([group, groupData]) => {
            this[group] = {}
            groupData.forEach(strParam => {
                this[group][strParam.key] = strParam.value
            })
        })
    }
}

// StrParam[]を下記のような構造に変える。
// ASSETS_IMAGE(メンバ変数) = {
//     FRAME: 'frame.png',
//     LOGO: 'logo.png',
//     OPTIONS: 'options_button.png',
//     PLAY: 'play_button.png',
//     TITLE: 'title_bg.jpg'
// }
// ASSETS_AUDIO(メンバ変数) = {
//     OPENING: 'PerituneMaterial_Splash.mp3'
// }
