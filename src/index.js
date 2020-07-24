const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');

/********************************************SETTINGS********************************************/

//Configuring the port
app.set('port', process.env.PORT || 3000);

dotenv.config();

/********************************************CONFIGURING DB********************************************/

require('./databaseMongo');  // MongoDB

/********************************************MIDDLEWARES********************************************/

app.use(morgan('dev'));
app.use(express.json()); // permite que el servidor entienda objetos json
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:4200'}));

app.use(session({
    secret: '076ee61d63aa10a125ea872411e433b9',
    resave: true,
    saveUninitialized: true,
    /*maxAge: new Date(Date.now() + 3600000),
    store: new mongoStore({
        url: 'mongodb://localhost/node',
        autoReconnect: true
    })*/
}));

/********************************************GLOBAL VARIABLES********************************************/

//Se indica que el usuario va a ver la ruta "/public" pero en el servidor representa "/storage/imgs"
//app.use('/dinamico', express.static(path.join(__dirname,'/storage/dinamico')));
//app.use('/estatico', express.static(path.join(__dirname,'/storage/estatico')));

//app.use(express.static(path.join(__dirname,'public')));

/********************************************ROUTES********************************************/

app.use('/business',require('./routes/business.routes'));
app.use('/order',require('./routes/order.routes'));
//app.use('/',require('./routes/mercadopago.routes'));
//app.use('/',require('./routes/scraping.routes'));


/********************************************STATICS FILES********************************************/


/********************************************LISTEN********************************************/


//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
  });