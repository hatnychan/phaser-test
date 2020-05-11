import phaser from 'phaser'
import { strParam, api } from '../main'
import { SpriteData } from '../../../server/domain/types/SpriteData'
import { UserData } from '../../../server/domain/types/UserData'

export const loadImages = (phaserScene: phaser.Scene, userData: UserData): void => {
    phaserScene.load.setPath('./assets/image')
    for (const key in strParam.ASSETS_IMAGE) {
        phaserScene.load.image(key, strParam.ASSETS_IMAGE[key])
    }
    userData
}

export const loadMaps = (phaserScene: phaser.Scene, userData: UserData): void => {
    phaserScene.load.setPath('./assets/maps')
    for (const key in strParam.ASSETS_MAP) {
        phaserScene.load.image(key, strParam.ASSETS_MAP[key])
    }
    userData
}

export const loadAudio = (phaserScene: phaser.Scene, userData: UserData): void => {
    phaserScene.load.setPath('./assets/audio')
    for (const key in strParam.ASSETS_AUDIO) {
        phaserScene.load.audio(key, strParam.ASSETS_AUDIO[key])
    }
    userData
}

export const loadSprites = async (phaserScene: phaser.Scene, userData: UserData): Promise<void> => {
    phaserScene.load.setPath('./assets/sprite')
    const spriteData: SpriteData = await api.getSpriteData(userData)
    const spriteConfig = spriteData[0]
    for (const sprite of spriteConfig) {
        phaserScene.load.spritesheet(sprite.animeCd, sprite.texture, {
            frameWidth: sprite.width,
            frameHeight: sprite.height
        })
    }
}
