const express = require('express')
const siteRouter = express.Router()

const { siteController } = require('../controllers/site.controllers')

siteRouter.get('/event/list', siteController.getEventPage)
siteRouter.get('/event/add', siteController.getAddEventPage)
siteRouter.get('/material/list', siteController.getMaterialPage)
siteRouter.get('/material/add', siteController.getAddMaterialPage)
siteRouter.get('/', siteController.getHomePage)

module.exports = siteRouter
