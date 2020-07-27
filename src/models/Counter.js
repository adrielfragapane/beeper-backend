const mongoose = require('mongoose');
const { Schema } = mongoose;

const CounterSchema = new Schema({

    business: {type: String, required: true},
    counterName: {type: String, required: true},
    initialValue: {type: Number, required: true},
    resetValue: {type: Number, required: false},
    count: {type: Number, required: true},
    prefix: {type: String, required: false},
    sufix: {type: String, required: false},
    date: { type: Date, default: Date.now}
    //options: {maxlength: 200, unique: true}
    //array: [{type: Schema.ObjectId, ref: 'OtroCounter', required: false}],
    //ObjectId: {type: Schema.ObjectId, ref: 'OtroCounter', required: false}
});



module.exports = mongoose.model('Counter',CounterSchema);