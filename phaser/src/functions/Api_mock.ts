import { ParamData } from '../../../server/domain/types/ParamData'
import { MapData } from '../../../server/domain/types/MapData'
import { SpriteData } from '../../../server/domain/types/SpriteData'
import { UserData } from '../../../server/domain/types/UserData'

// userデータを元に絞る 上下左右のマップ情報も
const mapData: MapData = [
    {
        NPC: 'npc.png',
        TILE: 'map_tile.png'
    },
    {
        mapId: 'field1',
        tilePos: new Map([
            [
                'TILE',
                [
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
                ]
            ],
            [
                'NPC',
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            ]
        ]),
        eventPos: new Map([
            [
                'NPC',
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            ]
        ]),
        frontMapId: 'field2',
        backMapId: '',
        leftMapId: '',
        rightMapId: ''
    }
]

// userデータを元に絞る texture、width、heightはシステムパラメータから取得
export const spriteDataMenu: SpriteData = [
    [
        {
            animeCd: 'CAT1',
            animeKey: ['walk_back', 'walk_left', 'walk_right', 'walk_front'],
            texture: 'cat.png',
            width: 32,
            height: 32
        }
    ],
    [
        {
            initAnimeCd: 'CAT1',
            initFrame: 0,
            initX: 100,
            initY: 100,
            act: []
        }
    ]
]

// 後にキャラのスピードデータも入れる。スピードが高いほどmapオブジェクトの後ろに格納される
export const spriteDataPlay: SpriteData = [
    [
        {
            animeCd: 'ANN1',
            animeKey: ['walk_front', 'walk_left', 'walk_back', 'walk_right'],
            texture: 'anna.png',
            width: 64,
            height: 64
        },
        {
            animeCd: 'EYEBALL1',
            animeKey: ['walk_front', 'walk_left', 'walk_back', 'walk_right'],
            texture: 'eyeball.png',
            width: 32,
            height: 38
        }
    ],
    [
        {
            initAnimeCd: 'ANN1',
            initFrame: 18,
            initX: 10,
            initY: 8,
            act: []
        },
        {
            initAnimeCd: 'EYEBALL1',
            initFrame: 3,
            initX: 3,
            initY: 4,
            act: [
                'walk_back',
                'walk_left',
                'walk_back',
                'walk_back',
                'walk_back',
                'walk_right',
                'walk_left',
                'walk_left',
                'walk_back',
                'walk_right',
                'walk_right',
                'walk_right',
                'walk_right',
                'walk_right',
                'walk_right',
                'walk_right',
                'walk_right',
                'walk_left',
                'walk_right',
                'walk_left',
                'walk_front',
                'walk_back',
                'walk_back',
                'walk_left',
                'walk_left',
                'walk_left',
                'walk_left',
                'walk_left',
                'walk_left',
                'walk_left',
                'walk_left',
                'walk_left',
                'walk_left',
                'walk_left',
                'walk_left'
            ]
        }
    ]
]

const paramData: ParamData = [
    {
        SCREEN_SIZE: { WIDTH: 800, HEIGHT: 600 },
        DISPLAY_TILE_MAP_SIZE: { VALUE: 40 }
    },
    {
        ASSETS_IMAGE: {
            FRAME: 'frame.png',
            LOGO: 'logo.png',
            OPTIONS: 'options_button.png',
            PLAY: 'play_button.png',
            TITLE: 'title_bg.jpg'
        },
        ASSETS_MAP: {
            TILE: 'map_tile.png',
            NPC: 'npc.png'
        },
        ASSETS_AUDIO: { OPENING: 'PerituneMaterial_Splash.mp3' }
    }
]

export const getMapData = (userData: UserData): Promise<MapData> => {
    userData
    const data: MapData = mapData
    return new Promise(resolve => resolve(data))
}

export const getSpriteData = (userData: UserData): Promise<SpriteData> => {
    let data: SpriteData
    if (userData.scene === 'MENU') {
        data = spriteDataMenu
    } else if (userData.scene === 'PLAY') {
        data = spriteDataPlay
    }
    return new Promise(resolve => resolve(data))
}

export const getParamData = (): Promise<ParamData> => {
    const data: ParamData = paramData
    return new Promise(resolve => resolve(data))
}
