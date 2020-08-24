// game-logにログを出力する。
export const outputGameLog = (newGameLog: string): void => {
    const gameLogElement: HTMLElement = document.getElementById('game-log') as HTMLElement
    const gameLog: string = gameLogElement.innerHTML
    gameLogElement.innerHTML = gameLog.length > 0 ? gameLog + '<br>' + newGameLog : newGameLog
}

// テキスト中の${0}, ${1}となっているところを引数の値で置換する。
export const replaceText = (text: string, ...replaceArgs: string[]): string => {
    replaceArgs.forEach((arg: string, index: number) => {
        const target = new RegExp('\\$\\{' + index + '\\}', 'g') //gオプション付けると最初の一個だけでなく全部置換する。
        text = text.replace(target, arg)
    })
    return text
}
