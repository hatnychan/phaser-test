import phaser from 'phaser'
import * as createObj from '../functions/GameObjectManager'

// import { strParam } from '../main'
// import { SerializeNumParam } from '../../../server/domain/types/SerializeNumParam'
// const ASSETS_IMAGE = 'ASSETS_IMAGE'

export class PlayScene extends phaser.Scene {
    // ゲーム状態
    private isWalking!: boolean
    private isTalking!: boolean

    // マップ系オブジェクト
    private mapTileLayer!: phaser.Tilemaps.StaticTilemapLayer
    private mapEventLayer!: phaser.Tilemaps.StaticTilemapLayer

    // 文章系オブジェクト
    private quoteFrame!: phaser.GameObjects.Image
    private quote!: phaser.GameObjects.Text
    private quoteContainer!: phaser.GameObjects.Container

    // キャラクターオブジェクト
    private character!: { [x: string]: phaser.GameObjects.Sprite }

    constructor() {
        super({ key: 'PLAY' })
    }

    init(): void {
        console.log('init')
        this.isWalking = false
        this.isTalking = false
    }

    preload(): void {
        console.log('preload')
    }

    create(): void {
        // mapレイヤー
        // this.mapTileLayer = createObj.createMapObject(this, 'TILE', getMapTilePos)
        // // mapイベントレイヤー
        // this.mapEventLayer = createObj.createMapObject(this, 'NPC', getMapEventPos)
        // // 文章フレーム
        // this.quoteFrame = createObj.createQuoteFrameObject(this)
        // // 文章
        // this.quote = createObj.createQuoteObject(this)
        // // 文章コンテナ
        // this.quoteContainer = createObj.createQuoteContainerObject(this, this.quoteFrame, this.quote)
        // キャラクターオブジェクト
        // createObj.createCharacter()
    }

    // update(): void {
    //     console.log('update')
    //     return
    // }
}
