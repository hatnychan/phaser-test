import phaser from 'phaser'
import { ParamData, SerializedNumParam, SerializedStrParam } from '../../common/types'
import * as api from './functions/Api'
import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { PlayScene } from './scenes/PlayScene'
import { UserData } from '../../common/types'

export let numParam: SerializedNumParam
export let strParam: SerializedStrParam
export let userData: UserData
export let commonGameLog: { [x: string]: string }

const canvas = document.createElement('canvas')
const gameContainer = document.getElementById('game-screen')
gameContainer?.appendChild(canvas)

// twitter認証で取得
const userId = ''

const gameStart = async (): Promise<void> => {
    userData = await api.getUserData(userId)
    commonGameLog = (await api.getGameLog({ gameLogCd: 'COMMON' })).COMMON
    userData.scene = 'MENU'
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
