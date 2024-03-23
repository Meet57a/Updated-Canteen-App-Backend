const mongoose = require('mongoose');
const DBname = "StudentCafeDb";
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/' + DBname).on('open', () => {
    console.log('MongoDb connected');
}).on('error', () => {
    console.log('MongoDb connection error');
})

module.exports = connection;