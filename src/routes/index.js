const webhookRouter = require('../features/webhook/webhook.routes')
const profileRouter = require('../features/profile/profile.routes')

function configRoutes(app) {
    app.get('/', (req, res) => {
        res.render('home')
    })
    app.use('/', webhookRouter)
    app.use('/', profileRouter)
}

module.exports = { configRoutes }
