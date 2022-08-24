const express = require('express')
const webhookRouter = express.Router()

const webhookController = require('./webhook.controllers')

webhookRouter.get('/webhook', webhookController.getWebhook)
webhookRouter.post('/webhook', webhookController.postWebhook)

module.exports = webhookRouter
