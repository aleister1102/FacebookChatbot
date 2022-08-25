const express = require('express')
const siteRouter = express.Router()

const siteController = require('./site.controllers')

siteRouter.get('/', siteController.getHomePage)
siteRouter.get('/event', siteController.getEventPage)
siteRouter.get('/material', siteController.getMaterialPage)

module.exports = siteRouter
