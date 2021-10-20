const { request } = require("express");
const Editorial = require('../models/editorial.model');

const getEditoriales = async(req, res) => {

    //const editorial = await Editorial.find();
    //para la paginacion: ponentes/?desde=5 se utiliza & para concatenar parametros
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;


    const editoriales = await Promise.all([
        Editorial
        .find({}, 'nombre')
        .skip(desde) 
        .limit(limite), 
        Editorial.countDocuments()
    ]);
    res.json({
        ok: true,
        editoriales
    });
}

const crearEditorial = async(req, res = response) => {

    //console.log(req.body);
    const { nombre } = req.body;

    try {
        const existeNombre = await Editorial.findOne({ nombre }); //Linea para buscar los nombres de editorial
        if (existeNombre) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de la editorial ya a sido registrado'
            });

        }

        //creamos un objeto de la clase model Editorial
        const editorial = new Editorial(req.body);

        //indicamos a mongoose que registre al usuario en la bd
        await editorial.save();


        res.json({
            ok: true,
            editorial
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarEditorial = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const editorial = await editorial.findById(id);

        if (!editorial) {
            return res.status(404).json({
                ok: true,
                msg: 'Editorial no encontrado por id',
            });
        }

        const cambiosEditorial = {
            ...req.body,
            editorial: uid
        }

        const editorialActualizada = await Editorial.findByIdAndUpdate(id, cambiosEditorial, { new: true });


        res.json({
            ok: true,
            editorial: editorialActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar la editorial, consulte con el administrador'
        })
    }

}

const eliminarEditorial = async(req, res = response) => {

    const id = req.params.id;

    try {

        const editorial = await Editorial.findById(id);

        if (!editorial) {
            return res.status(404).json({
                ok: true,
                msg: 'La editorial no sido encontrada por id',
            });
        }

        await Editorial.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Editorial eliminada'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Editorial no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getEditoriales,
    crearEditorial,
    actualizarEditorial, 
    eliminarEditorial,
}