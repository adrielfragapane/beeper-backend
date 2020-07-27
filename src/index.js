const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

/********************************************SETTINGS********************************************/

//Configuring the port
app.set('port', process.env.PORT || 4000);

dotenv.config();

/********************************************CONFIGURING DB********************************************/

require('./databaseMongo');  // MongoDB

/********************************************MIDDLEWARES********************************************/

app.use(morgan('dev'));
app.use(express.json()); // permite que el servidor entienda objetos json
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: '*'}));

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

app.use('/public', express.static(path.join(__dirname,'/storage/public')));

app.use(express.static(path.join(__dirname,'public')));
/********************************************ROUTES********************************************/

app.use('/business',require('./routes/business.routes'));
app.use('/order',require('./routes/order.routes'));
app.use('/counter',require('./routes/counter.routes'));
//app.use('/',require('./routes/mercadopago.routes'));
//app.use('/',require('./routes/scraping.routes'));


// app.post('/QR', (req, res) => {

//     var nombre = req.body.nombre ;
//     var imgPath = './public/images/';

    
//     //*********prepare about the images*************
    
//     var text ='http://www.google.com.ar' ;
    
//     var qr_svg = qr.image(text, { type: 'png' });
    
//     var img_name = qr_svg.pipe(fs.createWriteStream('./public/images/' +'Adriel' + '.png'));
    
    
    
//      fs.readFile(img_name.path, "utf8", function(err, data) {
//            if (err) console.log("error");
           
//            const imagen = fs.readFileSync(img_name.path).toString('utf-8');
    
//            console.log("data " + fs.readFileSync(''+ img_name.path +'').toString('utf-8'));
//            user.img.contentType = 'image/png';
//      });

//     res.status(200).json({'user': 'ok'});
    
//     })


/********************************************STATICS FILES********************************************/


/********************************************LISTEN********************************************/


//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
  });