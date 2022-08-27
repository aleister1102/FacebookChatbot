require('dotenv').config()

const morgan = require('morgan')
const express = require('express')
const path = require('path')

const { engine } = require('express-handlebars')

const mongoose = require('mongoose')

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

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect successfully!')
    } catch (error) {
        console.log(`Connect failed: ${error}!!!`)
    }
}

module.exports = { configMiddlewares, configViewEngine, connectToDatabase }
