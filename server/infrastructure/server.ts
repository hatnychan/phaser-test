import express from 'express'
import http from 'http'
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'
import { NumParam } from '../domain/models/NumParam'
;(async (): Promise<void> => {
    const app = express()

    // Body-Parser
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // 静的ファイルのホスティング。express.staticの指定のフォルダが公開される
    app.use(express.static('phaser/dist'))

    // http server
    /*実はhttpモジュールを使わなくてもapp.listen(port)でサーバーを起動することができる。
    ただ、socket.ioやHTTPS(実際はhttpsを使う)を利用を考えると、結局httpモジュールを使うことになる。*/
    const server = http.createServer(app)
    server.listen(8080)

    // --- TypeORMの設定
    const connectionOptions = await getConnectionOptions()
    const connection = await createConnection(connectionOptions)
    // ActiveRecordパターンでTypeORMを使用する
    BaseEntity.useConnection(connection)

    app.get('/init', async (req: express.Request, res: express.Response) => {
        const numParam: NumParam[] = await NumParam.find({ cache: true })
        res.send(numParam)
    })
})()
