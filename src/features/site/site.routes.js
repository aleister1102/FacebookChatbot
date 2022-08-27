const express = require('express')
const siteRouter = express.Router()

const { siteController } = require('./site.controllers')

siteRouter.get('/', siteController.getHomePage)
siteRouter.get('/event/list', siteController.getEventPage)
siteRouter.get('/event/add', siteController.getAddEventPage)
siteRouter.get('/material/list', siteController.getMaterialPage)
siteRouter.get('/material/add', siteController.getAddMaterialPage)

module.exports = siteRouter
