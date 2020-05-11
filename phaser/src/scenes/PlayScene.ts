import phaser from 'phaser'
import * as objMan from '../functions/GameObjectManager'
import { userData } from '../main'

export class PlayScene extends phaser.Scene {
    // ゲーム状態
    private gameState = {
        isWalking: false,
        isTalking: false
    }

    // マップ系オブジェクト
    private tileMapLayer: Map<string, phaser.Tilemaps.StaticTilemapLayer> = new Map()
    private eventMapLayer: Map<string, phaser.Tilemaps.StaticTilemapLayer> = new Map()

    // 文章系オブジェクト
    private quoteFrame!: phaser.GameObjects.Image
    private quote!: phaser.GameObjects.Text
    private quoteContainer!: phaser.GameObjects.Container

    // キャラクターオブジェクト
    spriteLayer: Map<string, phaser.GameObjects.Sprite> = new Map()

    constructor() {
        super({ key: 'PLAY' })
    }

    init(): void {
        console.log('init')
    }

    preload(): void {
        console.log('preload')
    }

    create(): void {
        // mapレイヤー
        objMan.createMapObject(this, userData, this.tileMapLayer, this.eventMapLayer)
        // キャラクターオブジェクト
        objMan.createSpriteObject(this, userData, this.spriteLayer, this.tileMapLayer)
        // 文章フレーム
        this.quoteFrame = objMan.createQuoteFrameObject(this)
        // 文章
        this.quote = objMan.createQuoteObject(this)
        // 文章コンテナ
        this.quoteContainer = objMan.createQuoteContainerObject(this, this.quoteFrame, this.quote)
    }

    // update(): void {
    //     console.log('update')
    //     return
    // }
}
