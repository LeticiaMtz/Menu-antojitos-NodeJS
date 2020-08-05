const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Categoria = require('./categoria')
const { Schema } = mongoose;

// Creación de esquema de categoria
const platillo = new Schema({
    idCategoria: {
        type: Schema.Types.ObjectId, 
        ref: 'Cateoria', 
        required: [true, 'Porfavor ingresa la especialidad']
    }, 
    strNombre: { 
        type: String,
        required: [true, 'Porfavor ingresa el nombre de la categoria'], 
        unique: true
    }, 
    strDescripcion:{
        type: String, 
        required: [true, 'Porfavor ingresa una descripcion']
    }, 
      strIngredientes:{
        type: String, 
        required: [true, 'Porfavor ingresa los ingredientes']
    }, 
    nmbPiezas: {
        type: Number, 
         required: [true, 'Porfavor ingresa el numero de piezas']

    }, 
    nmbPrecio: {
        type: Number, 
         required: [true, 'Porfavor ingresa el precio']

    }, 
    blnStatus:{
        type: Boolean, 
        default: true
    }

}, {
    timestamps: true
});
platillo.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Platillo', platillo);