/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario } = require('../controllers/usuariosController');

const router = Router();

/* GET: Ruta | Controlador */
router.get( '/', getUsuarios );

/* POST: Ruta | Middlewere | Controlador */
router.post( '/', [
    check('nombre', '¡El nombre es obligatorio!').not().isEmpty(),
    check('password', '¡El password es obligatorio!').not().isEmpty(),
    check('email', '¡El email es obligatorio!').isEmail()
], postUsuario );

module.exports = router;