const express = require('express')
const pluginRouter = express.Router()

const pluginController = require('./plugin.controllers')

pluginRouter.post('/setup-profile', pluginController.setupProfile)

module.exports = pluginRouter
