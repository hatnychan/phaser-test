import { UserData } from '../../../server/domain/types/UserData'

export const userData: UserData = { userCd: '', scene: 'MENU' }

// game-logにログを出力する。
export const outputGameLog = (newGameLog: string): void => {
    const gameLogElement: HTMLElement = document.getElementById('game-log') as HTMLElement
    const gameLog: string = gameLogElement.innerHTML
    gameLogElement.innerHTML = gameLog.length > 0 ? gameLog + '<br>' + newGameLog : newGameLog
}
