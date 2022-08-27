function getHomePage(req, res) {
    res.render('home')
}

function getEventPage(req, res) {
    res.render('event/event-list')
}

function getAddEventPage(req, res) {
    res.render('event/event-add')
}

function getMaterialPage(req, res) {
    res.render('material/material-list')
}

function getAddMaterialPage(req, res) {
    res.render('material/material-add')
}

module.exports = {
    siteController: {
        getHomePage,
        getEventPage,
        getAddEventPage,
        getMaterialPage,
        getAddMaterialPage,
    },
}
