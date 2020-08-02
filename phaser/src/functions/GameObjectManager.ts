import phaser from 'phaser'
import { numParam, strParam, commonGameLog } from '../main'
import { LoadScene } from '../scenes/LoadScene'
import { outputGameLog } from '../functions/Util'
import * as api from './Api'
import {
    MapData,
    MapPos,
    UserData,
    SpriteData,
    SpriteActConfig,
    SpriteTextureConfig,
    SpriteLayer,
    MapLayer,
    GameState
} from '../../../common/types'

// マップを表示する
export const createMapObject = async (
    phaserScene: phaser.Scene,
    userData: UserData,
    tileMapLayer: MapLayer,
    eventMapLayer: MapLayer
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
        const eventSet: phaser.Tilemaps.Tileset = eventMap.addTilesetImage('COMMON')
        const dynamicEventMapLayer: phaser.Tilemaps.DynamicTilemapLayer = eventMap.createDynamicLayer(0, eventSet, 0, 0)
        eventMapLayer.set(key, dynamicEventMapLayer)
    })

    // weatherLayer作成
    const baseTileMapKey: string = Array.from(tileMapLayer.keys())[0]
    const weatherMap: phaser.Tilemaps.Tilemap = tileMapLayer.get(baseTileMapKey)?.tilemap as phaser.Tilemaps.Tilemap
    const weatherSet: phaser.Tilemaps.Tileset = weatherMap.addTilesetImage('COMMON')
    const weatherLayer: phaser.Tilemaps.DynamicTilemapLayer = weatherMap
        .createBlankDynamicLayer('WEATHER', weatherSet)
        .fill(numParam.BLACK_TILE.INDEX)
    tileMapLayer.set('WEATHER', weatherLayer)
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
    tileMapLayer?: MapLayer
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
    eventMapLayer: MapLayer,
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
            numParam.EVENT_TILE.SCREEN_TRANSITION_INDEX,
            () => {
                gameState.isCreateComplete = false
                const cam = phaserScene.cameras.main
                cam.fade(250, 0, 0, 0)
                cam.once('camerafadeoutcomplete', () => {
                    phaserScene.scene.add('LOAD', LoadScene, false)
                    phaserScene.scene.start('LOAD').stop('PLAY')
                })

                // 本当はnullが設定できるはずなんだけど(メソッドの説明にも書いてある)、tslintでエラーがでるのでts-ignoreで抑制している。
                //@ts-ignore
                eventVal.setTileIndexCallback(numParam.EVENT_TILE.SCREEN_TRANSITION_INDEX, null, phaserScene)
            },
            phaserScene
        )
        eventKey
    })
}

// 天気によってタイルの状態を変更する。
export const updateWeatherSituation = (
    gameState: GameState,
    weatherLayer?: phaser.Tilemaps.DynamicTilemapLayer
): void => {
    if (weatherLayer === undefined) return
    if (gameState.weather === 'cloudy') {
        weatherLayer.forEachTile(t => (t.alpha = 0.5))
        outputGameLog(commonGameLog.WEATHER_CROUDY)
    }
}
