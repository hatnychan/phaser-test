import phaser from 'phaser'
import { SpriteData, SpriteActConfig, SpriteTextureConfig } from '../../../server/domain/types/SpriteData'
import { MapData, MapPos } from '../../../server/domain/types/MapData'
import { UserData } from '../../../server/domain/types/UserData'
import { api, numParam } from '../main'
import { SpriteLayer } from '../../../server/domain/types/SpriteLayer'
import { GameState } from '../../../server/domain/types/GameState'
import { LoadScene } from '../scenes/LoadScene'

// マップを表示する
export const createMapObject = async (
    phaserScene: phaser.Scene,
    userData: UserData,
    tileMapLayer: Map<string, phaser.Tilemaps.DynamicTilemapLayer>,
    eventMapLayer: Map<string, phaser.Tilemaps.DynamicTilemapLayer>
): Promise<void> => {
    const mapData: MapData = await api.getMapData(userData)
    const mapPos: MapPos = mapData[1]

    // map作成
    mapPos.tilePos.forEach((value, key) => {
        const tileMap: phaser.Tilemaps.Tilemap = phaserScene.make.tilemap({
            data: value,
            tileWidth: numParam.DISPLAY_TILE_MAP_SIZE.VALUE,
            tileHeight: numParam.DISPLAY_TILE_MAP_SIZE.VALUE
        })
        const tileSet: phaser.Tilemaps.Tileset = tileMap.addTilesetImage(key)
        const dynamicTileMapLayer: phaser.Tilemaps.DynamicTilemapLayer = tileMap.createDynamicLayer(0, tileSet, 0, 0)
        tileMapLayer.set(key, dynamicTileMapLayer)
    })

    // eventMap作成
    mapPos.eventPos.forEach((value, key) => {
        const eventMap: phaser.Tilemaps.Tilemap = phaserScene.make.tilemap({
            data: value,
            tileWidth: numParam.DISPLAY_TILE_MAP_SIZE.VALUE,
            tileHeight: numParam.DISPLAY_TILE_MAP_SIZE.VALUE
        })
        const eventSet: phaser.Tilemaps.Tileset = eventMap.addTilesetImage('EVENT')
        const dynamicEventMapLayer: phaser.Tilemaps.DynamicTilemapLayer = eventMap.createDynamicLayer(0, eventSet, 0, 0)

        eventMapLayer.set(key, dynamicEventMapLayer)
    })
}

// 画像のサイズからフレームが何個あるかを計算する。
const getAnimCharaFrames = (keys: string[], key: string, frameTotal: number): number[] => {
    const colLength = frameTotal / keys.length
    const row: number = keys.indexOf(key)
    const animCharaFrames: number[] = [...Array(colLength)].map((_, i) => i + row * colLength)
    return animCharaFrames
}

// アニメーションを作成する。
// アニメーションキーは一意にする。(キーがかぶっていると作成はスルーされる)
const createSpriteAnimation = (
    phaserScene: phaser.Scene,
    spriteConfig: SpriteTextureConfig,
    frameTotal: number
): void => {
    spriteConfig.animeKey.forEach((key: string): void => {
        const anim: phaser.Types.Animations.Animation = {
            key: spriteConfig.animeCd + '_' + key,
            frames: phaserScene.anims.generateFrameNumbers(spriteConfig.animeCd, {
                frames: getAnimCharaFrames(spriteConfig.animeKey, key, frameTotal)
            }),
            repeat: -1
        }
        phaserScene.anims.create(anim)
    })
}

// スプライトオブジェクトを作成・表示する。
// tileMapLayerが引数として与えられている場合は、initX,initYはタイル座標として扱う
// 与えられていない場合はワールド座標で表示する。
export const createSpriteObject = async (
    phaserScene: phaser.Scene,
    userData: UserData,
    spriteLayer: SpriteLayer,
    tileMapLayer?: Map<string, phaser.Tilemaps.DynamicTilemapLayer>
): Promise<void> => {
    const spriteData: SpriteData = await api.getSpriteData(userData)
    const spriteConfig: SpriteTextureConfig[] = spriteData[0]
    const spritePos: SpriteActConfig[] = spriteData[1]
    const baseTileMap: phaser.Tilemaps.DynamicTilemapLayer | undefined =
        tileMapLayer != undefined ? Array.from(tileMapLayer.values())[0] : undefined

    spritePos.map(sprite => {
        let spritePos: phaser.Math.Vector2
        if (baseTileMap != undefined) {
            spritePos = baseTileMap.tileToWorldXY(sprite.initX, sprite.initY)
        } else {
            spritePos = new phaser.Math.Vector2(sprite.initX, sprite.initY)
        }

        const spriteObject: phaser.GameObjects.Sprite = phaserScene.physics.add.sprite(
            spritePos.x,
            spritePos.y,
            sprite.initAnimeCd,
            sprite.initFrame
        )
        spriteObject.setDisplaySize(numParam.DISPLAY_TILE_MAP_SIZE.VALUE, numParam.DISPLAY_TILE_MAP_SIZE.VALUE)
        spriteObject.setOrigin(0)
        spriteLayer.set(sprite.initAnimeCd, {
            spriteObject: spriteObject,
            x: sprite.initX,
            y: sprite.initY,
            act: sprite.act,
            isAction: false
        })

        const spriteAnime = spriteConfig.filter(spriteConf => spriteConf.animeCd === sprite.initAnimeCd)[0]
        const frameTotal = spriteObject.texture.frameTotal - 1
        createSpriteAnimation(phaserScene, spriteAnime, frameTotal)
    })
}

// セリフなどの文章を表示するフレームを作成
export const createQuoteFrameObject = (phaserScene: phaser.Scene): phaser.GameObjects.Image => {
    const quoteFrame: phaser.GameObjects.Image = phaserScene.add.image(0, 0, 'FRAME') // 生成
    quoteFrame.setDisplaySize(numParam.SCREEN_SIZE.WIDTH, numParam.SCREEN_SIZE.HEIGHT * 0.2) // リサイズ
    return quoteFrame
}

// 文章を作成
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

// フレームと文章を一つのオブジェクトとして扱う
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

// マップイベント接触判定設定
export const setCollisonMapEvent = (
    phaserScene: phaser.Scene,
    eventMapLayer: Map<string, phaser.Tilemaps.DynamicTilemapLayer>,
    spriteLayer: SpriteLayer,
    gameState: GameState
): void => {
    eventMapLayer.forEach((eventVal, eventKey) => {
        spriteLayer.forEach((spriteVal, spriteKey) => {
            phaserScene.physics.add.collider(spriteVal.spriteObject, eventVal)
            spriteKey
        })
        eventKey
    })

    eventMapLayer.forEach((eventVal, eventKey) => {
        eventVal.setTileIndexCallback(
            numParam.EVENT_TILE_INDEX.SCREEN_TRANSITION,
            () => {
                gameState.isCreateComplete = false
                const cam = phaserScene.cameras.main
                cam.fade(250, 0, 0, 0)
                cam.once('camerafadeoutcomplete', () => {
                    phaserScene.scene.add('LOAD', LoadScene, false)
                    phaserScene.scene.start('LOAD').stop('PLAY')
                })

                // 本当はnullが設定できるはずなんだけど(メソッドの説明にもかいてある)、tslintでエラーがでるのでts-ignoreで抑制している。
                //@ts-ignore
                eventVal.setTileIndexCallback(numParam.EVENT_TILE_INDEX.SCREEN_TRANSITION, null, phaserScene)
            },
            phaserScene
        )
        eventKey
    })
}
