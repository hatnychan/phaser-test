import express from 'express'
import ParamController from '../interfaces/controllers/ParamController'
import NumParamRepository from '../interfaces/database/NumParamRepository'
import StrParamRepository from '../interfaces/database/StrParamRepository'
import { SerializeNumParam } from '../../common/types/SerializeNumParam'
import { SerializeStrParam } from '../../common/types/SerializeStrParam'

const router: express.Router = express.Router()
const paramController = new ParamController(new NumParamRepository(), new StrParamRepository())

router.get('/init', async (req: express.Request, res: express.Response) => {
    const results: [SerializeNumParam[], SerializeStrParam[]] = await paramController.findAllParam()
    res.json(results)
})

export default router
