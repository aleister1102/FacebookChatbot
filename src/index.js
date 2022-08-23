const express = require('express')
const app = express()

const configMiddlewares = require('./config/index.config')
const initRoutes = require('./routes/index.routes')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

configMiddlewares(app)
initRoutes(app)