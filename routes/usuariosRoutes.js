/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsers, postUser, putUser, deleteUser } = require('../controllers/usuariosController');

const router = Router();

/* GET: Ruta | Controlador */
router.get( '/', getUsers );

/* POST: Ruta | Middlewere | Controlador */
router.post( '/', [
    check('nombre', '¡El nombre es obligatorio!').not().isEmpty(),
    check('password', '¡El password es obligatorio!').not().isEmpty(),
    check('email', '¡El email es obligatorio!').isEmail(),
    validarCampos /* Se hace el llamado al middleware */
], postUser );

/* PUT: Ruta | Controlador */
router.put( '/:id', [
    check('nombre', '¡El nombre es obligatorio!').not().isEmpty(),
    check('email', '¡El email es obligatorio!').isEmail(),
    check('role', '¡El rol es obligatorio!').not().isEmpty(),
    validarCampos /* Se hace el llamado al middleware */
], putUser );

/* DELETE: Ruta */
router.delete( '/:id', deleteUser );

module.exports = router;