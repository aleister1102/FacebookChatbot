function getHomePage(req, res) {
    res.render('home')
}

function getEventPage(req, res) {
    res.render('event')
}

function getMaterialPage(req, res) {
    res.render('material')
}

module.exports = {
    getHomePage: getHomePage,
    getEventPage: getEventPage,
    getMaterialPage: getMaterialPage,
}
