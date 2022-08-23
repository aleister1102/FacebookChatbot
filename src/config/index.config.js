require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

function configMiddlewares(app) {
    // HTTP logger
    app.use(morgan('dev'))

    // parse application/json
    app.use(express.json())

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }))
}

module.exports = configMiddlewares
