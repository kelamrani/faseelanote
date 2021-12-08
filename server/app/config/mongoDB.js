var MONGO_DB = require('mongodb');
const MongoClient = MONGO_DB.MongoClient;
const uri = process.env.MONGO_URI;

try {
    var M_CONNECT = MongoClient.connect(uri, {
        useUnifiedTopology: true,
        useUnifiedTopology: true,

    });
    module.exports = { MONGO_DB, M_CONNECT };
} catch (err) {
    console.log(err);
}
