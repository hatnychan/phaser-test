export type MapData = [MapImage, MapPos]

export type MapImage = {
    [x: string]: string
}

export type MapPos = {
    mapId: string
    tilePos: Map<string, number[][]>
    eventPos: Map<string, number[][]>
}
