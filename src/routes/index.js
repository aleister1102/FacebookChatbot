const webhookRouter = require('./webhook.routes')
const siteRouter = require('./site.routes')

function configRoutes(app) {
    app.use('/', siteRouter)
    app.use('/', webhookRouter)
}

module.exports = { configRoutes }
