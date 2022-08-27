const express = require('express')
const app = express()

const { configMiddlewares, configViewEngine, setupProfile } = require('./config/')
const { configRoutes } = require('./routes/')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

configMiddlewares(app)
configViewEngine(app)
configRoutes(app)
setupProfile()
