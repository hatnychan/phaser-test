import phaser from 'phaser'
import { SerializeNumParam } from '../../server/domain/types/SerializeNumParam'
import { SerializeStrParam } from '../../server/domain/types/SerializeStrParam'
// import { getInitData } from '../src/functions/api'
import { getInitData } from '../src/functions/api_mock'

import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { PlayScene } from './scenes/PlayScene'

const SCREEN_SIZE = 'SCREEN_SIZE'

export let numParam: SerializeNumParam[]
export let strParam: SerializeStrParam[]
const gameStart = async (): Promise<void> => {
    const param: [SerializeNumParam[], SerializeStrParam[]] = await getInitData
    numParam = param[0]
    strParam = param[1]

    // スクリーンサイズパラメータ抽出
    const scrnSizeParam: SerializeNumParam = numParam.filter(numParam => numParam.paramCd === SCREEN_SIZE)[0]
    const width = scrnSizeParam.value.WIDTH
    const height = scrnSizeParam.value.HEIGHT

    // シーン描画
    new phaser.Game({
        width: width,
        height: height,
        scene: [LoadScene, MenuScene, PlayScene],
        render: { pixelArt: true }
    })
}
gameStart()
