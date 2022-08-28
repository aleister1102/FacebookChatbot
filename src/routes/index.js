const webhookRouter = require('./webhook.routes')
const eventRouter = require('./event.routes')

function configRoutes(app) {
    app.use('/', eventRouter)
    app.use('/', webhookRouter)
    app.get('/', (req, res) => {
        res.render('home')
    })
}

module.exports = { configRoutes }
