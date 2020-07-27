const Counter = require('../models/Counter');
const qr = require('qr-image');
const dotenv = require('dotenv').config();
const fs = require('fs');
const counterController = {};

counterController.getCounters = async (req,res) => {
    const counters = await Counter.find();
    res.json(counters);
};

counterController.createCounter = async (req,res) => {
    const counter = new Counter(req.body);
    counter.count = counter.initialValue;
    await counter.save();
    res.json({status: 'Orden generada', _id: counter._id });
};

counterController.getCounter= async (req,res) => {
    const counter = await Counter.findById(req.params.id);
    res.json(counter);
};

counterController.editCounter = async (req,res) => {
    await Counter.findOneAndUpdate({_id: req.params.id}, req.body);
    res.json({status: 'Orden actualizada', _id: req.params.id });
};

counterController.deleteCounter = async (req,res) => {
    await Counter.findByIdAndRemove(req.params.id);
    res.json({status: 'Orden eliminada', _id: req.body._id });
};

counterController.generateCounterQR = async (req,res) => {
    
    const nombre = req.body.nombre ;
    const imgPath = '../../public/images/';

    const URL_API = process.env.ENV=='PROD' ? process.env.URL_API_REMOTE : process.env.URL_API_LOCAL;

    //*********prepare about the images*************
    
    var text = URL_API + 'counter/' + req.params.id ;
    
    var qr_svg = qr.image(text, { type: 'png' });
    
    var img_name = qr_svg.pipe(fs.createWriteStream('./src/storage/public/images/' + req.params.id + '.png'));
    
     fs.readFile(img_name.path, "utf8", function(err, data) {
           if (err) console.log("error");
           
           const imagen = fs.readFileSync(img_name.path).toString('utf-8');
    
           console.log("data " + fs.readFileSync(''+ img_name.path +'').toString('utf-8'));
     });
    
    res.status(200).json({'user': 'ok'});
}

module.exports = counterController;