/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { getUsuarios, postUsuario } = require('../controllers/usuariosController')

const router = Router();

/* GET: Ruta | Controlador */
router.get( '/', getUsuarios ) 

/* POST: Ruta | Controlador */
router.post( '/', postUsuario )

module.exports = router;