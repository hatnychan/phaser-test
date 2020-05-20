import { ParamData } from '../../../server/domain/types/ParamData'
import { MapData, MapPos } from '../../../server/domain/types/MapData'
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
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                    [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            ],
            [
                'NPC',
                [
                    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        eventPos: new Map([
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
        // {
        //     animeCd: 'ANN1',
        //     animeKey: ['walk_front', 'walk_left', 'walk_back', 'walk_right'],
        //     texture: 'anna.png',
        //     width: 64,
        //     height: 64
        // },
        {
            animeCd: 'EYEBALL1',
            animeKey: ['walk_front', 'walk_left', 'walk_back', 'walk_right'],
            texture: 'eyeball.png',
            width: 32,
            height: 38
        }
    ],
    [
        // {
        //     initAnimeCd: 'ANN1',
        //     initFrame: 18,
        //     initX: 10,
        //     initY: 8,
        //     act: []
        // },
        {
            initAnimeCd: 'EYEBALL1',
            initFrame: 3,
            initX: 0,
            initY: 14,
            act: []
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

const addUtilityTileArray = (
    i: number,
    utilityMap: number[][],
    x: number,
    y: number,
    standardUtility: number,
    nextUtilityTileArray: {
        map: number
        x: number
        y: number
        preUtility: number
    }[],
    currentUtilityTileArray: {
        map: number
        x: number
        y: number
        preUtility: number
    }[]
): void => {
    if (utilityMap[y] != undefined && utilityMap[y][x] != undefined && utilityMap[y][x] === 0) {
        const nextUtilityTile = { map: utilityMap[y][x], x: x, y: y, preUtility: standardUtility }
        const existNextUtilityTileArray = nextUtilityTileArray.filter(nut => nut.y === y && nut.x === x)
        const existNextUtilityTile =
            existNextUtilityTileArray.length > 0
                ? existNextUtilityTileArray.reduce((a, b) => (a.preUtility < b.preUtility ? a : b))
                : undefined

        const existCurrentUtilityTileArray = currentUtilityTileArray.filter(nut => nut.y === y && nut.x === x)
        const existCurrentUtilityTile =
            existCurrentUtilityTileArray.length > 0
                ? existCurrentUtilityTileArray.reduce((a, b) => (a.preUtility < b.preUtility ? a : b))
                : undefined

        if (i < standardUtility && existNextUtilityTile === undefined) {
            nextUtilityTileArray.push(nextUtilityTile)
        } else if (
            i < standardUtility &&
            existNextUtilityTile != undefined &&
            existNextUtilityTile.preUtility > standardUtility
        ) {
            const exIndex = nextUtilityTileArray.indexOf(existNextUtilityTile)
            nextUtilityTileArray[exIndex] = nextUtilityTile
        } else if (i >= standardUtility && existCurrentUtilityTile === undefined) {
            currentUtilityTileArray.push(nextUtilityTile)
        } else if (
            i >= standardUtility &&
            existCurrentUtilityTile != undefined &&
            existCurrentUtilityTile.preUtility > standardUtility
        ) {
            const exIndex = currentUtilityTileArray.indexOf(existCurrentUtilityTile)
            currentUtilityTileArray[exIndex] = nextUtilityTile
        }
    }
}

// NPC行動アルゴリズム
export const characterActionAlgo = (): { utilityMap: number[][]; actArray: string[] } => {
    const start = { x: 0, y: 14 }
    const goal = { x: 5, y: 0 }
    const utilityMap = [
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    const tileMap = JSON.parse(JSON.stringify(mapData[1].tilePos.get('TILE') as number[][]))
    tileMap[5][5] = 3
    const charaUtilityCoeff = { time: 1, labor: 1 }
    const tileDataDic = new Map([
        [0, { time: 1, labor: 1 }],
        [1, { time: 5, labor: 5 }],
        [3, { time: 0, labor: 5 }]
    ])
    const baseTileData = { time: 1, labor: 1 }
    const baseUtility = charaUtilityCoeff.time * baseTileData.time + charaUtilityCoeff.labor * baseTileData.labor

    const nextUtilityTileArray = [{ map: utilityMap[goal.y][goal.x], x: goal.x, y: goal.y, preUtility: 0 }]
    for (let i = 0; i < 100; i++) {
        const currentUtilityTileArray = nextUtilityTileArray.slice()
        const nextUtilityTileCount = nextUtilityTileArray.length
        console.log('i=' + i)
        while (0 < currentUtilityTileArray.length) {
            if (i < currentUtilityTileArray[0].preUtility) {
                currentUtilityTileArray.shift()
                continue
            }
            console.log('nextUtilityTileArray.length=' + nextUtilityTileArray.length)
            console.log('currentUtilityTileArray.length=' + currentUtilityTileArray.length)

            const currentDeductTile = currentUtilityTileArray[0]
            const x = currentDeductTile.x
            const y = currentDeductTile.y

            const tile = tileMap[y][x]
            const tileData = tileDataDic.get(tile) as { time: number; labor: number }
            const utility = charaUtilityCoeff.time * tileData.time + charaUtilityCoeff.labor * tileData.labor
            const standardUtility = (utility / baseUtility) * i + 1
            utilityMap[y][x] = standardUtility

            addUtilityTileArray(i, utilityMap, x - 1, y, standardUtility, nextUtilityTileArray, currentUtilityTileArray)
            addUtilityTileArray(i, utilityMap, x + 1, y, standardUtility, nextUtilityTileArray, currentUtilityTileArray)
            addUtilityTileArray(i, utilityMap, x, y - 1, standardUtility, nextUtilityTileArray, currentUtilityTileArray)
            addUtilityTileArray(i, utilityMap, x, y + 1, standardUtility, nextUtilityTileArray, currentUtilityTileArray)

            currentUtilityTileArray.shift()
            console.log('y=' + y + ' x=' + x + ' standardUtility=' + standardUtility)
        }
        nextUtilityTileArray.splice(0, nextUtilityTileCount)
        console.log('###############################')
    }

    // 効用マップを行動配列に変換
    const actArray = []
    let currentAct = { utility: utilityMap[start.y][start.x], x: start.x, y: start.y, act: '' }
    let isLoop = true
    while (isLoop) {
        const x = currentAct.x
        const y = currentAct.y
        currentAct = { utility: utilityMap[y][x], x: x, y: y, act: '' }

        const minUtility = [currentAct]
        if (utilityMap[y][x - 1] != undefined)
            minUtility.push({ utility: utilityMap[y][x - 1], x: x - 1, y: y, act: 'walk_left' })
        if (utilityMap[y][x + 1] != undefined)
            minUtility.push({ utility: utilityMap[y][x + 1], x: x + 1, y: y, act: 'walk_right' })
        if (utilityMap[y - 1] != undefined)
            minUtility.push({ utility: utilityMap[y - 1][x], x: x, y: y - 1, act: 'walk_front' })
        if (utilityMap[y + 1] != undefined)
            minUtility.push({ utility: utilityMap[y + 1][x], x: x, y: y + 1, act: 'walk_back' })

        const nextAct = minUtility.reduce((a, b) => (a.utility < b.utility ? a : b))
        if (nextAct.act != '') actArray.push(nextAct.act)
        else isLoop = false

        currentAct = nextAct
    }
    return { utilityMap: utilityMap, actArray: actArray }
}

export const getSpriteData = (userData: UserData): Promise<SpriteData> => {
    let data: SpriteData
    if (userData.scene === 'MENU') {
        data = spriteDataMenu
    } else if (userData.scene === 'PLAY') {
        const aaa = characterActionAlgo()
        console.log(aaa.utilityMap)
        console.log(aaa.actArray)
        spriteDataPlay[1][0].act = aaa.actArray
        data = spriteDataPlay
    }
    return new Promise(resolve => resolve(data))
}

export const getParamData = (): Promise<ParamData> => {
    const data: ParamData = paramData
    return new Promise(resolve => resolve(data))
}
