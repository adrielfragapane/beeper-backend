const express = require('express');
const routerOrder = express.Router();

const orderController = require('../controllers/order.controller');

routerOrder.get('/',orderController.getOrders);
routerOrder.post('/',orderController.createOrder);
routerOrder.get('/:id',orderController.getOrder);
routerOrder.put('/:id',orderController.editOrder);
routerOrder.delete('/:id',orderController.deleteOrder);

module.exports = routerOrder;