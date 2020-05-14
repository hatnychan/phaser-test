import phaser from 'phaser'
// import { strParam, api, userData } from '../main'
import { userData } from '../main'
import { strParam, api } from '../main'
import { SpriteData } from '../../../server/domain/types/SpriteData'
import { UserData } from '../../../server/domain/types/UserData'

export class LoadScene extends phaser.Scene {
    constructor() {
        super({
            key: 'LOAD'
        })
    }

    init(): void {
        console.log('init')
        //this.scene.restart()
    }

    async preload(): Promise<void> {
        console.log('preload')
    }

    async create(): Promise<void> {
        console.log('create')
        await Promise.all([
            this.loadImages(this, userData),
            this.loadMaps(this, userData),
            this.loadAudio(this, userData),
            this.loadSprites(this, userData)
        ])
        this.load.start()

        const loadingBar: phaser.GameObjects.Graphics = this.add.graphics({
            fillStyle: { color: 0xffffff }
        })

        this.load.on('progress', (percent: number) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on('complete', () => {
            console.log('complete')
            this.scene.start(userData.scene)
        })

        this.load.on('load', (file: phaser.Loader.File) => {
            console.log(file.src)
        })
    }

    private loadImages = (phaserScene: phaser.Scene, userData: UserData): void => {
        phaserScene.load.setPath('./assets/image')
        for (const key in strParam.ASSETS_IMAGE) {
            phaserScene.load.image(key, strParam.ASSETS_IMAGE[key])
        }
        userData
    }

    private loadMaps = (phaserScene: phaser.Scene, userData: UserData): void => {
        phaserScene.load.setPath('./assets/maps')
        for (const key in strParam.ASSETS_MAP) {
            phaserScene.load.image(key, strParam.ASSETS_MAP[key])
        }
        userData
    }

    private loadAudio = (phaserScene: phaser.Scene, userData: UserData): void => {
        phaserScene.load.setPath('./assets/audio')
        for (const key in strParam.ASSETS_AUDIO) {
            phaserScene.load.audio(key, strParam.ASSETS_AUDIO[key])
        }
        userData
    }

    private loadSprites = async (phaserScene: phaser.Scene, userData: UserData): Promise<void> => {
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
}
