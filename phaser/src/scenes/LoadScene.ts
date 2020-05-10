import phaser from 'phaser'
// import { strParam, api, userData } from '../main'
import { userData } from '../main'
import { loadImages, loadMaps, loadAudio, loadSprites } from '../functions/AssetLoadManager'

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
        loadImages(this, userData)
        loadMaps(this, userData)
        loadAudio(this, userData)
        loadSprites(this, userData)

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
        if (userData.gameState.scene === 'MENU') {
            this.scene.start('MENU')
        } else if (userData.gameState.scene === 'PLAY') {
            this.scene.start('PLAY')
        }
    }
}
