import phaser from 'phaser'
import { api, userData } from '../main'
import { SpriteData, SpriteConfig } from '../../../server/domain/types/SpriteData'

const getAnimCharaFrames = (keys: string[], key: string, frameTotal: number): number[] => {
    const colLength = frameTotal / keys.length
    const row: number = keys.indexOf(key)
    const animCharaFrames: number[] = [...Array(colLength)].map((_, i) => i + row * colLength)
    return animCharaFrames
}

export const createCharacterAnimation = async (
    phaserScene: phaser.Scene,
    animeCd: string,
    frameTotal: number,
    frameRate: number
): Promise<void> => {
    const charaAnims: phaser.Types.Animations.Animation[] = []
    const spriteData: SpriteData = await api.getSpriteData(userData)
    const spriteConfig: SpriteConfig[] = spriteData[0]
    const keys: string[] = spriteConfig.filter(sprite => sprite.animeCd === animeCd)[0].animeKey
    for (const key of keys) {
        const anim: phaser.Types.Animations.Animation = {
            key: key,
            frameRate: frameRate,
            frames: phaserScene.anims.generateFrameNumbers(animeCd, {
                frames: getAnimCharaFrames(keys, key, frameTotal)
            }),
            repeat: -1
        }
        charaAnims.push(anim)
    }
    for (const anim of charaAnims) {
        // アニメーションの数だけループ
        if (phaserScene.anims.create(anim) === false) continue // もしfalseならばこの後何もしない
    }
}
