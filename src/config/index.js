require('dotenv').config()
const { engine } = require('express-handlebars')
const express = require('express')
const morgan = require('morgan')
const axios = require('axios')
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

const APP_DOMAIN = 'https://aleister-botchat.herokuapp.com/'
const FANPAGE_URL =
    'https://www.facebook.com/Aleisters-botchat-103450915827944/'
const MATERIAL_URL = 'https://www.wikipedia.org/'

function setupProfile() {
    // Construct the message body
    let request_body = {
        greeting: [
            {
                locale: 'default',
                text: 'Xin chào!',
            },
            {
                locale: 'en_US',
                text: 'Welcome',
            },
        ],
        get_started: {
            payload: 'GET_STARTED',
        },
        whitelisted_domains: [APP_DOMAIN],
        persistent_menu: [
            {
                locale: 'default',
                composer_input_disabled: false,
                // add about page
                call_to_actions: [
                    {
                        type: 'postback',
                        title: 'Menu chính',
                        payload: 'MAIN_MENU',
                    },
                    {
                        type: 'web_url',
                        title: 'Truy cập fanpage',
                        url: FANPAGE_URL,
                    },
                    {
                        type: 'web_url',
                        title: 'Tài liệu tổng hợp',
                        url: MATERIAL_URL,
                    },
                ],
            },
        ],
    }

    // Send the HTTP request to the Messenger Platform
    axios({
        method: 'POST',
        url: `https://graph.facebook.com/v14.0/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        data: request_body,
    })
        .then(() => {
            console.log('Setup successfully!')
        })
        .catch((error) => console.log('Unable to setup: ' + error))
}

module.exports = { configMiddlewares, configViewEngine, setupProfile }
