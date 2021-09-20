const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

module.exports = function(token) {
    MongoClient.connect('mongodb://localhost:27017/login', (err, client) => {
        const db = client.db('login');
        updateDocuments(db, () => {
            client.close()
        })
    })
    const updateDocuments = (db) => {
        const document = {
            $set: {'used': true}
        }
        db.collection.updateOne({"token": token}, document)
    }
}