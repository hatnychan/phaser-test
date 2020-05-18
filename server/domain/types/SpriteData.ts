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
