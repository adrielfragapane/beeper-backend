const express = require('express');
const routerAuth = express.Router();
//const passport = require('passport');
//const jwt = require('jsonwebtoken');

/*BORRAR*/
const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const authController = require('../controllers/auth.controller');
const { text } = require('express');

const URL = "https://catalogo.wixfilters.com.ar/AR/spa/vehicle/WIX%20FILTERS%20Katalog%20Argentina/Veh%C3%ADculos/Autom%C3%B3viles%20+%20Veh%C3%ADculos%20de%20transporte/PEUGEOT"

routerAuth.get('/login', (req,res) => {

    requestPromise(URL)
    .then( html => {
        //console.log(html);

        let $ = cheerio.load(html);

        let title = $('.rf-sel-opt');
        
        let hobbies = [];

        $('.rf-sel-opt').each(function (i, e) {
            hobbies[i] = $(this).text();

            console.log($(this).text());
            
        });
        res.send(hobbies);
        //console.send(title.text());
    });
    
    //res.json({message : 'ok'})
});





routerAuth.post('/singin',authController.singin);
routerAuth.post('/login',authController.login);

//routerAuth.post('/auth/facebook/token', passport.authenticate('facebook-token'),authController.facebookOAuth);

//routerAuth.get('/*', authController.checkToken);

module.exports = routerAuth;