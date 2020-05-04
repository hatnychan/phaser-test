import phaser from 'phaser'
import { strParam } from '../main'
import { numParam } from '../main'
import { SerializeStrParam } from '../../../server/domain/types/SerializeStrParam'
import { SerializeNumParam } from '../../../server/domain/types/SerializeNumParam'

const ASSETS_IMAGE = 'ASSETS_IMAGE'
const ASSETS_MAP = 'ASSETS_MAP'
const ASSETS_AUDIO = 'ASSETS_AUDIO'
const ASSETS_SPRITE = 'ASSETS_SPRITE'

const FRAME_SIZE_ASSETS_SPRITE = 'FRAME_SIZE_ASSETS_SPRITE'

export class LoadScene extends phaser.Scene {
    constructor() {
        super({
            key: 'LOAD'
        })
    }

    init(): void {
        console.log('init')
    }

    preload(): void {
        this.loadImages()
        this.loadMaps()
        this.loadAudio()
        this.loadSprites()

        const loadingBar: phaser.GameObjects.Graphics = this.add.graphics({
            fillStyle: { color: 0xffffff }
        })

        this.load.on('progress', (percent: number) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on('complete', () => {
            console.log('donee')
        })

        this.load.on('load', (file: phaser.Loader.File) => {
            console.log(file.src)
        })
    }

    create(): void {
        this.scene.start('MENU')
    }

    loadImages(): void {
        this.load.setPath('./assets/image')
        const assetsImage: SerializeStrParam = strParam.filter(strParam => strParam.paramCd === ASSETS_IMAGE)[0]
        for (const key in assetsImage.value) {
            this.load.image(key, assetsImage.value[key])
        }
    }

    loadMaps(): void {
        this.load.setPath('./assets/maps')
        const assetsMap: SerializeStrParam = strParam.filter(strParam => strParam.paramCd === ASSETS_MAP)[0]
        for (const key in assetsMap.value) {
            this.load.image(key, assetsMap.value[key])
        }
    }

    loadAudio(): void {
        this.load.setPath('./assets/audio')
        const assetsAudio: SerializeStrParam = strParam.filter(strParam => strParam.paramCd === ASSETS_AUDIO)[0]
        for (const key in assetsAudio.value) {
            this.load.audio(key, assetsAudio.value[key])
        }
    }

    loadSprites(): void {
        this.load.setPath('./assets/sprite')
        const assetsSprite: SerializeStrParam = strParam.filter(strParam => strParam.paramCd === ASSETS_SPRITE)[0]
        const charaFrameSize: SerializeNumParam = numParam.filter(
            numParam => numParam.paramCd === FRAME_SIZE_ASSETS_SPRITE
        )[0]

        for (const key in assetsSprite.value) {
            const frameSizeWidth: number = (charaFrameSize.value[key] as number[])[0]
            const frameSizeHeight: number = (charaFrameSize.value[key] as number[])[1]

            console.log(frameSizeWidth)
            const value: string = assetsSprite.value[key] as string
            const frameConfig: phaser.Types.Loader.FileTypes.ImageFrameConfig = {
                frameWidth: frameSizeWidth,
                frameHeight: frameSizeHeight
            }
            this.load.spritesheet(key, value, frameConfig)
        }
    }
}
