import phaser from 'phaser'
import * as objMan from '../functions/GameObjectManager'
import { userData } from '../main'
import { MoveDir } from '../../../server/domain/types/MoveDir'
import { WalkAnimState } from '../../../server/domain/types/WalkAnimState'
import { TilePos } from '../../../server/domain/types/TilePos'
import { SpriteLayer, SpriteObject } from '../../../server/domain/types/SpriteLayer'

const CONTROL_CHARA = 'EYEBALL1'
export class PlayScene extends phaser.Scene {
    // ゲーム状態
    private gameState = {
        isWalking: false,
        isTalking: false,
        isCreateComplete: false
    }

    // マップ系オブジェクト
    private tileMapLayer: Map<string, phaser.Tilemaps.StaticTilemapLayer> = new Map()
    private eventMapLayer: Map<string, phaser.Tilemaps.StaticTilemapLayer> = new Map()

    // 文章系オブジェクト
    private quoteFrame!: phaser.GameObjects.Image
    private quote!: phaser.GameObjects.Text
    private quoteContainer!: phaser.GameObjects.Container

    // キャラクターオブジェクト
    spriteLayer: SpriteLayer = new Map()

    // カーソル
    private cursors!: phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super({ key: 'PLAY' })
    }

    init(): void {
        console.log('init')
    }

    preload(): void {
        console.log('preload')
    }

    async create(): Promise<void> {
        // mapレイヤー
        // キャラクターオブジェクト
        await Promise.all([
            objMan.createMapObject(this, userData, this.tileMapLayer, this.eventMapLayer),
            objMan.createSpriteObject(this, userData, this.spriteLayer, this.tileMapLayer)
        ])

        // 文章フレーム
        this.quoteFrame = objMan.createQuoteFrameObject(this)
        // 文章
        this.quote = objMan.createQuoteObject(this)
        // 文章コンテナ
        this.quoteContainer = objMan.createQuoteContainerObject(this, this.quoteFrame, this.quote)
        // カーソル
        this.cursors = this.input.keyboard.createCursorKeys()

        this.gameState.isCreateComplete = true
    }

    update(): void {
        if (!this.gameState.isCreateComplete) return
        if (this.gameState.isWalking) return
        if (this.gameState.isTalking) return

        let xDir: MoveDir = 0 // x座標の移動方向を表すための変数
        let yDir: MoveDir = 0 // y座標の移動方向を表すための変数
        let animState: WalkAnimState = ''

        const charaObj: SpriteObject = this.spriteLayer.get(CONTROL_CHARA) as SpriteObject

        // ここで状態決定（ローカルな変数に格納）
        if (this.cursors.up != undefined && this.cursors.up.isDown) {
            animState = 'walk_front'
            yDir = -1
        } else if (this.cursors.down != undefined && this.cursors.down.isDown) {
            animState = 'walk_back'
            yDir = 1
        } else if (this.cursors.left != undefined && this.cursors.left.isDown) {
            animState = 'walk_left'
            xDir = -1
        } else if (this.cursors.right != undefined && this.cursors.right.isDown) {
            animState = 'walk_right'
            xDir = 1
        } else {
            charaObj.spriteObject.anims.stop()
            return
        }
        this.gameState.isWalking = true
        const charaNewTilePos: TilePos = { tileX: charaObj.x + xDir, tileY: charaObj.y + yDir }
        this.spriteLayer.set(CONTROL_CHARA, {
            spriteObject: charaObj.spriteObject,
            x: charaNewTilePos.tileX,
            y: charaNewTilePos.tileY
        })
        charaObj.spriteObject.anims.play(CONTROL_CHARA + '_' + animState, false)
        this.gridWalkTween(charaObj.spriteObject, 40, xDir, yDir, () => {
            this.gameState.isWalking = false
        })
    }

    // グリッド移動
    private gridWalkTween(
        target: phaser.GameObjects.Sprite,
        baseSpeed: number,
        xDir: MoveDir,
        yDir: MoveDir,
        onComplete: () => void
    ): void {
        const tween: phaser.Tweens.Tween = this.add.tween({
            // 対象のオブジェクト
            targets: [target],
            // X座標の移動を設定
            x: {
                getStart: (): number => target.x,
                getEnd: (): number => target.x + baseSpeed * xDir
            },
            // X座標の移動を設定
            y: {
                getStart: (): number => target.y,
                getEnd: (): number => target.y + baseSpeed * yDir
            },
            // アニメーションの時間
            duration: 600,
            // アニメーション終了時に発火するコールバック
            onComplete: () => {
                tween.stop() // Tweenオブジェクトの削除
                onComplete() // 引数の関数実行
            }
        })
    }

    // キャラクターの向いた先のタイル座標を取得
    private getNowCharaFaceTilePos(spriteLayerKey: string): TilePos | undefined {
        if (this.gameState.isWalking) return undefined // 歩いていたら取得できないこととする

        const baseTileMap: phaser.Tilemaps.StaticTilemapLayer = Array.from(this.tileMapLayer.values())[0]

        const character: phaser.GameObjects.Sprite = (this.spriteLayer.get(spriteLayerKey) as SpriteObject).spriteObject
        const lastAnim: WalkAnimState = character.anims.getCurrentKey() as WalkAnimState

        const dir: { moveX: MoveDir; moveY: MoveDir } = { moveX: 0, moveY: 0 }
        const characterPos: phaser.Math.Vector2 = baseTileMap.worldToTileXY(character.x, character.y)
        const nowPos: TilePos = { tileX: characterPos.x, tileY: characterPos.y }

        if (lastAnim == 'walk_front') {
            // 手前に歩いていたら
            dir.moveY = -1
        } else if (lastAnim == 'walk_left') {
            // 左に歩いていたら
            dir.moveX = -1
        } else if (lastAnim == 'walk_right') {
            // 右に歩いていたら
            dir.moveX = 1
        } else if (lastAnim == 'walk_back') {
            // 奥に歩いていたら
            dir.moveY = 1
        }

        const facing: TilePos = {
            tileX: nowPos.tileX + dir.moveX,
            tileY: nowPos.tileY + dir.moveY
        } // 現在座標から向いてる方向に応じて計算

        return facing
    }
}
