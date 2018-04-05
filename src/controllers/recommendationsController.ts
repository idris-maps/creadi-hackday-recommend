import { Router, Request, Response } from 'express'
import getRecommedation from '../utils/getHolidayTypes'
import { isValidReq, sanitizeReq } from './recommendationsController.utils'
import onError from './onError'

const router = Router()

router.get('/', (req: Request, res: Response) => 
  isValidReq(req)
    ? getRecommedation(sanitizeReq(req))
      .then(score => res.status(200).json(score))
      .catch(onError(res, 'Could not recommend holidays'))
    : res.status(400).json({ message: 'Invalid query' }))

export default router