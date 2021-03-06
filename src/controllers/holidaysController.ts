import { Router, Request, Response } from 'express'
import { HolidayType } from '../models'
import onError from './onError'
import {
  isValidPost,
  isValidAddKeyword,
  isValidAddSeason,
  sanitizeSeason,
} from './holidaysController.utils'

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

router.post('/:holidayTypeId/keywords', (req: Request, res: Response) =>
  isValidAddKeyword(req)
    ? HolidayType.findById(req.params.holidayTypeId)
        .then(holiday => holiday
          ? holiday.addKeyword(req.body.keyword, req.body.points)
          : null)
        .then(resp => resp
          ? res.status(200).send(resp)
          : res.sendStatus(404))
        .catch(onError(res, 'Could not add keyword'))
    : res.status(400).json({ message: 'Invalid body' }))

router.delete('/:holidayTypeId/keywords/:keyword', (req: Request, res: Response) =>
  HolidayType.findById(req.params.holidayTypeId)
    .then(holiday => holiday
      ? holiday.deleteKeyword(decodeURIComponent(req.params.keyword))
      : null)
    .then(resp => resp
      ? res.status(200).send(resp)
      : res.sendStatus(404))
    .catch(onError(res, 'Could not delete keyword')))

router.patch('/:holidayTypeId/keywords/:keyword', (req: Request, res: Response) =>
  HolidayType.findById(req.params.holidayTypeId)
    .then(holiday => holiday
      ? holiday.updateKeywordPoints(decodeURIComponent(req.params.keyword), req.body.points)
      : null)
    .then(resp => resp
      ? res.status(200).send(resp)
      : res.sendStatus(404))
    .catch(onError(res, 'Could not update keyword points')))

router.post('/:holidayTypeId/seasons', (req: Request, res: Response) =>
  isValidAddSeason(req)
    ? HolidayType.findById(req.params.holidayTypeId)
        .then(holiday => holiday
          ? holiday.addSeason(req.body.season)
          : null)
        .then(resp => resp
          ? res.status(200).send(resp)
          : res.sendStatus(404))
        .catch(onError(res, 'Could not add season'))
    : res.status(400).json({ message: 'Invalid body' }))

router.delete('/:holidayTypeId/seasons/:season', (req: Request, res: Response) =>
  HolidayType.findById(req.params.holidayTypeId)
    .then(holiday => holiday
      ? holiday.deleteSeason(sanitizeSeason(req))
      : null)
    .then(resp => resp
      ? res.status(200).send(resp)
      : res.sendStatus(404))
    .catch(onError(res, 'Could not delete season')))

export default router