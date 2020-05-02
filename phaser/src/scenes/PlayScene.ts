import { CST } from '../CST'
import phaser from 'phaser'

type WalkAnimState = 'walk_front' | 'walk_back' | 'walk_left' | 'walk_right' | ''

type MoveDir = -1 | 0 | 1

export class PlayScene extends phaser.Scene {
    private map?: phaser.Tilemaps.Tilemap
    private mapEvent?: phaser.Tilemaps.Tilemap // 追加
    private tiles?: phaser.Tilemaps.Tileset
    private mapGroundLayer!: phaser.Tilemaps.StaticTilemapLayer
    private mapEventLayer!: phaser.Tilemaps.StaticTilemapLayer // 追加
    private cursors!: phaser.Types.Input.Keyboard.CursorKeys
    private anna!: phaser.GameObjects.Sprite
    private isWalking!: boolean
    private isTalking!: boolean
    private charaTilePos: { tx: number; ty: number } = { tx: 10, ty: 8 }

    private quoteFrame!: phaser.GameObjects.Image
    private quote!: phaser.GameObjects.Text
    private quoteArea!: phaser.GameObjects.Container

    private map_ground: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    ] // 20 * 15

    private map_event: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ] // 20 * 15

    constructor() {
        super({ key: 'PLAY' })
    }
    init(): void {
        const annaAnims: phaser.Types.Animations.Animation[] = [
            {
                key: 'walk_front',
                frameRate: 10,
                frames: this.anims.generateFrameNumbers('anna', {
                    start: 0,
                    end: 8
                }),
                repeat: -1
            },
            {
                key: 'walk_left',
                frameRate: 10,
                frames: this.anims.generateFrameNumbers('anna', {
                    start: 9,
                    end: 17
                }),
                repeat: -1
            },
            {
                key: 'walk_back',
                frameRate: 10,
                frames: this.anims.generateFrameNumbers('anna', {
                    start: 18,
                    end: 26
                }),
                repeat: -1
            },
            {
                key: 'walk_right',
                frameRate: 10,
                frames: this.anims.generateFrameNumbers('anna', {
                    start: 27,
                    end: 35
                }),
                repeat: -1
            }
        ]

        for (const charaAnim of annaAnims) {
            // アニメーションの数だけループ
            if (this.anims.create(charaAnim) === false) continue // もしfalseならばこの後何もしない
        }

        this.isWalking = false
        this.isTalking = false
    }

    preload(): void {
        console.log('preload')
    }

    create(): void {
        this.map = this.make.tilemap({
            data: this.map_ground,
            tileWidth: 40,
            tileHeight: 40
        })
        this.tiles = this.map.addTilesetImage(CST.MAP.MAP)
        this.mapGroundLayer = this.map.createStaticLayer(0, this.tiles, 0, 0)

        this.mapEvent = this.make.tilemap({
            data: this.map_event,
            tileWidth: 40,
            tileHeight: 40
        })
        this.tiles = this.mapEvent.addTilesetImage(CST.MAP.NPC)
        this.mapEventLayer = this.mapEvent.createStaticLayer(0, this.tiles, 0, 0)

        this.quoteFrame = this.add.image(0, 0, CST.IMAGE.FRAME) // 生成
        this.quoteFrame.setDisplaySize(800, 120) // リサイズ
        this.quote = this.add.text(-370, -50, '', {
            fontSize: '40px',
            color: 'black',
            wordWrap: {
                width: 730,
                useAdvancedWrap: true
            }
        }) // 生成
        this.quoteArea = this.add.container(400, 540) // 生成
        this.quoteArea.add([this.quoteFrame, this.quote]) // ゲームオブジェクトを格納
        this.quoteArea.setVisible(false) // 非表示化

        const pimple: phaser.GameObjects.Sprite = this.add.sprite(400, 400, 'daze')
        pimple.setOrigin(1)
        pimple.play('dazzle')

        // const mandy: phaser.GameObjects.Sprite = this.add.sprite(
        //   400,
        //   400,
        //   'mandy',
        //   0,
        // )

        // const hooded: phaser.GameObjects.Sprite = this.add
        //   .sprite(200, 200, 'hooded')
        //   .setScale(2)
        //.play('walk_right')
        const charaPos: phaser.Math.Vector2 = this.mapGroundLayer.tileToWorldXY(
            this.charaTilePos.tx,
            this.charaTilePos.ty
        )
        this.anna = this.add.sprite(charaPos.x, charaPos.y, 'anna', 18)
        this.anna.setDisplaySize(40, 40)
        this.anna.setOrigin(0)
        this.cursors = this.input.keyboard.createCursorKeys()

        this.input.keyboard.addKey('Enter').on('down', () => {
            const charaFacing:
                | {
                      tx: number
                      ty: number
                  }
                | undefined = this.getNowCharaFaceTilePos()
            const heroLastAnim: WalkAnimState | string = this.anna.anims.getCurrentKey()
            let quote = ''

            if (charaFacing === undefined) return
            const eventIndex: number = this.map_event[charaFacing.ty][charaFacing.tx]
            if (eventIndex <= 0) return

            if (this.isTalking) {
                this.isTalking = false
                this.quoteArea.setVisible(false)
            } else {
                this.isTalking = true

                if (eventIndex == 2) {
                    if (heroLastAnim == 'walk_front') quote = 'にゃ〜'
                    // 正面から話しかけられた場合
                    else quote = 'しょうめんからはなしかけてくれにゃ〜' // それ以外から話しかけられた場合
                } else if (eventIndex == 1) {
                    if (heroLastAnim == 'walk_front') quote = 'あらあら、こんにちわ'
                    else quote = 'しょうめんからはなしかけてもらえるとうれしいんだけどねぇ〜'
                } else if (eventIndex == 3) {
                    if (heroLastAnim == 'walk_front') quote = '正月休み、刹那で終わってワロタ'
                    else quote = 'しょうめんからはなしかけないとたましいをいただく'
                } else return

                this.quoteArea.setVisible(true)
                this.quote.text = quote
            }
        })
    }

    update(): void {
        if (this.isWalking) return
        if (this.isTalking) return
        let xDir: MoveDir = 0 // x座標の移動方向を表すための変数
        let yDir: MoveDir = 0 // y座標の移動方向を表すための変数
        let charaNewTilePos: { tx: number; ty: number } = this.charaTilePos // 追加

        let annaAnimState: WalkAnimState = ''

        // const tile = this.mapGroundLayer.getTileAtWorldXY(
        //   this.anna.x,
        //   this.anna.y,
        //   true,
        // )

        // ここで状態決定（ローカルな変数に格納）
        if (this.cursors.up != undefined && this.cursors.up.isDown) {
            annaAnimState = 'walk_front'
            yDir = -1
        } else if (this.cursors.down != undefined && this.cursors.down.isDown) {
            annaAnimState = 'walk_back'
            yDir = 1
        } else if (this.cursors.left != undefined && this.cursors.left.isDown) {
            annaAnimState = 'walk_left'
            xDir = -1
        } else if (this.cursors.right != undefined && this.cursors.right.isDown) {
            annaAnimState = 'walk_right'
            xDir = 1
        } else {
            this.anna.anims.stop()
            return
        }

        this.anna.anims.play(annaAnimState, true)

        charaNewTilePos = {
            tx: charaNewTilePos.tx + xDir,
            ty: charaNewTilePos.ty + yDir
        }

        if (charaNewTilePos.tx < 0) return
        if (charaNewTilePos.ty < 0) return
        if (charaNewTilePos.tx >= 20) return
        if (charaNewTilePos.ty >= 15) return
        if (this.map_ground[charaNewTilePos.ty][charaNewTilePos.tx] === 1) return // 追加
        if (this.map_event[charaNewTilePos.ty][charaNewTilePos.tx] != 0) return
        this.charaTilePos = charaNewTilePos // 追加

        this.isWalking = true
        this.gridWalkTween(this.anna, 40, xDir, yDir, () => {
            this.isWalking = false
        })
    }

    private gridWalkTween(
        target: phaser.GameObjects.Sprite,
        baseSpeed: number,
        xDir: MoveDir,
        yDir: MoveDir,
        onComplete: () => void
    ): void {
        const tween: phaser.Tweens.Tween = this.add.tween({
            // 対象のオブジェクト
            targets: [target],
            // X座標の移動を設定
            x: {
                getStart: (): number => target.x,
                getEnd: (): number => target.x + baseSpeed * xDir
            },
            // X座標の移動を設定
            y: {
                getStart: (): number => target.y,
                getEnd: (): number => target.y + baseSpeed * yDir
            },
            // アニメーションの時間
            duration: 600,
            // アニメーション終了時に発火するコールバック
            onComplete: () => {
                tween.stop() // Tweenオブジェクトの削除
                onComplete() // 引数の関数実行
            }
        })
    }

    // ここから追加  ヒーローの向いた先のタイル座標を取得
    private getNowCharaFaceTilePos(): { tx: number; ty: number } | undefined {
        if (this.isWalking) return undefined // 歩いていたら取得できないこととする

        const charaLastAnim: WalkAnimState | string = this.anna.anims.getCurrentKey()
        const dir: { dx: MoveDir; dy: MoveDir } = { dx: 0, dy: 0 }
        const nowPos: { tx: number; ty: number } = this.charaTilePos

        if (charaLastAnim == 'walk_front')
            // 手前に歩いていたら
            dir.dy = -1
        else if (charaLastAnim == 'walk_left')
            // 左に歩いていたら
            dir.dx = -1
        else if (charaLastAnim == 'walk_right')
            // 右に歩いていたら
            dir.dx = 1
        else if (charaLastAnim == 'walk_back')
            // 奥に歩いていたら
            dir.dy = 1

        const facing: { tx: number; ty: number } = {
            tx: nowPos.tx + dir.dx,
            ty: nowPos.ty + dir.dy
        } // 現在座標から向いてる方向に応じて計算

        // 画面外を示していたらundefinedを返す
        if (facing.tx > 20 || facing.tx < 0) return undefined
        if (facing.ty > 15 || facing.ty < 0) return undefined

        return facing
    }
}
