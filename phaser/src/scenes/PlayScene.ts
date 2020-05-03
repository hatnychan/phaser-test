import phaser from 'phaser'
import { getMapTilePos, getMapEventPos } from '../functions/api_mock'
import { createMapObject } from '../functions/createObject'

// import { strParam } from '../main'
// import { SerializeNumParam } from '../../../server/domain/types/SerializeNumParam'
// const ASSETS_IMAGE = 'ASSETS_IMAGE'

export class PlayScene extends phaser.Scene {
    private mapTileLayer!: phaser.Tilemaps.StaticTilemapLayer
    private mapEventLayer!: phaser.Tilemaps.StaticTilemapLayer // 追加

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
        this.mapTileLayer = createMapObject(this, 'TILE', getMapTilePos)
        this.mapEventLayer = createMapObject(this, 'NPC', getMapEventPos)
    }

    // update(): void {
    //     console.log('update')
    //     return
    // }
}
