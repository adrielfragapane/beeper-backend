const express = require('express');
const routerBusiness = express.Router();

const businessController = require('../controllers/business.controller');
const { text } = require('express');

routerBusiness.post('/signin',businessController.singin);
routerBusiness.post('/login',businessController.login);

//routerBusiness.post('/createOrder',businessController.createOrder);

//routerBusiness.post('/auth/facebook/token', passport.authenticate('facebook-token'),businessController.facebookOAuth);

//routerBusiness.get('/*', businessController.checkToken);

module.exports = routerBusiness;