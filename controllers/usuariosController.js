
const Usuario = require('../models/usuario');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
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