const express = require('express');
const _ = require('underscore');
const Platillo = require('../models/platillo'); //subir nivel
const { path } = require('./categoria');
const app = express();


//|-----------------  Api GET de Platillos   ----------------|
//| Creada por: Leticia Moreno                               |
//| Api que obtiene listado de platillos                     |
//| modificada por:                                          |
//| Fecha de modificacion:                                   |
//| cambios:                                                 |
//| Ruta: http://localhost:3000/api/platillo/obtener         |
//|----------------------------------------------------------|
app.get('/obtener',  async (req, res) => { 
    Platillo.find().then((resp) =>{
        return res.status(200).json({
            ok: true, 
            status: 200, 
            msg: 'Se genero la lista de platillos correctamente',
            cont: resp.length, 
            cnt: resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false, 
            status: 400, 
            msg: 'No se pudo generar la lista correctamente', 
            cnt: err
        });
    });
});


//|-----------------   Api GET de Platillos  --------------------|
//| Creada por: Leticia Moreno                                   |
//| Api que obtiene un rol por id                                |
//| modificada por:                                              |
//| Fecha de modificacion:                                       |
//| cambios:                                                     |
//| Ruta: http://localhost:3000/api/platillo/obtener/idPlatillo  |
//|--------------------------------------------------------------|
app.get('/obtener/:id',  (req, res) => {
    let id = req.params.id;
    Platillo.find({ _id: id })
        .exec((err, platDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: 'Ocurrio un error al consultar los platillos',
                    cnt: err
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se han consultado correctamente los platillos',
                cont: platDB.length,
                cnt: platDB
            });
        });
});

//|-----------------  Api POST de Platillos  ----------------|
//| Creada por: Leticia Moreno                               |
//| Api que registra un platillo                             |
//| modificada por:                                          |
//| Fecha de modificacion:                                   |
//| cambios:                                                 |
//| Ruta: http://localhost:3000/api/platillo/registrar       |
//|----------------------------------------------------------|
app.post('/registrar',  (req, res) => {
    let body = req.body;
    let platillo = new Platillo({
        //para poder mandar los datos a la coleccion
        idCategoria: body.idCategoria,
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion, 
        strIngredientes: body.strIngredientes, 
        nmbPiezas: body.nmbPiezas, 
        nmbPrecio: body.nmbPrecio, 
        blnStatus: body.blnStatus,
      
    });

    platillo.save((err, platDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status: 400, 
                msg: 'Error al registrar el platillo',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200, 
            msg: 'Se registro el platillo correctamente', 
            cont: platDB.length, 
            cnt: platDB
        });
    });
});


//|-----------------    Api PUT de Platillo  ----------------------|
//| Creada por: Leticia Moreno                                     |
//| Api que actualiza un platillo                                  |
//| modificada por:                                                |
//| Fecha de modificacion:                                         |
//| cambios:                                                       |
//| Ruta: http://localhost:3000/api/platillo/actualizar/idPlatillo |
//|----------------------------------------------------------|
app.put('/actualizar/:idPlatillo', (req, res) => {
    let id = req.params.idPlatillo;
    const platBody = _.pick(req.body, ['idCategoria','strNombre', 'strDescripcion','strIngredientes','nmbPiezas','nmbPrecio', 'blnStatus']);
    Platillo.find({ _id: id }).then((platDB) => {
        if (platDB.length > 0) {
            Platillo.findByIdAndUpdate(id, platBody).then((platDB) => {
                return res.status(200).json({
                    ok: true,
                    status: 200, 
                    msg: 'Platillo actualizado con éxito',
                    cont: platDB.length,
                    cnt: platDB
                });
            }).catch((err) => {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: 'Error al actualizar el platillo',
                    err: err
                });
            });
        }
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400, 
            msg: 'Error al actualizar el platillo',
            err: err
        });
    });
});

//|-----------------    Api DELETE de Platillo  ----------------|
//| Creada por: Leticia Moreno                                  |
//| Api que registra un platillo                                |
//| modificada por:                                             |
//| Fecha de modificacion:                                      |
//| cambios:                                                    |
//| Ruta: http://localhost:3000/api/platillo/eliminar/idPlatillo|
//|----------------------------------------------------------|
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Platillo.findByIdAndUpdate(id, { blnStatus: false }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha desactivado correctamente el platillo',
            cont: {
                resp
            }
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al desactivar el platillo',
            err: Object.keys(err).length === 0 ? err.message : err
        });
    });
});



app.put('/actualizarBlnStatus/:idPlatillo', (req, res) => {
    let id = req.params.idPlatillo;
    let blnStatus = req.params.blnStatus; 
    let numParam  = Object.keys(req.body).length;
    if(numParam !== 1){
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al actualizar el platillo',
            err: 'El número de parametros enviados no concuerdan con los que requiere la API'
        });
    }
    const platBody = _.pick(req.body, ['blnStatus']);
    Platillo.find({ _id: id }).then((platDB) => {
        if (platDB.length > 0) {
            Platillo.findByIdAndUpdate(id, platBody).then((platDB) => {
                return res.status(200).json({
                    ok: true,
                    status: 200, 
                    msg: 'Platillo actualizado con éxito',
                    cont: platDB.length,
                    cnt: platDB
                });
            }).catch((err) => {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: 'Error al actualizar el platillo',
                    err: err
                });
            });
        }
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400, 
            msg: 'Error al actualizar el platillo',
            err: err
        });
    });

});


module.exports = app;