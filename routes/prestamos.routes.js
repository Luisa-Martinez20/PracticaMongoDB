/*
Ruta: /api/prestamos
*/
const { Router } = require('express');
const { check } = require('express-validator');
//const { validarCampos } = require('../middlewares/validar‐campos');
//const { validarJWT } = require('../middlewares/validar‐jwt');
const { getPrestamos, crearPrestamo, actualizarPrestamo, eliminarPrestamo } = require('../controllers/prestamos.controllers');
const router = Router();

router.get('/', getPrestamos);
router.post('/', [
        check('fechaPrestamo', 'La fecha de prestamo es obligatorio').not().isEmpty(),
        check('libro', 'El id del libro es obligatorio').not().isEmpty(),
        check('autor', 'El id del autor es obligatorio').not().isEmpty(),
        //validarCampos,
    ],
    crearPrestamo);

router.put('/:id', [
        check('fechaPrestamo', 'La fecha de prestamo es obligatorio').not().isEmpty(),
        //validarCampos,
    ],
    actualizarPrestamo);

router.delete('/:id', eliminarPrestamo);
module.exports = router;