import express from 'express'
import NumParamController from '../interfaces/controllers/NumParamController'
import NumParamRepository from '../interfaces/database/NumParamRepository'

const router: express.Router = express.Router()

const numParamController = new NumParamController(new NumParamRepository())

router.get('/init', async (req: express.Request, res: express.Response) => {
    const results = await numParamController.findAllNumParam()
    res.send(results)
})

export default router
