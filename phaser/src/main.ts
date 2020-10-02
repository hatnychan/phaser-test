// BootstrapのJavaScript側の機能を読み込む
import 'bootstrap'
// スタイルシートを読み込む
import './style.scss'

import phaser from 'phaser'
import * as api from './functions/Api'
import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { PlayScene } from './scenes/PlayScene'

const canvas = document.createElement('canvas')
const gameContainer = document.getElementById('game-screen')
gameContainer?.appendChild(canvas)

const gameStart = async (): Promise<void> => {
    // 初期データ取得
    await api.getParamData()
    await api.getGameLog({ gameLogCd: 'COMMON' })
    await api.getSessionUser()

    // スクリーンサイズパラメータ抽出
    const width = api.numParam.SCREEN_SIZE.WIDTH
    const height = api.numParam.SCREEN_SIZE.HEIGHT

    // シーン描画 ここに必要なものを追加しないとthis.physicsなどが使えない
    new phaser.Game({
        scene: [LoadScene, MenuScene, PlayScene],
        type: phaser.CANVAS, // これを追加しないとcanvas要素に描画できない
        canvas: canvas,
        render: { pixelArt: true },
        physics: {
            // ここにphysicsを追加しないとthis.physicsなどが使えない
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scale: {
            mode: phaser.Scale.FIT,
            parent: 'game-screen',
            width: width,
            height: height
        }
    })
}
gameStart()
