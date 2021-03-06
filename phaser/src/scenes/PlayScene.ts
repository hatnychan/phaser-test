import phaser from 'phaser'
import * as objMan from '../functions/GameObjectManager'
import { MapLayer, SpriteLayer, SpriteObject } from '../../../server/interfaces/presenters/types'
import { gridWalkTween, playCharacterAction } from '../functions/CharacterActionManager'
import * as api from '../functions/Api'
import { outputGameLog } from '../functions/Util'
import { GameState } from '../../../server/interfaces/presenters/GameState'

export class PlayScene extends phaser.Scene {
    // ゲーム状態
    private gameState: GameState = GameState.instance

    // マップ系オブジェクト
    private tileMapLayer: MapLayer = new Map()
    private eventMapLayer: MapLayer = new Map()

    // 文章系オブジェクト
    private quoteFrame!: phaser.GameObjects.Image
    private quote!: phaser.GameObjects.Text
    private quoteContainer!: phaser.GameObjects.Container

    // キャラクターオブジェクト
    private spriteLayer: SpriteLayer = new Map()

    // カーソル
    private cursors!: phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super({ key: 'PLAY' })
    }

    init(): void {
        console.log('init')
        const commonGameLog = api.gameLog.COMMON
        outputGameLog(commonGameLog.WORLD_HAS_CONSTRUCT)
        this.preload(true)
    }

    preload(isPreFuncComplete = false): void {
        if (!isPreFuncComplete) return
        console.log('preload')
        this.create(undefined, true)
    }

    async create(data?: object, isPreFuncComplete = false): Promise<void> {
        if (!isPreFuncComplete) return
        // map、キャラクターオブジェクト
        await Promise.all([
            objMan.createMapObject(this, this.tileMapLayer, this.eventMapLayer),
            objMan.createSpriteObject(this, this.spriteLayer, this.tileMapLayer)
        ])

        // 文章フレーム
        this.quoteFrame = objMan.createQuoteFrameObject(this)
        // 文章
        this.quote = objMan.createQuoteObject(this)
        // 文章コンテナ
        this.quoteContainer = objMan.createQuoteContainerObject(this, this.quoteFrame, this.quote)
        // カーソル
        this.cursors = this.input.keyboard.createCursorKeys()
        // マップイベント接触判定設定
        objMan.setCollisonMapEvent(this, this.eventMapLayer, this.spriteLayer)

        this.gameState.isCreateComplete = true
    }

    update(): void {
        if (!this.gameState.isCreateComplete) return
        // if (this.gameState.isWalking) return
        // if (this.gameState.isTalking) return

        // キャラクターアニメーション開始
        playCharacterAction(this, this.spriteLayer)

        // 天気描画更新
        objMan.updateWeatherSituation(this.tileMapLayer.get('WEATHER'))

        // const CONTROL_CHARA = 'EYEBALL1'
        // let xDir = 0 // x座標の移動方向を表すための変数
        // let yDir = 0 // y座標の移動方向を表すための変数
        // let animState = ''

        // const charaObj: SpriteObject = this.spriteLayer.get(CONTROL_CHARA) as SpriteObject

        // // ここで状態決定（ローカルな変数に格納）
        // if (this.cursors.up != undefined && this.cursors.up.isDown) {
        //     animState = 'walk_front'
        //     yDir = -1
        // } else if (this.cursors.down != undefined && this.cursors.down.isDown) {
        //     animState = 'walk_back'
        //     yDir = 1
        // } else if (this.cursors.left != undefined && this.cursors.left.isDown) {
        //     animState = 'walk_left'
        //     xDir = -1
        // } else if (this.cursors.right != undefined && this.cursors.right.isDown) {
        //     animState = 'walk_right'
        //     xDir = 1
        // } else {
        //     charaObj.spriteObject.anims.stop()
        //     return
        // }
        // this.gameState.isWalking = true

        // // カメラの設定
        // const camera = this.cameras.main
        // camera.startFollow(charaObj.spriteObject)
        // camera.setBounds(0, 0, 800, 600)

        // const charaNewTilePos: TilePos = { tileX: charaObj.x + xDir, tileY: charaObj.y + yDir }
        // this.spriteLayer.set(CONTROL_CHARA, {
        //     spriteObject: charaObj.spriteObject,
        //     x: charaNewTilePos.tileX,
        //     y: charaNewTilePos.tileY,
        //     act: charaObj.act,
        //     isAction: charaObj.isAction
        // })
        // charaObj.spriteObject.anims.play(CONTROL_CHARA + '_' + animState, false)
        // gridWalkTween(this, charaObj.spriteObject, xDir, yDir, () => {
        //     this.gameState.isWalking = false
        // })
    }
}
