function getHomePage(req, res) {
    res.render('home')
}

function getEventPage(req, res) {
    res.render('event/event-list')
}

function getAddEventPage(req, res) {
    res.render('event/event-add')
}

module.exports = {
    siteController: {
        getHomePage,
        getEventPage,
        getAddEventPage,
    },
}
