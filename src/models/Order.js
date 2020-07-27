const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({

    business: {type: String, required: true},
    orderName: {type: String, required: true},
    state: {type: Number, required: true},
    date: { type: Date, default: Date.now}
    //options: {maxlength: 200, unique: true}
    //array: [{type: Schema.ObjectId, ref: 'OtroOrder', required: false}],
    //ObjectId: {type: Schema.ObjectId, ref: 'OtroOrder', required: false}
});

module.exports = mongoose.model('Order',OrderSchema);