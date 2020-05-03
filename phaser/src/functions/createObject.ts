import phaser from 'phaser'

export const createMapObject = (
    PlayScene: phaser.Scene,
    assetsMapParamKey: string | undefined,
    mapObjectPos: number[][]
): phaser.Tilemaps.StaticTilemapLayer => {
    const mapObject: phaser.Tilemaps.Tilemap = PlayScene.make.tilemap({
        data: mapObjectPos,
        tileWidth: 40,
        tileHeight: 40
    })

    if (assetsMapParamKey === undefined) return mapObject.createStaticLayer(0, mapObject.addTilesetImage('DUMMY'), 0, 0)
    const tiles: phaser.Tilemaps.Tileset = mapObject.addTilesetImage(assetsMapParamKey)
    const mapObjectLayer: phaser.Tilemaps.StaticTilemapLayer = mapObject.createStaticLayer(0, tiles, 0, 0)
    return mapObjectLayer
}
