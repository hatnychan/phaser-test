import phaser from 'phaser'
import { SerializeStrParam } from '../../../server/domain/types/SerializeStrParam'
const ANIMATION_CHARACTER = 'ANIMATION_CHARACTER'

const getAnimCharaFrames = (keys: string[], key: string, frameTotal: number): number[] => {
    const colLength = frameTotal / keys.length
    const row: number = keys.indexOf(key)
    const animCharaFrames: number[] = [...Array(colLength)].map((_, i) => i + row * colLength)
    return animCharaFrames
}

export const createCharacterAnimation = (
    phaserScene: phaser.Scene,
    strParam: SerializeStrParam[],
    chara: string,
    frameTotal: number
): void => {
    const animKeys: SerializeStrParam = strParam.filter(strParam => strParam.paramCd === ANIMATION_CHARACTER)[0]

    const charaAnims: phaser.Types.Animations.Animation[] = []
    const keys: string[] = animKeys.value[chara] as string[]
    for (const key of keys) {
        const anim: phaser.Types.Animations.Animation = {
            key: key,
            frameRate: 10,
            frames: phaserScene.anims.generateFrameNumbers(chara, {
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
