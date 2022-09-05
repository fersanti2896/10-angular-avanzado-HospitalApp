
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

const putUsuario = async( req, res = response ) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese uid'
            });
        }

        /* Validar token y comprobar si el usuario es el correcto */

        /* Actualizando el usuario en DB */
        const campos = req.body;

        if( usuarioDB.email === req.body.email ) {
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne({ email: req.body.email });

            if( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }        

        delete campos.password;
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuarioActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!'
        })
    }
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario
}