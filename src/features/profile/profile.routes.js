const express = require('express')
const profileRouter = express.Router()

const profileController = require('./profile.controllers')

profileRouter.post('/setup-profile', profileController.setupProfile)

module.exports = profileRouter
