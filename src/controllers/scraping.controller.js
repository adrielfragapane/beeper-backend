const Modelo = require('../models/modelo');
const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const scrapingController = {};

const URL = "https://catalogo.wixfilters.com.ar/AR/spa";
//https://catalogo.wixfilters.com.ar/AR/spa/vehicle/WIX FILTERS Katalog Argentina/Vehículos/Automóviles + Vehículos de transporte

const vehiclesRoute = "/vehicle/WIX FILTERS Katalog Argentina/Vehículos"
scrapingController.getVechicleTypes = async (req,res) => {

    await requestPromise(URL)
    .then( html => {

        let $ = cheerio.load(html);

        let types = [];
        $('.vehiclesButton a img').each(function (i, e) {
            types[i]=$(this).attr("title");
        });
        res.send(types);
    });
};

scrapingController.getBuilders = async (req,res) => {

    await requestPromise(URL + vehiclesRoute + "/" +"Automóviles + Vehículos de transporte")
    .then( html => {

        let $ = cheerio.load(html);
        let builders = [];

        $('#dropdownsHerstellerSelectItems div').each(function (i, e) {
            builders[i]=$(this).text();
        });
        res.send(builders);
    });
};

scrapingController.getSeries = async (req,res) => {

    
    await requestPromise(encodeURI(URL + vehiclesRoute + "/" +"Automóviles + Vehículos de transporte" + "/" +"AUDI"))
    .then( html => {

        let $ = cheerio.load(html);
        let series = [];

        $('#dropdownsModellreihe_SelectItems div').each(function (i, e) {
            series[i]=$(this).text();
        });
        //console.log(series);
        res.send(series);
    });
};

scrapingController.getModels = async (req,res) => {

    console.log(encodeURI(URL + vehiclesRoute + "/" +"Automóviles + Vehículos de transporte" + "/" +"AUDI" + "/" + "100 (4A, C4)"));
    await requestPromise(encodeURI(URL + vehiclesRoute + "/" +"Automóviles + Vehículos de transporte" + "/" +"AUDI" + "/" + "100 (4A, C4)"))
    .then( html => {

        let $ = cheerio.load(html);
        let tipoModelo = [];
        let codigoMotor = [];
        let kW = [];
        let CV = [];
        let anioFabricacion = [];
/*
        $('.vehicleTable .table-head .tableContent').each(function (i, e) {
            
            models[i]=$(this).text();
        });*/

        $('.vehicleTable .row .vehicle_type .tableContent').each(function (i, e) {
            
            tipoModelo[i]=$(this).text();
        });

        //console.log(models);
        res.send(tipoModelo);

        //column vehicle_type
    });
};

module.exports = scrapingController;