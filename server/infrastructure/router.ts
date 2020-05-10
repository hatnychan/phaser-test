import express from 'express'
import ParamController from '../interfaces/controllers/ParamController'
import NumParamRepository from '../interfaces/database/NumParamRepository'
import StrParamRepository from '../interfaces/database/StrParamRepository'
import { ParamData } from '../domain/types/ParamData'

const router: express.Router = express.Router()
const paramController = new ParamController(new NumParamRepository(), new StrParamRepository())

router.get('/init', async (req: express.Request, res: express.Response) => {
    const results: ParamData = await paramController.findAllParam()
    res.json(results)
})

export default router
