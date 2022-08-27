require('dotenv').config()
const { engine } = require('express-handlebars')
const express = require('express')
const morgan = require('morgan')
const path = require('path')

function configMiddlewares(app) {
    // HTTP logger
    app.use(morgan('dev'))

    // parse application/json
    app.use(express.json())

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }))
}

function configViewEngine(app) {
    app.engine(
        'hbs',
        engine({
            extname: 'hbs',
        }),
    )
    app.set('view engine', 'hbs')
    app.set('views', path.join(__dirname, '..', 'views'))
}

module.exports = { configMiddlewares, configViewEngine }
