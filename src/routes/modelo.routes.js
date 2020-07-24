const express = require('express');
const routerModelo = express.Router();

const modeloController = require('../controllers/modelo.controller');

routerModelo.get('/',modeloController.getModelos);
routerModelo.post('/',modeloController.createModelo);
routerModelo.get('/:id',modeloController.getModelo);
routerModelo.put('/:id',modeloController.editModelo);
routerModelo.delete('/:id',modeloController.deleteModelo);

module.exports = routerModelo;