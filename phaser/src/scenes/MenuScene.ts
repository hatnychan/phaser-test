import phaser from 'phaser'
import { createSpriteObject } from '../functions/GameObjectManager'
import { outputGameLog, replaceText } from '../functions/Util'
import { LoadScene } from './LoadScene'
import { SpriteData, SpriteLayer, SpriteObject } from '../../../server/interfaces/presenters/types'
import * as api from '../functions/Api'
import { GameState } from '../../../server/interfaces/presenters/GameState'

export class MenuScene extends phaser.Scene {
    // ゲーム状態
    private gameState: GameState = GameState.instance
    private spriteLayer: SpriteLayer = new Map()

    constructor() {
        super({
            key: 'MENU'
        })
    }

    // TODO 各シーンはinit()→preload()→create()の順番に実行されていくが、完了を待って実行されるわけではないので
    // 関数の中にpromiseなものが入っていると終了する順番が前後してしまう。ので、同期で処理が実行されるように
    // 完了フラグを持たせるなどして工夫する必要がある。調べた限りはこれしか方法は無いが、もっと良い案あれば変えたい。
    // 似たような悩みを持つ人： https://phaser.discourse.group/t/scene-event-after-create-has-completed/3615
    // (↑の人はload.json()使う方法で納得しているけど、load.json()はgetは出来るけど、postはできないんだよね〜)
    init(): void {
        console.log('init')
        const commonGameLog = api.gameLog.COMMON
        outputGameLog(commonGameLog.WELCOME)
        const helloUser: string = replaceText(commonGameLog.HELLO_USER, api.sesUser.userName)
        outputGameLog(helloUser)
        this.preload(true)
    }

    preload(isPreFuncComplete = false): void {
        if (!isPreFuncComplete) return
        console.log('preload')
        this.create(undefined, true)
    }

    async create(data?: object, isPreFuncComplete = false): Promise<void> {
        if (!isPreFuncComplete) return
        console.log('create')
        this.add.image(0, 0, 'TITLE').setOrigin(0)

        // this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.2, 'LOGO').setDepth(1)
        // const enterButton: phaser.GameObjects.Image = this.add.image(
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
            'BUDDHA.HELIX',
            {
                fontSize: '80px',
                color: 'white'
            }
        )
        logo.setOrigin(0.5)

        const enterButton: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.5,
            '<ENTER>',
            {
                fontSize: '35px',
                color: 'white'
            }
        )
        enterButton.setOrigin(0.5)

        let logInOutButton: phaser.GameObjects.Text
        if (api.sesUser.userId === 'default') {
            logInOutButton = this.add.text(
                this.game.renderer.width * 0.5,
                this.game.renderer.height * 0.5 + 80,
                '<LOGIN>',
                {
                    fontSize: '35px',
                    color: 'white'
                }
            )
        } else {
            logInOutButton = this.add.text(
                this.game.renderer.width * 0.5,
                this.game.renderer.height * 0.5 + 80,
                '<LOGOUT>',
                {
                    fontSize: '31px',
                    color: 'white'
                }
            )
        }
        logInOutButton.setOrigin(0.5)

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
        const menuSpriteData: SpriteData = await api.getSpriteData()
        const menuAnimeCd: string = menuSpriteData[0][0].animeCd
        await createSpriteObject(this, this.spriteLayer)
        const hoverSprite: phaser.GameObjects.Sprite = (this.spriteLayer.get(menuAnimeCd) as SpriteObject).spriteObject
        hoverSprite.anims.setTimeScale(1 / 6) // frameRate=4。デフォルトが24なので1/6にしている
        hoverSprite.setScale(2)
        hoverSprite.setOrigin(0.5)
        hoverSprite.setVisible(false)

        enterButton.setInteractive()

        enterButton.on('pointerover', () => {
            console.log('hover')
            hoverSprite.setVisible(true)
            hoverSprite.play(menuAnimeCd + '_' + 'walk_back')
            hoverSprite.x = enterButton.x - enterButton.width
            hoverSprite.y = enterButton.y
        })

        enterButton.on('pointerout', () => {
            console.log('out')
            hoverSprite.setVisible(false)
        })

        enterButton.on('pointerup', () => {
            this.gameState.scene = 'PLAY'
            this.scene.add('LOAD', LoadScene, false)
            this.scene.start('LOAD').stop('MENU')
        })

        logInOutButton.setInteractive()

        logInOutButton.on('pointerover', () => {
            console.log('hover')
            hoverSprite.setVisible(true)
            hoverSprite.play(menuAnimeCd + '_' + 'walk_back')
            hoverSprite.x = logInOutButton.x - logInOutButton.width
            hoverSprite.y = logInOutButton.y
        })

        logInOutButton.on('pointerout', () => {
            console.log('out')
            hoverSprite.setVisible(false)
        })

        logInOutButton.on('pointerup', () => {
            console.log('open')
            location.href = api.sesUser.userId === 'default' ? './auth/twitter' : './auth/logout'
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
