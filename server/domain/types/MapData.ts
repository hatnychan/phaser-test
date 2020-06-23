export type MapData = [MapConfig, MapPos]

export type MapConfig = {
    NPC: string
    TILE: string
    COMMON: string
}

export type MapPos = {
    mapId: string
    tilePos: Map<string, number[][]>
    eventPos: Map<string, number[][]>
}
