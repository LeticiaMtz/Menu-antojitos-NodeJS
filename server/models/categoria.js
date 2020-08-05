const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

// Creación de esquema de categoria
const categoria = new Schema({
    strNombre: { 
        type: String,
        required: [true, 'Porfavor ingresa el nombre de la categoria'], 
        unique: true
    }, 
    strDescripcion:{
        type: String, 
        required: [true, 'Porfavor ingresa una descripcion']
    }, 
    blnStatus:{
        type: Boolean, 
        default: true
    }

}, {
    timestamps: true
});
categoria.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Categoria', categoria);