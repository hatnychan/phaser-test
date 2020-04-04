type CSTScenes = {
  LOAD: string
  MENU: string
  PLAY: string
}

export type CSTImage = {
  LOGO: string
  OPTIONS: string
  PLAY: string
  TITLE: string
  FRAME: string
}

export type CSTSprite = {
  CAT: string
}

export type CSTAudio = {}

export type CSTMap = {
  MAP: string
  NPC: string
}

export const CST = {
  SCENES: {
    LOAD: 'LOAD',
    MENU: 'MENU',
    PLAY: 'PLAY',
  } as CSTScenes,
  IMAGE: {
    LOGO: 'logo.png',
    OPTIONS: 'options_button.png',
    PLAY: 'play_button.png',
    TITLE: 'title_bg.jpg',
    FRAME: 'frame.png',
  } as CSTImage,
  AUDIO: {} as CSTAudio,
  SPRITE: {
    CAT: 'cat.png',
  } as CSTSprite,
  MAP: {
    MAP: 'map_tile.png',
    NPC: 'npc.png',
  } as CSTMap,
}
