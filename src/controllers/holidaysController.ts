import { Router, Request, Response } from 'express'
import { HolidayType } from '../models'
import onError from './onError'
import { isValidPost } from './holidaysController.utils'

const router: Router = Router()

router.get('/', (req: Request, res: Response) =>
  HolidayType.find()
    .then(holidays => res.status(200).json(holidays))
    .catch(onError(res, 'Could not retieve holiday types')))

router.get('/:holidayTypeId', (req: Request, res: Response) =>
  HolidayType.findById(req.params.holidayTypeId)
    .then(holiday => holiday
      ? res.status(200).json(holiday)
      : res.sendStatus(404))
    .catch(onError(res, 'Could not get holiday type')))

router.post('/', (req: Request, res: Response) =>
  isValidPost(req)
    ? HolidayType.create(req.body)
        .then(holiday => res.status(200).json(holiday))
        .catch(onError(res, 'Could not create holiday type'))
    : res.status(400).json({ message: 'Invalid body' }))

router.delete('/:holidayTypeId', (req: Request, res: Response) =>
  HolidayType.findById(req.params.holidayTypeId)
    .then(holiday => holiday
      ? holiday.remove()
      : null)
    .then(resp => resp
      ? res.sendStatus(204)
      : res.sendStatus(404))
    .catch(onError(res, 'Could not delete holiday type')))

export default router