const webhookRouter = require('../features/webhook/webhook.routes')
const siteRouter = require('../features/site/site.routes')

function configRoutes(app) {
    app.use('/', siteRouter)
    app.use('/', webhookRouter)
}

module.exports = { configRoutes }
