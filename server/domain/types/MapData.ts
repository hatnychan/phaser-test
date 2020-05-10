export type MapData = [MapConfig, MapPos]

export type MapConfig = {
    NPC: string
    TILE: string
}

export type MapPos = {
    mapId: string
    tilePos: Map<string, number[][]>
    eventPos: Map<string, number[][]>
    frontMapId: string
    backMapId: string
    leftMapId: string
    rightMapId: string
}
