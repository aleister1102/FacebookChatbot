function hoursDiff(date1, date2) {
    let diff = date2 - date1
    return Math.floor(diff / 1000 / 60 / 60)
}

module.exports = hoursDiff
