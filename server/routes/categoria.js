const express = require('express');
const _ = require('underscore');
const Categoria = require('../models/categoria'); //subir nivel
const app = express();


//|-----------------  Api GET de Categoria   ----------------|
//| Creada por: Leticia Moreno                               |
//| Api que obtine listado de categorias                     |
//| modificada por:                                          |
//| Fecha de modificacion:                                   |
//| cambios:                                                 |
//| Ruta: http://localhost:3000/api/categoria/obtener        |
//|----------------------------------------------------------|
app.get('/obtener', (req, res) => {
    Categoria.find() //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, catDB) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400, 
                    msg: 'Error al generar la lista de categorias',
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200, 
                msg: 'Lista de commentarios generada exitosamente',
                cont: catDB.length,
                cnt: catDB
            });
        });
});

//|-----------------   Api GET de Categoria  ---------------------|
//| Creada por: Leticia Moreno                                    |
//| Api que obtine una categoria por id                           |
//| modificada por:                                               |
//| Fecha de modificacion:                                        |
//| cambios:                                                      |
//| Ruta: http://localhost:3000/api/categoria/obtener/idCategoria |
//|---------------------------------------------------------------|
//Obtener por id
app.get('/obtener/:id',  (req, res) => {
    let id = req.params.id;
    Categoria.find({ _id: id })
        .exec((err, catDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: 'Ocurrio un error al consultar la categoria',
                    cnt: err
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se han consultado correctamente la categoria',
                cont: catDB.length,
                cnt: catDB
            });
        });
});

//|-----------------    Api POST de Categoria ---------------|
//| Creada por: Leticia Moreno                               |
//| Api que registra una categoria                           |
//| modificada por:                                          |
//| Fecha de modificacion:                                   |
//| cambios:                                                 |
//| Ruta: http://localhost:3000/api/categoria/registrar      |
//|----------------------------------------------------------|
app.post('/registrar',  (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        //para poder mandar los datos a la coleccion
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion,
        blnStatus: body.blnStatus,
      
    });

    categoria.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status: 400, 
                msg: 'Error al registrar la categoria',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200, 
            msg: 'Se registro la categoria correctamente', 
            cont: catDB.length, 
            cnt: catDB
        });
    });
});


//|-----------------    Api PUT de Categoria ----------------------|
//| Creada por: Leticia Moreno                                      |
//| Api que actualiza una categoria                                 |
//| modificada por:                                                 |
//| Fecha de modificacion:                                          |
//| cambios:                                                        |
//| Ruta: http://localhost:3000/api/categoria/actualizar/idCategoria|
//|-----------------------------------------------------------------|
app.put('/actualizar/:idCategoria', (req, res) => {
    let id = req.params.idCategoria;
    const catBody = _.pick(req.body, ['strNombre', 'strDescripcion', 'blnStatus']);
    Categoria.find({ _id: id }).then((catDB) => {
        if (catDB.length > 0) {
            Categoria.findByIdAndUpdate(id, catBody).then((catDB) => {
                return res.status(200).json({
                    ok: true,
                    status: 200, 
                    msg: 'Categoria actualizada con éxito',
                    cont: catDB.length,
                    cnt: catDB
                });
            }).catch((err) => {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: 'Error al actualizar la categoria',
                    err: err
                });
            });
        }
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400, 
            msg: 'Error al actualizar la categoria',
            err: err
        });
    });
});

//|-----------------  Api DELETE de Categoria ---------------------|
//| Creada por: Leticia Moreno                                     |
//| Api que elimina una categoria                                  |
//| modificada por:                                                |
//| Fecha de modificacion:                                         |
//| cambios:                                                       |
//| Ruta: http://localhost:3000/api/categoria/eliminar/idCategoria |
//|----------------------------------------------------------------|
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndUpdate(id, { blnStatus: false }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha desactivado correctamente el categoría',
            cont: {
                resp
            }
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al desactivar la categoria',
            err: Object.keys(err).length === 0 ? err.message : err
        });
    });
});

//|--------------------  Api PUT de Categoria --------------------------------|
//| Creada por: Leticia Moreno                                                |
//| Api que edita el campo de blnStatus de una categoria                      |
//| modificada por:                                                           |
//| Fecha de modificacion:                                                    |
//| cambios:                                                                  |
//| Ruta: http://localhost:3000/api/categoria/actualizarBlnStatus/idCategoria |
//|---------------------------------------------------------------------------|

app.put('/actualizarBlnStatus/:idCategoria', (req, res) => {
    let id = req.params.idCategoria;
    let blnStatus = req.params.blnStatus; 
    let numParam  = Object.keys(req.body).length;
    if(numParam !== 1){
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al actualizar la categoria',
            err: 'El número de parametros enviados no concuerdan con los que requiere la API'
        });
    }
    const catBody = _.pick(req.body, ['blnStatus']);
    Categoria.find({ _id: id }).then((catDB) => {
        if (catDB.length > 0) {
            Categoria.findByIdAndUpdate(id, catBody).then((catDB) => {
                return res.status(200).json({
                    ok: true,
                    status: 200, 
                    msg: 'Categoria actualizada con éxito',
                    cont: catDB.length,
                    cnt: catDB
                });
            }).catch((err) => {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: 'Error al actualizar la categoria',
                    err: err
                });
            });
        }
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400, 
            msg: 'Error al actualizar la categoria',
            err: err
        });
    });

});

    



module.exports = app;