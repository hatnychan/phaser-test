import express from 'express'
import http from 'http'
import { getConnectionOptions, createConnection, BaseEntity, ConnectionOptions, Connection } from 'typeorm'
import router from './router'

const server = async (): Promise<void> => {
    const app = express()

    // http server
    /*実はhttpモジュールを使わなくてもapp.listen(port)でサーバーを起動することができる。
    ただ、socket.ioやHTTPS(実際はhttpsを使う)を利用を考えると、結局httpモジュールを使うことになる。*/
    http.createServer(app).listen(process.env.SERVER_PORT)

    // --- TypeORMの設定
    const connectionOptions: ConnectionOptions = await getConnectionOptions()
    const connection: Connection = await createConnection(connectionOptions)
    // ActiveRecordパターンでTypeORMを使用する
    BaseEntity.useConnection(connection)

    // Body-Parser
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // 静的ファイルのホスティング。express.staticの指定のフォルダが公開される
    app.use('/', express.static('phaser/dist'))

    // APIRouter
    app.use('/api', router)
}
server()
