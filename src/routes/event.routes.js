const express = require('express')
const siteRouter = express.Router()

const { eventController } = require('../controllers/event.controllers')

siteRouter.get('/event/list', eventController.getEventPage)
siteRouter.get('/event/add', eventController.getAddEventPage)
siteRouter.post('/event/list', eventController.addEvent)
siteRouter.get('/event/edit/:id', eventController.getEditEventPage)
siteRouter.put('/event/edit/:id', eventController.updateEvent)
siteRouter.delete('/event/list/:id', eventController.deleteEvent)
siteRouter.put('/event/sort', eventController.sortEvents)

module.exports = siteRouter
