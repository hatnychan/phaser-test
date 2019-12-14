//import Phaser from 'phaser'
// import Phaser = require('phaser')
import * as Phaser from 'phaser'

import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { PlayScene } from './scenes/PlayScene'

new Phaser.Game({
    width: 800,
    height: 600,
    scene: [LoadScene, MenuScene, PlayScene],
    render: {
        pixelArt: true
    }
})
