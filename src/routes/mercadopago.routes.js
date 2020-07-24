const express = require('express');
const routerMercadopago = express.Router();

const mercadoPagoController = require('../controllers/mercadoPago.controller');

routerMercadopago.post('/mercadopago',mercadoPagoController.getLink);

module.exports = routerMercadopago;