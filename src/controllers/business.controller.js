const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Business = require("../models/Business");

const authController = {};

const SECRET_KEY = 'secretkey123456';

authController.singin = async (req,res,next) => {

    const newBusiness = new Business(req.body);
    newBusiness.password = await newBusiness.encryptPassword(req.body.password);

    await newBusiness.save( (err,business) => {
 
        if(err && err.code == 11000) {
            return res.json({status: 409, message: 'Este email ya se encuentra registrado'});
        } 
        if(err) {
            return res.json({status: 500, message: 'Error en el servidor'});
        }
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id: business._id}, SECRET_KEY, {expiresIn: expiresIn});
        const businessData = {
            name: business.name,
            email: business.email,
            password: business.password,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        return res.send({businessData});
    });
}

authController.login = async (req,res) => {

    const business = await Business.findOne({email: req.body.email});

    if(!business) {
        return res.json({status: 404, message: 'El email no está registrado'});
    } 
    else {
        const isValidPassword = bcrypt.compareSync(req.body.password, business.password);
        if (isValidPassword) {
            const expiresIn = 60*60*24;
            const accessToken = jwt.sign({id: business._id}, SECRET_KEY, {expiresIn: expiresIn});
            const businessData = {
                name: business.name,
                email: business.email,
                password: business.password,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            return res.send({businessData});
            //return res.json({informacionUsuario, status: 200, message: 'Usuario logueado correctamente'});
        }
        else {
            return res.json({ status: 409, message: 'Password incorrecto'});
        }
    }
}

module.exports = authController;