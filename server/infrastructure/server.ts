import express from 'express'
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'
import { NumParam } from '../domain/models/NumParam'

const app = async (): Promise<void> => {
    const app = express()

    // Body-Parser
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // --- TypeORMの設定
    const connectionOptions = await getConnectionOptions()
    const connection = await createConnection(connectionOptions)
    // ActiveRecordパターンでTypeORMを使用する
    BaseEntity.useConnection(connection)

    app.get('/', async (req: express.Request, res: express.Response) => {
        const numParam = await NumParam.find()
        res.send(numParam)
    })

    // Route設定
    //app.use('/', router)
    const PORT = 8080
    app.listen(PORT, () => {
        console.log('listening on port' + PORT)
    })
}
app()
