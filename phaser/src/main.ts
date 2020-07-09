import phaser from 'phaser'
import { ParamData, SerializeNumParam, SerializeStrParam } from '../../server/domain/types/ParamData'
import * as Api from './functions/Api_mock'
import * as Util from './functions/Util'

import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { PlayScene } from './scenes/PlayScene'

export const api = Api
export const userData = Util.userData
userData.scene = 'MENU'
export let numParam: SerializeNumParam
export let strParam: SerializeStrParam

const canvas = document.createElement('canvas')
const gameContainer = document.getElementById('game-screen')
gameContainer?.appendChild(canvas)

const gameStart = async (): Promise<void> => {
    const paramData: ParamData = await api.getParamData()
    numParam = paramData[0]
    strParam = paramData[1]

    // スクリーンサイズパラメータ抽出
    const width = numParam.SCREEN_SIZE.WIDTH
    const height = numParam.SCREEN_SIZE.HEIGHT

    // シーン描画 ここに必要なものを追加しないとthis.physicsなどが使えない
    new phaser.Game({
        width: width,
        height: height,
        scene: [LoadScene, MenuScene, PlayScene],
        type: phaser.CANVAS, // これを追加しないとcanvas要素に描画できない
        canvas: canvas,
        render: { pixelArt: true },
        physics: {
            // ここにphysicsを追加しないとthis.physicsなどが使えない
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true
            }
        },
        scale: {
            //mode: phaser.Scale.FIT,
            //autoCenter: phaser.Scale.CENTER_HORIZONTALLY
        }
    })
}
gameStart()
