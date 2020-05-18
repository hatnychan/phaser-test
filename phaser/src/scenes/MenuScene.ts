import phaser from 'phaser'
import { createSpriteObject } from '../functions/GameObjectManager'
import { userData } from '../functions/Util'
import { SpriteLayer, SpriteObject } from '../../../server/domain/types/SpriteLayer'
import { LoadScene } from './LoadScene'

const MENU_CHARA = 'CAT1'
export class MenuScene extends phaser.Scene {
    private spriteLayer: SpriteLayer = new Map()

    constructor() {
        super({
            key: 'MENU'
        })
    }

    init(): void {
        console.log('init')
    }

    preload(): void {
        console.log('preload')
    }

    async create(): Promise<void> {
        this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.2, 'LOGO').setDepth(1)

        this.add.image(0, 0, 'TITLE').setOrigin(0)

        const playButton: phaser.GameObjects.Image = this.add.image(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.5,
            'PLAY'
        )

        const optionsButton: phaser.GameObjects.Image = this.add
            .image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.5 + 100, 'OPTIONS')
            .setDepth(1)

        await createSpriteObject(this, userData, this.spriteLayer)
        const hoverSprite: phaser.GameObjects.Sprite = (this.spriteLayer.get(MENU_CHARA) as SpriteObject).spriteObject
        hoverSprite.anims.setTimeScale(1 / 6) // frameRate=4。デフォルトが24なので1/6にしている
        hoverSprite.setScale(2)
        hoverSprite.setOrigin(0.5)
        hoverSprite.setVisible(false)

        playButton.setInteractive()

        playButton.on('pointerover', () => {
            console.log('hover')
            hoverSprite.setVisible(true)
            hoverSprite.play(MENU_CHARA + '_' + 'walk_back')
            hoverSprite.x = playButton.x - playButton.width
            hoverSprite.y = playButton.y
        })

        playButton.on('pointerout', () => {
            console.log('out')
            hoverSprite.setVisible(false)
        })

        playButton.on('pointerup', () => {
            userData.scene = 'PLAY'
            //TODO 単純にscene.startするとLoadSceneで二重にロードが走る(load.start()実行時のみ)
            // load.start()せずにpreloadだけだとこの現象は起きない
            //一端破壊して再度addするとうまくいくがこのあたりの挙動はよくわからん。。。
            this.scene.remove('LOAD').add('LOAD', LoadScene, true)
        })

        optionsButton.setInteractive()

        optionsButton.on('pointerover', () => {
            console.log('hover')
            hoverSprite.setVisible(true)
            hoverSprite.play(MENU_CHARA + '_' + 'walk_back')
            hoverSprite.x = optionsButton.x - optionsButton.width
            hoverSprite.y = optionsButton.y
        })

        optionsButton.on('pointerout', () => {
            console.log('out')
            hoverSprite.setVisible(false)
        })

        optionsButton.on('pointerup', () => {
            console.log('open')
        })
    }
}
