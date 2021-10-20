/*
Ruta: /api/Editorial
*/
const { Router } = require('express');
const { check } = require('express-validator');
//const { validarCampos } = require('../middlewares/validar‐campos');
//const { validarJWT } = require('../middlewares/validar‐jwt');
const { getEditoriales, crearEditorial, actualizarEditorial, eliminarEditorial } = require('../controllers/editoriales.controllers');
const router = Router();

router.get('/', getEditoriales);
router.post('/', [
        check('nombre', 'El nombre de la editorial es obligatorio').not().isEmpty(),
        //validarCampos,
    ],
    crearEditorial);

router.put('/:id', [
        check('nombre', 'El nombre de la editorial es obligatorio').not().isEmpty(),
       // validarCampos,
    ],
    actualizarEditorial);

router.delete('/:id', eliminarEditorial);
module.exports = router;