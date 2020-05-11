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
        console.log('preload')
    }

    async create(): Promise<void> {
        // preload()にload処理を記述すると初回しかloadしてくれないからcreate()に記述する
        // 参考：https://www.html5gamedevs.com/topic/39117-question-about-asset-loading/
        // TODO 何故かconsole.logがダブってる。多分promiseの挙動が絡んでいるがとりあえず動くのでヨシ！

        await Promise.all([
            loadImages(this, userData),
            loadMaps(this, userData),
            loadAudio(this, userData),
            loadSprites(this, userData)
        ])

        // loadImages(this, userData)
        // loadMaps(this, userData)
        // loadAudio(this, userData)
        // await loadSprites(this, userData)
        this.load.start()

        const loadingBar: phaser.GameObjects.Graphics = this.add.graphics({
            fillStyle: { color: 0xffffff }
        })

        this.load.on('progress', (percent: number) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on('complete', () => {
            this.scene.start(userData.scene)
        })

        this.load.on('load', (file: phaser.Loader.File) => {
            console.log(file.src)
        })
    }
}
