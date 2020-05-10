export type SpriteData = [SpriteConfig[], SpritePos[]]

export type SpriteConfig = {
    animeCd: string
    animeKey: string[]
    texture: string
    width: number
    height: number
}

export type SpritePos = {
    animeCd: string
    posX: number
    posY: number
    initFrame: number
}
