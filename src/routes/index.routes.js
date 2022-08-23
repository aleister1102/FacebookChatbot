const webhookRouter = require('../features/webhook/webhook.routes')

function initRoutes(app) {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    app.use('/', webhookRouter)
}

module.exports = initRoutes
