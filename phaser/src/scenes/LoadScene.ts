import { CST } from '../CST'
import { CSTSprite } from '../CST'
import { CSTImage } from '../CST'
import { CSTAudio } from '../CST'
import { CSTMap } from '../CST'
import * as Phaser from 'phaser'

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }

    init(): void {
        console.log('init')
    }

    loadImages(): void {
        this.load.setPath('./assets/image')
        for (const prop in CST.IMAGE) {
            const key: keyof CSTImage = prop as keyof CSTImage
            this.load.image(CST.IMAGE[key], CST.IMAGE[key])
        }
    }

    loadMaps(): void {
        this.load.setPath('./assets/maps')
        for (const prop in CST.MAP) {
            const key: keyof CSTMap = prop as keyof CSTMap
            this.load.image(CST.MAP[key], CST.MAP[key])
        }
    }

    loadAudio(): void {
        this.load.setPath('./assets/audio')
        for (const prop in CST.AUDIO) {
            const key: keyof CSTAudio = prop as keyof CSTAudio
            this.load.audio(CST.AUDIO[key], CST.AUDIO[key])
        }
    }

    loadSprites(frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig): void {
        this.load.setPath('./assets/sprite')
        for (const prop in CST.SPRITE) {
            const key: keyof CSTSprite = prop as keyof CSTSprite
            this.load.spritesheet(CST.SPRITE[key], CST.SPRITE[key], frameConfig)
        }
    }

    preload(): void {
        this.loadImages()
        this.loadMaps()
        this.loadAudio()
        this.loadSprites({
            frameHeight: 32,
            frameWidth: 32
        })

        this.load.setPath('./assets/sprite')
        this.load.spritesheet('anna', 'anna.png', {
            frameHeight: 64,
            frameWidth: 64
        })
        this.load.atlas('characters', 'characters.png', 'characters.json')
        this.load.atlas('daze', 'daze.png', 'daze.json')

        const loadingBar: Phaser.GameObjects.Graphics = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        this.load.on('progress', (percent: number) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on('complete', () => {
            console.log('donee')
        })

        this.load.on('load', (file: Phaser.Loader.File) => {
            console.log(file.src)
        })
    }

    create(): void {
        this.scene.start(CST.SCENES.MENU)
    }
}
