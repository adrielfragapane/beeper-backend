const express = require('express');
const routerScraping = express.Router();

const scrapingController = require('../controllers/scraping.controller');

routerScraping.get('/vehicleTypes',scrapingController.getVechicleTypes);
routerScraping.get('/builders',scrapingController.getBuilders);
routerScraping.get('/series',scrapingController.getSeries);
routerScraping.get('/models',scrapingController.getModels);

module.exports = routerScraping;