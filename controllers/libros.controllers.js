const { request } = require("express");
const Libro = require('../models/libro.model');

const getLibros = async(req, res) => {

    const libros = await Libro.find()
                                    .populate('autor','nombre apellido')
                                    .populate('editorial','nombre');
    res.json({
        ok:true,
        libros
    });
}

const crearLibro = async(req, res = response) => {

    //console.log(req.body);
    const { nombre, fechaLanzamiento, autor,editorial } = req.body;

    const uid = req.uid;
    const libro = new Libro({ 
        autor: uid,
        ...req.body 
    });

    try {
    //creamos un objeto de la clase model Usuario
    const libroDB = await libro.save();
    //indicamos a mongoose que registre al usuario en la bd

    res.json({
        ok:true,
        libro: libroDB
    });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar libro, consulte con el administrador'
        })
    }

}

const actualizarLibro = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const libro = await libro.findById(id);

        if (!libro) {
            return res.status(404).json({
                ok: true,
                msg: 'Libro no encontrado por id',
            });
        }

        const cambiosLibro = {
            ...req.body,
            libro: uid
        }

        const libroActualizado = await Libro.findByIdAndUpdate(id, cambiosLibro, { new: true });


        res.json({
            ok: true,
            libro: libroActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar al libro, consulte con el administrador'
        })
    }

}

const eliminarLibro = async(req, res = response) => {

    const id = req.params.id;

    try {

        const libro = await Libro.findById(id);

        if (!libro) {
            return res.status(404).json({
                ok: true,
                msg: 'El libro no sido encontrado por id',
            });
        }

        await Libro.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Libro eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'El libro no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getLibros,
    crearLibro,
    actualizarLibro, 
    eliminarLibro,
}