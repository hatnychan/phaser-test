import phaser from 'phaser'
// import { strParam, api, userData } from '../main'
import { userData, strParam, commonGameLog } from '../main'
import { UserData, MapData, SpriteData } from '../../../common/types'
import { outputGameLog } from '../functions/Util'
import * as api from '../functions/Api'

export class LoadScene extends phaser.Scene {
    constructor() {
        super({
            key: 'LOAD'
        })
    }

    init(): void {
        console.log('init')
        if (userData.scene === 'PLAY') outputGameLog(commonGameLog.READY_TO_CONSTRUCT)
    }

    preload(): void {
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
            this.scene.start(userData.scene).remove('LOAD')
        })

        this.load.on('load', (file: phaser.Loader.File) => {
            console.log(file.src)
        })

        // ロードするものが無いとcompleteが発火しないのでローディング中でないステータスで発火させる。
        const isLoading = this.load.isLoading()
        if (!isLoading) {
            console.log('does not exist load assets')
            this.scene.start(userData.scene).remove('LOAD')
        }
    }

    private loadImages = (phaserScene: phaser.Scene, userData: UserData): void => {
        phaserScene.load.setPath('./assets/image')
        for (const key in strParam.ASSETS_IMAGE) {
            phaserScene.load.image(key, strParam.ASSETS_IMAGE[key])
        }
        userData
    }

    private loadMaps = async (phaserScene: phaser.Scene, userData: UserData): Promise<void> => {
        const mapData: MapData = await api.getMapData(userData)
        phaserScene.load.setPath('./assets/maps') // awaitの上だとsetPathがうまく設定されない
        const mapImage = mapData[0]
        for (const key in mapImage) {
            phaserScene.load.image(key, mapImage[key])
        }
    }

    private loadAudio = (phaserScene: phaser.Scene, userData: UserData): void => {
        phaserScene.load.setPath('./assets/audio')
        for (const key in strParam.ASSETS_AUDIO) {
            phaserScene.load.audio(key, strParam.ASSETS_AUDIO[key])
        }
        userData
    }

    private loadSprites = async (phaserScene: phaser.Scene, userData: UserData): Promise<void> => {
        // TODO ここではgetSpriteDataの画像データだけあれば良いからキャラクターの行動アルゴリズムが動かないようにする
        const spriteData: SpriteData = await api.getSpriteData(userData)
        phaserScene.load.setPath('./assets/sprite') // awaitの上だとsetPathがうまく設定されない
        const spriteConfig = spriteData[0]
        for (const sprite of spriteConfig) {
            phaserScene.load.spritesheet(sprite.animeCd, sprite.texture, {
                frameWidth: sprite.width,
                frameHeight: sprite.height
            })
        }
    }
}
