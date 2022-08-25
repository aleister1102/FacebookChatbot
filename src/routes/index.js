const webhookRouter = require('../features/webhook/webhook.routes')
const profileRouter = require('../features/profile/profile.routes')
const siteRouter = require('../features/site/site.routes')

function configRoutes(app) {
    app.use('/', siteRouter)
    app.use('/', webhookRouter)
    app.use('/', profileRouter)
}

module.exports = { configRoutes }
