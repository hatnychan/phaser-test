import * as Phaser from 'phaser'
import axios, { AxiosResponse } from 'axios'
import { NumParam } from './types/numParam.d'

import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { PlayScene } from './scenes/PlayScene'

const SCREEN_SIZE = 'P0001'

axios.get<NumParam[]>('/api/init').then((res: AxiosResponse<NumParam[]>): void => {
    // システムパラメータ全取得
    const param: NumParam[] = res.data

    // スクリーンサイズパラメータ抽出
    const scrnSizeParam: NumParam[] = param.filter(param => param.paramCd === SCREEN_SIZE)
    const width: number = parseInt(scrnSizeParam[0].value)
    const height: number = parseInt(scrnSizeParam[1].value)

    // シーン描画
    new Phaser.Game({
        width: width,
        height: height,
        scene: [LoadScene, MenuScene, PlayScene],
        render: { pixelArt: true }
    })
})
