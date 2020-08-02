import express from 'express'
import ParamController from '../interfaces/controllers/ParamController'
import GameLogController from '../interfaces/controllers/GameLogController'
import NumParamRepository from '../interfaces/database/NumParamRepository'
import StrParamRepository from '../interfaces/database/StrParamRepository'
import GameLogRepository from '../interfaces/database/GameLogRepository'
import { ParamData, SerializeGameLog } from '../../common/types'

const router: express.Router = express.Router()
const paramController = new ParamController(new NumParamRepository(), new StrParamRepository())
const gameLogController = new GameLogController(new GameLogRepository())

router.get('/param', async (req: express.Request, res: express.Response) => {
    const resData: ParamData = await paramController.findAllParam()
    res.json(resData)
})

router.post('/gameLog', async (req: express.Request, res: express.Response) => {
    const gameLog: SerializeGameLog = await gameLogController.findGameLog(req.body)
    const resData: SerializeGameLog = gameLog
    res.json(resData)
})

export default router
