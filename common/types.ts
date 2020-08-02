import phaser from 'phaser'

export type GameState = {
    isWalking: boolean
    isTalking: boolean
    isCreateComplete: boolean
    weather: string
    timeZone: string
}

export type MapData = [MapImage, MapPos]

export type MapImage = {
    [x: string]: string
}

export type MapPos = {
    mapId: string
    tilePos: Map<string, number[][]>
    eventPos: Map<string, number[][]>
}

export type MapLayer = Map<string, phaser.Tilemaps.DynamicTilemapLayer>

export type ParamData = [SerializeNumParam, SerializeStrParam]

export type SerializeNumParam = {
    [x: string]: {
        [x: string]: number
    }
}

export type SerializeStrParam = {
    [x: string]: {
        [x: string]: string
    }
}

export type SerializeGameLog = {
    [x: string]: {
        [x: string]: string
    }
}

export type SpriteData = [SpriteTextureConfig[], SpriteActConfig[]]

export type SpriteTextureConfig = {
    animeCd: string
    animeKey: string[]
    texture: string
    width: number
    height: number
}

export type SpriteActConfig = {
    initAnimeCd: string
    initFrame: number
    initX: number
    initY: number
    act: string[]
}

export type SpriteLayer = Map<string, SpriteObject>

export type SpriteObject = {
    spriteObject: phaser.GameObjects.Sprite
    x: number
    y: number
    act: string[]
    isAction: boolean
}

export type UserData = {
    userId: string
    scene: string
}
