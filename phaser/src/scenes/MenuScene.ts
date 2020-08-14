import phaser from 'phaser'
import { createSpriteObject } from '../functions/GameObjectManager'
import { outputGameLog } from '../functions/Util'
import { LoadScene } from './LoadScene'
import { userData, commonGameLog } from '../main'
import { SpriteData, SpriteLayer, SpriteObject } from '../../../common/types'
import * as api from '../functions/Api'

export class MenuScene extends phaser.Scene {
    private spriteLayer: SpriteLayer = new Map()

    constructor() {
        super({
            key: 'MENU'
        })
    }

    init(): void {
        console.log('init')
        outputGameLog(commonGameLog.WELCOME)
    }

    preload(): void {
        console.log('preload')
    }

    async create(): Promise<void> {
        this.add.image(0, 0, 'TITLE').setOrigin(0)

        // this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.2, 'LOGO').setDepth(1)
        // const playButton: phaser.GameObjects.Image = this.add.image(
        //     this.game.renderer.width * 0.5,
        //     this.game.renderer.height * 0.5,
        //     'PLAY'
        // )
        // const optionsButton: phaser.GameObjects.Image = this.add
        //     .image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.5 + 100, 'OPTIONS')
        //     .setDepth(1)

        const logo: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.3,
            '─原罪─',
            {
                fontSize: '100px',
                color: 'white'
            }
        )
        logo.setOrigin(0.5)

        const playButton: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.5,
            '<PLAY>',
            {
                fontSize: '40px',
                color: 'white'
            }
        )
        playButton.setOrigin(0.5)

        const loginButton: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.5 + 80,
            '<LOGIN>',
            {
                fontSize: '35px',
                color: 'white'
            }
        )
        loginButton.setOrigin(0.5)

        const optionsButton: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.5 + 160,
            '<OPTIONS>',
            {
                fontSize: '27px',
                color: 'white'
            }
        )
        optionsButton.setOrigin(0.5)

        // MENUspriteアニメーション表示
        const menuSpriteData: SpriteData = await api.getSpriteData(userData)
        const menuAnimeCd: string = menuSpriteData[0][0].animeCd
        await createSpriteObject(this, userData, this.spriteLayer)
        const hoverSprite: phaser.GameObjects.Sprite = (this.spriteLayer.get(menuAnimeCd) as SpriteObject).spriteObject
        hoverSprite.anims.setTimeScale(1 / 6) // frameRate=4。デフォルトが24なので1/6にしている
        hoverSprite.setScale(2)
        hoverSprite.setOrigin(0.5)
        hoverSprite.setVisible(false)

        playButton.setInteractive()

        playButton.on('pointerover', () => {
            console.log('hover')
            hoverSprite.setVisible(true)
            hoverSprite.play(menuAnimeCd + '_' + 'walk_back')
            hoverSprite.x = playButton.x - playButton.width
            hoverSprite.y = playButton.y
        })

        playButton.on('pointerout', () => {
            console.log('out')
            hoverSprite.setVisible(false)
        })

        playButton.on('pointerup', () => {
            userData.scene = 'PLAY'
            this.scene.add('LOAD', LoadScene, false)
            this.scene.start('LOAD').stop('MENU')
        })

        loginButton.setInteractive()

        loginButton.on('pointerover', () => {
            console.log('hover')
            hoverSprite.setVisible(true)
            hoverSprite.play(menuAnimeCd + '_' + 'walk_back')
            hoverSprite.x = loginButton.x - loginButton.width
            hoverSprite.y = loginButton.y
        })

        loginButton.on('pointerout', () => {
            console.log('out')
            hoverSprite.setVisible(false)
        })

        loginButton.on('pointerup', () => {
            console.log('open')
            location.href = './auth/twitter'
        })

        optionsButton.setInteractive()

        optionsButton.on('pointerover', () => {
            console.log('hover')
            hoverSprite.setVisible(true)
            hoverSprite.play(menuAnimeCd + '_' + 'walk_back')
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
