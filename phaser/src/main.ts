import phaser from 'phaser'
import axios from 'axios'
import { SerializeNumParam } from '../../common/types/SerializeNumParam'
import { SerializeStrParam } from '../../common/types/SerializeStrParam'

import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { PlayScene } from './scenes/PlayScene'

const SCREEN_SIZE = 'SCREEN_SIZE'

export let numParam: SerializeNumParam[]
export let strParam: SerializeStrParam[]
axios.get<[SerializeNumParam[], SerializeStrParam[]]>('/api/init').then((res): void => {
    // システムパラメータ全取得
    const param: [SerializeNumParam[], SerializeStrParam[]] = res.data
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
})
