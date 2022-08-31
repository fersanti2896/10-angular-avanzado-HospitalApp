
const Usuario = require('../models/usuario');

const getUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: 'Get Usuarios'
    });
}

const postUsuario = async(req, res) => {
    /* Leyendo el body */
    const { nombre, password, email } = req.body;
    const usuario = new Usuario( req.body );

    /* Grabando en la BD */
    await usuario.save()

    res.json({
        ok: true,
        usuario
    });
}

module.exports = {
    getUsuarios,
    postUsuario
}