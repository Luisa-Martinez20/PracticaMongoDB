const { request } = require("express");
const Prestamo = require('../models/prestamo.model');

const getPrestamos = async(req, res) => {

    const libros = await Prestamo.find()
                        .populate('usuario','nombre')
                        .populate('libro','nombre autor');
    res.json({
        ok:true,
        prestamos
    });

}

const crearPrestamo = async(req, res = response) => {
    const { nombre, fechaLanzamiento, autor,editorial } = req.body;

    const uid = req.uid;
    const prestamo = new Prestamo({ 
        usuario: uid,
        ...req.body 
    });

    try {
    //creamos un objeto de la clase model Usuario
    const prestamoDB = await prestamo.save();
    //indicamos a mongoose que registre al usuario en la bd

    res.json({
        ok:true,
        prestamo: prestamoDB
    });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al realizar el préstamo, consulte con el administrador'
        })
    }
}

const actualizarPrestamo = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const prestamo = await prestamo.findById(id);

        if (!prestamo) {
            return res.status(404).json({
                ok: true,
                msg: 'Prestamo no encontrado',
            });
        }

        const cambiosPrestamo = {
            ...req.body,
            prestamo: uid
        }

        const prestamoActualizado = await Prestamo.findByIdAndUpdate(id, cambiosPrestamo, { new: true });


        res.json({
            ok: true,
            prestamo: prestamoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el prestamo, consulte con el administrador'
        })
    }

}

const eliminarPrestamo = async(req, res = response) => {

    const id = req.params.id;

    try {

        const prestamo = await Prestamo.findById(id);

        if (!prestamo) {
            return res.status(404).json({
                ok: true,
                msg: 'El prestamo no sido encontrada por id',
            });
        }

        await Prestamo.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Prestamo eliminada'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Prestamo no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getPrestamos,
    crearPrestamo,
    actualizarPrestamo, 
    eliminarPrestamo,
}