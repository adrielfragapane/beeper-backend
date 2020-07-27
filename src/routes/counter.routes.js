const express = require('express');
const routerCounter = express.Router();

const counterController = require('../controllers/counter.controller');

routerCounter.get('/',counterController.getCounters);
routerCounter.post('/',counterController.createCounter);
routerCounter.post('/generateQR/:id',counterController.generateCounterQR);
routerCounter.get('/:id',counterController.getCounter);
routerCounter.put('/:id',counterController.editCounter);
routerCounter.delete('/:id',counterController.deleteCounter);

module.exports = routerCounter;