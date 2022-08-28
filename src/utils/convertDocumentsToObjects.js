function convertDocumentsToObjects(documents) {
    return documents.map((document) => document.toObject())
}

module.exports = convertDocumentsToObjects
