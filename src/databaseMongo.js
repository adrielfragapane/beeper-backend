const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true); 

const URL_DB_MONGODB = process.env.ENV=='PROD' ? process.env.URL_DB_MONGODB_REMOTE : process.env.URL_DB_MONGODB_LOCAL;

mongoose.connect(URL_DB_MONGODB)
    .then(db => console.log(`Conectado a base de datos MongoDB: ${db.connection.db.databaseName}`))
    .catch(err => console.log(err));

module.exports = mongoose;