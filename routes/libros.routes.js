/*
Ruta: /api/libros
*/
const { Router } = require('express');
const { check } = require('express-validator');
//const { validarCampos } = require('../middlewares/validar‐campos');
//const { validarJWT } = require('../middlewares/validar‐jwt');
const { getLibros, crearLibro, actualizarLibro, eliminarLibro } = require('../controllers/libros.controllers');
const router = Router();

router.get('/', getLibros);
router.post('/', [
        check('nombre', 'El nombre del libro es obligatorio').not().isEmpty(),
        check('fechaLanzamiento', 'La fecha de lanzamiento del libro es obligatorio').not().isEmpty(),
        //validarCampos,
    ],
    crearLibro);

router.put('/:id', [
        check('nombre', 'El nombre del libro es obligatorio').not().isEmpty(),
        //validarCampos,
    ],
    actualizarLibro);

router.delete('/:id', eliminarLibro);
module.exports = router;