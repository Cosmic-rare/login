const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

module.exports = function(id, token) {
    MongoClient.connect('mongodb://localhost:27017/login', (err, client) => {
        const db = client.db('login');
        insertDocuments(db, () => {
            client.close()
        })
    })
    const insertDocuments = (db, callback) => {
        const documents = [
            { user_id: id, token: token, used: false }
        ]
        db.collection('hash').insertMany(documents, (err, result) => {
            callback(result)
        })
    }
}