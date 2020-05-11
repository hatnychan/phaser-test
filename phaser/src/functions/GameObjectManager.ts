import phaser from 'phaser'
import { SpriteData, SpritePos, SpriteConfig } from '../../../server/domain/types/SpriteData'
import { MapData, MapPos } from '../../../server/domain/types/MapData'
import { UserData } from '../../../server/domain/types/UserData'
import { api, numParam } from '../main'

export const createMapObject = async (
    phaserScene: phaser.Scene,
    userData: UserData,
    tileMapLayer: Map<string, phaser.Tilemaps.StaticTilemapLayer>,
    eventMapLayer: Map<string, phaser.Tilemaps.StaticTilemapLayer>
): Promise<void> => {
    const mapData: MapData = await api.getMapData(userData)
    const mapPos: MapPos = mapData[1]

    mapPos.tilePos.forEach((value, key) => {
        const tileMap: phaser.Tilemaps.Tilemap = phaserScene.make.tilemap({
            data: value,
            tileWidth: numParam.DISPLAY_SIZE.WIDTH,
            tileHeight: numParam.DISPLAY_SIZE.HEIGHT
        })
        const tileSet: phaser.Tilemaps.Tileset = tileMap.addTilesetImage(key)
        const staticTileMapLayer: phaser.Tilemaps.StaticTilemapLayer = tileMap.createStaticLayer(0, tileSet, 0, 0)
        tileMapLayer.set(key, staticTileMapLayer)
    })

    mapPos.eventPos.forEach((value, key) => {
        const eventMap: phaser.Tilemaps.Tilemap = phaserScene.make.tilemap({
            data: value,
            tileWidth: numParam.DISPLAY_SIZE.WIDTH,
            tileHeight: numParam.DISPLAY_SIZE.HEIGHT
        })
        const eventSet: phaser.Tilemaps.Tileset = eventMap.addTilesetImage(key)
        const staticEventMapLayer: phaser.Tilemaps.StaticTilemapLayer = eventMap.createStaticLayer(0, eventSet, 0, 0)
        eventMapLayer.set(key, staticEventMapLayer)
    })
}

const getAnimCharaFrames = (keys: string[], key: string, frameTotal: number): number[] => {
    const colLength = frameTotal / keys.length
    const row: number = keys.indexOf(key)
    const animCharaFrames: number[] = [...Array(colLength)].map((_, i) => i + row * colLength)
    return animCharaFrames
}

const createSpriteAnimation = async (
    phaserScene: phaser.Scene,
    spriteConfig: SpriteConfig,
    frameTotal: number
): Promise<void> => {
    spriteConfig.animeKey.forEach((key: string): void => {
        const anim: phaser.Types.Animations.Animation = {
            key: key,
            frames: phaserScene.anims.generateFrameNumbers(spriteConfig.animeCd, {
                frames: getAnimCharaFrames(spriteConfig.animeKey, key, frameTotal)
            }),
            repeat: -1
        }
        phaserScene.anims.create(anim)
    })
}

export const createSpriteObject = async (
    phaserScene: phaser.Scene,
    userData: UserData,
    spriteLayer: Map<string, phaser.GameObjects.Sprite>,
    tileMapLayer?: Map<string, phaser.Tilemaps.StaticTilemapLayer>
): Promise<void> => {
    const spriteData: SpriteData = await api.getSpriteData(userData)
    const spriteConfig: SpriteConfig[] = spriteData[0]
    const spritePos: SpritePos[] = spriteData[1]

    const baseTileMap: phaser.Tilemaps.StaticTilemapLayer | undefined =
        tileMapLayer != undefined ? Array.from(tileMapLayer.values())[0] : undefined

    spritePos.map(sprite => {
        let spritePos: phaser.Math.Vector2
        if (baseTileMap != undefined) {
            spritePos = baseTileMap.tileToWorldXY(sprite.posX, sprite.posY)
        } else {
            spritePos = new phaser.Math.Vector2(sprite.posX, sprite.posY)
        }

        const spriteObject: phaser.GameObjects.Sprite = phaserScene.add.sprite(
            spritePos.x,
            spritePos.y,
            sprite.animeCd,
            sprite.initFrame
        )
        spriteObject.setDisplaySize(numParam.DISPLAY_SIZE.WIDTH, numParam.DISPLAY_SIZE.HEIGHT)
        spriteObject.setOrigin(0)
        spriteLayer.set(sprite.animeCd, spriteObject)

        const spriteAnime = spriteConfig.filter(spriteConf => spriteConf.animeCd === sprite.animeCd)[0]
        const frameTotal = spriteObject.texture.frameTotal - 1
        createSpriteAnimation(phaserScene, spriteAnime, frameTotal)
    })
}

export const createQuoteFrameObject = (phaserScene: phaser.Scene): phaser.GameObjects.Image => {
    const quoteFrame: phaser.GameObjects.Image = phaserScene.add.image(0, 0, 'FRAME') // 生成
    quoteFrame.setDisplaySize(numParam.SCREEN_SIZE.WIDTH, numParam.SCREEN_SIZE.HEIGHT * 0.2) // リサイズ
    return quoteFrame
}

export const createQuoteObject = (phaserScene: phaser.Scene): phaser.GameObjects.Text => {
    const quote: phaser.GameObjects.Text = phaserScene.add.text(-370, -50, '', {
        fontSize: '40px',
        color: 'black',
        wordWrap: {
            width: 730,
            useAdvancedWrap: true
        }
    }) // 生成
    return quote
}

export const createQuoteContainerObject = (
    phaserScene: phaser.Scene,
    quoteFrame: phaser.GameObjects.Image,
    quote: phaser.GameObjects.Text
): phaser.GameObjects.Container => {
    const quoteContainer: phaser.GameObjects.Container = phaserScene.add.container(400, 540) // 生成
    quoteContainer.add([quoteFrame, quote]) // ゲームオブジェクトを格納
    quoteContainer.setVisible(false) // 非表示化
    quoteContainer.setDepth(1)
    return quoteContainer
}
