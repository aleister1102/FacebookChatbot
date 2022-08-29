const moment = require('moment')

function formatInputDateTime(datetime, format) {
    return datetime ? moment(datetime, 'YYYY-MM-DDTHH:mm').format(format) : ''
}

function hoursDiff(date1, date2) {
    let diff = date2 - date1
    return Math.floor(diff / 1000 / 60 / 60)
}

console.log(hoursDiff('1661616139379', Date.now()))

module.exports = { formatInputDateTime, hoursDiff }
