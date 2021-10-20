const { request } = require("express");
const Autor = require('../models/autor.model');

const getAutores = async(req, res) => {

    //const autores = await autores.find();
    //para la paginacion: autoress/?desde=5 se utiliza & para concatenar parametros
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const autores = await Promise.all([
        Autor
        .find({}, 'nombre apellido nacionalidad')
        .skip(desde) //variable de paginacion
        .limit(limite), // cuantos valores traer
        Autor.countDocuments()
    ]);
    res.json({
        ok: true,
        autores
    });
}

const crearAutor = async(req, res = response) => {

    //console.log(req.body);
    const { nombre, apellido, nacionalidad } = req.body;

    try {
        const existeNombre = await Autor.findOne({ nombre }); //Linea para buscar los nombres de autor
        if (existeNombre) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre del autor ya a sido registrado'
            });

        }

        //creamos un objeto de la clase model Editorial
        const autor = new Autor(req.body);

        //indicamos a mongoose que registre al usuario en la bd
        await autor.save();


        res.json({
            ok: true,
            autor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarAutor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const autor = await autor.findById(id);

        if (!editorial) {
            return res.status(404).json({
                ok: true,
                msg: 'Autor no encontrado por id',
            });
        }

        const cambiosAutor = {
            ...req.body,
            autor: uid
        }

        const autorActualizado = await Autor.findByIdAndUpdate(id, cambiosAutor, { new: true });


        res.json({
            ok: true,
            autor: autorActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar al autor, consulte con el administrador'
        })
    }

}

const eliminarAutor = async(req, res = response) => {

    const id = req.params.id;

    try {

        const autor = await Autor.findById(id);

        if (!autor) {
            return res.status(404).json({
                ok: true,
                msg: 'El autor no sido encontrado por id',
            });
        }

        await Autor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Autor eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Autor no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getAutores,
    crearAutor,
    actualizarAutor, 
    eliminarAutor,
}