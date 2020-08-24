import phaser from 'phaser'
import { SerializedNumParam } from './SerializedNumParam'
import { SerializedStrParam } from './SerializedStrParam'

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

export type ParamData = [SerializedNumParam, SerializedStrParam]

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
