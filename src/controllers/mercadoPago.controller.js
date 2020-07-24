const mercadopago = require('mercadopago');

const mercadoPagoController = {};

let preference = {
    items: [
        {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
        }
    ]
};

mercadoPagoController.configure = mercadopago.configure({
    access_token: 'TEST-2621631552055549-052002-1744d758c1d9ef9bf08af5d4fcc44c57-174483937'
});


mercadoPagoController.createPayment = mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "$$init_point$$" en tu HTML
global.init_point = response.body.init_point;
//console.log(response);
//console.log(global.init_point);
}).catch(function(error){
//console.log(error);
});


mercadoPagoController.getLink = (req,res) => {
    try {
        mercadoPagoController.configure;

        mercadoPagoController.createPayment;
        //console.log(global.init_point);
        res.json({message: global.init_point});
    }
    catch {
        res.json({message: 'error'});
    }
}

module.exports = mercadoPagoController;