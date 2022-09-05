
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

const postUsuario = async(req, res = response) => {
    /* Leyendo el body */
    const { nombre, password, email } = req.body;

    try {
        /* Validando si el usuario ya existe */
        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado!'
            })
        }

        const usuario = new Usuario( req.body );

        /* Encriptando contraseña */
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        /* Grabando en la BD */
        await usuario.save()

        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs!'
        });
    }   
}

module.exports = {
    getUsuarios,
    postUsuario
}