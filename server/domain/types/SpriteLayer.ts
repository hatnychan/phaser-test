import phaser from 'phaser'
export type SpriteLayer = Map<string, SpriteObject>

export type SpriteObject = {
    spriteObject: phaser.GameObjects.Sprite
    x: number
    y: number
    act: string[]
    isAction: boolean
}
