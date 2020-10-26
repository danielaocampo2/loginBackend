// Estructura de la base de datos 
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String
}, {
    timestamps: true // lo de la fecha de creacion
});

module.exports = model('User', userSchema);