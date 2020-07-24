const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require("../models/User");

const authController = {};

const SECRET_KEY = 'secretkey123456';

authController.singin = async (req,res,next) => {

    const newUser = new User(req.body);
    newUser.password = await newUser.encryptPassword(req.body.password);

    await newUser.save( (err,user) => {
 
        if(err && err.code == 11000) {
            return res.json({status: 409, message: 'Este email ya se encuentra registrado'});
        } 
        if(err) {
            return res.json({status: 500, message: 'Error en el servidor'});
        }
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: expiresIn});
        const userData = {
            name: user.name,
            email: user.email,
            password: user.password,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        return res.send({userData});
    });
}

authController.login = async (req,res) => {

    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return res.json({status: 404, message: 'El email no está registrado'});
    } 
    else {
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if (isValidPassword) {
            const expiresIn = 30;
            const accessToken = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: expiresIn});
            const userData = {
                name: user.name,
                email: user.email,
                password: user.password,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            return res.send({userData});
            //return res.json({informacionUsuario, status: 200, message: 'Usuario logueado correctamente'});
        }
        else {
            return res.json({ status: 409, message: 'Password incorrecto'});
        }
    }
}

module.exports = authController;