const express = require('express')
const siteRouter = express.Router()

const { eventController } = require('../controllers/event.controllers')

siteRouter.get('/event/list', eventController.getEventPage)
siteRouter.get('/event/add', eventController.getAddEventPage)
siteRouter.post('/event/list', eventController.addEvent)

module.exports = siteRouter
