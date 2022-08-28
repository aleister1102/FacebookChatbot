const webhookRouter = require('./webhook.routes')
const siteRouter = require('./event.routes')

function configRoutes(app) {
    app.use('/', siteRouter)
    app.use('/', webhookRouter)
    app.get('/', (req, res) => {
        res.render('home')
    })
}

module.exports = { configRoutes }
