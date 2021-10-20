/*
Ruta: /api/autores
*/
const { Router } = require('express');
const { check } = require('express-validator');
//const { validarCampos } = require('../middlewares/validar‐campos');
//const { validarJWT } = require('../middlewares/validar‐jwt');
const { getAutores, crearAutor, actualizarAutor, eliminarAutor } = require('../controllers/autores.controllers');
const router = Router();

router.get('/', getAutores);
router.post('/', [
        check('nombre', 'El nombre de la autor es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido del autor es obligatorio').not().isEmpty(),
        check('nacionalidad', 'La nacionalidad del autor es obligatorio').not().isEmpty(),
        //validarCampos,
    ],
    crearAutor);

router.put('/:id', [
        check('nombre', 'El nombre del autor es obligatorio').not().isEmpty(),
        //validarCampos,
    ],
    actualizarAutor);

router.delete('/:id', eliminarAutor);
module.exports = router;