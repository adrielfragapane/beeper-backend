const Modelo = require('../models/Modelo');

const modeloController = {};

modeloController.getModelos = async (req,res) => {
    const modelos = await Modelo.find();
    res.json(modelos);
};

modeloController.createModelo = async (req,res) => {
    const modelo = new Modelo(req.body);
    await modelo.save();
    res.json({status: 'Modelo guardado', _id: modelo._id });
};

modeloController.getModelo= async (req,res) => {
    const modelo = await Modelo.findById(req.params.id);
    res.json(modelo);
};

modeloController.editModelo = async (req,res) => {
    await Modelo.findOneAndUpdate({_id: req.params.id}, req.body);
    res.json({status: 'Modelo actualizado', _id: modelo._id });
};

modeloController.deleteModelo = async (req,res) => {
    await Modelo.findByIdAndRemove(req.params.id);
    res.json({status: 'Modelo eliminado', _id: req.body._id });
};

module.exports = modeloController;