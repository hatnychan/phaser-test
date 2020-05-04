import phaser from 'phaser'
import { createCharacterAnimation } from '../functions/createAnimation'
import { strParam } from '../main'

export class MenuScene extends phaser.Scene {
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

    create(): void {
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

        const hoverSprite: phaser.GameObjects.Sprite = this.add.sprite(100, 100, 'CAT')
        hoverSprite.setScale(2)
        hoverSprite.setVisible(false)
        const frameTotal = hoverSprite.texture.frameTotal - 1
        createCharacterAnimation(this, strParam, 'CAT', frameTotal)

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
            this.scene.start('PLAY')
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
