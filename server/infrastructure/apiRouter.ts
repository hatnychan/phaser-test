import express from 'express'
import { ParamData, SerializedGameLog } from '../../common/types'
import ParamController from '../interfaces/controllers/ParamController'
import NumParamRepository from './database/repositories/NumParamRepository'
import StrParamRepository from './database/repositories/StrParamRepository'
import GameLogController from '../interfaces/controllers/GameLogController'
import GameLogRepository from './database/repositories/GameLogRepository'

const router: express.Router = express.Router()
const paramController = new ParamController(new NumParamRepository(), new StrParamRepository())
const gameLogController = new GameLogController(new GameLogRepository())

router.get('/param', async (req: express.Request, res: express.Response) => {
    const resData: ParamData = await paramController.findAllParam()
    res.json(resData)
})

router.post('/gameLog', async (req: express.Request, res: express.Response) => {
    const gameLog: SerializedGameLog = await gameLogController.findGameLog(req.body)
    const resData: SerializedGameLog = gameLog
    res.json(resData)
})

export default router
