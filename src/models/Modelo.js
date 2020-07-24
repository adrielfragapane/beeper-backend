const mongoose = require('mongoose');
const { Schema } = mongoose;

const ModeloSchema = new Schema({

    string: {type: String, required: true},
    number: {type: Number, required: true},
    date: { type: Date, default: Date.now}
    //options: {maxlength: 200, unique: true}
    //array: [{type: Schema.ObjectId, ref: 'OtroModelo', required: false}],
    //ObjectId: {type: Schema.ObjectId, ref: 'OtroModelo', required: false}
});

module.exports = mongoose.model('Modelo',ModeloSchema);