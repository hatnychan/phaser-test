import phaser from 'phaser'
import { createSpriteObject } from '../functions/GameObjectManager'
import { userData } from '../functions/Util'

export class MenuScene extends phaser.Scene {
    private spriteLayer: Map<string, phaser.GameObjects.Sprite> = new Map()

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
        const hoverSprite: phaser.GameObjects.Sprite = this.spriteLayer.get('CAT1') as phaser.GameObjects.Sprite
        hoverSprite.anims.setTimeScale(1 / 6) // frameRate=4。デフォルトが24なので1/6にしている
        hoverSprite.setScale(2)
        hoverSprite.setVisible(false)

        playButton.setInteractive()

        playButton.on('pointerover', () => {
            console.log('hover')
            hoverSprite.setVisible(true)
            hoverSprite.play('walk_back')
            hoverSprite.x = playButton.x - playButton.width
            hoverSprite.y = playButton.y
        })

        playButton.on('pointerout', () => {
            console.log('out')
            hoverSprite.setVisible(false)
        })

        playButton.on('pointerup', () => {
            console.log('open')
            userData.gameState.scene = 'PLAY'
            this.scene.start('LOAD')
        })

        optionsButton.setInteractive()

        optionsButton.on('pointerover', () => {
            console.log('hover')
            hoverSprite.setVisible(true)
            hoverSprite.play('walk_back')
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
