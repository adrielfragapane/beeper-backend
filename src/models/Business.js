const mongoose = require('../databaseMongo');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const BusinessSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    date: {type: Date, defaul: Date.now}
});

BusinessSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

/* Se utiliza function porque al usar arrow function se pierde el scope, 
y debe hacese referencia a un elemento del BusinessSchema con la palabra this.
haciendo una instancia*/

BusinessSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Business',BusinessSchema);