import { CST } from '../CST'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU,
    })
  }

  init(): void {
    console.log('init')
    this.anims.create({
      key: 'walk',
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT, {
        frames: [0, 1, 2, 3],
      }),
    })
  }

  preload(): void {
    console.log('preload')
  }

  create(): void {
    this.add
      .image(
        this.game.renderer.width * 0.5,
        this.game.renderer.height * 0.2,
        CST.IMAGE.LOGO,
      )
      .setDepth(1)

    this.add.image(0, 0, CST.IMAGE.TITLE).setOrigin(0)

    const playButton: Phaser.GameObjects.Image = this.add
      .image(
        this.game.renderer.width * 0.5,
        this.game.renderer.height * 0.5,
        CST.IMAGE.PLAY,
      )
      .setDepth(1)

    const optionsButton: Phaser.GameObjects.Image = this.add
      .image(
        this.game.renderer.width * 0.5,
        this.game.renderer.height * 0.5 + 100,
        CST.IMAGE.OPTIONS,
      )
      .setDepth(1)

    const hoverSprite: Phaser.GameObjects.Sprite = this.add.sprite(
      100,
      100,
      CST.SPRITE.CAT,
    )
    hoverSprite.setScale(2)
    hoverSprite.setVisible(false)

    playButton.setInteractive()

    playButton.on('pointerover', () => {
      console.log('hover')
      hoverSprite.setVisible(true)
      hoverSprite.play('walk')
      hoverSprite.x = playButton.x - playButton.width
      hoverSprite.y = playButton.y
    })

    playButton.on('pointerout', () => {
      console.log('out')
      hoverSprite.setVisible(false)
    })

    playButton.on('pointerup', () => {
      console.log('open')
      this.scene.start(CST.SCENES.PLAY)
    })

    optionsButton.setInteractive()

    optionsButton.on('pointerover', () => {
      console.log('hover')
      hoverSprite.setVisible(true)
      hoverSprite.play('walk')
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
