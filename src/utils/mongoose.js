function convertMultipleDocumentsToObjects(documents) {
    return documents.map((document) => document.toObject())
}

function convertDocumentToObject(document) {
    return document.toObject()
}

module.exports = { convertMultipleDocumentsToObjects, convertDocumentToObject }
