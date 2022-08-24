const webhookRouter = require('../features/webhook/webhook.routes')
const pluginRouter = require('../features/plugins/plugin.routes')

function configRoutes(app) {
    app.get('/', (req, res) => {
        res.render('home')
    })
    app.use('/', pluginRouter)
    app.use('/', webhookRouter)
}

module.exports = { configRoutes }
