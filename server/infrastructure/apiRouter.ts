import express from 'express'
import { ParamData } from '../interfaces/presenters/types'
import { SerializedGameLog } from '../interfaces/presenters/SerializedGameLog'
import ParamController from '../interfaces/controllers/ParamController'
import NumParamRepository from './database/repositories/NumParamRepository'
import StrParamRepository from './database/repositories/StrParamRepository'
import GameLogController from '../interfaces/controllers/GameLogController'
import GameLogRepository from './database/repositories/GameLogRepository'
import UserController from '../interfaces/controllers/UserController'
import UserRepository from './database/repositories/UserRepository'
import User from '../domain/models/User'

const router: express.Router = express.Router()
const paramController = new ParamController(new NumParamRepository(), new StrParamRepository())
const gameLogController = new GameLogController(new GameLogRepository())
const userController = new UserController(new UserRepository())

router.get('/param', async (req: express.Request, res: express.Response) => {
    const resData: ParamData = await paramController.findAllParam()
    res.json(resData)
})

router.post('/gameLog', async (req: express.Request, res: express.Response) => {
    // TODO 変なデータ要求されないようにユーザーごとに参照権限を設定した方が良いかな。
    const cond = req.body
    if (req.user) cond['lang'] = (req.user as User).lang
    else cond['lang'] = ((await userController.findOneUser({ userId: 'default' })) as User).lang
    const gameLog: SerializedGameLog = await gameLogController.findGameLog(cond)
    const resData: SerializedGameLog = gameLog
    res.json(resData)
})

router.get('/sesUser', async (req: express.Request, res: express.Response) => {
    const resData: User = !req.user
        ? ((await userController.findOneUser({ userId: 'default' })) as User)
        : (req.user as User)
    res.json(resData)
})

router.post('/updateSesUser', async (req: express.Request, res: express.Response) => {
    // TODO: サーバー側にもバリデーションチェック入れる
    const sesUser: User = req.user as User
    const updateProp: { [x: string]: string } = req.body
    await userController.updateUser({ userId: sesUser.userId }, updateProp)
    res.sendStatus(200)
})

export default router
